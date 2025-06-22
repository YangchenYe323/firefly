"use client";

import type { Footer, Song } from "@/generated/client";
import { dislikeSong, likeSong } from "../actions/reaction";
import {
	onCopyToClipboard,
	orderSongsWithNewVideoFirst,
} from "@/lib/utils";
import { useEffect, useState } from "react";

import { Button } from "../../components/ui/button";
import ChineseInput from "../../components/ChineseInput";
import { Icons } from "../../components/Icons";
import ScrollableTags from "./ScrollableTags";
import SongRow from "./SongRow";

import { toast } from "react-toastify";

interface PropType {
	allSongs: Song[];
	footer: Footer;
	apiUrl?: string;
}

/**
 * Type definitions for the filtering system
 * 
 * SongFilter: A function that takes a song and returns true if it should be included
 * SongFilterBuilder: A factory function that creates filters based on parameters
 * Filter: A complete filter with display name and predicate function
 */
export type SongFilter = (song: Song) => boolean;
export type SongFilterBuilder<T> = (arg: T) => SongFilter;

export interface Filter {
	value: string;
	predicate: SongFilter;
}

/**
 * Filter for songs that are not in Mandarin Chinese
 * Checks if the song has multiple languages or the first language is not "国语"
 */
const filterForeignLang: SongFilter = (song) => {
	return song.lang.length > 1 || song.lang[0] !== "国语";
};

/**
 * Factory function that creates a filter for songs with a specific tag
 * Returns a function that checks if the given tag exists in the song's tag array
 */
const filterOnTag: SongFilterBuilder<string> = (tag) => (song) => {
	return song.tag.indexOf(tag) !== -1;
};

/**
 * Filter for songs that are captain-exclusive (limited to captain tier supporters)
 * Checks if the remark contains "上船当日限定"
 */
const filterOnCaptain: SongFilter = (song) => song.remark.indexOf("上船当日限定") !== -1;

/**
 * Filter for original songs (not covers)
 * Checks if the remark contains "原创"
 */
const filterOnOriginal: SongFilter = (song) =>
	song.remark.indexOf("原创") !== -1;

/**
 * Filter for paid songs (super chat requests)
 * Checks if the remark contains "SC点歌"
 */
const filterOnPaid: SongFilter = (song) => song.remark.indexOf("SC点歌") !== -1;

/**
 * Filter for songs that have a video URL available
 * Checks if the song has a non-null URL field
 */
const filterOnUrlAvailable: SongFilter = (song) => song.url !== null;

/**
 * Default filter that includes all songs
 * Used as the initial state and fallback option
 */
const filterAll = {
	value: "全部",
	predicate: () => true,
};

/**
 * Array of all available filters
 * Each filter has a display name and a predicate function
 * The order determines the display order in the UI
 */
const filters: Filter[] = [
	filterAll,
	{
		value: "流行",
		predicate: filterOnTag("流行"),
	},
	{
		value: "古风",
		predicate: filterOnTag("古风"),
	},
	{
		value: "民谣",
		predicate: filterOnTag("民谣"),
	},
	{
		value: "其他语种",
		predicate: filterForeignLang,
	},
	{
		value: "上船当日限定",
		predicate: filterOnCaptain,
	},
	{
		value: "原创",
		predicate: filterOnOriginal,
	},
	{
		value: "付费",
		predicate: filterOnPaid,
	},
	{
		value: "歌切链接",
		predicate: filterOnUrlAvailable,
	},
];

/**
 * Search function that checks if a song's title or artist contains the search text
 * Case-sensitive search using indexOf for performance
 * Returns true for empty search text (no filtering)
 */
