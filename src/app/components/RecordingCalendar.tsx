"use client";

import { useState, useEffect, useRef, type FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Loader2, Play, ExternalLink, Music, X, ImageOff } from "lucide-react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { listArchives } from "../actions/v2/archive";
import { listSongOccurrencesForArchive } from "../actions/v2/song";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { apiUrlAtom } from "@/lib/store";
import type { LiveRecordingArchive } from "@prisma/client";

// Local formatTime function
function formatTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	}

	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

interface RecordingCalendarProps {
	vtuberProfileId: number;
}

interface DayCellProps {
	date: Date;
	recordings: LiveRecordingArchive[];
}

interface DayRecordingsPanelProps {
	date: Date;
	recordings: LiveRecordingArchive[];
}

interface RecordingTimelinePanelProps {
	recording: LiveRecordingArchive;
}

// Individual day cell component with dialog
const DayCell: FC<DayCellProps> = ({ date, recordings }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const hasRecordings = recordings.length > 0;

	// Format date in Chinese format (xxx年xx月xx日)
	const formatChineseDate = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const dayOfWeek = date.getDay();
		const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
		return `${year}年${month}月${day}日 周${dayNames[dayOfWeek]}`;
	};

	const handleCellClick = () => {
		if (hasRecordings) {
			setIsDialogOpen(true);
		}
	};

	return (
		<div className="w-full">
			<div
				className={`
					min-h-[120px] p-3 border border-gray-200/50 rounded-lg cursor-pointer
					transition-all duration-200 ease-out
					${hasRecordings 
						? 'bg-blue-50/80 hover:bg-blue-100/80 hover:shadow-md' 
						: 'bg-gray-50/30 hover:bg-gray-100/50'
					}
				`}
				onClick={handleCellClick}
			>
				<div className="text-xs text-gray-700 mb-2 font-medium leading-tight">
					{formatChineseDate(date)}
				</div>
				{hasRecordings && (
					<div className="space-y-1">
						{recordings.slice(0, 2).map((recording) => (
							<div
								key={recording.id}
								className="text-xs bg-blue-100/80 text-blue-900 px-2 py-1 rounded font-medium line-clamp-2"
								title={recording.title}
							>
								{recording.title}
							</div>
						))}
						{recordings.length > 2 && (
							<div className="text-xs text-blue-600 font-medium">
								+{recordings.length - 2} more
							</div>
						)}
					</div>
				)}
			</div>
			
			{/* Dialog for recordings */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-lg font-semibold">
							{formatChineseDate(date)} - 直播回放
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						{recordings.map((recording) => (
							<RecordingTimelinePanel key={recording.id} recording={recording} />
						))}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

// Panel to show song timeline for a specific recording
const RecordingTimelinePanel: FC<RecordingTimelinePanelProps> = ({ recording }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [imageError, setImageError] = useState(false);
	const apiUrl = useAtomValue(apiUrlAtom);

	// Reset image error state when recording changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: when recording changes, the image error state should be reset
	useEffect(() => {
		setImageError(false);
	}, [recording.title]);

	const {
		data: occurrencesData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["occurrences", recording.id],
		queryFn: async () => {
			const result = await listSongOccurrencesForArchive(recording.id);
			return result;
		},
		staleTime: 60 * 60 * 1000, // 1 hour
	});

	const occurrences = occurrencesData?.occurrences || [];

	const handleRecordingClick = () => {
		setIsExpanded(!isExpanded);
	};

	// Component for song artwork in timeline
	const SongArtwork = ({ song }: { song: { title: string; artist: string } }) => {
		const [artworkError, setArtworkError] = useState(false);

		if (artworkError || !apiUrl) {
			return (
				<div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
					<Music className="w-4 h-4 text-purple-500" />
				</div>
			);
		}

		const albumArtUrl = `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}&size=small`;

		return (
			<Image
				src={albumArtUrl}
				alt={`${song.title} album art`}
				width={32}
				height={32}
				className="w-8 h-8 object-cover rounded flex-shrink-0"
				onError={() => setArtworkError(true)}
				unoptimized={false}
			/>
		);
	};

	return (
		<Card className="hover:shadow-md transition-shadow duration-200">
			<CardContent className="p-0">
				<div
					className="w-full p-4 text-left cursor-pointer"
					onClick={handleRecordingClick}
				>
					<div className="flex items-start gap-4">
						{/* Cover image */}
						<div className="flex-shrink-0">
							{!imageError ? (
								<Image
									src={recording.cover}
									alt={recording.title}
									width={64}
									height={48}
									className="w-16 h-12 object-cover rounded-lg"
									loading="lazy"
									onError={() => setImageError(true)}
									referrerPolicy="no-referrer"
								/>
							) : (
								<div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
									<ImageOff className="w-6 h-6 text-gray-400" />
								</div>
							)}
						</div>
						
						<div className="flex-1 min-w-0">
							<h3 className="font-medium text-sm leading-tight line-clamp-2 mb-2">
								{recording.title}
							</h3>
							<div className="flex items-center gap-4 text-xs text-gray-500">
								<span className="flex items-center gap-1">
									<Clock className="w-3 h-3" />
									{formatTime(recording.duration)}
								</span>
								<span>BV{recording.bvid}</span>
							</div>
						</div>
						
						<div className="flex gap-2 relative z-20">
							<Button
								size="sm"
								variant="outline"
								onClick={(e) => {
									e.stopPropagation();
									window.open(`https://www.bilibili.com/video/${recording.bvid}`, '_blank');
								}}
								title="观看直播回放"
							>
								<ExternalLink className="w-3 h-3" />
							</Button>
						</div>
					</div>
					

				</div>
				
				{/* Expansion content */}
				<div className={`
					overflow-hidden transition-all duration-200 ease-out
					${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
				`}>
					<div className="px-4 pb-4">
						{isLoading && (
							<div className="flex items-center justify-center py-4">
								<div className="flex items-center gap-2 text-gray-500">
									<Loader2 className="w-4 h-4 animate-spin" />
									<span>加载中...</span>
								</div>
							</div>
						)}

						{error && (
							<div className="text-sm text-red-500 bg-red-50 p-3 rounded">
								{error.message}
							</div>
						)}

						{!isLoading && !error && occurrences.length === 0 && (
							<div className="text-center py-8 text-gray-500">
								<Music className="w-12 h-12 mx-auto mb-4 text-gray-300" />
								<p>暂无歌曲记录</p>
							</div>
						)}

						{occurrences.length > 0 && (
							<div className="space-y-6">
								<div className="text-sm text-gray-600">
									总时长: {formatTime(recording.duration)}
								</div>
								
								{/* Timeline Container */}
								<div className="bg-gradient-to-r from-purple-50/50 to-white/50 rounded-xl p-6 border border-purple-100/50">
									{/* Timeline line container */}
									<div className="relative flex flex-col min-h-[400px]">
										{/* Timeline line - positioned to go through center of circles */}
										<div className="absolute left-4 top-0 bottom-0 w-1 bg-purple-200 rounded-full z-0"></div>
										
										{/* Start marker */}
										<div className="flex items-center mb-8 relative z-10">
											<div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4 shadow-sm">
												<div className="w-2 h-2 bg-white rounded-full"></div>
											</div>
											<div className="text-sm text-gray-600 font-mono">
												00:00 - 开始
											</div>
										</div>
										
										{/* Song occurrences */}
										{occurrences.map((occurrence, index) => {
											if (!occurrence.vtuberSong) return null;
											
											return (
												<div
													key={`${occurrence.vtuberSong.id}-${occurrence.start}`}
													className="flex items-center mb-6 group relative z-10"
												>
													{/* Timeline dot */}
													<div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
														<div className="w-2 h-2 bg-white rounded-full"></div>
													</div>
													
													{/* Time marker */}
													<div className="w-16 text-sm text-gray-600 font-mono mr-4">
														{formatTime(occurrence.start)}
													</div>
													
													{/* Song card - narrow design */}
													<div className="w-80 bg-white/90 backdrop-blur-sm border border-purple-200/50 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 group-hover:scale-[1.02]">
														<div className="flex items-center gap-2">
															{/* Song artwork */}
															<SongArtwork song={occurrence.vtuberSong.song} />
															
															{/* Song info */}
															<div className="flex-1 min-w-0">
																<div className="text-sm font-medium text-gray-800 line-clamp-1">
																	{occurrence.vtuberSong.song.title}
																</div>
																<div className="text-xs text-gray-600 line-clamp-1">
																	{occurrence.vtuberSong.song.artist}
																</div>
															</div>
															
															{/* External link */}
															<a
																href={`https://www.bilibili.com/video/${recording.bvid}${occurrence.start > 0 ? `?t=${occurrence.start}` : ''}${occurrence.page > 1 ? `${occurrence.start > 0 ? '&' : '?'}p=${occurrence.page}` : ''}`}
																target="_blank"
																rel="noopener noreferrer"
																className="flex-shrink-0 p-1 text-gray-400 hover:text-purple-500 transition-colors"
																onClick={(e) => e.stopPropagation()}
															>
																<ExternalLink className="w-3 h-3" />
															</a>
														</div>
													</div>
												</div>
											);
										})}
										
										{/* End marker */}
										<div className="flex items-center mt-8 relative z-10">
											<div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4 shadow-sm">
												<div className="w-2 h-2 bg-white rounded-full"></div>
											</div>
											<div className="text-sm text-gray-600 font-mono">
												{formatTime(recording.duration)} - 结束
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

// Main calendar component
const RecordingCalendar: FC<RecordingCalendarProps> = ({ vtuberProfileId }) => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		error,
	} = useInfiniteQuery({
		queryKey: ["archives", vtuberProfileId],
		queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
			console.log("Fetching archives for profile:", vtuberProfileId, "pageParam:", pageParam);
			const result = await listArchives(vtuberProfileId, pageParam, 50);
			console.log("Archives result:", result);
			console.log("Archives count:", result.archives?.length || 0);
			console.log("Next token:", result.nextToken);
			return result;
		},
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => lastPage.nextToken,
		staleTime: 60 * 60 * 1000, // 1 hour
	});

	// Ref for infinite scroll
	const loadMoreRef = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	
	useEffect(() => {
		// Clean up previous observer
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		if (!hasNextPage || isFetchingNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isFetchingNextPage) {
					console.log("Loading more archives...");
					fetchNextPage();
				}
			},
			{ threshold: 0.1, rootMargin: "50px" },
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		observerRef.current = observer;

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	// Group recordings by date
	const recordingsByDate = new Map<string, LiveRecordingArchive[]>();
	const allRecordings = data?.pages.flatMap((page) => page.archives).filter(Boolean) || [];
	
	console.log("All recordings:", allRecordings);
	console.log("Data pages:", data?.pages);

	for (const recording of allRecordings) {
		if (!recording) continue;
		const dateKey = recording.date.toISOString().split('T')[0];
		if (!recordingsByDate.has(dateKey)) {
			recordingsByDate.set(dateKey, []);
		}
		recordingsByDate.get(dateKey)!.push(recording);
	}

	// Generate calendar grid
	const generateCalendarGrid = () => {
		// Find the earliest and latest dates from the recordings
		const allDates = Array.from(recordingsByDate.keys()).map(key => new Date(key));
		const earliestDate = allDates.length > 0 ? new Date(Math.min(...allDates.map(d => d.getTime()))) : new Date();
		const latestDate = allDates.length > 0 ? new Date(Math.max(...allDates.map(d => d.getTime()))) : new Date();
		
		// Generate all weeks from earliest to latest date
		const allWeeks = [];
		const currentDate = new Date(earliestDate);
		
		// First, generate all weeks in chronological order
		while (currentDate <= latestDate) {
			const weekStart = new Date(currentDate);
			// Adjust to start of week (Sunday)
			const dayOfWeek = weekStart.getDay();
			weekStart.setDate(weekStart.getDate() - dayOfWeek);
			
			const week = [];
			for (let i = 0; i < 7; i++) {
				const date = new Date(weekStart);
				date.setDate(weekStart.getDate() + i);
				const dateKey = date.toISOString().split('T')[0];
				const recordings = recordingsByDate.get(dateKey) || [];
				
				week.push({ date, recordings });
			}
			
			allWeeks.push(week);
			
			// Move to next week
			currentDate.setDate(currentDate.getDate() + 7);
		}
		
		// Reverse the weeks to show most recent first
		const reversedWeeks = allWeeks.reverse();
		
		console.log("Generated calendar with", reversedWeeks.length, "weeks, covering dates from", earliestDate.toISOString(), "to", latestDate.toISOString(), "in reverse chronological order");
		return reversedWeeks;
	};

	const calendarWeeks = generateCalendarGrid();

	console.log("Calendar state:", {
		totalRecordings: allRecordings.length,
		calendarWeeks: calendarWeeks.length
	});

	return (
		<div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden p-6">
			<div className="space-y-6">
				{/* Calendar Grid */}
				<div className="space-y-2">
					{/* Week day headers - hidden on mobile */}
					<div className="hidden md:grid grid-cols-7 gap-2 mb-4">
						{['日', '一', '二', '三', '四', '五', '六'].map((day) => (
							<div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
								{day}
							</div>
						))}
					</div>
					
					{/* Desktop Calendar - 7 columns */}
					<div className="hidden md:block">
						{calendarWeeks.map((week, weekIndex) => (
							<div key={weekIndex} className="grid grid-cols-7 gap-2">
								{week.map((dayData, dayIndex) => (
									<div key={dayIndex}>
										{dayData ? (
											<DayCell
												date={dayData.date}
												recordings={dayData.recordings}
											/>
										) : (
											<div className="min-h-[120px] p-3 border border-gray-200/50 rounded-lg bg-gray-50/20"></div>
										)}
									</div>
								))}
							</div>
						))}
					</div>

					{/* Mobile Calendar - 1 column */}
					<div className="md:hidden space-y-2">
						{calendarWeeks.flat().map((dayData, dayIndex) => (
							<div key={dayIndex}>
								{dayData ? (
									<DayCell
										date={dayData.date}
										recordings={dayData.recordings}
									/>
								) : null}
							</div>
						))}
					</div>
				</div>

				{/* Loading indicator */}
				{isFetching && (
					<div className="flex items-center justify-center py-4">
						<div className="flex items-center gap-2 text-gray-500">
							<Loader2 className="w-4 h-4 animate-spin" />
							<span>加载中...</span>
						</div>
					</div>
				)}

				{/* Error state */}
				{error && (
					<div className="text-sm text-red-500 bg-red-50 p-3 rounded">
						<strong>Error:</strong> {error.message}
						<br />
						<details className="mt-2">
							<summary className="cursor-pointer">Error Details</summary>
							<pre className="text-xs mt-1 overflow-auto">
								{JSON.stringify(error, null, 2)}
							</pre>
						</details>
					</div>
				)}

				{/* Infinite scroll trigger */}
				{hasNextPage && (
					<div ref={loadMoreRef} className="flex items-center justify-center py-8">
						{isFetchingNextPage ? (
							<div className="flex items-center gap-2 text-gray-500">
								<Loader2 className="w-4 h-4 animate-spin" />
								<span>加载更多...</span>
							</div>
						) : (
							<div className="text-sm text-gray-400">
								滚动加载更多...
							</div>
						)}
					</div>
				)}

				{/* End of results indicator */}
				{!hasNextPage && allRecordings.length > 0 && (
					<div className="text-center py-8 text-gray-500 text-sm">
						已显示全部直播记录
					</div>
				)}
			</div>
		</div>
	);
};

export default RecordingCalendar; 