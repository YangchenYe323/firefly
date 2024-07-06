import Root from "./Root";

import { readSongAllNoCacheLatest } from "./actions/crud";
import vtuberProfile from "@/profile";

export default async function Home() {
  const { songs } = await readSongAllNoCacheLatest();

  return <Root songs={songs} profile={vtuberProfile} />;
}
