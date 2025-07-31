"use client";

import Heading from "./components/Heading";
import ThemeProvider from "./components/ThemeProvider";
import SongPanel from "./components/SongPanel";
import CollapsibleHeader from "./components/CollapsibleHeader";
import ViewTabs from "./components/ViewTabs";
import { useHydrateAtoms } from "jotai/utils";

import dynamic from "next/dynamic";
import { type FC, useMemo, useState } from "react";
import type { VtuberProfileWithReferences } from "./actions/v2/profile";
import { allVtuberSongsAtom, apiUrlAtom, profileAtom } from "@/lib/store";
import { useAtom, useAtomValue } from "jotai";
import RecordingCalendar from "./components/RecordingCalendar";
import { AnimatePresence, motion } from "framer-motion";

interface PropType {
	profileFromServer: VtuberProfileWithReferences;
}

// Avoid SSR completely on SongPlayer as the initialization accesses the document API directly
const SongPlayer = dynamic(() => import("./components/SongPlayer"), {
	ssr: false,
});

const Root: FC<PropType> = ({ profileFromServer }) => {
	// Hydrate the profile atom
	useHydrateAtoms([[profileAtom, profileFromServer]]);

	const [profile, setProfile] = useAtom(profileAtom);
	const [allVtuberSongs] = useAtom(allVtuberSongsAtom);
	const apiUrl = useAtomValue(apiUrlAtom);

	const [playerVisible, setPlayerVisible] = useState(false);
	const [activeView, setActiveView] = useState<"songs" | "calendar">("songs");

	const closePlayer = () => {
		setPlayerVisible(false);
	};

	const showPlayer = () => {
		setPlayerVisible(true);
	};

	return (
		<ThemeProvider avatarSize={240}>
			{({ renderAvatar }) => (
				<div className="relative font-chinese bg-opacity-50">
					<CollapsibleHeader profile={profile!} />
					{/* Add top padding to account for the floating arrow */}
					<div className="pt-10">
						<Heading songCount={allVtuberSongs.length} name={profile!.name} renderAvatar={renderAvatar} />
						<ViewTabs activeView={activeView} onViewChange={setActiveView} />
						<AnimatePresence mode="popLayout" initial={false}>
							{activeView === "songs" ? (
								<motion.div
									key="songs"
									initial={{ opacity: 0, x: -50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -50 }}
									transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
									className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
								>
									<SongPanel onShowPlayer={showPlayer} />
								</motion.div>
							) : (
								<motion.div
									key="calendar"
									initial={{ opacity: 0, x: 50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 50 }}
									transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
									className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
								>
									<RecordingCalendar vtuberProfileId={profile!.id} />
								</motion.div>
							)}
						</AnimatePresence>
						<div className="mt-2 mb-2 p-4 font-alex text-center text-lg text-thin text-black">
							Copyright © <span className="text-sm">2023-2025</span> firefly project
						</div>
						<div className="w-full text-center text-sm text-light text-black">
							{profile?.entryDomain?.publicSecurityFilingNumber && <footer>
								<a
									href={`https://beian.mps.gov.cn/#/query/webSearch?code=${extractCodeFromPublicSecurityFilingNumber(profile.entryDomain.publicSecurityFilingNumber)}`}
									rel="noreferrer"
									target="_blank"
								>
									{profile.entryDomain.publicSecurityFilingNumber}
								</a>
							</footer>}
							{profile?.entryDomain?.icpLicenseNumber && <footer>
								<a
									href="https://beian.miit.gov.cn/#/Integrated/index"
									rel="noreferrer"
									target="_blank"
								>
									{profile.entryDomain.icpLicenseNumber}
								</a>
							</footer>}
							<SongPlayer
								visible={playerVisible}
								closePlayer={closePlayer}
								apiUrl={apiUrl}
							/>
						</div>
					</div>
				</div>
			)}
		</ThemeProvider>
	);
}

			Root.displayName = "Root";

			function extractCodeFromPublicSecurityFilingNumber(publicSecurityFilingNumber: string): string {
	const match = publicSecurityFilingNumber.match(/(\d+)/);
			if (!match) {
		return "";
	}
			return match[1];
}

			export default Root;
