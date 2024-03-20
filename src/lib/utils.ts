import { type ClassValue, clsx } from "clsx";

import { Song } from "@/generated/client";
import copy from "copy-to-clipboard";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/// Fisher-Yates Shuffle
export function shuffleArray<T>(arr: T[]) {
  const res = [...arr];
  for (let currentIdx = arr.length - 1; currentIdx > 0; currentIdx--) {
    let randomIdx = Math.floor(Math.random() * (currentIdx - 1));
    [res[currentIdx], res[randomIdx]] = [res[randomIdx], res[currentIdx]];
  }
  return res;
}

export function isNewlyAdded(song: Song) {
  const creationDate = song.created_on;
  const today = new Date();
  const lastTwoMonth = new Date(today);
  lastTwoMonth.setDate(0);
  lastTwoMonth.setDate(0);
  lastTwoMonth.setDate(1);
  return creationDate <= today && creationDate >= lastTwoMonth;
}

export function orderNewSongsFirst(allSongs: Song[]) {
  const newSongs = allSongs.filter(isNewlyAdded);
  const oldSongs = allSongs.filter(song => !isNewlyAdded(song));
  return [...newSongs, ...oldSongs];
}

export function onCopyToClipboard(song: Song) {
  copy(song.title, {
    format: "text/plain",
  });
  toast.success(`歌曲 ${song.title} 成功复制到剪贴板`);
}
