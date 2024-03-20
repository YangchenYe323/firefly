import Heading from "./components/Heading";
import MainNav from "./components/MainNav";
import SongPanel from "./components/SongPanel";
import StickyHeader from "@/components/StickyHeader";
import UserNav from "./components/UserNav";
import { cn } from "@/lib/utils";
import prisma from "@/db";
import vtuberProfile from "@/profile";

export default async function Home() {
  const songs = await prisma.song.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const songCount = songs.length;

  const backgroundClassName = vtuberProfile.backgroundImagePath
    ? `bg-gradient-to-r from-[#c6b1f0]/50 to-white/50 md:bg-none md:before:absolute md:before:-z-10 md:before:bg-[url('/profile/background.png')] md:before:bg-cover md:before:bg-fixed md:before:opacity-45 md:before:inset-0`
    : "bg-gradeint-to-r from-[#c6b1f0]";

  return (
    <div className="relative bg-opacity-50, font-chinese">
      <div className={cn(backgroundClassName)}>
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
    </div>
  );
}
