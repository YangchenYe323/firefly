"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Song } from "@/generated/client";
import SongTableRow from "./SongTableRow";

interface PropType {
  songs: Song[];
}

export default function SongTable({ songs }: PropType) {
  return (
    <Table className="border-collapse">
      <TableHeader className="border-b-2 border-black">
        <TableRow>
          <TableHead className="w-1/6"></TableHead>
          <TableHead className="w-2/5 text-sm md:text-base font-medium text-black text-start">
            歌名
          </TableHead>
          <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center">
            歌手
          </TableHead>
          <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center">
            语种
          </TableHead>
          <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center">
            标签
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
