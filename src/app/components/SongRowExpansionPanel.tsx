import type { Song } from "@prisma/client";
import { SongOccurrencesPanel } from "./SongOccurrencesPanel";
import { PremiumCard } from "./PremiumCard";
import type { FC } from "react";

interface SongRowExpansionPanelProps {
	song: Song;
	present: boolean;
}

const SongRowExpansionPanel: FC<SongRowExpansionPanelProps> = ({
	song,
	present,
}) => {
	const isPremium =
		song.remark.indexOf("SC") !== -1 || song.remark.indexOf("当日限定") !== -1;

	if (isPremium) {
		return <PremiumCard present={present} />;
	}

	return <SongOccurrencesPanel song={song} present={present} />;
};

SongRowExpansionPanel.displayName = "SongRowExpansionPanel";

export default SongRowExpansionPanel;
export type { SongRowExpansionPanelProps };
