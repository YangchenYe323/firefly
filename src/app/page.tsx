import SongList from "@/components/SongList";
import StickyHeader from "@/components/StickyHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <StickyHeader heading="歌单">
        <Link
          className={
            buttonVariants({ variant: "outline", size: "sm" }) + " ml-auto"
          }
          href="/login"
        >
          点击进入后台
        </Link>
      </StickyHeader>
      <SongList />;
    </div>
  );
}
