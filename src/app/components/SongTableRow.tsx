"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { isNewlyAdded, onCopyToClipboard } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { Song } from "@/generated/client";

type PropType = {
  song: Song;
  onLikeSong: (id: number) => Promise<void>;
  onDislikeSong: (id: number) => Promise<void>;
};

const getNumLikes = (song: Song) => {
  if (
    song.extra &&
    typeof song.extra == "object" &&
    "numLikes" in song.extra &&
    typeof song.extra.numLikes == "number"
  ) {
    return song.extra.numLikes;
  }

  return 0;
};

const getNumDislikes = (song: Song) => {
  if (
    song.extra &&
    typeof song.extra == "object" &&
    "numDislikes" in song.extra &&
    typeof song.extra.numDislikes == "number"
  ) {
    return song.extra.numDislikes;
  }

  return 0;
};

export default function SongTableRow({
  song,
  onLikeSong,
  onDislikeSong,
}: PropType) {
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
            onClick={async (e) => {
              e.stopPropagation();
              await onLikeSong(song.id);
            }}
          >
            <span>️❤️ {getNumLikes(song)}</span>
          </Button>
          <Button
            variant="ghost"
            className="w-fit rounded-full p-1"
            onClick={async (e) => {
              e.stopPropagation();
              await onDislikeSong(song.id);
            }}
          >
            <span>😅 {getNumDislikes(song)}</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
