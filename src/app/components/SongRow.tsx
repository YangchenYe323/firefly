"use client";

import { onCopyToClipboard } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import type { Song } from "@/generated/client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface Props {
  song: Song;
  onLikeSong: (id: number) => void;
  onDislikeSong: (id: number) => void;
  apiUrl?: string;
}

function formatDate(date: Date): string {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function SongRow({ song, onLikeSong, onDislikeSong, apiUrl }: Props) {
  // Track touch start position and time for precise tap detection
  // This prevents accidental copies during scrolling gestures
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  
  // Flag to track if the user has scrolled during the touch interaction
  // This is crucial for distinguishing between taps and scrolls on mobile
  const hasScrolledRef = useRef(false);

  // Album art fallback state
  const [imgError, setImgError] = useState(false);

  // Construct album art URL
  const albumArtUrl = apiUrl
    ? `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}&size=large`
    : null;

  const handleCopy = () => {
    onCopyToClipboard(song);
  };

  /**
   * Records the initial touch position and time when user starts touching the element
   * This is the first step in our tap detection algorithm
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
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
    
    // Only trigger if it's a genuine tap (very small movement, short duration)
    // 5px movement threshold: allows slight finger movement during tap
    // 200ms time threshold: distinguishes taps from long presses
    if (deltaX < 5 && deltaY < 5 && deltaTime < 200) {
      onCopyToClipboard(song);
    }
    
    // Clean up touch tracking state
    touchStartRef.current = null;
    hasScrolledRef.current = false;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeSong(song.id);
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDislikeSong(song.id);
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement detailed view
    console.log("Expand song details:", song.id);
  };

  const handleBilibiliClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (song.url) {
      window.open(song.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className="flex items-center p-3 hover:bg-black/5 rounded-lg transition-colors cursor-pointer group"
      onClick={handleCopy}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Album Avatar */}
      <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
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
      </div>

      {/* Song Info */}
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-2">
          <h3 className="text-md font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
            {song.title}
          </h3>
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
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors"
            onClick={handleExpand}
          >
            <Icons.three_dots_vertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 