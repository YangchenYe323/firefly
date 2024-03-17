import { Prisma } from "@/generated/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "../db";
import SongTableRow from "./SongTableRow";

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

async function getAllSongs(): Promise<SongFullType[]> {
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
