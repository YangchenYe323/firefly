"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { dislikeSong, likeSong } from "../actions/reaction";
import { getNumDislikes, getNumLikes } from "./SongPanel";
import { isNewlyAdded, onCopyToClipboard } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { Song } from "@/generated/client";
import { toast } from "sonner";
import { useState } from "react";

type PropType = {
  song: Song;
};

export default function SongTableRow({
  song,
}: PropType) {
  const [numLikes, setNumLikes] = useState(getNumLikes(song));
  const [numDislikes, setNumDislikes] = useState(getNumDislikes(song));


  const onLikeSong = (id: number) => {
    likeSong(id).catch((err) => {
      toast.error(`点️❤️失败: ${err}`);
    });
    setNumLikes(likes => likes + 1);
  };

  const onDislikeSong = (id: number) => {
    dislikeSong(id).catch((err) => {
      toast.error(`点😅失败: ${err}`);
    });
    setNumDislikes(dislikes => dislikes + 1);
  };

  const onCopySong = () => onCopyToClipboard(song);

  return (
    <TableRow
      key={song.id}
      className="h-0.5 md:h-1 hover:bg-accent hover:text-accent-foreground"
      onClick={onCopySong}
    >
      <TableCell className="p-0 md:p-0.5 text-end h-0.5 md:h-1 whitespace-nowrap">
        {isNewlyAdded(song) && (
          <Image
            src="/icons/new.png"
            alt="new"
            className="align-top"
            width={50}
            height={50}
          />
        )}
      </TableCell>
      <TableCell className="p-0 text-start h-0.5 md:h-1 whitespace-nowrap">
        {song.url ? (
          <span>
            <Button
              variant="ghost"
              className="p-0 m-0 border-0 h-0.5 md:h-1 text-center font-semibold"
            >
              {song.title}
            </Button>
            <Link
              href={song.url}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <Icons.paper_plane className="ml-2 inline align-top" />
            </Link>
          </span>
        ) : (
          <Button
            variant="ghost"
            className="p-0 m-0 border-0 h-0.5 md:h-1 text-center font-semibold"
          >
            {song.title}
          </Button>
        )}
      </TableCell>
      <TableCell className="p-0 md:p-0.5 font-mono text-center h-0.5 md:h-1 whitespace-nowrap">
        {song.artist}
      </TableCell>
      <TableCell className="p0 md:p-0.5 font-mono text-center h-0.5 md:h-1 whitespace-nowrap">
        {song.lang.join(", ")}
      </TableCell>
      <TableCell className="p0 md:p-0.5 font-mono text-center h-0.5 md:h-1 whitespace-nowrap">
        {song.tag.join(", ")}
      </TableCell>
      <TableCell className="p-0 md:p-0.5 font-mono text-center h-0.5 md:h-1 whitespace-nowrap">
        {song.remark}
      </TableCell>
      <TableCell className="p-0 md:p-0.5 h-0.5 md:h-1 whitespace-nowrap">
        <div className="min-w-10 h-full grid grid-flow-col-dense justify-start items-center auto-cols-min">
          <Button
            variant="ghost"
            className="mr-1 w-fit rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              onLikeSong(song.id);
            }}
          >
            <span>️❤️ {numLikes}</span>
          </Button>
          <Button
            variant="ghost"
            className="w-fit rounded-full p-1"
            onClick={async (e) => {
              e.stopPropagation();
              onDislikeSong(song.id);
            }}
          >
            <span>😅 {numDislikes}</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
