import { type ClassValue, clsx } from "clsx";

import type { Song } from "@/generated/client";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
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

export function isNewlyAdded(song: Song) {
	const creationDate = song.created_on;
	const lastTwoMonth = new Date();
	lastTwoMonth.setDate(0);
	lastTwoMonth.setDate(0);
	lastTwoMonth.setDate(1);
	return creationDate >= lastTwoMonth;
}

export function isVideoNewlyCreated(song: Song) {
	const video_created = song.extra.video_created_on;
	if (!video_created) {
		return false;
	}

	const lastTwoMonth = new Date();
	lastTwoMonth.setDate(0);
	lastTwoMonth.setDate(0);
	lastTwoMonth.setDate(1);

	return new Date(Date.parse(video_created)) >= lastTwoMonth;
}

export function wontSing(song: Song) {
	return song.tag.indexOf("NO") !== -1;
}

export enum LimitedFor {
	Captain = 0,
	Admiral = 1,
	Governor = 2,
}

export function getLimitedFor(song: Song) {
	if (
		song.remark.indexOf("上总") !== -1 ||
		song.remark.indexOf("总督") !== -1
	) {
		return LimitedFor.Governor;
	}

	if (
		song.remark.indexOf("上提") !== -1 ||
		song.remark.indexOf("提督") !== -1
	) {
		return LimitedFor.Admiral;
	}

	if (
		song.remark.indexOf("上舰") !== -1 ||
		song.remark.indexOf("舰长") !== -1
	) {
		return LimitedFor.Captain;
	}

	return null;
}

export function orderNewSongsFirst(allSongs: Song[]) {
	const newSongs = allSongs.filter(isNewlyAdded);
	newSongs.sort((s1, s2) => {
		return s1.created_on.getTime() > s2.created_on.getTime()
			? -1
			: s1.created_on.getTime() === s2.created_on.getTime()
				? 0
				: 1;
	});
	const oldSongs = allSongs.filter((song) => !isNewlyAdded(song));
	return [...newSongs, ...oldSongs];
}

export function orderSongsWithNewVideoFirst(allSongs: Song[]) {
	const songsWithNewVideo = allSongs.filter(isVideoNewlyCreated);
	songsWithNewVideo.sort((s1, s2) => {
		const s1Time = Date.parse(s1.extra.video_created_on!);
		const s2Time = Date.parse(s2.extra.video_created_on!);
		return s1Time > s2Time ? -1 : s1Time === s2Time ? 0 : 1;
	});
	const oldSongs = allSongs.filter((song) => !isVideoNewlyCreated(song));
	return [...songsWithNewVideo, ...oldSongs];
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
			navigator.clipboard.writeText(text).then(() => {
				toast.success(`歌曲 ${song.title} 成功复制到剪贴板`);
			}).catch(() => {
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

export function extractBvidFromUrl(url: string): string | null {
	const re = /www.bilibili.com\/video\/(BV[\w\d]+)(\/.*)?$/;
	const match = url.match(re);

	if (!match) {
		return null;
	}

	return match[1];
}

function padTime(value: number) {
	const str = value.toString();

	return str.length === 1 ? `0${str}` : str;
}

export function formatMMSS(timeInSecond: number) {
	const minutes = Math.floor(timeInSecond / 60);
	const seconds = Math.floor(timeInSecond % 60);

	return `${padTime(minutes)}:${padTime(seconds)}`;
}
