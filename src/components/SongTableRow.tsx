"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Song } from "@prisma/client";
import { MouseEventHandler, useState } from "react";
import { onCopyToClipboard } from "@/lib/utils";
import { Tooltip } from "./ui/tooltip";
import {
  TooltipContent,
  TooltipTrigger,
  Arrow,
  Portal,
} from "@radix-ui/react-tooltip";

type PropType = {
  song: Song;
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

export default function SongTableRow({ song }: PropType) {
  const [numLikes, setNumLikes] = useState(getNumLikes(song));
  const [numDislikes, setNumDislikes] = useState(getNumDislikes(song));

  const onLikeSong: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    fetch("/api/songs/like", {
      method: "POST",
      body: JSON.stringify({ id: song.id }),
    }).catch((e) => {
      console.log(`Error liking song ${e}`);
    });
    setNumLikes((likes) => likes + 1);
  };

  const onDislikeSong: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    fetch("/api/songs/dislike", {
      method: "POST",
      body: JSON.stringify({ id: song.id }),
    }).catch((e) => {
      console.log(`Error disliking song ${e}`);
    });
    setNumDislikes((dislikes) => dislikes + 1);
  };

  const onCopySong = () => onCopyToClipboard(song);

  return (
    <TableRow
      key={song.id}
      className="h-0.5 md:h-1 hover:bg-accent hover:text-accent-foreground"
      onClick={onCopySong}
    >
      <TableCell className="p-0 font-mono text-center h-0.5 md:h-1 text-xs md:text-sm whitespace-nowrap">
        <Button
          variant="ghost"
          className="p-0 m-0 border-0 h-0.5 md:h-1 text-center"
        >
          {song.title}
        </Button>
      </TableCell>
      <TableCell className="p-0 md:p-0.5 font-mono text-center h-0.5 md:h-1 text-xs md:text-sm whitespace-nowrap">
        {song.artist}
      </TableCell>
      <TableCell className="p0 md:p-0.5 font-mono text-center h-0.5 md:h-1 text-xs md:text-sm whitespace-nowrap">
        {song.genre.join(", ")}
      </TableCell>
      <TableCell className="p-0 md:p-0.5 font-mono text-center h-0.5 md:h-1 text-xs md:text-sm whitespace-nowrap">
        {song.remark}
      </TableCell>
      <TableCell className="p-0 md:p-0.5 font-serif h-0.5 md:h-1 whitespace-nowrap">
        <div className="min-w-10 h-full grid grid-flow-col-dense justify-start items-center auto-cols-min">
          <Button
            variant="outline"
            className="mr-1 w-fit rounded-full p-1"
            onClick={onLikeSong}
          >
            <span className="text-xs md:text-sm">️❤️ {numLikes}</span>
          </Button>
          <Button
            variant="outline"
            className="w-fit rounded-full p-1"
            onClick={onDislikeSong}
          >
            <span className="text-xs md:text-sm">😅 {numDislikes}</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
