import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(request: NextRequest) {
  const songs = await prisma.song.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json({ songs }, { status: 200 });
}
