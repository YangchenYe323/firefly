"use client";

import { useState, useEffect, useRef, type FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Loader2, ExternalLink, ImageOff } from "lucide-react";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { VtuberSongWithReferences } from "../actions/v2/profile";
import { listVtuberSongOccurrences, type SongOccurrenceInLiveWithReferences } from "../actions/v2/song";

/**
 * Props for the SongOccurrencesPanel component
 */
interface SongOccurrencesPanelProps {
	vtuberSong: VtuberSongWithReferences; // The song to display occurrences for
	present: boolean;
}

interface SongOccurrenceCardProps {
	occurrence: SongOccurrenceInLiveWithReferences;
}

/**
 * Formats seconds into MM:SS format for display
 * @param seconds - Number of seconds to format
 * @returns Formatted time string (e.g., "3:45")
 */
function formatTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	}

	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/**
 * Individual occurrence card component
 * Displays a single song occurrence with cover image, title, progress bar, and link to Bilibili
 * Used within the SongOccurrencesPanel to show each occurrence
 */
const SongOccurrenceCard: FC<SongOccurrenceCardProps> = ({ occurrence }) => {
	const [imageError, setImageError] = useState(false);

	/**
	 * Handles image loading errors by showing a fallback icon
	 */
	const handleImageError = () => {
		setImageError(true);
	};

	// Construct Bilibili URL with page and start time parameters
	const bilibiliUrl = `https://www.bilibili.com/video/${occurrence.liveRecordingArchive.bvid}?p=${occurrence.page}&t=${occurrence.start}`;

	// Calculate progress percentage for the progress bar
	const progressPercentage = (occurrence.start / occurrence.liveRecordingArchive.duration) * 100;

	return (
		<Card
			className="group hover:scale-[1.01] hover:shadow-md active:scale-[0.99] border-gray-200/50 bg-white/60 backdrop-blur-sm"
			style={{
				transition: "transform 0.2s",
				transitionDuration: "0.2s",
				transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
			}}
		>
			<CardContent className="p-4">
				<div className="flex gap-4">
					{/* Cover Image*/}
					<div className="relative flex-shrink-0">
						{!imageError ? (
							<Image
								src={occurrence.liveRecordingArchive.cover}
								alt={occurrence.liveRecordingArchive.title}
								width={80}
								height={80}
								className="w-20 h-20 object-cover rounded-lg shadow-sm"
								loading="lazy"
								onError={handleImageError}
								referrerPolicy="no-referrer" // Prevents 403 errors from CDN referrer policies
							/>
						) : (
							<div className="w-20 h-20 bg-muted rounded-lg shadow-sm flex items-center justify-center">
								<ImageOff className="w-8 h-8 text-muted-foreground" />
							</div>
						)}
					</div>

					{/* Content Area with Title, Page, and Progress Bar */}
					<div className="flex-1 min-w-0 relative">
						{/* Title and Page Number */}
						<div className="flex items-start justify-between gap-2 mb-2">
							<h3 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
								{occurrence.liveRecordingArchive.title}
							</h3>
							{/* Show page number if it's not page 1 */}
							{occurrence.page > 1 && (
								<span className="text-xs bg-muted px-2 py-1 rounded flex-shrink-0">
									P{occurrence.page}
								</span>
							)}
						</div>

						{/* Progress Bar and Time Information */}
						<div className="space-y-1">
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>开始时间: {formatTime(occurrence.start)}</span>
								<span>总时长: {formatTime(occurrence.liveRecordingArchive.duration)}</span>
							</div>
							<div className="relative">
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-blue-500 h-2 rounded-full transition-all duration-300"
										style={{ width: `${progressPercentage}%` }}
									/>
								</div>
								<div className="absolute inset-0 flex items-center justify-center">
									<ExternalLink className="w-3 h-3 text-muted-foreground/50" />
								</div>
							</div>
						</div>

						{/* Invisible link overlay for better accessibility and click handling */}
						<a
							href={bilibiliUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="absolute inset-0 z-10 cursor-pointer"
							aria-label={`观看 ${occurrence.liveRecordingArchive.title} 在 ${formatTime(occurrence.start)} 的播放`}
						>
							<span className="sr-only">
								观看 {occurrence.liveRecordingArchive.title} 在 {formatTime(occurrence.start)} 的播放
							</span>
						</a>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

/**
 * SongOccurrencesPanel Component
 *
 * Displays a list of song occurrences (when the song was played in vtuber recordings)
 * with infinite scroll pagination. This component is used in the main page song rows
 * to show users when and where a song was performed in past live streams.
 *
 * Features:
 * - Infinite scroll pagination using intersection observer
 * - Loading states for initial load and pagination
 * - Error handling with retry functionality
 * - Smooth animations for expand/collapse
 * - Responsive design with modern UI
 *
 * Usage:
 * <SongOccurrencesPanel
 *   song={songObject}
 *   present={boolean}
 * />
 */
const SongOccurrencesPanel: FC<SongOccurrencesPanelProps> = ({
	vtuberSong,
	present,
}) => {
	const [mounted, setMounted] = useState(false);
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		error,
	} = useInfiniteQuery({
		queryKey: ["song-occurrences", `${vtuberSong.id}`],
		queryFn: async ({ pageParam }: { pageParam: string | undefined }) =>
			await listVtuberSongOccurrences(
				vtuberSong.id,
				pageParam,
				20,
				"2024-06-01T00:00:00.000Z",
			),
		initialPageParam: undefined,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.nextToken;
		},
		staleTime: 60 * 60 * 1000, // 1 hour
	});

	const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		setMounted(true);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: when data changes, the content height should be recalculated
	useEffect(() => {
		// Re-calculate content height when data changes
		if (contentRef) {
			setContentHeight(contentRef.scrollHeight);
		}
	}, [contentRef, data]);

	const occurrences = data?.pages.flatMap((page) => page.occurrences) || [];

	// Ref for infinite scroll
	const loadMoreRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!hasNextPage || isFetchingNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 },
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => observer.disconnect();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	const transform =
		present && mounted
			? "scaleY(1) translateY(0)"
			: "scaleY(0.5) translateY(-50%)";
	const opacity = present && mounted ? "1" : "0";
	const maxHeight = present && mounted ? `${contentHeight}px` : "0px";
	// Logarithmic duration for smoother animation
	const duration = Math.max(200, 100 + Math.log(contentHeight) * 50);

	return (
		<div
			className="border-t border-gray-100/80 bg-gray-50/30 overflow-hidden"
			style={{
				transition: "max-height, opacity",
				transitionTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
				transitionDuration: `${duration}ms`,
				transformOrigin: "top",
				maxHeight: maxHeight,
				opacity: opacity,
			}}
		>
			<div
				className="p-4"
				style={{
					transform: transform,
					opacity: opacity,
					transition: "transform, opacity",
					transitionTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
					transitionDuration: `${duration}ms`,
					transformOrigin: "top",
				}}
				ref={setContentRef}
			>
				{/* Panel Header */}
				<div className="flex items-center gap-2 mb-4">
					<Music className="w-4 h-4 text-blue-500" />
					<h3 className="font-medium text-sm text-gray-700">
						播放记录 ({occurrences.length}) (请注意手机端跳转app会丢失时间戳😅)
					</h3>
				</div>

				{/* Expandable Content with Animations */}
				<div
					// initial={{ height: 0, opacity: 0 }}
					// animate={{ height: "auto", opacity: 1 }}
					// exit={{ height: 0, opacity: 0 }}
					// transition={{ duration: 0.3, ease: "easeInOut" }}
					className="overflow-hidden"
				>
					{/* Initial Loading State */}
					{isFetching && (
						<div className="flex items-center justify-center py-8">
							<div className="flex items-center gap-2 text-gray-500">
								<Loader2 className="w-4 h-4 animate-spin" />
								<span>加载中...</span>
							</div>
						</div>
					)}

					{/* Error State with Message */}
					{error && (
						<div className="text-sm text-red-500 bg-red-50 p-3 rounded">
							{error.message}
						</div>
					)}

					{/* Empty State - No Occurrences Found */}
					{!isFetching && !error && occurrences.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							<Music className="w-12 h-12 mx-auto mb-4 text-gray-300" />
							<p>暂无播放记录</p>
						</div>
					)}

					{/* Occurrences List */}
					{occurrences.length > 0 && (
						<div className="space-y-3">
							{occurrences.map((occurrence, index) => (
								<SongOccurrenceCard
									key={`${occurrence?.liveRecordingArchive.bvid}-${occurrence?.page}-${occurrence?.start}`}
									occurrence={occurrence!}
								/>
							))}
						</div>
					)}

					{/* Infinite Scroll Loading Trigger */}
					{hasNextPage && !isFetchingNextPage && (
						<div
							ref={loadMoreRef}
							className="flex items-center justify-center py-4"
						>
							{isFetchingNextPage && (
								<div className="flex items-center gap-2 text-gray-500">
									<Loader2 className="w-4 h-4 animate-spin" />
									<span>加载更多...</span>
								</div>
							)}
						</div>
					)}

					{/* End of Results Indicator */}
					{!hasNextPage && occurrences.length > 0 && (
						<div className="text-center py-4 text-gray-500 text-sm">
							远古之事，杳不可详😊
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

SongOccurrencesPanel.displayName = "SongOccurrencesPanel";

export default SongOccurrencesPanel;