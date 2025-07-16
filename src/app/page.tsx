import {
	getVtuberProfileCached,
	readFooters,
	readSongAllNoCacheLatest,
} from "./actions/crud";
import Root from "./Root";

export default async function Home() {
	const { songs } = await readSongAllNoCacheLatest();
	const footers = await readFooters();
	const footer = footers[Math.floor(Math.random() * footers.length)];

	const tracks = songs
		.filter((song) => song.extra.bucket_url)
		.map((song) => ({
			url: song.extra.bucket_url!,
			title: song.title,
			artist: song.artist,
		}));

	const profile = await getVtuberProfileCached();

	if (!profile.profile) {
		return <div>Profile not found</div>;
	}

	// Read API_URL from env (now using NEXT_PUBLIC_ prefix)
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	return (
		<div className="p-0">
			<Root
				songs={songs}
				tracks={tracks}
				profile={profile.profile}
				footer={footer}
				apiUrl={apiUrl}
			/>
		</div>
	);
}
