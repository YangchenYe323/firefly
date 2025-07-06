"use client";

import { onCopyToClipboard } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import type { Song } from "@/generated/client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import getPlayerSingleton, { usePlayerState } from "@/lib/player";
import { SongOccurrencesPanel } from "./SongOccurrencesPanel";
import { ChevronRight } from "lucide-react";
import { PremiumCard } from "./PremiumCard";

/**
 * Props for the SongRow component
 */
interface Props {
	song: Song; // The song data to display
	onLikeSong: (id: number) => void; // Callback for liking a song
	onDislikeSong: (id: number) => void; // Callback for disliking a song
	apiUrl?: string; // Optional API URL for album art
	onPlaySong?: (song: Song) => void; // Optional callback for playing a song
}

/**
 * Formats a date to YYYY-MM-DD format for display
 * @param date - Date object to format
 * @returns Formatted date string
 */
function formatDate(date: Date): string {
	if (!date) return "";
	return new Date(date).toISOString().split("T")[0];
}

/**
 * SongRow Component
 * 
 * Displays a single song in the main song list with interactive features including:
 * - Album art with play/pause overlay
 * - Song title, artist, and metadata
 * - Like/dislike buttons with counts
 * - Expansion panel for song occurrences (when song was played in recordings)
 * - Touch-friendly mobile interactions
 * 
 * Features:
 * - Responsive design with mobile-optimized touch handling
 * - Smooth animations and transitions
 * - Accessibility features
 * - Copy to clipboard on tap (excluding buttons)
 * 
 * Usage:
 * <SongRow
 *   song={songObject}
 *   onLikeSong={(id) => {}}
 *   onDislikeSong={(id) => {}}
 *   apiUrl="https://api.example.com"
 *   onPlaySong={(song) => {}}
 * />
 */
