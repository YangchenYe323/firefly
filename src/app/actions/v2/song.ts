"use server";

import { auth } from "@/lib/auth";
import type { ActionReturnTypeBase } from "../types";
import type { LiveRecordingArchive, Prisma, Song, SongOccurrenceInLive, VtuberSong, SuperChat } from "@prisma/client";
import prisma from "@/db";
import { getVideoInfo } from "@/lib/bilibili";

interface ListSongsReturnType extends ActionReturnTypeBase {
    songs?: Song[];
}

/**
 * List all songs in the song database.
 * 
 * @returns The songs in the song database.
 */
export async function listSongs(): Promise<ListSongsReturnType> {
    const songs = await prisma.song.findMany();
    if (!songs) {
        return { success: false, message: "无法获取歌曲" };
    }

    return { success: true, songs };
}

interface CreateSongReturnType extends ActionReturnTypeBase {
    song?: Song;
}

/**
 * Create a new song to the song database.
 * @param song 
 * @returns 
 */
export async function createSong(song: Song): Promise<CreateSongReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法创建歌曲，请先登录" };
    }

    const songToCreate = {
        ...song,
        id: undefined,
        // The below fields are not editable, let the database handle them
        createdOn: undefined,
        updatedOn: undefined,
    }

    const newSong = await prisma.song.create({
        data: songToCreate,
    });

    if (!newSong) {
        return { success: false, message: "无法创建歌曲" };
    }

    return { success: true, song: newSong };
}

interface UpdateSongReturnType extends ActionReturnTypeBase {
    song?: Song;
}

/**
 * Update a song in the song database.
 * 
 * @param song 
 * @returns 
 */
export async function updateSong(song: Song): Promise<UpdateSongReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法更新歌曲，请先登录" };
    }

    const songToUpdate = {
        ...song,
        id: undefined,
        // The below fields are not editable, let the database handle them
        createdOn: undefined,
        updatedOn: undefined,
    }

    const updatedSong = await prisma.song.update({
        where: { id: song.id },
        data: songToUpdate,
    });

    if (!updatedSong) {
        return { success: false, message: "无法更新歌曲" };
    }

    return { success: true, song: updatedSong };
}

interface DeleteSongReturnType extends ActionReturnTypeBase {
    song?: Song;
}

/**
 * Delete a song from the song database.
 * 
 * @param id 
 * @returns 
 */
export async function deleteSong(id: number): Promise<DeleteSongReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法删除歌曲，请先登录" };
    }

    const deletedSong = await prisma.song.delete({
        where: { id },
    });

    if (!deletedSong) {
        return { success: false, message: "无法删除歌曲" };
    }

    return { success: true, song: deletedSong };
}

interface ListVtuberSongsReturnType extends ActionReturnTypeBase {
    vtuberSongs?: VtuberSong[];
}

/**
 * List all songs in a given vtuber's song list.
 * 
 * @param vtuberProfileId 
 * @returns 
 */
export async function listVtuberSongs(vtuberProfileId: number): Promise<ListVtuberSongsReturnType> {
    const vtuberSongs = await prisma.vtuberSong.findMany({
        where: {
            vtuberProfileId,
        },
        include: {
            song: true,
        },
    });

    if (!vtuberSongs) {
        return { success: false, message: "无法获取虚拟主播歌曲" };
    }

    return { success: true, vtuberSongs };
}

interface CreateVtuberSongReturnType extends ActionReturnTypeBase {
    vtuberSong?: VtuberSong;
}

/**
 * Create a new song in a vtuber's song list.
 * 
 * @param vtuberSong 
 * @returns 
 */
