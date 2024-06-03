import Heading from "./components/Heading";
import Image from "next/image";
import MainNav from "./components/MainNav";
import SongPanel from "./components/SongPanel";
import StickyHeader from "@/components/StickyHeader";
import UserNav from "./components/UserNav";
import { cn } from "@/lib/utils";
import { readSongAllNoCacheLatest } from "./actions/crud";
import vtuberProfile from "@/profile";

export default async function Home() {
  const { songs } = await readSongAllNoCacheLatest();
  const songCount = songs.length;

  // TODO: why template string doesn't work here?
  const backgroundClassName = vtuberProfile.backgroundImagePath
    ? `bg-gradient-to-r from-[#c6b1f0]/50 to-white/50 md:bg-none md:before:absolute md:before:-z-10 md:before:bg-[url('/img/background-compressed.webp')] md:before:bg-cover md:before:bg-fixed md:before:opacity-45 md:before:inset-0`
    : "bg-gradeint-to-r from-[#c6b1f0]";

  return (
    <div className="relative font-chinese bg-opacity-50">
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
        <div className="mt-2 mb-2 p-4 text-center text-sm text-thin text-black">
          Copyright © 2023-2024 梦中杀蝶人协会 & 他们的朋友
        </div>
        <div className="w-full text-center text-sm text-light text-black">
          <span className="inline-block overflow-hidden border-0 mx-0 p-0">
            <Image
              src="/icons/备案.png"
              alt="备案图标"
              width={30}
              height={30}
              className="rounded-full"
              priority={true}
            ></Image>
          </span>
          <footer>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=61019702000415"
              rel="noreferrer"
              target="_blank"
            >
              陕公网安备61019702000415号
            </a>
          </footer>
          <footer>
            <a
              href="https://beian.miit.gov.cn/#/Integrated/index"
              rel="noreferrer"
              target="_blank"
            >
              陕ICP备2023014792号-1
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
