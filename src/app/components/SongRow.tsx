"use client";

import { onCopyToClipboard } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import { type FC, useMemo, useRef, useState } from "react";
import { getPlayerSingleton, usePlayerState } from "@/lib/player";
import { ChevronRight } from "lucide-react";
import { Presence } from "@/components/Pressence";
import SongRowExpansionPanel from "./SongRowExpansionPanel";
import type { VtuberSongWithReferences } from "../actions/v2/profile";
import { useAtomValue } from "jotai";
import { apiUrlAtom } from "@/lib/store";
import { PremiumStatus } from "@prisma/client";
import { dislikeSong, likeSong } from "../actions/v2/reaction";

/**
 * Props for the SongRow component
 */
interface Props {
	vtuberSong: VtuberSongWithReferences; // The song data to display
	onPlaySong?: (vtuberSong: VtuberSongWithReferences) => void; // Optional callback for playing a song
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
const SongRow: FC<Props> = ({
	vtuberSong,
	onPlaySong,
}) => {
	const apiUrl = useAtomValue(apiUrlAtom);

	const [numLikes, setNumLikes] = useState(vtuberSong.numLikes);
	const [numDislikes, setNumDislikes] = useState(vtuberSong.numDislikes);

	// Track touch start position and time for precise tap detection
	// This prevents accidental copies during scrolling gestures
	const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
		null,
	);

	// Flag to track if the user has scrolled during the touch interaction
	// This is crucial for distinguishing between taps and scrolls on mobile
	const hasScrolledRef = useRef(false);

	// Flag to track if we've already handled a touch event to prevent double execution
	// This prevents both onClick and onTouchEnd from firing for the same interaction
	const hasHandledTouchRef = useRef(false);

	/**
	 * TOUCH EVENT FIRING SEQUENCE DIFFERENCES BY PLATFORM:
	 *
	 * ANDROID (Chrome/WebView):
	 * - Event sequence: touchstart → touchmove → touchend → click (immediate)
	 * - Problem: Both touch and click events fire for the same interaction
	 * - Result: Double execution (handleTouchEnd + handleCopy both run)
	 *
	 * iOS (Safari):
	 * - Event sequence: touchstart → touchmove → touchend (immediate) → click (300ms delay)
	 * - Smart cancellation: iOS often cancels click events if touch events are handled
	 * - Result: Usually only touch events fire, no double execution
	 *
	 * DESKTOP (Chrome/Firefox/Safari):
	 * - Event sequence: mousedown → mousemove → mouseup → click (no touch events)
	 * - Result: Only click events fire, no double execution
	 *
	 * OUR FIX:
	 * - Track touch handling with hasHandledTouchRef
	 * - When handleTouchEnd executes copy, set hasHandledTouchRef.current = true
	 * - handleCopy checks this flag and returns early if touch already handled
	 * - Reset flag after 100ms to allow subsequent legitimate clicks
	 * - This specifically targets Android's immediate click firing while preserving
	 *   functionality on iOS and desktop
	 */

	// Album art fallback state
	const [imgError, setImgError] = useState(false);

	// Expansion state for song occurrences panel
	const [isExpanded, setIsExpanded] = useState(false);

	// Get player state to determine if this song is currently playing
	const { currentTrack, playing } = usePlayerState();

	// Check if song is playable (has audioUrl)
	const isPlayable = vtuberSong.audioUrl !== undefined && vtuberSong.audioUrl !== null && vtuberSong.audioUrl.trim() !== "";

	// Check if this song is currently playing
	const isCurrentlyPlaying =
		currentTrack &&
		currentTrack.title === vtuberSong.song.title &&
		currentTrack.artist === vtuberSong.song.artist &&
		playing;
	
	const isCurrentlyPaused = 
		currentTrack &&
		currentTrack.title === vtuberSong.song.title &&
		currentTrack.artist === vtuberSong.song.artist &&
		!playing;
	
	/**
	 * Copy song information to clipboard
	 * Triggered by tapping on the song row (excluding buttons)
	 * Only fires on desktop or when touch events haven't already handled the interaction
	 */
	const handleCopy = () => {
		// Prevent double execution on mobile devices where both touch and click events fire
		if (hasHandledTouchRef.current) {
			return;
		}
		onCopyToClipboard(vtuberSong.song);
	};

