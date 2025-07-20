"use server";

import { PremiumStatus, type Song, type SuperChat, type Theme, type VtuberExternalLink, type VtuberProfile, type VtuberSong } from "@prisma/client";
import prisma from "@/db";
import { cookies } from "next/headers";
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

	const profile = await prisma.vtuberProfile.findFirst({
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

				orderBy: [
					{
						pubdate: {
							sort: "desc",
							nulls: "last",
						}
					},
					{
						createdOn: "desc",
					},
				]
			},
			// Live recording archives are only conditionally fetched in the main page as it can be huge, and
			// it's not the main tab. Fetching will be initiated in the corresponding tab by the frontend
		},
	});

	if (!profile) {
		return {
			success: false,
			message: "Profile not found",
		};
	}

	return {
		success: true,
		profile,
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

	const profileToUpdate = {
		...profile,
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