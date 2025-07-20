"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Music, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SongOccurrenceCard } from "./SongOccurrenceCard";
import type { VtuberSong } from "@prisma/client";
import { deleteSongOccurrence, listVtuberSongOccurrences, type SongOccurrenceInLiveWithReferences } from "@/app/actions/v2/song";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SongOccurrencesPanelProps {
	vtuberSong: VtuberSong
	isExpanded: boolean;
	onToggleExpanded: () => void;
}

export function SongOccurrencesPanel({
	vtuberSong,
	isExpanded,
	onToggleExpanded,
}: SongOccurrencesPanelProps) {
	const {
		isLoading,
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		error,
	} = useInfiniteQuery({
		queryKey: ["admin-song-occurrences", `${vtuberSong.id}`],
		queryFn: async ({ pageParam }: { pageParam: string | undefined }) =>
			await listVtuberSongOccurrences(
				vtuberSong.id,
				pageParam,
				20,
			),
		initialPageParam: undefined,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.nextToken;
		},
		staleTime: 60 * 60 * 1000, // 1 hour
	});


	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	/**
	 * Set up intersection observer for infinite scrolling
	 */
	useEffect(() => {
		if (!isExpanded || !hasNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 },
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
	}, [isExpanded, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const handleDeleteOccurrence = async (occurrence: SongOccurrenceInLiveWithReferences) => {
		const result = await deleteSongOccurrence(vtuberSong.id!, occurrence.liveRecordingArchive.id);
		const queryClient = useQueryClient();

		if (result.success) {
			toast.success("删除成功");
			queryClient.invalidateQueries({ queryKey: ["admin-song-occurrences", `${vtuberSong.id}`] });
		} else {
			toast.error(result.message);
		}
	}

	const occurrences = data?.pages.flatMap((page) => page.occurrences) || [];

	return (
		<div className="border-t border-border/50">
			{/* Expandable Header */}
			<div
				className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
				onClick={onToggleExpanded}
			>
				<div className="flex items-center gap-2">
					<Music className="w-4 h-4 text-muted-foreground" />
					<span className="font-medium">直播回放</span>
					{occurrences.length > 0 && (
						<Badge variant="secondary" className="text-xs">
							{occurrences.length}
						</Badge>
					)}
				</div>
				<motion.div
					animate={{ rotate: isExpanded ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<ChevronDown className="w-4 h-4 text-muted-foreground" />
				</motion.div>
			</div>

			{/* Expandable Content */}
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="p-4 space-y-4">
							{/* Loading State */}
							{isLoading && (
								<div className="flex items-center justify-center py-8">
									<div className="flex items-center gap-2 text-muted-foreground">
										<Loader2 className="w-4 h-4 animate-spin" />
										<span>加载中...</span>
									</div>
								</div>
							)}

							{/* Error State */}
							{error && (
								<div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
									{error.message}
								</div>
							)}

							{/* No Results */}
							{!isLoading && !error && occurrences.length === 0 && (
								<div className="text-center py-8 text-muted-foreground">
									<Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
									<p>暂无直播回放记录</p>
								</div>
							)}

							{/* Occurrences Grid */}
							{occurrences.length > 0 && (
								<div className="space-y-3">
									{occurrences.map((occurrence, index) => (
										<SongOccurrenceCard
											key={`${occurrence?.liveRecordingArchive.bvid}-${occurrence?.page}-${occurrence?.start}`}
											occurrence={occurrence!}
											index={index}
											songId={vtuberSong.id!}
											onDelete={handleDeleteOccurrence}
										/>
									))}
								</div>
							)}

							{/* Load More Trigger */}
							{hasNextPage && !isLoading && (
								<div
									ref={loadMoreRef}
									className="flex items-center justify-center py-4"
								>
									{isFetchingNextPage && (
										<div className="flex items-center gap-2 text-muted-foreground">
											<Loader2 className="w-4 h-4 animate-spin" />
											<span>加载更多...</span>
										</div>
									)}
								</div>
							)}

							{/* End of Results */}
							{!hasNextPage && occurrences.length > 0 && (
								<div className="text-center py-4 text-muted-foreground text-sm">
									已显示全部记录
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
