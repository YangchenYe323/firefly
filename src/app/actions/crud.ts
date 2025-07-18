"use server";

import type {
	Footer,
	Song,
	Theme,
	VtuberExternalLink,
	VtuberProfile,
} from "@prisma/client";
import type { ActionReturnTypeBase } from "./types";
import { cookies } from "next/headers";
import { extractBvidFromUrl } from "@/lib/utils";
import { getVideoInfo } from "@/lib/bilibili";
import prisma from "@/db";
import { verifyJwtToken } from "@/lib/auth";
import { cache } from "react";

const auth = async () => {
	const currentUser = cookies().get("currentUser")?.value;
	const jwtVerified = currentUser && (await verifyJwtToken(currentUser));
	return jwtVerified;
};

export interface CreateSongReturnType extends ActionReturnTypeBase {
	message?: string;
	song?: Song;
}

export async function createSong(song: Song): Promise<CreateSongReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "Unaothorized" };
	}

	const validation = validateSong(song);
	if (!validation.success) {
		return {
			success: false,
			message: validation.message,
		};
	}

	const newSong = await prisma.song.create({
		data: {
			title: song.title,
			artist: song.artist,
			lang: song.lang,
			tag: song.tag,
			remark: song.remark,
			url: song.url,
			lyrics_fragment: song.lyrics_fragment || null,
			extra: {},
		},
	});

	return { success: true, song: newSong };
}

export interface ReadSongReturnType {
	songs: Song[];
}

export async function readSongAllNoCache(): Promise<ReadSongReturnType> {
	// disable the cache for this server action
	const _cookies = cookies();
	const songs = await prisma.song.findMany({
		orderBy: {
			id: "asc",
		},
	});
	return { songs };
}

export async function readSongAllNoCacheLatest(): Promise<ReadSongReturnType> {
	// disable the cache for this server action
	const _cookies = cookies();
	const songs = await prisma.song.findMany({
		orderBy: {
			created_on: "desc",
		},
	});

	return { songs };
}

export interface UpdateSongReturnType extends ActionReturnTypeBase {
	message?: string;
	song?: Song;
}

export async function updateSong(song: Song): Promise<UpdateSongReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "Unauthorized" };
	}

	const validation = validateSong(song);
	if (!validation.success) {
		return {
			success: false,
			message: validation.message,
		};
	}

	let video_created_on: string | undefined;
	if (song.url) {
		const bvid = extractBvidFromUrl(song.url);
		if (bvid !== null) {
			const response = await getVideoInfo({ bvid });
			if (response.data) {
				const pubdate = response.data.pubdate;
				video_created_on = new Date(pubdate * 1000).toISOString();
			}
		}
	}

	let updatedSong: Song;

	if (video_created_on === null && !(song.extra as any)?.bucket_url) {
		updatedSong = await prisma.song.update({
			where: {
				id: song.id,
			},
			data: {
				title: song.title,
				artist: song.artist,
				lang: song.lang,
				tag: song.tag,
				remark: song.remark,
				url: song.url,
				lyrics_fragment: song.lyrics_fragment || null,
			},
		});
	} else {
		// Unfortunately, we have to read the JSON first and then update the extra field
		const oldSong = await prisma.song.findUnique({
			where: {
				id: song.id,
			},
		});

		if (oldSong === null) {
			return {
				success: false,
				message: "神奇bug，请马上联系星辰Hikari",
			};
		}

		updatedSong = await prisma.song.update({
			where: {
				id: song.id,
			},
			data: {
				title: song.title,
				artist: song.artist,
				lang: song.lang,
				tag: song.tag,
				remark: song.remark,
				url: song.url,
				lyrics_fragment: song.lyrics_fragment || null,
				extra: {
					...oldSong.extra,
					video_created_on,
					bucket_url: (song.extra as any)?.bucket_url,
				},
			},
		});
	}

	return { success: true, song: updatedSong };
}

export async function readFooters(): Promise<Footer[]> {
	const footers = await prisma.footer.findMany();
	return footers;
}

