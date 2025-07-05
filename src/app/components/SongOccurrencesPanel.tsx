"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Music, Loader2, ExternalLink, ImageOff, Play, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSongOccurrences, type SongOccurrence } from "@/app/actions/song-occurrences";
import type { Song } from "@/generated/client";
import Image from "next/image";

/**
 * Props for the SongOccurrencesPanel component
 */
interface SongOccurrencesPanelProps {
  song: Song; // The song to display occurrences for
  isExpanded: boolean; // Whether the panel is currently expanded
  onToggleExpanded: () => void; // Callback to toggle expansion state
}

/**
 * Formats seconds into MM:SS format for display
 * @param seconds - Number of seconds to format
 * @returns Formatted time string (e.g., "3:45")
 */
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Individual occurrence card component
 * Displays a single song occurrence with cover image, title, progress bar, and link to Bilibili
 * Used within the SongOccurrencesPanel to show each occurrence
 */
function SongOccurrenceCard({ occurrence }: { occurrence: SongOccurrence }) {
  const [imageError, setImageError] = useState(false);

  /**
   * Handles image loading errors by showing a fallback icon
   */
  const handleImageError = () => {
    setImageError(true);
  };

  // Construct Bilibili URL with page and start time parameters
  const bilibiliUrl = `https://www.bilibili.com/video/${occurrence.bvid}?p=${occurrence.page}&t=${occurrence.start}`;
  
  // Calculate progress percentage for the progress bar
  const progressPercentage = (occurrence.start / occurrence.duration) * 100;

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-gray-200/50 bg-white/60 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Cover Image with Play Overlay */}
          <div className="relative flex-shrink-0">
            {!imageError ? (
              <Image
                src={occurrence.cover}
                alt={occurrence.title}
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
            {/* Play button overlay that appears on hover */}
            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Content Area with Title, Page, and Progress Bar */}
          <div className="flex-1 min-w-0 relative">
            {/* Title and Page Number */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
                {occurrence.title}
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
                <span>总时长: {formatTime(occurrence.duration)}</span>
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
              aria-label={`观看 ${occurrence.title} 在 ${formatTime(occurrence.start)} 的播放`}
            >
              <span className="sr-only">观看 {occurrence.title} 在 {formatTime(occurrence.start)} 的播放</span>
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
 *   isExpanded={boolean}
 *   onToggleExpanded={() => {}}
 * />
 */
export function SongOccurrencesPanel({ 
  song, 
  isExpanded, 
  onToggleExpanded 
}: SongOccurrencesPanelProps) {
  // State for occurrences data and pagination
  const [occurrences, setOccurrences] = useState<SongOccurrence[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextToken, setNextToken] = useState<string | undefined>();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Refs for intersection observer and infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  /**
   * Load initial occurrences when panel is expanded
   * Only loads once per expansion to prevent unnecessary API calls
   */
  const loadInitialOccurrences = useCallback(async () => {
    if (!isExpanded || isInitialized) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getSongOccurrences(song.id);
      
      if (result.success && result.occurrences) {
        setOccurrences(result.occurrences);
        setNextToken(result.nextToken);
        setHasMore(!!result.nextToken);
      } else {
        setError(result.message || "加载失败");
      }
    } catch (err) {
      setError("加载时发生错误");
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, [isExpanded, isInitialized, song.id]);

  /**
   * Load more occurrences for infinite scrolling
   * Uses the nextToken for pagination and appends to existing occurrences
   */
  const loadMoreOccurrences = useCallback(async () => {
    if (!hasMore || isLoadingMore || !nextToken) return;
    
    setIsLoadingMore(true);
    
    try {
      const result = await getSongOccurrences(song.id, nextToken);
      
      if (result.success && result.occurrences) {
        setOccurrences(prev => [...prev, ...result.occurrences!]);
        setNextToken(result.nextToken);
        setHasMore(!!result.nextToken);
      } else {
        setError(result.message || "加载更多失败");
      }
    } catch (err) {
      setError("加载更多时发生错误");
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, nextToken, song.id]);

  /**
   * Set up intersection observer for infinite scrolling
   * Triggers loadMoreOccurrences when the loading element comes into view
   */
  useEffect(() => {
    if (!isExpanded || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMoreOccurrences();
        }
      },
      { threshold: 0.1 }
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
  }, [isExpanded, hasMore, isLoadingMore, loadMoreOccurrences]);

  /**
   * Load initial data when expanded
   * Triggers the initial load when the panel is first expanded
   */
  useEffect(() => {
    loadInitialOccurrences();
  }, [loadInitialOccurrences]);

  /**
   * Reset state when panel is collapsed
   * Clears all data and resets to initial state for next expansion
   */
  useEffect(() => {
    if (!isExpanded) {
      setOccurrences([]);
      setError(null);
      setHasMore(true);
      setNextToken(undefined);
      setIsInitialized(false);
    }
  }, [isExpanded]);

  return (
    <div className="border-t border-gray-100/80 bg-gray-50/30">
      <div className="p-4">
        {/* Panel Header */}
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-sm text-gray-700">
            播放记录 ({occurrences.length})
          </h3>
        </div>

        {/* Expandable Content with Animations */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Initial Loading State */}
              {isLoading && (
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
                  {error}
                </div>
              )}

              {/* Empty State - No Occurrences Found */}
              {!isLoading && !error && occurrences.length === 0 && (
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
                      key={`${occurrence.bvid}-${occurrence.page}-${occurrence.start}`}
                      occurrence={occurrence}
                    />
                  ))}
                </div>
              )}

              {/* Infinite Scroll Loading Trigger */}
              {hasMore && !isLoading && (
                <div ref={loadMoreRef} className="flex items-center justify-center py-4">
                  {isLoadingMore && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>加载更多...</span>
                    </div>
                  )}
                </div>
              )}

              {/* End of Results Indicator */}
              {!hasMore && occurrences.length > 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  已显示全部记录
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 