export async function createVtuberSong(vtuberSong: VtuberSong): Promise<CreateVtuberSongReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法创建歌曲，请先登录" };
    }

    // Note: In creation we do set up the relations
    const vtuberSongToCreate = {
        ...vtuberSong,
        id: undefined,
        // The below fields are not editable, let the database handle them
        createdOn: undefined,
        updatedOn: undefined,
    }

    if (vtuberSong.bvid) {
        const videoInfo = await getVideoInfo({ bvid: vtuberSong.bvid });
        if (videoInfo.code === 0) {
            vtuberSongToCreate.pubdate = videoInfo.data!.pubdate;
        } else if (videoInfo.code === -404) {
            return { success: false, message: "投稿视频不存在" };
        }
    }

    const newVtuberSong = await prisma.vtuberSong.create({
        data: vtuberSongToCreate,
    });

    if (!newVtuberSong) {
        return { success: false, message: "无法创建歌曲" };
    }

    return { success: true, vtuberSong: newVtuberSong };
}

interface UpdateVtuberSongReturnType extends ActionReturnTypeBase {
    vtuberSong?: VtuberSong;
}

/**
 * Update a song in a vtuber's song list.
 * 
 * @param vtuberSong 
 * @returns 
 */
export async function updateVtuberSong(vtuberSong: VtuberSong): Promise<UpdateVtuberSongReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法更新歌曲，请先登录" };
    }

    const scStatus = vtuberSong.scStatusId;

    const vtuberSongToUpdate = {
        ...vtuberSong,
        id: undefined,
        // We don't want to update the relations, just the vtuber song's own fields
        songId: undefined,
        song: undefined,
        vtuberProfileId: undefined,
        vtuberProfile: undefined,
        // We do want to update the scStatus though...
        scStatusId: undefined,
        scStatus: undefined,
        // The below fields are not editable, let the database handle them
        createdOn: undefined,
        updatedOn: undefined,
    }

    if (vtuberSong.bvid) {
        const videoInfo = await getVideoInfo({ bvid: vtuberSong.bvid });
        if (videoInfo.code === 0) {
            vtuberSongToUpdate.pubdate = videoInfo.data!.pubdate;
        } else if (videoInfo.code === -404) {
            return { success: false, message: "投稿视频不存在" };
        }
    }

    const updateData: Prisma.VtuberSongUpdateInput = {
        ...vtuberSongToUpdate,
    }

    if (scStatus) {
        updateData.scStatus = {
            connect: {
                id: scStatus,
            }
        }
    }

    const updatedVtuberSong = await prisma.vtuberSong.update({
        where: { id: vtuberSong.id },
        data: updateData,
    });

    if (!updatedVtuberSong) {
        return { success: false, message: "无法更新歌曲" };
    }

    return { success: true, vtuberSong: updatedVtuberSong };
}

interface DeleteVtuberSongReturnType extends ActionReturnTypeBase {
    vtuberSong?: VtuberSong;
}

/**
 * Delete a song from a vtuber's song list.
 * 
 * @param id 
 * @returns 
 */
export async function deleteVtuberSong(id: number): Promise<DeleteVtuberSongReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法删除歌曲，请先登录" };
    }

    const deletedVtuberSong = await prisma.vtuberSong.delete({
        where: { id },
    });

    if (!deletedVtuberSong) {
        return { success: false, message: "无法删除歌曲" };
    }

    return { success: true, vtuberSong: deletedVtuberSong };
}

export interface SongOccurrenceInLiveWithReferences extends SongOccurrenceInLive {
    liveRecordingArchive: LiveRecordingArchive;
}

interface ListSongOccurrencesReturnType extends ActionReturnTypeBase {
    occurrences?: SongOccurrenceInLiveWithReferences[];
    nextToken?: string;
}

/**
 * List occurrences of a given vtuber's song in his/her live recordings. This is a paginated API.
 * 
 * @param vtuberSongId - The id of the vtuber song to list occurrences for
 * @param pageToken - The token to continue from the last page
 * @param limit - The number of occurrences to fetch per page
 * @param afterDate - The date to start fetching occurrences from
 * @returns 
 */
