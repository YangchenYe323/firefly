import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

/// Increment extra->>numLikes
const likeSong = async (id: number) => {
  await prisma.$executeRaw`UPDATE "Song" SET extra = jsonb_set(extra, '{numLikes}', (COALESCE(extra->>'numLikes','0')::int + 1)::text::jsonb) WHERE id = ${id};`;
};

export async function POST(request: NextRequest) {
  const formData = await request.json();
  const res = await likeSong(formData.id);
  return NextResponse.json({ res });
}
