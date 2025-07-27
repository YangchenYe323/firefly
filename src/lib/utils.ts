import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

import type { Song, VtuberSong } from "@prisma/client";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function orderSongsWithNewVideoFirst(allSongs: VtuberSong[]) {
	const songsWithNewVideo = allSongs.filter(isVideoNewlyCreated);
	songsWithNewVideo.sort((s1, s2) => {
		const s1Time = s1.pubdate!;
		const s2Time = s2.pubdate!;
		return s1Time > s2Time ? -1 : s1Time === s2Time ? 0 : 1;
	});
	const oldSongs = allSongs.filter((song) => !isVideoNewlyCreated(song));
	return [...songsWithNewVideo, ...oldSongs];
}

export function isVideoNewlyCreated(song: VtuberSong) {
	const video_created = song.pubdate;
	if (!video_created) {
		return false;
	}

	const lastTwoMonth = new Date();
	lastTwoMonth.setDate(0);
	lastTwoMonth.setDate(0);
	lastTwoMonth.setDate(1);

	return new Date(video_created * 1000) >= lastTwoMonth;
}

export function formatChineseDate(date: Date): string {
	return format(date, "yyyy/M/d (E)", { locale: zhCN });
}

export function formatTime(seconds: number, padHour = false): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	if (hours > 0 || padHour) {
		return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	}

	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/// Fisher-Yates Shuffle
export function shuffleArray<T>(arr: T[]) {
	const res = [...arr];
	for (let currentIdx = arr.length - 1; currentIdx > 0; currentIdx--) {
		const randomIdx = Math.floor(Math.random() * (currentIdx - 1));
		[res[currentIdx], res[randomIdx]] = [res[randomIdx], res[currentIdx]];
	}
	return res;
}

/**
 * Copies song information to clipboard with robust error handling
 *
 * Design decisions:
 * 1. Primary: Use copy-to-clipboard library for broad browser compatibility
 * 2. Fallback: Use navigator.clipboard API when available and in secure context
 * 3. Graceful degradation: Show manual copy instructions if all methods fail
 *
 * This addresses issues with:
 * - LAN IP access (non-HTTPS) causing permission dialogs
 * - iOS Safari's delayed click behavior
 * - Browser clipboard permission restrictions
 */
export function onCopyToClipboard(song: Song) {
	const text = `点歌 ${song.title}`;

	// Primary method: Use copy-to-clipboard library
	// This library handles various browser quirks and provides good compatibility
	// We disable debug mode to reduce console noise and permission dialog frequency
	const success = copy(text, {
		format: "text/plain",
		onCopy: () => {
			// Success callback - no need to show permission dialog
			// This helps reduce the frequency of clipboard permission prompts
		},
		debug: false, // Disable debug mode to reduce console noise and permission dialogs
	});

	if (success) {
		toast.success(`歌曲 ${song.title} 已复制到剪贴板`);
		return;
	}

	// Fallback method: Use navigator.clipboard API
	if (navigator.clipboard && window.isSecureContext) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				toast.success(`歌曲 ${song.title} 已复制到剪贴板`);
			})
			.catch(() => {
				// If clipboard API fails, show manual copy instructions
				toast.info(
					`请手动复制以下文本：\n${text}`,
					{
						autoClose: false,
						closeOnClick: false,
					}
				);
			});
		return;
	}

	// Final fallback: Show manual copy instructions
	toast.info(
		`请手动复制以下文本：\n${text}`,
		{
			autoClose: false,
			closeOnClick: false,
		}
	);
}

function padTime(value: number) {
	return value.toString().padStart(2, "0");
}

export function formatMMSS(timeInSecond: number, padHour = false): string{
	const hours = Math.floor(timeInSecond / 3600);
	const minutes = Math.floor((timeInSecond % 3600) / 60);
	const seconds = timeInSecond % 60;

	if (hours > 0 || padHour) {
		return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
	}

	return `${padTime(minutes)}:${padTime(seconds)}`;
}

/**
 * Get calendar theme CSS variables based on day of week
 * @param dayOfWeek - Day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 * @returns Object with CSS variable names for the given day
 */
export function getCalendarThemeVars(dayOfWeek: number) {
	const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
	const dayName = dayNames[dayOfWeek] || 'sun';
	
	return {
		bg: `hsl(var(--calendar-${dayName}-bg))`,
		activeBg: `hsl(var(--calendar-${dayName}-active-bg))`,
		recordingBg: `hsl(var(--calendar-${dayName}-recording-bg))`,
		occurrenceBg: `hsl(var(--calendar-${dayName}-occurrence-bg))`,
		border: `hsl(var(--calendar-${dayName}-border))`,
		text: `hsl(var(--calendar-${dayName}-text))`,
		activeText: `hsl(var(--calendar-${dayName}-active-text))`,
	};
}
