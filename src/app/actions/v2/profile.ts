"use server";

import type { Domain, Prisma, Song, SuperChat, Theme, VtuberExternalLink, VtuberProfile, VtuberSong } from "@prisma/client";
import prisma from "@/db";
import { cookies, headers } from "next/headers";
import type { ActionReturnTypeBase } from "../types";
import { auth } from "@/lib/auth";
import { cache } from "react";

export interface VtuberSongWithReferences extends VtuberSong {
	song: Song;
	scStatus: SuperChat | null;
}

export interface VtuberProfileWithReferences extends VtuberProfile {
	defaultTheme: Theme | null;
	themes: Theme[];
	externalLinks: VtuberExternalLink[];
	vtuberSongs: VtuberSongWithReferences[];
	// The domain from which the profile is accessed. Could be null if the profile is accessed from the default
	// domain and URL path.
	entryDomain?: Domain
}

interface GetVtuberProfileReturnType extends ActionReturnTypeBase {
	profile?: VtuberProfileWithReferences;
}

/**
 * Add a layer of caching as the function needs to be called both for generating the metadata and for
 * rendering the main page.
 */
export const getVtuberProfileCached = cache(async () => {
	return getVtuberProfile();
});


/**
 * Get everything about a vtuber's profile used for rendering the vtuber's first page.
 * 
 * Note: mid is not accepted as argument. Now we only have one profile, when we have more,
 * the profile will be deduced from the request domain.
 * 
 * @returns The profile and all the related data.
 */
export async function getVtuberProfile(): Promise<GetVtuberProfileReturnType> {
	// Disable cache so nextjs doesn't produce a fxxking static page : )
	const _cookies = cookies();

	// Check if the request is from a domain we know about
	const headersList = headers();
	const host = headersList.get('host');

	let domainId: number | null = null;
	let entryDomain: Domain | null = null;
	
	if (host) {
		// Find domain by suffix matching (e.g., if host is "a.xyz.com" and we have "xyz.com" registered)
		const domain = await prisma.domain.findFirst({
			where: {
				name: {
					endsWith: host.split('.').slice(-2).join('.') // Try to match with last two parts
				}
			}
		});

		if (!domain) {
			// If no match with last two parts, try with the full host
			const fullDomain = await prisma.domain.findFirst({
				where: {
					name: host
				}
			});
			
			if (fullDomain) {
				domainId = fullDomain.id;
				entryDomain = fullDomain;
			}
		} else {
			domainId = domain.id;
			entryDomain = domain;
		}
	}

	const profileQuery: Prisma.VtuberProfileFindFirstArgs = {
		include: {
			// Fetch the default theme
			defaultTheme: true,
			// Fetch all themes
			themes: {
				orderBy: {
					createdOn: "desc",
				},
			},
			// Fetch all external links
			externalLinks: {
				orderBy: {
					displayOrder: "asc",
				},
			},

			// Fetch all Vtuber Songs along with the song metadata
			vtuberSongs: {
				include: {
					song: true,
					scStatus: true,
				},
				where: {
					hidden: false,
				},
				orderBy: [
					{
						createdOn: "desc",
					},
				]
			},
		},
	}

	// If we found a domain, filter by that domain's profile
	if (domainId) {
		profileQuery.where = {
			domains: {
				some: {
					id: domainId
				}
			}
		};
	}

	const profile = await prisma.vtuberProfile.findFirst(profileQuery);

	if (!profile) {
		return {
			success: false,
			message: "Profile not found",
		};
	}

	// Cast the profile to the correct type and add the entryDomain
	const returnProfile = profile as VtuberProfileWithReferences;
	returnProfile.entryDomain = entryDomain || undefined;

	return {
		success: true,
		profile: returnProfile,
	};
}

export interface VtuberProfileWithThemesAndLinks extends VtuberProfile {
	defaultTheme: Theme | null;
	themes: Theme[];
	externalLinks: VtuberExternalLink[];
	domains: Domain[];
}

interface GetVtuberProfileForAdminReturnType extends ActionReturnTypeBase {
	profiles?: VtuberProfileWithThemesAndLinks[];
}

/**
 * The site admin's API to retrieve all the profiles.
 * 
 * @returns The profile.
 */
export async function listVtuberProfilesForAdmin(): Promise<GetVtuberProfileForAdminReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "无法获取虚拟主播信息，请先登录" };
	}

	const profiles = await prisma.vtuberProfile.findMany({
		include: {
			// Fetch the default theme
			defaultTheme: true,
			// Fetch all themes
			themes: true,
			// Fetch all external links
			externalLinks: true,
			// Fetch the domains
			domains: true,
		},
	});

	if (!profiles) {
		return {
			success: false,
			message: "Profile not found",
		};
	}

	return {
		success: true,
		profiles,
	};
}

