// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ChevronDown, ChevronUp, Music, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { SongOccurrenceCard } from "./SongOccurrenceCard";
// import type { Song, VtuberSong } from "@prisma/client";
// import { SongOccurrenceInLiveWithReferences } from "@/app/actions/v2/song";

// interface SongOccurrencesPanelProps {
// 	vtuberSong: VtuberSong
// 	isExpanded: boolean;
// 	onToggleExpanded: () => void;
// }

// export function SongOccurrencesPanel({
// 	vtuberSong,
// 	isExpanded,
// 	onToggleExpanded,
// }: SongOccurrencesPanelProps) {
// 	const [occurrences, setOccurrences] = useState<SongOccurrenceInLiveWithReferences[]>([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [isLoadingMore, setIsLoadingMore] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [hasMore, setHasMore] = useState(true);
// 	const [nextToken, setNextToken] = useState<string | undefined>();
// 	const [isInitialized, setIsInitialized] = useState(false);

// 	const observerRef = useRef<IntersectionObserver | null>(null);
// 	const loadMoreRef = useRef<HTMLDivElement>(null);

// 	/**
// 	 * Load initial occurrences when panel is expanded
// 	 */
// 	const loadInitialOccurrences = useCallback(async () => {
// 		if (!isExpanded || isInitialized) return;

// 		setIsLoading(true);
// 		setError(null);

// 		try {
// 			const result = await getSongOccurrences(song.id!);

// 			if (result.success && result.occurrences) {
// 				setOccurrences(result.occurrences);
// 				setNextToken(result.nextToken);
// 				setHasMore(!!result.nextToken);
// 			} else {
// 				setError(result.message || "加载失败");
// 			}
// 		} catch (err) {
// 			setError("加载时发生错误");
// 		} finally {
// 			setIsLoading(false);
// 			setIsInitialized(true);
// 		}
// 	}, [isExpanded, isInitialized, song.id]);

// 	/**
// 	 * Load more occurrences for infinite scrolling
// 	 */
// 	const loadMoreOccurrences = useCallback(async () => {
// 		if (!hasMore || isLoadingMore || !nextToken) return;

// 		setIsLoadingMore(true);

// 		try {
// 			const result = await getSongOccurrences(song.id!, nextToken);

// 			if (result.success && result.occurrences) {
// 				setOccurrences((prev) => [...prev, ...result.occurrences!]);
// 				setNextToken(result.nextToken);
// 				setHasMore(!!result.nextToken);
// 			} else {
// 				setError(result.message || "加载更多失败");
// 			}
// 		} catch (err) {
// 			setError("加载更多时发生错误");
// 		} finally {
// 			setIsLoadingMore(false);
// 		}
// 	}, [hasMore, isLoadingMore, nextToken, song.id]);

// 	/**
// 	 * Set up intersection observer for infinite scrolling
// 	 */
// 	useEffect(() => {
// 		if (!isExpanded || !hasMore) return;

// 		const observer = new IntersectionObserver(
// 			(entries) => {
// 				if (entries[0].isIntersecting && !isLoadingMore) {
// 					loadMoreOccurrences();
// 				}
// 			},
// 			{ threshold: 0.1 },
// 		);

// 		if (loadMoreRef.current) {
// 			observer.observe(loadMoreRef.current);
// 		}

// 		observerRef.current = observer;

// 		return () => {
// 			if (observerRef.current) {
// 				observerRef.current.disconnect();
// 			}
// 		};
// 	}, [isExpanded, hasMore, isLoadingMore, loadMoreOccurrences]);

// 	/**
// 	 * Load initial data when expanded
// 	 */
// 	useEffect(() => {
// 		loadInitialOccurrences();
// 	}, [loadInitialOccurrences]);

// 	/**
// 	 * Reset state when song changes
// 	 */
// 	useEffect(() => {
// 		if (!isExpanded) {
// 			setOccurrences([]);
// 			setError(null);
// 			setHasMore(true);
// 			setNextToken(undefined);
// 			setIsInitialized(false);
// 		}
// 	}, [isExpanded]);

// 	return (
// 		<div className="border-t border-border/50">
// 			{/* Expandable Header */}
// 			<div
// 				className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
// 				onClick={onToggleExpanded}
// 			>
// 				<div className="flex items-center gap-2">
// 					<Music className="w-4 h-4 text-muted-foreground" />
// 					<span className="font-medium">直播回放</span>
// 					{occurrences.length > 0 && (
// 						<Badge variant="secondary" className="text-xs">
// 							{occurrences.length}
// 						</Badge>
// 					)}
// 				</div>
// 				<motion.div
// 					animate={{ rotate: isExpanded ? 180 : 0 }}
// 					transition={{ duration: 0.2 }}
// 				>
// 					<ChevronDown className="w-4 h-4 text-muted-foreground" />
// 				</motion.div>
// 			</div>

// 			{/* Expandable Content */}
// 			<AnimatePresence>
// 				{isExpanded && (
// 					<motion.div
// 						initial={{ height: 0, opacity: 0 }}
// 						animate={{ height: "auto", opacity: 1 }}
// 						exit={{ height: 0, opacity: 0 }}
// 						transition={{ duration: 0.3, ease: "easeInOut" }}
// 						className="overflow-hidden"
// 					>
// 						<div className="p-4 space-y-4">
// 							{/* Loading State */}
// 							{isLoading && (
// 								<div className="flex items-center justify-center py-8">
// 									<div className="flex items-center gap-2 text-muted-foreground">
// 										<Loader2 className="w-4 h-4 animate-spin" />
// 										<span>加载中...</span>
// 									</div>
// 								</div>
// 							)}

// 							{/* Error State */}
// 							{error && (
// 								<div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
// 									{error}
// 								</div>
// 							)}

// 							{/* No Results */}
// 							{!isLoading && !error && occurrences.length === 0 && (
// 								<div className="text-center py-8 text-muted-foreground">
// 									<Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
// 									<p>暂无直播回放记录</p>
// 								</div>
// 							)}

// 							{/* Occurrences Grid */}
// 							{occurrences.length > 0 && (
// 								<div className="space-y-3">
// 									{occurrences.map((occurrence, index) => (
// 										<SongOccurrenceCard
// 											key={`${occurrence.bvid}-${occurrence.page}-${occurrence.start}`}
// 											occurrence={occurrence}
// 											index={index}
// 											songId={song.id!}
// 											onDelete={() => {
// 												// Remove the deleted occurrence from the local state
// 												setOccurrences((prev) =>
// 													prev.filter(
// 														(o) =>
// 															!(
// 																o.bvid === occurrence.bvid &&
// 																o.page === occurrence.page &&
// 																o.start === occurrence.start
// 															),
// 													),
// 												);
// 											}}
// 										/>
// 									))}
// 								</div>
// 							)}

// 							{/* Load More Trigger */}
// 							{hasMore && !isLoading && (
// 								<div
// 									ref={loadMoreRef}
// 									className="flex items-center justify-center py-4"
// 								>
// 									{isLoadingMore && (
// 										<div className="flex items-center gap-2 text-muted-foreground">
// 											<Loader2 className="w-4 h-4 animate-spin" />
// 											<span>加载更多...</span>
// 										</div>
// 									)}
// 								</div>
// 							)}

// 							{/* End of Results */}
// 							{!hasMore && occurrences.length > 0 && (
// 								<div className="text-center py-4 text-muted-foreground text-sm">
// 									已显示全部记录
// 								</div>
// 							)}
// 						</div>
// 					</motion.div>
// 				)}
// 			</AnimatePresence>
// 		</div>
// 	);
// }
