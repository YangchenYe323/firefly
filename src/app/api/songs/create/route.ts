import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  artist: z.string(),
  lang: z.array(z.string()),
  url: z.nullable(z.string()),
  tag: z.array(z.string()),
  remark: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const song = await schema.parseAsync(body);

  const createRes = await prisma.song.create({
    data: {
      title: song.title,
      artist: song.artist,
      lang: song.lang,
      tag: song.tag,
      remark: song.remark,
      extra: {},
    },
  });

  return NextResponse.json({ res: createRes });
}
