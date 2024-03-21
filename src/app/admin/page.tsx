import EditableSongTable from "./components/EditableSongTable";
import { Song } from "@/generated/client";
import prisma from "@/db";

export type EditableSong = Pick<Song, "id" | "title" | "artist" | "lang" | "tag" | "url" | "remark">;

export default async function Admin() {
  const songs = await prisma.song.findMany({
    orderBy: [{ id: "asc" }],
  });

  return <EditableSongTable songs={songs} />;
}