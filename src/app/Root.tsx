"use client";

import type { Footer, Song } from "@prisma/client";

import Heading from "./components/Heading";
import ThemeProvider from "./components/ThemeProvider";
import { Icons } from "@/components/Icons";
import MainNav from "./components/MainNav";
import SongPanel from "./components/SongPanel";
import StickyHeader from "@/components/StickyHeader";
import type { Track } from "@/lib/player";
import UserNav from "./components/UserNav";
import type { VtuberProfileWithThemesAndLinks } from "./actions/crud";

import dynamic from "next/dynamic";
import { useState } from "react";

interface PropType {
	songs: Song[];
	tracks: Track[];
	profile: VtuberProfileWithThemesAndLinks;
	footer: Footer;
	apiUrl?: string;
}

// Avoid SSR completely on SongPlayer as the initialization accesses the document API directly
const SongPlayer = dynamic(() => import("./components/SongPlayer"), {
	ssr: false,
});

export default function Root({
	songs,
	tracks,
	profile,
	footer,
	apiUrl,
}: PropType) {
	const [playerVisible, setPlayerVisible] = useState(false);

	const songCount = songs.length;

	const closePlayer = () => {
		setPlayerVisible(false);
	};

	const showPlayer = () => {
		setPlayerVisible(true);
	};

	return (
		<ThemeProvider themes={profile.themes} defaultTheme={profile.defaultTheme || undefined} avatarSize={240}>
			{({ renderAvatar }) => (
				<div className="relative font-chinese bg-opacity-50">
					<StickyHeader>
						<div className="container flex h-14 items-center">
							<MainNav className="mx-6" profile={profile} />
							<div className="ml-auto flex items-center">
								<span className="mr-2">
									<div
										className="font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
										onClick={() => setPlayerVisible((val) => !val)}
									>
										<Icons.music_note className="inline align-top" />
										<span className="hidden md:inline">播放器</span>
									</div>
								</span>
								<UserNav profile={profile} />
							</div>
						</div>
					</StickyHeader>
					<Heading songCount={songCount} profile={profile} renderAvatar={renderAvatar} />
					<SongPanel
						allSongs={songs}
						footer={footer}
						apiUrl={apiUrl}
						onShowPlayer={showPlayer}
					/>
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
						tracks={tracks}
						apiUrl={apiUrl}
					/>
				</div>
			)}
		</ThemeProvider>
	);
}