export interface DeleteSongReturnType extends ActionReturnTypeBase {
	message?: string;
}

export async function deleteSong(id: number): Promise<DeleteSongReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "Unauthorized" };
	}

	try {
		await prisma.song.delete({
			where: {
				id: id,
			},
		});

		return { success: true };
	} catch (error) {
		return {
			success: false,
			message: "删除失败，请稍后重试",
		};
	}
}

export interface DeleteSongOccurrenceReturnType extends ActionReturnTypeBase {
	message?: string;
}

export async function deleteSongOccurrence(
	songId: number,
	bvid: string,
): Promise<DeleteSongOccurrenceReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "Unauthorized" };
	}

	try {
		// First find the live recording archive by bvid
		const liveRecordingArchive = await prisma.liveRecordingArchive.findUnique({
			where: { bvid },
		});

		if (!liveRecordingArchive) {
			return { success: false, message: "找不到对应的直播回放记录" };
		}

		// Delete the specific occurrence
		await prisma.songOccurrenceInLive.delete({
			where: {
				songId_liveRecordingArchiveId: {
					songId,
					liveRecordingArchiveId: liveRecordingArchive.id,
				},
			},
		});

		return { success: true };
	} catch (error) {
		console.error("Error deleting song occurrence:", error);
		return {
			success: false,
			message: "删除失败，请稍后重试",
		};
	}
}

export interface GetVtuberProfileReturnType extends ActionReturnTypeBase {
	profile?: VtuberProfileWithThemesAndLinks;
}

export interface VtuberProfileWithThemesAndLinks extends VtuberProfile {
	defaultTheme: Theme | null;
	themes: Theme[];
	externalLinks: VtuberExternalLink[];
}

// Vtuber Profile CRUD Operations
export async function getVtuberProfileNoCache(): Promise<GetVtuberProfileReturnType> {
	const _cookies = cookies();

	const profile = await prisma.vtuberProfile.findFirst({
		include: {
			defaultTheme: true,
			themes: {
				orderBy: {
					createdOn: "desc",
				},
			},
			externalLinks: {
				orderBy: {
					displayOrder: "asc",
				},
			},
		},
	});

	return { success: true, profile: profile || undefined };
}

// Highly optimized cached version using React cache
export const getVtuberProfileCached = cache(
	async (): Promise<GetVtuberProfileReturnType> => {
		return getVtuberProfileNoCache();
	},
);

export interface CreateVtuberProfileReturnType extends ActionReturnTypeBase {
	profile?: any;
}

export async function createVtuberProfile(
	name: string,
	metaTitle: string,
	metaDescription: string,
	mid?: string | null,
	roomId?: string | null,
): Promise<CreateVtuberProfileReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return {
			success: false,
			message: "Unauthorized",
		};
	}

	const exists = await prisma.vtuberProfile.findFirst();
	if (exists) {
		return {
			success: false,
			message: "Profile already exists",
		};
	}

	const profile = await prisma.vtuberProfile.create({
		data: {
			name,
			metaTitle,
			metaDescription,
			mid: mid || null,
			roomId: roomId || null,
		},
	});

	return {
		success: true,
		profile,
	};
}

export interface UpdateVtuberProfileReturnType extends ActionReturnTypeBase {
	profile?: VtuberProfile;
}

export async function updateVtuberProfile(
	profile: VtuberProfile,
): Promise<UpdateVtuberProfileReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return {
			success: false,
			message: "Unauthorized",
		};
	}

	await prisma.vtuberProfile.update({
		where: { id: profile.id },
		data: {
			name: profile.name || undefined,
			mid: profile.mid || undefined,
			roomId: profile.roomId || undefined,
			metaTitle: profile.metaTitle || undefined,
			metaDescription: profile.metaDescription || undefined,
			defaultThemeId: profile.defaultThemeId || undefined,
		},
	});

	return {
		success: true,
		profile,
	};
}

export interface CreateThemeReturnType extends ActionReturnTypeBase {
	theme?: any;
}

