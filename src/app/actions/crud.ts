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

  const newSong = await prisma.song.create({
    data: {
      title: song.title,
      artist: song.artist,
      lang: song.lang,
      tag: song.tag,
      remark: song.remark,
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
    },
  });

  return { success: true, song: updatedSong };
}
