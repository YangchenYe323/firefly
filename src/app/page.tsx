import SongPanel from "@/components/SongPanel";
import StickyHeader from "@/components/StickyHeader";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/db";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Heading from "@/components/Heading";
import { MainNav } from "@/components/MainNav";
import { UserNav } from "@/components/UserNav";

export default async function Home() {
  const songs = await prisma.song.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const songCount = songs.length;

  return (
    <div>
      <StickyHeader>
        <div className="container flex h-14 items-center">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center">
            <UserNav />
          </div>
        </div>
      </StickyHeader>
      <Heading songCount={songCount} />
      <SongPanel allSongs={songs} />
    </div>
  );
}
