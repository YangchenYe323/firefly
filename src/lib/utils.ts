import { type ClassValue, clsx } from "clsx";

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
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dayOfWeek = date.getDay();
	const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
	return `${year}年${month}月${day}日 周${dayNames[dayOfWeek]}`;
}

export function formatChineseTime(date: Date): string {
	const offset = date.getTimezoneOffset();
	console.log(offset);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return `${padTime(hours)}:${padTime(minutes)}`;
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
		// Primary method succeeded - show success message
		toast.success(`歌曲 ${song.title} 成功复制到剪贴板`);
	} else {
		// Primary method failed - try fallback approach
		// Check if navigator.clipboard is available and we're in a secure context
		// Secure context means HTTPS or localhost (not LAN IP)
		if (navigator.clipboard && window.isSecureContext) {
			// Fallback method: Use modern clipboard API
			// This is more reliable in secure contexts but requires HTTPS
			navigator.clipboard
				.writeText(text)
				.then(() => {
					toast.success(`歌曲 ${song.title} 成功复制到剪贴板`);
				})
				.catch(() => {
					// Clipboard API failed - provide manual copy instructions
					// This ensures users can still copy the text even if automated methods fail
					toast.error(`复制失败，请手动复制: ${text}`);
				});
		} else {
			// No clipboard API available or not in secure context
			// Provide manual copy instructions as final fallback
			// This handles cases like LAN IP access where clipboard permissions are restricted
			toast.error(`复制失败，请手动复制: ${text}`);
		}
	}
}


function padTime(value: number) {
	const str = value.toString();

	return str.length === 1 ? `0${str}` : str;
}

export function formatMMSS(timeInSecond: number, padHour = false): string{
	const hours = Math.floor(timeInSecond / 3600);
	const minutes = Math.floor((timeInSecond % 3600) / 60);
	const seconds = Math.floor(timeInSecond % 60);

	if (hours == 0) {
		if (padHour) {
			return `00:${padTime(minutes)}:${padTime(seconds)}`;
		}
		return `${minutes}:${padTime(seconds)}`;
	}

	return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
}
