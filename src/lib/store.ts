/**
 * This file is the jotai store for the main app page.
 * 
 * It is used to manage the state of the main app page, including the songs, vtuber profiles, themes, external links, etc.
 * 
 * It is also used to manage the queries for the main app page, including the fetching of the songs, vtuber profiles, themes, external links, etc.
 * 
 */

import { atom } from "jotai";
import type { VtuberSongWithReferences, VtuberProfileWithReferences } from "@/app/actions/v2/profile";
import type { Theme, VtuberExternalLink } from "@prisma/client";
import type { Track } from "./player/types";

export interface SongFilter {
    value: string;
    predicate: (vtbSong: VtuberSongWithReferences) => boolean;
}

export const apiUrlAtom = atom<string>(process.env.NEXT_PUBLIC_API_URL!);

// Different from the admin page, the main app stores a single profile, and derive the other states from it, and the single profile is
// initialized only once per page load.
// The profile should contain the following references:
// - vtuberSongs
// - themes
// - externalLinks
// and the vtuberSongs should contain the following references:
// - song
// Recordings and occurrences are managed separately.
export const profileAtom = atom<VtuberProfileWithReferences | null>(null);

export const allVtuberSongsAtom = atom(
    (get) => get(profileAtom)?.vtuberSongs ?? [],
);
export const allThemesAtom = atom<Theme[]>(
    (get) => get(profileAtom)?.themes ?? [],
);
export const allExternalLinksAtom = atom<VtuberExternalLink[]>(
    (get) => get(profileAtom)?.externalLinks ?? [],
);
export const defaultThemeAtom = atom<Theme | null>(
    (get) => get(profileAtom)?.defaultTheme ?? null,
);

export const allLanguageAtom = atom<string[]>(
    (get) => {
        const allVtuberSongs = get(allVtuberSongsAtom);
        const allLanguages = allVtuberSongs.flatMap((vtuberSong) => vtuberSong.song.lang);
        return Array.from(new Set(allLanguages)).sort();
    }
);
export const allTagAtom = atom<string[]>(
    (get) => {
        const allVtuberSongs = get(allVtuberSongsAtom);
        const allTags = allVtuberSongs.flatMap((vtuberSong) => vtuberSong.song.tag);
        return Array.from(new Set(allTags)).sort();
    }
);

export const allFiltersAtom = atom<SongFilter[]>(
    (get) => {
        const allLanguages = get(allLanguageAtom);
        const allTags = get(allTagAtom);

        return [
            {
                value: "全部",
                predicate: () => true,
            },
            {
                value: "可播放",
                predicate: (vtbSong: VtuberSongWithReferences) => {
                    return vtbSong.audioUrl !== null && vtbSong.audioUrl !== "";
                },
            },
            {
                value: "上船当日限定",
                predicate: (vtbSong: VtuberSongWithReferences) => vtbSong.premiumStatus !== null,
            },
            {
                value: "原创",
                predicate: (vtbSong: VtuberSongWithReferences) => vtbSong.remark?.includes("原创") ?? false,
            },
            {
                value: "付费",
                predicate: (vtbSong: VtuberSongWithReferences) => vtbSong.scStatus !== null,
            },
            {
                value: "歌切链接",
                predicate: (vtbSong: VtuberSongWithReferences) => vtbSong.bvid !== null,
            },
            ...allTags.map((tag) => ({
                value: tag,
                predicate: (vtbSong: VtuberSongWithReferences) => vtbSong.song.tag.includes(tag),
            })),
            ...allLanguages.map((language) => ({
                value: language,
                predicate: (vtbSong: VtuberSongWithReferences) => vtbSong.song.lang.includes(language),
            })),
        ]
    }
);

export const selectedFilterAtom = atom<SongFilter | undefined>(undefined);
export const searchTextAtom = atom<string>("");

export const filteredVtuberSongsAtom = atom<VtuberSongWithReferences[]>(
    (get) => {
        const allVtuberSongs = get(allVtuberSongsAtom);
        const selectedFilter = get(selectedFilterAtom);
        const searchText = get(searchTextAtom);

        const filteredVtuberSongs = allVtuberSongs.filter((vtbSong) => {
            if (selectedFilter) {
                if (!selectedFilter.predicate(vtbSong)) {
                    return false;
                }
            }

            if (searchText.length > 0) {
                if (!vtbSong.song.title.includes(searchText) && !vtbSong.song.artist.includes(searchText)) {
                    return false;
                }
            }

            return true;
        });

        return filteredVtuberSongs;
    }
);

export const tracksAtom = atom<Track[]>((get) => {
    const allVtuberSongs = get(allVtuberSongsAtom);
    const playableVtuberSongs = allVtuberSongs.filter((vtbSong) => vtbSong.audioUrl !== null && vtbSong.audioUrl !== "");
    const tracks = playableVtuberSongs.map((vtbSong) => ({
        url: vtbSong.audioUrl!,
        title: vtbSong.song.title,
        artist: vtbSong.song.artist,
    }));

    return tracks;
});