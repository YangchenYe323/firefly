"use client";

import type { Song, VtuberSong } from "@prisma/client";
import { dislikeSong, likeSong } from "../actions/v2/reaction";
import { onCopyToClipboard } from "@/lib/utils";
import { type FC, useEffect, useState } from "react";

import { Button } from "../../components/ui/button";
import ChineseInput from "../../components/ChineseInput";
import { Icons } from "../../components/Icons";
import ScrollableTags from "./ScrollableTags";
import SongRow from "./SongRow";

import { toast } from "react-toastify";
import { getPlayerSingleton } from "@/lib/player";
import { allFiltersAtom, allVtuberSongsAtom, apiUrlAtom, filteredVtuberSongsAtom, searchTextAtom, selectedFilterAtom, SongFilter, tracksAtom } from "@/lib/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import type { VtuberSongWithReferences } from "../actions/v2/profile";

interface PropType {
	onShowPlayer: () => void;
}

/**
 * Main song panel component that manages the song list, filtering, and search
 *
 * Design decisions:
 * 1. Separates original data from filtered data to maintain data integrity
 * 2. Uses useEffect for reactive filtering when search or filter changes
 * 3. Optimistic UI updates for like/dislike actions
 * 4. Responsive design with backdrop blur and modern styling
 * 5. Graceful empty state handling with visual feedback
 */

const SongPanel: FC<PropType> = ({ onShowPlayer }) => {
	// Store the original song data ordered by new video first
	// This preserves the original data while allowing for optimistic updates
	const [allVtuberSongs, setAllVtuberSongs] = useAtom(allVtuberSongsAtom);
	const allFilters = useAtomValue(allFiltersAtom);
	const [selectedFilter, setSelectedFilter] = useAtom(selectedFilterAtom);
	const [searchText, setSearchText] = useAtom(searchTextAtom);

	const filteredVtuberSongs = useAtomValue(filteredVtuberSongsAtom);
	const tracks = useAtomValue(tracksAtom);
	const apiUrl = useAtomValue(apiUrlAtom);

	/**
	 * Handler for play song actions
	 * Sets up the player with the selected song and shows the player
	 */
	const onPlaySong = (vtuberSong: VtuberSongWithReferences) => {
		if (!vtuberSong.audioUrl) {
			toast.error("这首歌没有可播放的音频文件");
			return;
		}

		const player = getPlayerSingleton();

		player.setQueue(tracks, apiUrl);

		// Find the index of the selected song in the playable tracks
		const selectedTrackIndex = player.getState().playableTracks.findIndex(
			(track) => track.title === vtuberSong.song.title && track.artist === vtuberSong.song.artist,
		);

		if (selectedTrackIndex === -1) {
			toast.error("无法找到选中的歌曲");
			return;
		}

		player.playTrack(selectedTrackIndex);

		// Show the player at the bottom
		onShowPlayer();
	};

	/**
	 * Random song selection feature
	 * Selects a random song from the currently filtered results
	 * Uses the improved clipboard function for copying
	 */
	const onCopyRandom = () => {
		const randomIdx = Math.floor(Math.random() * filteredVtuberSongs.length);
		onCopyToClipboard(filteredVtuberSongs[randomIdx].song);
	};

	return (
		<div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
				{/* Header with Search and Random Button */}
				<div className="p-4 border-b border-gray-100/80">
					<div className="flex items-center gap-3 mb-4">
						<div className="flex-1">
							<ChineseInput
								placeholder="搜索歌曲..."
								className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 transition-colors"
								onValueChange={setSearchText}
							/>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
							onClick={onCopyRandom}
							title="随机选择一首歌"
						>
							<Icons.player_random_button className="w-5 h-5" />
						</Button>
					</div>

					{/* Scrollable Tags */}
					<ScrollableTags filters={allFilters} onFilterChange={setSelectedFilter} selectedFilter={selectedFilter} />
				</div>

				{/* Songs List */}
				<div>
					{filteredVtuberSongs.length === 0 ? (
						<div className="p-8 text-center text-gray-500">
							<Icons.search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
							<p>没有找到匹配的歌曲</p>
						</div>
					) : (
						<div className="divide-y divide-gray-100/80">
							{filteredVtuberSongs.map((song) => (
								<SongRow
									key={song.id}
									vtuberSong={song}
									onPlaySong={onPlaySong}
								/>
							))}
						</div>
					)}
				</div>
			</div>
	);
}

SongPanel.displayName = "SongPanel";

export default SongPanel;