interface CreateVtuberProfileReturnType extends ActionReturnTypeBase {
	profile?: VtuberProfile;
}

/**
 * Create a new vtuber profile.
 * 
 * @param profile - The profile to create.
 * @returns The created profile.
 */
export async function createVtuberProfile(profile: VtuberProfile): Promise<CreateVtuberProfileReturnType> {
	const authResult = await auth();

	if (!authResult) {
		return { success: false, message: "无法创建新虚拟主播，请先登录" };
	}

	const validationResult = validateVtuberProfile(profile);
	if (validationResult) {
		return validationResult;
	}

	const profileToCreate = {
		...profile,
		// We don't handle other references in the create API. The workflow is to first
		// create the profile, then update the profile with the references.
		defaultThemeId: undefined,
		themes: undefined,
		externalLinks: undefined,
		vtuberSongs: undefined,
		liveRecordingArchives: undefined,
		// The below fields are not editable, let the database handle them
		createdOn: undefined,
		updatedOn: undefined,
	}

	const newProfile = await prisma.vtuberProfile.create({
		data: profileToCreate,
	});

	return { success: true, profile: newProfile };
}

interface UpdateVtuberProfileReturnType extends ActionReturnTypeBase {
	profile?: VtuberProfile;
}

/**
 * Update a vtuber profile.
 * 
 * @param profile - The profile to update.
 * @returns The updated profile.
 */
export async function updateVtuberProfile(profile: VtuberProfile): Promise<UpdateVtuberProfileReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "无法更新虚拟主播信息，请先登录" };
	}

	const validationResult = validateVtuberProfile(profile);
	if (validationResult) {
		return validationResult;
	}

	const profileToUpdate = {
		...profile,
		id: undefined,
		// We don't update any relations, just the profile itself
		defaultThemeId: undefined,
		defaultTheme: undefined,
		themes: undefined,
		externalLinks: undefined,
		vtuberSongs: undefined,
		liveRecordingArchives: undefined,
		// The below fields are not editable, let the database handle them
		createdOn: undefined,
		updatedOn: undefined,
	}

	const updatedProfile = await prisma.vtuberProfile.update({
		where: { id: profile.id },
		data: profileToUpdate,
	});

	return { success: true, profile: updatedProfile };
}

interface DeleteVtuberProfileReturnType extends ActionReturnTypeBase {
	profile?: VtuberProfile;
}

/**
 * Delete a vtuber profile.
 * 
 * @param id - The id of the profile to delete.
 * @returns The deleted profile.
 */
export async function deleteVtuberProfile(id: number): Promise<DeleteVtuberProfileReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "无法删除虚拟主播，请先登录" };
	}

	const deletedProfile = await prisma.vtuberProfile.delete({
		where: { id },
	});

	return { success: true, profile: deletedProfile };
}

interface CreateThemeForProfileReturnType extends ActionReturnTypeBase {
	theme?: Theme;
}

/**
 * Create a new theme for a vtuber profile.
 * 
 * @param theme - The theme to create. It's vtuberProfileId is required to point to the profile
 * @returns The created theme.
 */
export async function createThemeForProfile(theme: Theme): Promise<CreateThemeForProfileReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "无法创建新主题，请先登录" };
	}

	const validationResult = validateTheme(theme);
	if (validationResult) {
		return validationResult;
	}

	const themeToCreate = {
		...theme,
		// The below fields are not editable, let the database handle them
		createdOn: undefined,
		updatedOn: undefined,
	}

	const newTheme = await prisma.theme.create({
		data: themeToCreate,
	});

	return { success: true, theme: newTheme };
}

interface UpdateThemeForProfileReturnType extends ActionReturnTypeBase {
	theme?: Theme;
}

/**
 * Update a theme for a vtuber profile.
 * 
 * @param theme - The theme to update.
 * @returns The updated theme.
 */
export async function updateThemeForProfile(theme: Theme): Promise<UpdateThemeForProfileReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "无法更新主题，请先登录" };
	}

	const validationResult = validateTheme(theme);
	if (validationResult) {
		return validationResult;
	}

	const themeToUpdate = {
		...theme,
		// The below fields are not editable, let the database handle them
		createdOn: undefined,
		updatedOn: undefined,
	}

	const updatedTheme = await prisma.theme.update({
		where: { id: theme.id },
		data: themeToUpdate,
	});

	return { success: true, theme: updatedTheme };
}

interface DeleteThemeForProfileReturnType extends ActionReturnTypeBase {
	theme?: Theme;
}

export async function deleteThemeForProfile(id: number): Promise<DeleteThemeForProfileReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "无法删除主题，请先登录" };
	}

	const deletedTheme = await prisma.theme.delete({
		where: { id },
	});

	return { success: true, theme: deletedTheme };
}

