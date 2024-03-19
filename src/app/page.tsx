import SongPanel from "@/components/SongPanel";
import StickyHeader from "@/components/StickyHeader";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/db";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Heading from "@/components/Heading";

export default async function Home() {
  const songs = await prisma.song.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const songCount = songs.length;

  return (
    <div>
      <StickyHeader heading="歌单">
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            " ml-auto"
          )}
          href="/login"
        >
          点击进入后台
        </Link>
      </StickyHeader>
      <Heading songCount={songCount} />
      <SongPanel allSongs={songs} />
    </div>
  );
}
