"use server";

import prisma from "@/db";

export async function likeSong(id: number) {
  return await prisma.$executeRaw`UPDATE "Song" SET extra = jsonb_set(extra, '{numLikes}', (COALESCE(extra->>'numLikes','0')::int + 1)::text::jsonb) WHERE id = ${id};`;
}

export async function dislikeSong(id: number) {
  return await prisma.$executeRaw`UPDATE "Song" SET extra = jsonb_set(extra, '{numDislikes}', (COALESCE(extra->>'numDislikes','0')::int + 1)::text::jsonb) WHERE id = ${id};`;
}
