import Image from "next/image";
import Root from "./Root";

import { readSongAllNoCacheLatest } from "./actions/crud";
import vtuberProfile from "@/profile";

export default async function Home() {
	const { songs } = await readSongAllNoCacheLatest();

	const tracks = songs
		.filter((song) => song.extra.bucket_url)
		.map((song) => ({
			url: song.extra.bucket_url!,
			title: song.title,
			artist: song.artist,
		}));

	return (
		<div className="p-0">
			<Root songs={songs} tracks={tracks} profile={vtuberProfile} />
			{vtuberProfile.backgroundImagePath && (
				<div className="fixed top-0 left-0 h-full w-full overflow-hidden pointer-events-none -z-10">
					<Image
						src={vtuberProfile.backgroundImagePath}
						alt="background"
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: "100%", height: "100%" }}
						className="absolute inset-0 opacity-45 object-cover"
					/>
				</div>
			)}
		</div>
	);
}
