import { type ClassValue, clsx } from "clsx";

import { Song } from "@/generated/client";
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

export function wontSing(song: Song) {
  return song.tag.indexOf("NO") !== -1;
}

export enum LimitedFor {
  Captain,
  Admiral,
  Governor,
}

export function getLimitedFor(song: Song) {
  if (song.remark.indexOf("上总") !== -1 || song.remark.indexOf("总督") !== -1) {
    return LimitedFor.Governor;
  }

  if (song.remark.indexOf("上提") !== -1 || song.remark.indexOf("提督") !== -1) {
    return LimitedFor.Admiral;
  }

  if (song.remark.indexOf("上舰") !== -1 || song.remark.indexOf("舰长") !== -1) {
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

export function onCopyToClipboard(song: Song) {
  copy(`点歌 ${song.title}`, {
    format: "text/plain",
  });
  toast.success(`歌曲 ${song.title} 成功复制到剪贴板`);
}
