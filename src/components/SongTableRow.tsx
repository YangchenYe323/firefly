"use client";

import { Prisma } from "@/generated/client";
import { TableCell, TableRow } from "@/components/ui/table";

const songFull = Prisma.validator<Prisma.SongDefaultArgs>()({
  select: {
    id: true,
    title: true,
    artist: true,
    genre: true,
    remark: true,
    created_on: true,
    extra: true,
  },
});

type SongFullType = Prisma.SongGetPayload<typeof songFull>;

type PropType = {
  song: SongFullType;
};

export default function SongTableRow({ song }: PropType) {
  return (
    <TableRow key={song.id}>
      <TableCell className="font-medium">{song.title}</TableCell>
      <TableCell>{song.artist}</TableCell>
      <TableCell>{song.genre.join(", ")}</TableCell>
      <TableCell
        className="text-right"
        onClick={() => {
          alert("AAAAA");
        }}
      >
        {song.remark}
      </TableCell>
    </TableRow>
  );
}
