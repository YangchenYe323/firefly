"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Song } from "@prisma/client";
import { useState } from "react";

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

  const onLikeSong = async () => {
    fetch("/api/songs/like", {
      method: "POST",
      body: JSON.stringify({ id: song.id }),
    }).catch((e) => {
      console.log(`Error liking song ${e}`);
    });
    setNumLikes((likes) => likes + 1);
  };

  const onDislikeSong = async () => {
    fetch("/api/songs/dislike", {
      method: "POST",
      body: JSON.stringify({ id: song.id }),
    }).catch((e) => {
      console.log(`Error disliking song ${e}`);
    });
    setNumDislikes((dislikes) => dislikes + 1);
  };

  return (
    <TableRow key={song.id}>
      <TableCell className="font-medium">{song.title}</TableCell>
      <TableCell>{song.artist}</TableCell>
      <TableCell>{song.genre.join(", ")}</TableCell>
      <TableCell>{song.remark}</TableCell>
      <TableCell>
        <div className="w-fit flex flex-row-reverse">
          <Button
            variant="outline"
            size="sm"
            className="mr-1 w-fit"
            onClick={onDislikeSong}
          >
            😅 {numDislikes}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="mr-1 w-fit"
            onClick={onLikeSong}
          >
            ❤️ {numLikes}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