	/**
	 * Handle play button click
	 * Starts playing the song if it's playable
	 */
	const handlePlayClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		const player = getPlayerSingleton();
		if (!player) return;

		if (isCurrentlyPaused) {
			player.play();
			return;
		}

		if (isPlayable && onPlaySong) {
			onPlaySong(vtuberSong);
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
		// Reset flags for new touch interaction
		hasScrolledRef.current = false;
		hasHandledTouchRef.current = false;
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
			hasHandledTouchRef.current = false;
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
		if (
			deltaX < 5 &&
			deltaY < 5 &&
			deltaTime < 200 &&
			!isOnAlbumArt &&
			!isOnButton
		) {
			onCopyToClipboard(vtuberSong.song);
			// Mark that we've handled this touch interaction to prevent onClick from firing
			hasHandledTouchRef.current = true;
		}

		// Clean up touch tracking state
		touchStartRef.current = null;
		hasScrolledRef.current = false;

		// Reset the handled flag after a short delay to allow for subsequent interactions
		// This prevents the flag from blocking legitimate click events on desktop
		if (hasHandledTouchRef.current) {
			setTimeout(() => {
				hasHandledTouchRef.current = false;
			}, 100);
		}
	};

	/**
	 * Handle like button click
	 * Triggers the like action for the song
	 */
	const handleLike = (e: React.MouseEvent) => {
		e.stopPropagation();
		likeSong(vtuberSong.id);
		setNumLikes(numLikes + 1);
	};

	/**
	 * Handle dislike button click
	 * Triggers the dislike action for the song
	 */
	const handleDislike = (e: React.MouseEvent) => {
		e.stopPropagation();
		dislikeSong(vtuberSong.id);
		setNumDislikes(numDislikes + 1);
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
		if (vtuberSong.bvid) {
			window.open(`https://www.bilibili.com/video/${vtuberSong.bvid}`, "_blank", "noopener,noreferrer");
		}
	};

	const premiumIcon = useMemo(() => {
		if (vtuberSong.premiumStatus === PremiumStatus.Captain) {
			return <Icons.captain className="w-4 h-4 text-blue-500 flex-shrink-0" />;
		}
		
		if (vtuberSong.premiumStatus === PremiumStatus.Admiral) {
			return <Icons.admiral className="w-4 h-4 text-blue-500 flex-shrink-0" />;
		}

		if (vtuberSong.premiumStatus === PremiumStatus.Governor) {
			return <Icons.governor className="w-4 h-4 text-blue-500 flex-shrink-0" />;
		}

		return null;
	}, [vtuberSong.premiumStatus]);

	const scIcon = useMemo(() => {
		if (vtuberSong.scStatus === null) {
			return null;
		}

		return <Image
			src={`/icons/${vtuberSong.scStatus.name}.png`}
			alt={`${vtuberSong.scStatus.name}元SC`}
			width={24}
			height={24}
			className="w-4 h-4 text-blue-500 flex-shrink-0"
		/>

	}, [vtuberSong.scStatus]);

	const artworkIcon = useMemo(() => {
		if (imgError) {
			// If image cannot be loaded, show a music note icon and remember the state so we don't DDOS the API
			return <Icons.music_note className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />;
		}

		const albumArtUrl = `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(vtuberSong.song.title)}&artist=${encodeURIComponent(vtuberSong.song.artist)}&size=large`;

		return <Image
			src={albumArtUrl}
			alt={`${vtuberSong.song.title} album art`}
			width={48}
			height={48}
			className="object-cover w-10 h-10 sm:w-12 sm:h-12"
			onError={() => setImgError(true)}
			unoptimized={false}
		/>
	}, [imgError, apiUrl, vtuberSong.song.title, vtuberSong.song.artist]);