export async function createThemeForProfile(
	name: string,
	description: string,
	avatarImagePath: string,
	backgroundImagePath: string,
	faviconImagePath: string,
	isActive: boolean,
	vtuberProfileId: number,
): Promise<CreateThemeReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return {
			success: false,
			message: "Unauthorized",
		};
	}

	const theme = await prisma.theme.create({
		data: {
			name,
			description,
			avatarImagePath,
			backgroundImagePath,
			faviconImagePath,
			isActive,
			vtuberProfileId,
		},
	});

	return {
		success: true,
		theme,
	};
}

export interface UpdateThemeReturnType extends ActionReturnTypeBase {
	theme?: Theme;
}

export async function updateThemeForProfile(
	themeToUpdate: Theme,
): Promise<UpdateThemeReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return {
			success: false,
			message: "Unauthorized",
		};
	}

	const theme = await prisma.theme.update({
		where: { id: themeToUpdate.id },
		data: {
			name: themeToUpdate.name || undefined,
			description: themeToUpdate.description || undefined,
			avatarImagePath: themeToUpdate.avatarImagePath || undefined,
			backgroundImagePath: themeToUpdate.backgroundImagePath || undefined,
			faviconImagePath: themeToUpdate.faviconImagePath || undefined,
			isActive: themeToUpdate.isActive ?? undefined,
		},
	});

	console.log("updated theme", theme);

	return {
		success: true,
		theme,
	};
}

export interface DeleteThemeReturnType extends ActionReturnTypeBase {
	theme?: Theme;
}

export async function deleteTheme(id: number): Promise<DeleteThemeReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return {
			success: false,
			message: "Unauthorized",
		};
	}

	const deletedTheme = await prisma.theme.delete({
		where: { id },
	});

	return {
		success: true,
		theme: deletedTheme,
	};
}

export interface CreateExternalLinkReturnType extends ActionReturnTypeBase {
	link?: VtuberExternalLink;
}

export async function createExternalLink(data: {
	value: string;
	icon?: string;
	href: string;
	displayOrder?: number;
	vtuberProfileId: number;
}): Promise<CreateExternalLinkReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return {
			success: false,
			message: "Unauthorized",
		};
	}

	const link = await prisma.vtuberExternalLink.create({
		data,
	});

	return {
		success: true,
		link,
	};
}

export interface UpdateExternalLinkReturnType extends ActionReturnTypeBase {
	link?: any;
}

export async function updateExternalLink(
	linkToUpdate: VtuberExternalLink,
): Promise<UpdateExternalLinkReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return {
			success: false,
			message: "Unauthorized",
		};
	}

	const link = await prisma.vtuberExternalLink.update({
		where: { id: linkToUpdate.id },
		data: {
			value: linkToUpdate.value || undefined,
			icon: linkToUpdate.icon || undefined,
			href: linkToUpdate.href || undefined,
			displayOrder: linkToUpdate.displayOrder || undefined,
		},
	});

	return {
		success: true,
		link,
	};
}

export interface DeleteExternalLinkReturnType extends ActionReturnTypeBase {
	link?: VtuberExternalLink;
}

export async function deleteExternalLink(
	id: number,
): Promise<DeleteExternalLinkReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return {
			success: false,
			message: "Unauthorized",
		};
	}

	const deletedLink = await prisma.vtuberExternalLink.delete({
		where: { id },
	});

	return {
		success: true,
		link: deletedLink,
	};
}

function validateSong(song: Song) {
	if (!song.title) {
		return {
			success: false,
			message: "歌曲名不能为空",
		};
	}

	// When user tries to remove URL in the admin page, it passes empty string.
	// Sanitize it here.
	if (!song.url) {
		song.url = null;
	}

	if (song.url !== null && !isValidHttpUrl(song.url)) {
		return {
			success: false,
			message: "歌曲链接不合法",
		};
	}

	return { success: true };
}

function isValidHttpUrl(urlString: string) {
	let url: URL;
	try {
		url = new URL(urlString);
	} catch (_) {
		return false;
	}
	return url.protocol === "http:" || url.protocol === "https:";
}
