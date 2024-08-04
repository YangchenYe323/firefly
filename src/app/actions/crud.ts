"use server";

import type { Footer, Song } from "@/generated/client";

import type { ActionReturnTypeBase } from "./types";
import type { EditableSong } from "../admin/page";
import { cookies } from "next/headers";
import { extractBvidFromUrl } from "@/lib/utils";
import { getVideoInfo } from "@/lib/bilibili";
import prisma from "@/db";
import { verifyJwtToken } from "@/lib/auth";

const auth = async () => {
  const currentUser = cookies().get("currentUser")?.value;
  const jwtVerified = currentUser && (await verifyJwtToken(currentUser));
  return jwtVerified;
};

export interface CreateSongReturnType extends ActionReturnTypeBase {
  message?: string;
  song?: Song;
}

export async function createSong(
  song: EditableSong
): Promise<CreateSongReturnType> {
  const authResult = await auth();
  if (!authResult) {
    return { success: false, message: "Unaothorized" };
  }

  const validation = validateSong(song);
  if (!validation.success) {
    return {
      success: false,
      message: validation.message,
    };
  }

  const newSong = await prisma.song.create({
    data: {
      title: song.title,
      artist: song.artist,
      lang: song.lang,
      tag: song.tag,
      remark: song.remark,
      url: song.url,
      extra: {},
    },
  });

  return { success: true, song: newSong };
}

export interface ReadSongReturnType {
  songs: Song[];
}

export async function readSongAllNoCache(): Promise<ReadSongReturnType> {
  // disable the cache for this server action
  const _cookies = cookies();
  const songs = await prisma.song.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return { songs };
}

export async function readSongAllNoCacheLatest(): Promise<ReadSongReturnType> {
  // disable the cache for this server action
  const _cookies = cookies();
  const songs = await prisma.song.findMany({
    orderBy: {
      created_on: "desc",
    },
  });

  return { songs };
}

export interface UpdateSongReturnType extends ActionReturnTypeBase {
  message?: string;
  song?: Song;
}

export async function updateSong(
  song: EditableSong
): Promise<UpdateSongReturnType> {
  const authResult = await auth();
  if (!authResult) {
    return { success: false, message: "Unauthorized" };
  }

  const validation = validateSong(song);
  if (!validation.success) {
    return {
      success: false,
      message: validation.message,
    };
  }

  let video_created_on: string | undefined;
  if (song.url) {
    const bvid = extractBvidFromUrl(song.url);
    if (bvid !== null) {
      const response = await getVideoInfo({ bvid });
      if (response.data) {
        const pubdate = response.data.pubdate;
        video_created_on = new Date(pubdate * 1000).toISOString();
      }
    }
  }

  let updatedSong: Song;

  if (video_created_on === null && !song.bucket_url) {
    updatedSong = await prisma.song.update({
      where: {
        id: song.id,
      },
      data: {
        title: song.title,
        artist: song.artist,
        lang: song.lang,
        tag: song.tag,
        remark: song.remark,
        url: song.url,
      },
    });
  } else {
    // Unfortunately, we have to read the JSON first and then update the extra field
    const oldSong = await prisma.song.findUnique({
      where: {
        id: song.id,
      },
    });

    if (oldSong === null) {
      return {
        success: false,
        message: "神奇bug，请马上联系星辰Hikari",
      };
    }

    updatedSong = await prisma.song.update({
      where: {
        id: song.id,
      },
      data: {
        title: song.title,
        artist: song.artist,
        lang: song.lang,
        tag: song.tag,
        remark: song.remark,
        url: song.url,
        extra: {
          ...oldSong.extra,
          video_created_on,
          bucket_url: song.bucket_url,
        },
      },
    });
  }

  return { success: true, song: updatedSong };
}

export async function readFooters(): Promise<Footer[]> {
  const footers = await prisma.footer.findMany();
  return footers;
}

function validateSong(song: EditableSong) {
  if (!song.title) {
    return {
      success: false,
      message: "歌曲名不能为空",
    };
  }

  // When user tries to remove URL in the admin page, it passes empty string.
  // Sanitize it here.
  if (!song.url) {
    song.url = null;
  }

  if (song.url !== null && !isValidHttpUrl(song.url)) {
    return {
      success: false,
      message: "歌曲链接不合法",
    };
  }

  return { success: true };
}

function isValidHttpUrl(urlString: string) {
  let url: URL;
  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
