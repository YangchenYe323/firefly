import { JsonValue } from "@/generated/client/runtime/library";
import type { Song } from "@/generated/client";
import { readSongAllNoCacheLatest } from "../actions/crud";
import AdminLayout from "./components/AdminLayout";

export type EditableSong = Pick<
	Song,
	"id" | "title" | "artist" | "lang" | "tag" | "url" | "remark"
> & {
	bucket_url: string;
};

export default async function Admin() {
	const { songs } = await readSongAllNoCacheLatest();

	const editableSongs: EditableSong[] = songs.map((song) => ({
		...song,
		bucket_url: song.extra?.bucket_url || "",
	}));

	return <AdminLayout initialSongs={editableSongs} />;
}
