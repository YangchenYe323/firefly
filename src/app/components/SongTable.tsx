"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Song } from "@prisma/client";
import SongTableRow from "./SongTableRow";

interface PropType {
  songs: Song[];
}

export default function SongTable({ songs }: PropType) {
  return (
    <Table className="border-collapse">
      <TableHeader className="border-b-2 border-black">
        <TableRow>
          <TableHead className="w-2/5 text-sm md:text-base font-medium text-black text-center">
            歌名
          </TableHead>
          <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center">
            歌手
          </TableHead>
          <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center">
            类别
          </TableHead>
          <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center">
            备注
          </TableHead>
          <TableHead className="w-1/3 text-sm md:text-base font-medium text-black text-center">
            反应
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song) => {
          return <SongTableRow song={song} key={song.id} />;
        })}
      </TableBody>
    </Table>
  );
}
