import Root from "./Root";

import { readSongAllNoCacheLatest } from "./actions/crud";
import vtuberProfile from "@/profile";

export default async function Home() {
  const { songs } = await readSongAllNoCacheLatest();

  const tracks = songs
    .filter((song) => (song.extra as any).bucket_url)
    .map((song) => ({
      url: (song.extra as any).bucket_url,
      title: song.title,
      artist: song.artist,
    }));

  return <Root songs={songs} tracks={tracks} profile={vtuberProfile} />;
}
