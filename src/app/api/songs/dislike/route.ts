import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

/// Increment extra->>numDislikes
const dislikeSong = async (id: number) => {
  await prisma.$executeRaw`UPDATE "Song" SET extra = jsonb_set(extra, '{numDislikes}', (COALESCE(extra->>'numDislikes','0')::int + 1)::text::jsonb) WHERE id = ${id};`;
};

export async function POST(request: NextRequest) {
  const formData = await request.json();
  const res = await dislikeSong(formData.id);
  return NextResponse.json({ res });
}
