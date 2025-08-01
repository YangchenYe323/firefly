import { getVtuberProfileCached } from "./actions/v2/profile";
import Root from "./Root";
import NoProfileFallback from "./components/NoProfileFallback";

export default async function Home() {
	const profileResult = await getVtuberProfileCached();

	if (!profileResult.success || !profileResult.profile) {
		console.error("Failed to get profile", profileResult);
		return <NoProfileFallback />;
	}

	return (
		<div className="p-0">
			<Root profileFromServer={profileResult.profile} />
		</div>
	);
}
