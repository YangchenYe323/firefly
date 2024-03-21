import EditableSongTable from "./components/EditableSongTable";
import { Song } from "@/generated/client";
import { readSongAllNoCacheLatest } from "../actions/crud";

export type EditableSong = Pick<
  Song,
  "id" | "title" | "artist" | "lang" | "tag" | "url" | "remark"
>;

export default async function Admin() {
  const { songs } = await readSongAllNoCacheLatest();
  return <EditableSongTable songs={songs} />;
}