export default function SongRow({
	song,
	onLikeSong,
	onDislikeSong,
	apiUrl,
	onPlaySong,
}: Props) {
	// Track touch start position and time for precise tap detection
	// This prevents accidental copies during scrolling gestures
	const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
		null,
	);

	// Flag to track if the user has scrolled during the touch interaction
	// This is crucial for distinguishing between taps and scrolls on mobile
	const hasScrolledRef = useRef(false);

	// Album art fallback state
	const [imgError, setImgError] = useState(false);

	// Expansion state for song occurrences panel
	const [isExpanded, setIsExpanded] = useState(false);

	// Get player state to determine if this song is currently playing
	const { currentTrack, playing } = usePlayerState();

	// Check if song is playable (has bucket_url)
	const bucketUrl = song.extra?.bucket_url;
	const isPlayable =
		bucketUrl !== undefined && bucketUrl !== null && bucketUrl.trim() !== "";

	// Check if this song is currently playing
	const isCurrentlyPlaying =
		currentTrack &&
		currentTrack.title === song.title &&
		currentTrack.artist === song.artist &&
		playing;

	// Construct album art URL
	const albumArtUrl = apiUrl
		? `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}&size=large`
		: null;

	/**
	 * Copy song information to clipboard
	 * Triggered by tapping on the song row (excluding buttons)
	 */
	const handleCopy = () => {
		onCopyToClipboard(song);
	};

	/**
	 * Handle play button click
	 * Starts playing the song if it's playable
	 */
	const handlePlayClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isPlayable && onPlaySong) {
			onPlaySong(song);
		}
	};

	/**
	 * Handle pause button click
	 * Pauses the currently playing song
	 */
	const handlePauseClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isCurrentlyPlaying) {
			const player = getPlayerSingleton();
			player.pause();
		}
	};

	/**
	 * Records the initial touch position and time when user starts touching the element
	 * This is the first step in our tap detection algorithm for mobile devices
	 */
	const handleTouchStart = (e: React.TouchEvent) => {
		const touch = e.touches[0];
		touchStartRef.current = {
			x: touch.clientX,
			y: touch.clientY,
			time: Date.now(),
		};
		// Reset scroll flag for new touch interaction
		hasScrolledRef.current = false;
	};

	/**
	 * Monitors touch movement to detect scrolling gestures
	 * This prevents accidental copies when user is scrolling through the song list
	 * We use a 5px threshold as it's small enough to allow for slight finger movement
	 * but large enough to distinguish intentional scrolls from taps
	 */
	const handleTouchMove = (e: React.TouchEvent) => {
		if (!touchStartRef.current) return;

		const touch = e.touches[0];
		const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
		const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

		// If moved more than 5px in any direction, consider it a scroll gesture
		// This threshold is carefully chosen to balance tap detection vs scroll prevention
		if (deltaX > 5 || deltaY > 5) {
			hasScrolledRef.current = true;
		}
	};

	/**
	 * Determines if the touch interaction was a tap or scroll
	 * Only triggers copy action for genuine taps, not scrolls
	 *
	 * Tap detection criteria:
	 * - No scrolling detected during the touch
	 * - Movement less than 5px (allows for slight finger movement)
	 * - Duration less than 200ms (fast tap, not a long press)
	 * - Not on album art area (where play button is)
	 * - Not on any button (reaction buttons, expansion button, etc.)
	 *
	 * These thresholds are optimized for iOS Safari's touch behavior
	 */
	const handleTouchEnd = (e: React.TouchEvent) => {
		// If no touch start recorded or user scrolled, ignore this interaction
		if (!touchStartRef.current || hasScrolledRef.current) {
			touchStartRef.current = null;
			hasScrolledRef.current = false;
			return;
		}

		const touch = e.changedTouches[0];
		const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
		const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
		const deltaTime = Date.now() - touchStartRef.current.time;

		// Check if the touch was on the album art area (where play button is)
		const target = e.target as HTMLElement;
		const isOnAlbumArt = target.closest(".album-art-container") !== null;

		// Check if the touch was on any button (reaction buttons, expansion button, etc.)
		const isOnButton = target.closest("button") !== null;

		// Only trigger copy if it's a genuine tap AND not on the album art area AND not on any button
		// This prevents copy action when user taps the album art to play or any button
		if (deltaX < 5 && deltaY < 5 && deltaTime < 200 && !isOnAlbumArt && !isOnButton) {
			onCopyToClipboard(song);
		}

		// Clean up touch tracking state
		touchStartRef.current = null;
		hasScrolledRef.current = false;
	};

	/**
	 * Handle like button click
	 * Triggers the like action for the song
	 */
	const handleLike = (e: React.MouseEvent) => {
		e.stopPropagation();
		onLikeSong(song.id);
	};

	/**
	 * Handle dislike button click
	 * Triggers the dislike action for the song
	 */
	const handleDislike = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDislikeSong(song.id);
	};

	/**
	 * Handle expansion button click
	 * Toggles the song occurrences panel
	 */
	const handleExpand = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsExpanded(!isExpanded);
	};

	/**
	 * Handle Bilibili link click
	 * Opens the song's Bilibili video in a new tab
	 */
	const handleBilibiliClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (song.url) {
			window.open(song.url, "_blank", "noopener,noreferrer");
		}
	};

	// Check if the song is premium
	const isPremium = song.remark.indexOf("SC") !== -1 || song.remark.indexOf("当日限定") !== -1;

	return (
		<>
			{/* Main Song Row */}
			<motion.div
				className="flex items-center p-3 hover:bg-black/5 rounded-lg transition-colors cursor-pointer group"
				onClick={handleCopy}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				whileHover={{ scale: 1.005 }}
				whileTap={{ scale: 0.99 }}
			>
				{/* Album Avatar with Play/Pause Button Overlay */}
				<div
					className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4 overflow-hidden relative album-art-container"
					onClick={(e) => {
						// On mobile, make the entire album art clickable for playable songs
						if (isPlayable && !isCurrentlyPlaying) {
							e.stopPropagation();
							handlePlayClick(e);
						}
					}}
				>
					{!imgError && albumArtUrl ? (
						<Image
							src={albumArtUrl}
							alt={`${song.title} album art`}
							width={48}
							height={48}
							className="object-cover w-12 h-12"
							onError={() => setImgError(true)}
							unoptimized={false}
						/>
					) : (
						<Icons.music_note className="w-6 h-6 text-gray-500" />
					)}

					{/* Play/Pause Button Overlay - Only show for playable songs */}
					{isPlayable && (
						<>
							{/* Desktop: Hover overlay */}
							<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hidden md:flex">
								<button
									type="button"
									onClick={
										isCurrentlyPlaying ? handlePauseClick : handlePlayClick
									}
									className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
									title={isCurrentlyPlaying ? "暂停歌曲" : "播放歌曲"}
								>
									{isCurrentlyPlaying ? (
										<Icons.player_pause_button className="w-4 h-4 fill-black" />
									) : (
										<Icons.player_play_button className="w-4 h-4 fill-black ml-0.5" />
									)}
								</button>
							</div>

							{/* Mobile: Only show when currently playing */}
							{isCurrentlyPlaying && (
								<div className="absolute inset-0 bg-black/30 flex items-center justify-center md:hidden">
									<button
										type="button"
										onClick={handlePauseClick}
										className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition-colors"
										title="暂停歌曲"
									>
										<Icons.player_pause_button className="w-4 h-4 fill-black" />
									</button>
								</div>
							)}
						</>
					)}
				</div>

				{/* Song Info Section */}
				<div className="flex-1 min-w-0 mr-4">
					<div className="flex items-center gap-2">
						<h3 className="text-md font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
							{song.title}
						</h3>
						{/* 上船限定图标 - Governor tier icon */}
						{song.remark.indexOf("上总") !== -1 && (
							<Icons.governor
								className="w-4 h-4 text-blue-500 flex-shrink-0"
								title="上总"
							/>
						)}
						{/* 上提限定图标 - Admiral tier icon */}
						{song.remark.indexOf("上提") !== -1 && (
							<Icons.admiral
								className="w-4 h-4 text-blue-500 flex-shrink-0"
								title="上提"
							/>
						)}
						{/* 上舰限定图标 - Captain tier icon */}
						{song.remark.indexOf("上舰") !== -1 && (
							<Icons.captain
								className="w-4 h-4 text-blue-500 flex-shrink-0"
								title="上舰"
							/>
						)}
						{/* 付费限定图标 - Paid content icons */}
						{song.remark.indexOf("30元SC") !== -1 && (
							<Image
								src="/icons/30.png"
								alt="30元SC"
								width={24}
								height={24}
								className="w-4 h-4 text-blue-500 flex-shrink-0"
							/>
						)}
						{song.remark.indexOf("100元SC") !== -1 && (
							<Image
								src="/icons/100.png"
								alt="100元SC"
								width={24}
								height={24}
								className="w-4 h-4 text-blue-500 flex-shrink-0"
							/>
						)}
						{song.remark.indexOf("200元SC") !== -1 && (
							<Image
								src="/icons/200.png"
								alt="200元SC"
								width={24}
								height={24}
								className="w-4 h-4 text-blue-500 flex-shrink-0"
							/>
						)}
						{song.remark.indexOf("1000元SC") !== -1 && (
							<Image
								src="/icons/1000.png"
								alt="1000元SC"
								width={24}
								height={24}
								className="w-4 h-4 text-blue-500 flex-shrink-0"
							/>
						)}
						{song.remark.indexOf("10000元SC") !== -1 && (
							<Image
								src="/icons/10000.png"
								alt="10000元SC"
								width={24}
								height={24}
								className="w-4 h-4 text-blue-500 flex-shrink-0"
							/>
						)}
						{/* Musical note icon for playable songs */}
						{isPlayable && (
							<Icons.music_note
								className="w-4 h-4 text-blue-500 flex-shrink-0"
								title="可播放"
							/>
						)}
						{/* Bilibili link button */}
						{song.url && (
							<button
								type="button"
								onClick={handleBilibiliClick}
								className="flex-shrink-0 p-1 hover:bg-blue-100 rounded transition-colors"
								title="查看B站视频"
							>
								<Icons.bilibili className="w-4 h-4 text-blue-500" />
							</button>
						)}
						{/* Song remark/notes */}
						{song.remark && (
							<span className="text-sm text-slate-500 truncate hidden sm:inline">
								{song.remark}
							</span>
						)}
					</div>
					<p className="text-sm text-slate-500 truncate mt-1">{song.artist}</p>
				</div>

				{/* Right side Actions & Date */}
				<div className="flex flex-col items-end gap-1 text-slate-500">
					{/* Top row: Reaction buttons */}
					<div className="flex items-end gap-2">
						{/* Like button with count */}
						<Button
							variant="ghost"
							size="sm"
							className="h-8 px-2 hover:bg-green-100 hover:text-green-600 transition-colors flex items-center"
							onClick={handleLike}
							title="喜欢"
						>
							<span className="text-sm">❤️</span>
							<span className="ml-1 text-xs text-slate-500 w-6 text-left">
								{song.extra?.numLikes || 0}
							</span>
						</Button>

						{/* Dislike button with count */}
						<Button
							variant="ghost"
							size="sm"
							className="h-8 px-2 hover:bg-red-100 hover:text-red-600 transition-colors flex items-center"
							onClick={handleDislike}
							title="不喜欢"
						>
							<span className="text-sm">😅</span>
							<span className="ml-1 text-xs text-slate-500 w-6 text-left">
								{song.extra?.numDislikes || 0}
							</span>
						</Button>
					</div>

					{/* Bottom row: Timestamp and expand button */}
					<div className="flex items-center gap-2">
						<p className="text-xs font-mono whitespace-nowrap text-slate-400">
							{formatDate(song.created_on)}
						</p>
						<div className="flex items-center gap-1">
							<Button
								variant="ghost"
								size="sm"
								onClick={handleExpand}
								className="h-8 px-2 hover:bg-gray-100 transition-colors flex items-center gap-1"
								title={isExpanded ? "收起播放记录" : "展开播放记录"}
							>
								<motion.div
									animate={{ rotate: isExpanded ? 90 : 0 }}
									transition={{ duration: 0.2 }}
								>
									<ChevronRight className="h-5 w-5" />
								</motion.div>
								<span className="text-xs text-slate-400">
									录播记录
								</span>
							</Button>
						</div>
					</div>
				</div>
			</motion.div>

			{isExpanded && isPremium && (
				<PremiumCard />
			)}

			{/* Song Occurrences Panel */}
			{isExpanded && !isPremium && (
				<div className="w-full">
					<SongOccurrencesPanel
						song={song}
					/>
				</div>
			)}
		</>
	);
}
