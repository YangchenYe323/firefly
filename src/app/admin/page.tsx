import EditableSongTable from "./components/EditableSongTable";
import prisma from "@/db";

export default async function Admin() {
  const songs = await prisma.song.findMany({
    orderBy: [{ id: "asc" }],
  });

  return <EditableSongTable songs={songs} />;
}