const containSearchTextInTitleOrArtist = (song: Song, text: string) => {
	if (text.length === 0) {
		return true;
	}

	return song.title.indexOf(text) !== -1 || song.artist.indexOf(text) !== -1;
};

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
export default function SongPanel({ allSongs, footer, apiUrl }: PropType) {
	// Store the original song data ordered by new video first
	// This preserves the original data while allowing for optimistic updates
	const [originalData, setOriginalData] = useState(
		orderSongsWithNewVideoFirst(allSongs),
	);
	
	// Current active filter - starts with "all songs" filter
	const [currentFilter, setCurrentFilter] = useState<Filter>(filterAll);
	
	// Search text input by user
	const [searchText, setSearchText] = useState<string>("");
	
	// Final filtered and searched data that gets rendered
	const [finalData, setFinalData] = useState<Song[]>([]);

	/**
	 * Reactive filtering effect that runs when filter, search, or data changes
	 * Combines both filter and search predicates for efficient filtering
	 * Updates the final data that gets rendered in the UI
	 */
	useEffect(() => {
		const combinedFilter = (song: Song) => {
			return (
				currentFilter.predicate(song) &&
				containSearchTextInTitleOrArtist(song, searchText)
			);
		};

		const filteredData = originalData.filter(combinedFilter);
		setFinalData(filteredData);
	}, [currentFilter, searchText, originalData]);

	/**
	 * Handler for filter changes from the ScrollableTags component
	 * Creates a new filter object to trigger re-renders
	 */
	const onFilterChange = (selectedFilter: Filter) => {
		setCurrentFilter({ ...selectedFilter });
	};

	/**
	 * Handler for search text changes from the ChineseInput component
	 * Updates the search state which triggers the filtering effect
	 */
	const onSearchTextChange = (text: string) => {
		setSearchText(text);
	};

	/**
	 * Handler for like song actions
	 * Makes API call and optimistically updates the UI
	 * Shows error toast if the API call fails
	 */
	const onLikeSong = (id: number) => {
		likeSong(id).catch((err) => {
			toast.error(`点️❤️失败: ${err}`);
		});
		// Optimistic update: immediately increment the like count in the UI
		setOriginalData((data) =>
			data.map((song) => {
				if (song.id === id) {
					return {
						...song,
						extra: {
							...song.extra,
							numLikes: (song.extra.numLikes || 0) + 1,
						},
					};
				}
				return song;
			}),
		);
	};

	/**
	 * Handler for dislike song actions
	 * Similar to onLikeSong but for dislike functionality
	 * Makes API call and optimistically updates the UI
	 */
	const onDislikeSong = (id: number) => {
		dislikeSong(id).catch((err) => {
			toast.error(`点️❤️失败: ${err}`);
		});
		// Optimistic update: immediately increment the dislike count in the UI
		setOriginalData((data) =>
			data.map((song) => {
				if (song.id === id) {
					return {
						...song,
						extra: {
							...song.extra,
							numDislikes: (song.extra.numDislikes || 0) + 1,
						},
					};
				}
				return song;
			}),
		);
	};

	/**
	 * Random song selection feature
	 * Selects a random song from the currently filtered results
	 * Uses the improved clipboard function for copying
	 */
	const onCopyRandom = () => {
		const randomIdx = Math.floor(Math.random() * finalData.length);
		onCopyToClipboard(finalData[randomIdx]);
	};

	return (
		<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Main Panel Container */}
			<div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
				{/* Header with Search and Random Button */}
				<div className="p-4 border-b border-gray-100/80">
					<div className="flex items-center gap-3 mb-4">
						<div className="flex-1">
							<ChineseInput
								placeholder="搜索歌曲..."
								className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 transition-colors"
								onValueChange={onSearchTextChange}
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
					<ScrollableTags
						filters={filters}
						onFilterChange={onFilterChange}
						selectedFilter={currentFilter}
					/>
				</div>

				{/* Songs List */}
				<div>
					{finalData.length === 0 ? (
						<div className="p-8 text-center text-gray-500">
							<Icons.search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
							<p>没有找到匹配的歌曲</p>
						</div>
					) : (
						<div className="divide-y divide-gray-100/80">
							{finalData.map((song) => (
								<SongRow
									key={song.id}
									song={song}
									onLikeSong={onLikeSong}
									onDislikeSong={onDislikeSong}
									apiUrl={apiUrl}
								/>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="p-4 border-t border-gray-100/80 bg-gray-50/20">
					<div className="text-center">
						<span className="font-alex font-thin text-lg text-gray-600">
							{footer.content}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
