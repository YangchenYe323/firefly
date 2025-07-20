"use server";

import prisma from "@/db";

export async function likeSong(id: number) {
    return await prisma.$executeRaw`UPDATE "VtuberSong" SET "numLikes" = "numLikes" + 1 WHERE "id" = ${id};`;
}

export async function dislikeSong(id: number) {
    return await prisma.$executeRaw`UPDATE "VtuberSong" SET "numDislikes" = "numDislikes" + 1 WHERE "id" = ${id};`;
}