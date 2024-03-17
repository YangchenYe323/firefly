import { Song } from "@/generated/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "../db";
import SongTableRow from "./SongTableRow";

async function getAllSongs(): Promise<Song[]> {
  return await prisma.song.findMany({
    orderBy: [{ id: "asc" }],
  });
}

export default async function SongList() {
  const songs = await getAllSongs();

  return (
    <Table className="w-fit m-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">歌名</TableHead>
          <TableHead>歌手</TableHead>
          <TableHead>类别</TableHead>
          <TableHead>备注</TableHead>
          <TableHead className="text-right">反应</TableHead>
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