	return (
		<div className="overflow-hidden">
			{/* Main Song Row */}
			<div
				className="hover:scale-[1.01] hover:shadow-md active:scale-[0.99] flex items-center p-3 hover:bg-black/5 rounded-lg cursor-pointer group"
				style={{
					transition: "transform 0.2s",
					transitionDuration: "0.2s",
					transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				}}
				onClick={handleCopy}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{/* Album Avatar with Play/Pause Button Overlay */}
				<div
					className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-2 sm:mr-4 overflow-hidden relative album-art-container"
					onClick={(e) => {
						// On mobile, make the entire album art clickable for playable songs
						if (isPlayable && !isCurrentlyPlaying) {
							e.stopPropagation();
							handlePlayClick(e);
						}
					}}
				>
					{artworkIcon}

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
				<div className="flex-1 min-w-0 mr-2 sm:mr-4">
					<div className="flex items-center gap-1 sm:gap-2">
						<h3 className="text-sm sm:text-md font-semibold text-slate-800 break-words group-hover:text-blue-600 transition-colors leading-tight">
							{vtuberSong.song.title}
						</h3>
						{/* 上船限定图标 - Governor tier icon */}
						{premiumIcon}
						{/* SC限定图标*/}
						{scIcon}
						{/* Musical note icon for playable songs */}
						{isPlayable && (
							<Icons.music_note
								className="w-4 h-4 text-blue-500 flex-shrink-0"
								title="可播放"
							/>
						)}
						{/* Bilibili link button */}
						{vtuberSong.bvid && (
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
						{vtuberSong.remark && (
							<span className="text-xs sm:text-sm text-slate-500 break-words hidden sm:inline">
								{vtuberSong.remark}
							</span>
						)}
					</div>
					<p className="text-xs sm:text-sm text-slate-500 break-words mt-1 leading-tight">
						{vtuberSong.song.artist}
					</p>
				</div>

				{/* Right side Actions & Date */}
				<div className="flex flex-col items-end gap-1 text-slate-500 flex-shrink-0">
					{/* Top row: Reaction buttons */}
					<div className="flex items-end gap-1 sm:gap-2">
						{/* Like button with count */}
						<Button
							variant="ghost"
							size="sm"
							className="h-6 sm:h-8 px-1 sm:px-2 hover:scale-[1.2] hover:text-green-600 hover:bg-transparent active:scale-[0.8] transition-colors flex items-center"
							style={{
								transition: "transform 0.2s",
								transitionDuration: "0.2s",
								transitionTimingFunction:
									"cubic-bezier(0.25, 0.46, 0.45, 0.94)",
							}}
							onClick={handleLike}
							title="喜欢"
						>
							<span className="text-xs sm:text-sm">❤️</span>
							<span className="ml-0.5 sm:ml-1 text-xs text-slate-500 w-4 sm:w-6 text-left">
								{numLikes}
							</span>
						</Button>
						{/* Dislike button with count */}
						<Button
							variant="ghost"
							size="sm"
							className="h-6 sm:h-8 px-1 sm:px-2 hover:scale-[1.2] hover:text-red-600 hover:bg-transparent active:scale-[0.8] transition-colors flex items-center"
							style={{
								transition: "transform 0.2s",
								transitionDuration: "0.2s",
								transitionTimingFunction:
									"cubic-bezier(0.25, 0.46, 0.45, 0.94)",
							}}
							onClick={handleDislike}
							title="不喜欢"
						>
							<span className="text-xs sm:text-sm">😅</span>
							<span className="ml-0.5 sm:ml-1 text-xs text-slate-500 w-4 sm:w-6 text-left">
								{numDislikes}
							</span>
						</Button>
					</div>

					{/* Bottom row: Timestamp and expand button */}
					<div className="flex items-center gap-1 sm:gap-2">
						<p className="text-xs font-mono whitespace-nowrap text-slate-400">
							{formatDate(vtuberSong.createdOn)}
						</p>
						<div className="flex items-center gap-1">
							<Button
								variant="ghost"
								size="sm"
								onClick={handleExpand}
								className="h-6 sm:h-8 px-1 sm:px-2 hover:bg-gray-100 transition-colors flex items-center gap-1"
								title={isExpanded ? "收起播放记录" : "展开播放记录"}
							>
								<ChevronRight
									className="h-4 w-4 sm:h-5 sm:w-5"
									style={{
										transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
										transition: "transform 0.2s",
										transitionDuration: "0.2s",
										transitionTimingFunction:
											"cubic-bezier(0.25, 0.46, 0.45, 0.94)",
									}}
								/>
								<span className="text-xs text-slate-400 hidden sm:inline">
									录播记录
								</span>
							</Button>
						</div>
					</div>
				</div>
			</div>

			<Presence present={isExpanded}>
				<SongRowExpansionPanel vtuberSong={vtuberSong} present={isExpanded} />
			</Presence>
		</div>
	);
}

SongRow.displayName = "SongRow";

export default SongRow;