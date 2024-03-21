import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(request: NextRequest) {
  const songs = await prisma.song.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      extra: true,
    },
  });

  console.log(songs);

  return NextResponse.json({ songs }, { status: 200 });
}

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;
