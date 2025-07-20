import { getVtuberProfileCached } from "./actions/v2/profile";
import Root from "./Root";

export default async function Home() {
	const profileResult = await getVtuberProfileCached();

	if (!profileResult.success || !profileResult.profile) {
		return <div>Failed to get profile</div>;
	}

	return (
		<div className="p-0">
			<Root profileFromServer={profileResult.profile} />
		</div>
	);
}
