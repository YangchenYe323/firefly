"use client";

import Heading from "./components/Heading";
import ThemeProvider from "./components/ThemeProvider";
import SongPanel from "./components/SongPanel";
import CollapsibleHeader from "./components/CollapsibleHeader";
import { useHydrateAtoms } from "jotai/utils";

import dynamic from "next/dynamic";
import { type FC, useMemo, useState } from "react";
import type { VtuberProfileWithReferences } from "./actions/v2/profile";
import { allVtuberSongsAtom, apiUrlAtom, profileAtom } from "@/lib/store";
import { useAtom, useAtomValue } from "jotai";

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
						<SongPanel onShowPlayer={showPlayer} />
						<div className="mt-2 mb-2 p-4 text-center text-sm text-thin text-black">
							Copyright © 2023-2024 梦中杀蝶人协会 & 他们的朋友
						</div>
						<div className="w-full text-center text-sm text-light text-black">
							<span className="inline-block overflow-hidden border-0 mx-0 p-0">
								<img
									src="/icons/备案.png"
									alt="备案图标"
									width={30}
									height={30}
									className="rounded-full"
								/>
							</span>
							<footer>
								<a
									href="https://beian.mps.gov.cn/#/query/webSearch?code=61019702000415"
									rel="noreferrer"
									target="_blank"
								>
									陕公网安备61019702000415号
								</a>
							</footer>
							<footer>
								<a
									href="https://beian.miit.gov.cn/#/Integrated/index"
									rel="noreferrer"
									target="_blank"
								>
									陕ICP备2023014792号-1
								</a>
							</footer>
						</div>
						<SongPlayer
							visible={playerVisible}
							closePlayer={closePlayer}
							apiUrl={apiUrl}
						/>
					</div>
				</div>
			)}
		</ThemeProvider>
	);
}

Root.displayName = "Root";

export default Root;
