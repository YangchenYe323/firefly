/**
 * This file is the jotai store for the admin page.
 * 
 * It is used to manage the state of the admin page, including the songs, vtuber profiles, themes, external links, etc.
 * 
 * It is also used to manage the mutations for the admin page, including the creation, update, and deletion of the songs, vtuber profiles, themes, external links, etc.
 * 
 * It is also used to manage the queries for the admin page, including the fetching of the songs, vtuber profiles, themes, external links, etc.
 * 
 */

import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import type {
	Song,
	VtuberSong,
	VtuberProfile,
	Theme,
	VtuberExternalLink,
} from "@prisma/client";
import {
	listSongs,
	createSong as createSongV2,
	updateSong as updateSongV2,
	deleteSong as deleteSongV2,
	listVtuberSongs,
	createVtuberSong,
	updateVtuberSong,
	deleteVtuberSong,
	listSuperChats,
} from "@/app/actions/v2/song";
import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { createExternalLinkForProfile, createThemeForProfile, createVtuberProfile, deleteExternalLinkForProfile, deleteThemeForProfile, listVtuberProfilesForAdmin, updateExternalLinkForProfile, updateThemeForProfile, updateVtuberProfile, deleteVtuberProfile } from "@/app/actions/v2/profile";

export const songsAtom = atomWithQuery((get) => ({
	queryKey: ["songs"],
	queryFn: async () => {
		const result = await listSongs();
		if (!result.success) {
			throw new Error(result.message);
		}
		return result.songs || [];
	},
}));

export const useCreateSongMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		{
			mutationFn: async (song: Song) => {
				const result = await createSongV2(song);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["songs"] });
			},
		},
		queryClient,
	);
};

export const useUpdateSongMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		{
			mutationFn: async (song: Song) => {
				const result = await updateSongV2(song);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["songs"] });
			},
		},
		queryClient,
	);
};

export const useDeleteSongMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (id: number) => {
				const result = await deleteSongV2(id);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["songs"] });
			},
		},
		queryClient,
	);
};

// Vtuber Songs atoms and mutations
export const vtuberSongsAtom = atomWithQuery((get) => {
	const profile = get(selectedProfileAtom);
	
	return {
		queryKey: ["vtuber-songs", profile?.id],
		queryFn: async () => {
			if (!profile) {
				return [];
			}

			const result = await listVtuberSongs(profile.id);

			if (!result.success) {
				throw new Error(result.message);
			}

			return result.vtuberSongs || [];
		},
		enabled: !!profile,
	};
});

export const useCreateVtuberSongMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		{
			mutationFn: async (vtuberSong: VtuberSong) => {
				const result = await createVtuberSong(vtuberSong);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["vtuber-songs"] });
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useUpdateVtuberSongMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		{
			mutationFn: async (vtuberSong: VtuberSong) => {
				const result = await updateVtuberSong(vtuberSong);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["vtuber-songs"] });
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useDeleteVtuberSongMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (id: number) => {
				const result = await deleteVtuberSong(id);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["vtuber-songs"] });
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

// SuperChat atoms
export const superChatsAtom = atomWithQuery((get) => ({
	queryKey: ["super-chats"],
	queryFn: async () => {
		const result = await listSuperChats();
		if (!result.success) {
			throw new Error(result.message);
		}
		return result.superChats || [];
	},
}));

// Admin UI state atoms (local state only)
export const searchQueryAtom = atom<string>("");
// Admin UI state atoms (local state only)
export const showOnlyWithoutLyricsAtom = atom<boolean>(false);

// Derived atoms for filtered data
export const filteredSongsAtom = atom((get) => {
	const songs = get(songsAtom);
	const searchQuery = get(searchQueryAtom);
	const showOnlyWithoutLyrics = get(showOnlyWithoutLyricsAtom);

	return songs.data?.filter((song: Song) => {
		if (showOnlyWithoutLyrics && song.lyricsFragment) {
			return false;
		}
		return (
			song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
			song.lang.some((lang: string) =>
				lang.toLowerCase().includes(searchQuery.toLowerCase()),
			) ||
			song.tag.some((tag: string) =>
				tag.toLowerCase().includes(searchQuery.toLowerCase()),
			) ||
			song.lyricsFragment?.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});
});

export const vtuberProfilesAtom = atomWithQuery((get) => ({
	queryKey: ["profiles"],
	queryFn: async () => {
		const result = await listVtuberProfilesForAdmin();

		if (!result.success) {
			throw new Error(result.message);
		}

		return result.profiles || [];
	},
}));

// Selected profile atom for tracking which profile is currently selected
export const selectedProfileIdAtom = atom<number | null>(null);

// Derived atom for the currently selected profile
export const selectedProfileAtom = atom((get) => {
	const profiles = get(vtuberProfilesAtom);
	const selectedId = get(selectedProfileIdAtom);

	// Force dependency on selectedId to ensure reactivity
	if (!profiles.data || profiles.data.length === 0) {
		return null;
	}
	
	const selectedProfile = profiles.data.find(profile => profile.id === selectedId);

	
	return selectedProfile || profiles.data[0] || null;
});

export const themesAtom = atom(
	(get) => get(selectedProfileAtom)?.themes ?? [],
);
export const externalLinksAtom = atom(
	(get) => get(selectedProfileAtom)?.externalLinks ?? [],
);

export const useCreateVtuberProfileMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (profile: VtuberProfile) => {
				const result = await createVtuberProfile(profile);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useUpdateVtuberProfileMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (profile: VtuberProfile) => {
				const result = await updateVtuberProfile(profile);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useCreateThemeMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (theme: Theme) => {
				const result = await createThemeForProfile(theme);

				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useUpdateThemeMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (theme: Theme) => {
				const result = await updateThemeForProfile(theme);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useDeleteThemeMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (id: number) => {
				const result = await deleteThemeForProfile(id);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useCreateExternalLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (link: VtuberExternalLink) => {
				const result = await createExternalLinkForProfile(link);

				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useUpdateExternalLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (link: VtuberExternalLink) => {
				const result = await updateExternalLinkForProfile(link);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useDeleteExternalLinkMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (id: number) => {
				const result = await deleteExternalLinkForProfile(id);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};

export const useDeleteVtuberProfileMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (id: number) => {
				const result = await deleteVtuberProfile(id);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profiles"] });
			},
		},
		queryClient,
	);
};
