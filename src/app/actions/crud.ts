"use server";

import { ActionReturnTypeBase } from "./types";
import { EditableSong } from "../admin/page";
import { Song } from "@/generated/client";
import { cookies } from "next/headers";
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

  const updatedSong = await prisma.song.update({
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

  return { success: true, song: updatedSong };
}

function validateSong(song: EditableSong) {
  if (!song.title) {
    return {
      success: false,
      message: "歌曲名不能为空",
    };
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
