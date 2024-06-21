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
  const lastTwoMonth = new Date();
  lastTwoMonth.setDate(0);
  lastTwoMonth.setDate(0);
  lastTwoMonth.setDate(1);
  return creationDate >= lastTwoMonth;
}

export function isVideoNewlyCreated(song: Song) {
  const video_created = (song.extra as any).video_created_on;
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
  Captain,
  Admiral,
  Governor,
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
    const s1Time = Date.parse((s1.extra as any).video_created_on);
    const s2Time = Date.parse((s2.extra as any).video_created_on);
    return s1Time > s2Time ? -1 : s1Time === s2Time ? 0 : 1;
  });
  const oldSongs = allSongs.filter((song) => !isVideoNewlyCreated(song));
  return [...songsWithNewVideo, ...oldSongs];
}

export function onCopyToClipboard(song: Song) {
  copy(`点歌 ${song.title}`, {
    format: "text/plain",
  });
  toast.success(`歌曲 ${song.title} 成功复制到剪贴板`);
}

export function extractBvidFromUrl(url: string): string | null {
  const re = /www.bilibili.com\/video\/(BV[\w\d]+)(\/.*)?$/;
  const match = url.match(re)!;
  return match[1];
}