export async function listVtuberSongOccurrences(
    vtuberSongId: number,
    pageToken?: string,
    limit = 20,
    afterDate?: number | string | undefined,
): Promise<ListSongOccurrencesReturnType> {
    // If present, parse the afterDate filter, this gets translated to a WHERE pubdate >= afterDate clause
    // so we only get occurrences after the given date
    const afterDateFilter = parseAfterDate(afterDate);

    // If present, parse the pageToken, this gets translated to a WHERE pubdate < pageToken clause
    // so we only get occurrences before the given date (the last occurrence in the previous page)
    let pubdateFilter: { pubdate: { lt: number } } | undefined;
    if (pageToken) {
        try {
            const decodedToken = Buffer.from(pageToken, "base64").toString("utf-8");
            const pubdate = Number.parseInt(decodedToken, 10);

            if (Number.isNaN(pubdate)) {
                return { success: false, message: "Invalid pagination token" };
            }

            pubdateFilter = { pubdate: { lt: pubdate } };
        } catch (error) {
            return { success: false, message: "Invalid pagination token format" };
        }
    }

    const whereClauses: Prisma.LiveRecordingArchiveWhereInput[] = [];

    if (afterDateFilter) {
        whereClauses.push(afterDateFilter);
    }

    if (pubdateFilter) {
        whereClauses.push(pubdateFilter);
    }

    const occurrences = await prisma.songOccurrenceInLive.findMany({
        where: {
            vtuberSongId,
            liveRecordingArchive: {
                AND: whereClauses,
            }
        },
        include: {
            liveRecordingArchive: true,
        },
        orderBy: [
            {
                liveRecordingArchive: {
                    pubdate: "desc",
                },
            },
            {
                start: "asc",
            },
        ],
        take: limit + 1, // Take one extra to determine if there are more pages
    });

    // Check if there are more pages
    const hasMore = occurrences.length > limit;
    const results = hasMore ? occurrences.slice(0, limit) : occurrences;

    // Generate next token if there are more results
    let nextToken: string | undefined;
    if (hasMore && results.length > 0) {
        const lastOccurrence = results[results.length - 1];
        const tokenData = lastOccurrence.liveRecordingArchive.pubdate.toString();
        nextToken = Buffer.from(tokenData, "utf-8").toString("base64");
    }

    return {
        success: true,
        occurrences: results,
        nextToken,
    };
}

interface DeleteSongOccurrenceReturnType extends ActionReturnTypeBase {
    occurrence?: SongOccurrenceInLive;
}

export async function deleteSongOccurrence(vtuberSongId: number, liveRecordingArchiveId: number): Promise<DeleteSongOccurrenceReturnType> {
    const authResult = await auth();
    if (!authResult) {
        return { success: false, message: "无法删除播放记录，请先登录" };
    }

    const deletedOccurrence = await prisma.songOccurrenceInLive.delete({
        where: {
            vtuberSongId_liveRecordingArchiveId: {
                vtuberSongId: vtuberSongId,
                liveRecordingArchiveId,
            },
        },
    });

    return { success: true, occurrence: deletedOccurrence };
}

function parseAfterDate(
    afterDate?: number | string | undefined,
): { pubdate: { gte: number } } | undefined {
    if (!afterDate) {
        return undefined;
    }

    if (typeof afterDate === "string") {
        // Interpret as ISO string
        const date = new Date(afterDate);
        if (Number.isNaN(date.getTime())) {
            return undefined;
        }

        return { pubdate: { gte: date.getTime() / 1000 } };
    }

    return { pubdate: { gte: afterDate } };
}

interface ListSuperChatsReturnType extends ActionReturnTypeBase {
    superChats?: SuperChat[];
}

/**
 * List all SuperChat options available for vtuber songs.
 * 
 * @returns The list of SuperChat options
 */
export async function listSuperChats(): Promise<ListSuperChatsReturnType> {
    const superChats = await prisma.superChat.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return { success: true, superChats };
}