interface CreateExternalLinkForProfileReturnType extends ActionReturnTypeBase {
	externalLink?: VtuberExternalLink;
}

/**
 * Create a new external link for a vtuber profile.
 * 
 * @param externalLink - The external link to create. It's vtuberProfileId is required to point to the profile
 * @returns The created external link.
 */
export async function createExternalLinkForProfile(externalLink: VtuberExternalLink): Promise<CreateExternalLinkForProfileReturnType> {

	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "无法创建新外部链接，请先登录" };
	}

	const validationResult = validateExternalLink(externalLink);
	if (validationResult) {
		return validationResult;
	}

	const externalLinkToCreate = {
		...externalLink,
		// The below fields are not editable, let the database handle them
		createdOn: undefined,
		updatedOn: undefined,
	}

	const newExternalLink = await prisma.vtuberExternalLink.create({
		data: externalLinkToCreate,
	});

	return { success: true, externalLink: newExternalLink };
}

interface UpdateExternalLinkForProfileReturnType extends ActionReturnTypeBase {
	externalLink?: VtuberExternalLink
}

export async function updateExternalLinkForProfile(externalLink: VtuberExternalLink): Promise<UpdateExternalLinkForProfileReturnType> {
	const authResult = await auth();
	if (!authResult) {
		return { success: false, message: "无法更新外部链接，请先登录" };
	}

	const validationResult = validateExternalLink(externalLink);
	if (validationResult) {
		return validationResult;
	}

	const externalLinkToUpdate = {
		...externalLink,
		// The below fields are not editable, let the database handle them
		createdOn: undefined,
		updatedOn: undefined,
	}

	const updatedExternalLink = await prisma.vtuberExternalLink.update({
		where: { id: externalLink.id },
		data: externalLinkToUpdate,
	});

	return { success: true, externalLink: updatedExternalLink };
}

interface DeleteExternalLinkForProfileReturnType extends ActionReturnTypeBase {
	externalLink?: VtuberExternalLink;
}

export async function deleteExternalLinkForProfile(id: number): Promise<DeleteExternalLinkForProfileReturnType> {
	const authResult = await auth();

	if (!authResult) {
		return { success: false, message: "无法删除外部链接，请先登录" };
	}

	const deletedExternalLink = await prisma.vtuberExternalLink.delete({
		where: { id },
	});

	return { success: true, externalLink: deletedExternalLink };
}

/**
 * Validate a vtuber profile for creation or update
 * 
 * @param profile - The profile to validate.
 * @returns The validation result.
 */
function validateVtuberProfile(profile: VtuberProfile): ActionReturnTypeBase | null {
	if (!profile.name) {
		return { success: false, message: "主播B站名称不能为空" };
	}

	if (!profile.mid) {
		return { success: false, message: "B站UID不能为空" };
	}

	if (!profile.roomId) {
		return { success: false, message: "B站直播间ID不能为空" };
	}

	return null;
}

/**
 * Validate a theme for creation or update
 * 
 * @param theme - The theme to validate.
 * @returns The validation result.
 */
function validateTheme(theme: Theme): ActionReturnTypeBase | null {
	if (!theme.avatarImagePath) {
		return { success: false, message: "头像不能为空" };
	}

	if (!theme.backgroundImagePath) {
		return { success: false, message: "背景图不能为空" };
	}

	if (!theme.faviconImagePath) {
		return { success: false, message: "favicon不能为空" };
	}

	return null;
}

/**
 * Validate an external link for creation or update
 * 
 * @param externalLink - The external link to validate.
 * @returns The validation result.
 */
function validateExternalLink(externalLink: VtuberExternalLink): ActionReturnTypeBase | null {
	if (!externalLink.value) {
		return { success: false, message: "链接名称不能为空" };
	}

	if (!externalLink.href) {
		return { success: false, message: "链接不能为空" };
	}

	return null;
}

/**
 * Validate a song for creation or update
 * 
 * @param song - The song to validate.
 * @returns The validation result.
 */
function validateSong(song: Song): ActionReturnTypeBase | null {
	if (!song.title) {
		return { success: false, message: "歌曲名称不能为空" };
	}

	if (!song.artist) {
		return { success: false, message: "歌手不能为空" };
	}

	if (!song.lang) {
		return { success: false, message: "语言不能为空" };
	}

	if (!song.tag) {
		return { success: false, message: "标签不能为空" };
	}

	return null;
}

/**
 * Validate a vtuber song for creation or update
 * 
 * @param vtuberSong - The vtuber song to validate.
 * @returns The validation result.
 */
function validateVtuberSong(vtuberSong: VtuberSong): ActionReturnTypeBase | null {
	if (!vtuberSong.songId) {
		return { success: false, message: "歌曲ID不能为空" };
	}

	if (!vtuberSong.vtuberProfileId) {
		return { success: false, message: "主播ID不能为空" };
	}

	return null;
}