import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import type {
	Song,
	VtuberProfile,
	Theme,
	VtuberExternalLink,
} from "@prisma/client";
import {
	getVtuberProfileNoCache,
	createVtuberProfile,
	updateVtuberProfile,
	deleteTheme,
	createExternalLink,
	updateExternalLink,
	deleteExternalLink,
	updateSong,
	deleteSong,
	createSong,
	readSongAllNoCacheLatest,
	createThemeForProfile,
	updateThemeForProfile,
} from "@/app/actions/crud";
import {
	type QueryClient,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export const queryClientAtom = atom<QueryClient | null>(null);

export const songsAtom = atomWithQuery((get) => ({
	queryKey: ["songs"],
	queryFn: async () => {
		const songs = await readSongAllNoCacheLatest();
		return songs.songs;
	},
}));

export const useCreateSongMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		{
			mutationFn: async (song: Song) => {
				const result = await createSong(song);
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
				const result = await updateSong(song);
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
				const result = await deleteSong(id);
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
			song.remark.toLowerCase().includes(searchQuery.toLowerCase()) ||
			song.lyricsFragment?.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});
});

export const vtuberProfileAtom = atomWithQuery((get) => ({
	queryKey: ["profile"],
	queryFn: async () => {
		const profile = await getVtuberProfileNoCache();

		if (!profile.success) {
			throw new Error(profile.message);
		}

		return profile.profile;
	},
}));

export const themesAtom = atom(
	(get) => get(vtuberProfileAtom).data?.themes ?? [],
);
export const externalLinksAtom = atom(
	(get) => get(vtuberProfileAtom).data?.externalLinks ?? [],
);

export const useCreateVtuberProfileMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		{
			mutationFn: async (profile: VtuberProfile) => {
				const result = await createVtuberProfile(
					profile.name,
					profile.metaTitle,
					profile.metaDescription ?? "",
					profile.mid,
					profile.roomId,
				);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profile"] });
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
				queryClient.invalidateQueries({ queryKey: ["profile"] });
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
				if (!theme.name) {
					throw new Error("主题名称不能为空");
				}

				if (!theme.description) {
					throw new Error("主题描述不能为空");
				}

				const result = await createThemeForProfile(
					theme.name,
					theme.description,
					theme.avatarImagePath ?? "",
					theme.backgroundImagePath ?? "",
					theme.faviconImagePath ?? "",
					theme.isActive,
					theme.vtuberProfileId,
				);

				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profile"] });
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
				queryClient.invalidateQueries({ queryKey: ["profile"] });
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
				const result = await deleteTheme(id);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profile"] });
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
				if (!link.value) {
					throw new Error("链接不能为空");
				}

				if (!link.href) {
					throw new Error("链接不能为空");
				}

				const result = await createExternalLink({
					value: link.value,
					icon: link.icon ?? undefined,
					href: link.href,
					displayOrder: link.displayOrder ?? undefined,
					vtuberProfileId: link.vtuberProfileId,
				});

				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profile"] });
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
				const result = await updateExternalLink(link);
				if (!result.success) {
					throw new Error(result.message);
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profile"] });
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
				const result = await deleteExternalLink(id);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["profile"] });
			},
		},
		queryClient,
	);
};

// export const profileAtom = atom<VtuberProfile | null>(null);
// export const isLoadingProfileAtom = atom<boolean>(false);
// export const profileErrorAtom = atom<Error | null>(null);

// export const fetchProfileAtom = atom(
// 	null,
// 	async (get, set) => {
// 		set(isLoadingProfileAtom, true);
// 		set(profileErrorAtom, null);
// 		try {
// 			const profile = await getVtuberProfile();
// 			set(profileAtom, profile);
// 		} catch (error) {
// 			set(profileErrorAtom, error as Error);
// 		} finally {
// 			set(isLoadingProfileAtom, false);
// 		}
// 	}
// );
