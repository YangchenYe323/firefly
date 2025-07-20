"use client"

import SongOccurrencesPanel from "./SongOccurrencesPanel";
import PremiumCard from "./PremiumCard";
import type { FC } from "react";
import type { VtuberSongWithReferences } from "../actions/v2/profile";

interface SongRowExpansionPanelProps {
	vtuberSong: VtuberSongWithReferences;
	present: boolean;
}

const SongRowExpansionPanel: FC<SongRowExpansionPanelProps> = ({
	vtuberSong,
	present,
}) => {
	const isPremium = vtuberSong.premiumStatus !== null || vtuberSong.scStatus !== null;

	if (isPremium) {
		return <PremiumCard present={present} />;
	}

	return <SongOccurrencesPanel vtuberSong={vtuberSong} present={present} />;
};

SongRowExpansionPanel.displayName = "SongRowExpansionPanel";

export default SongRowExpansionPanel;
export type { SongRowExpansionPanelProps };
