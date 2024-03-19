"use client";

import { Song } from "@prisma/client";
import { useEffect, useState } from "react";
import SongList from "./SongList";
import SearchGrid from "./SearchGrid";
import { Icons } from "./Icons";
import ChineseInput from "./ChineseInput";
import { Button } from "./ui/button";
import { onCopyToClipboard, shuffleArray } from "@/lib/utils";

interface PropType {
  allSongs: Song[];
}

export type SongFilter = (song: Song) => boolean;
export type SongFilterBuilder<T> = (arg: T) => SongFilter;

export interface Filter {
  value: string;
  predicate: SongFilter;
}

const filterOnGenre: SongFilterBuilder<string> = (tag) => (song) => {
  return song.genre.indexOf(tag) != -1;
};

const filterOnCaptain: SongFilter = (song) =>
  song.remark.indexOf("当日限定") != -1;

const filterOnOriginal: SongFilter = (song) =>
  song.remark.indexOf("原创") != -1;

const filterOnPaid: SongFilter = (song) => song.remark.indexOf("SC点歌") != -1;

//TODO(yangchen): 其他语种

const filterAll = {
  value: "全部",
  predicate: () => true,
};

const filters: Filter[] = [
  filterAll,
  {
    value: "流行",
    predicate: filterOnGenre("流行"),
  },
  {
    value: "古风",
    predicate: filterOnGenre("古风"),
  },
  {
    value: "民谣",
    predicate: filterOnGenre("民谣"),
  },
  {
    value: "上船当日限定",
    predicate: filterOnCaptain,
  },
  {
    value: "原创",
    predicate: filterOnOriginal,
  },
  {
    value: "付费",
    predicate: filterOnPaid,
  },
];

export default function SongPanel({ allSongs: originalData }: PropType) {
  const [currentFilter, setCurrentFilter] = useState<Filter>(filterAll);
  const [searchText, setSearchText] = useState<string>("");
  const [finalData, setFinalData] = useState<Song[]>([...originalData]);

  const containSearchTextInTitleOrArtist = (song: Song, text: string) => {
    if (text.length === 0) {
      return true;
    }

    return song.title.indexOf(text) != -1 || song.artist.indexOf(text) != -1;
  };

  const combinedFilter = (song: Song) => {
    return (
      currentFilter.predicate(song) &&
      containSearchTextInTitleOrArtist(song, searchText)
    );
  };

  useEffect(() => {
    setFinalData(originalData.filter(combinedFilter));
  }, [currentFilter, searchText]);

  const onFilterChange = (selectedFilter: Filter) => {
    // We would like the user to be able to return to the original
    // order after playing with shuffle by simply re-clicking the
    // "全部" filter.
    setCurrentFilter({ ...selectedFilter });
  };

  const onSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const onShuffle = () => {
    setFinalData((data) => shuffleArray(data));
  };

  const onCopyRandom = () => {
    const randomIdx = Math.floor(Math.random() * finalData.length);
    onCopyToClipboard(finalData[randomIdx]);
  };

  return (
    <div>
      <div className="p-0 md:p-2 w-11/12 md:w-8/12 m-auto border-2 border-black rounded-2xl">
        <div className="w-full">
          <SearchGrid
            heading={
              <div className="text-center">
                <Icons.search className="inline align-text-top" />
                <span className="text-lg font-extrabold">
                  挑个想听的类别呗~
                </span>
              </div>
            }
            filters={filters}
            onFilterChange={onFilterChange}
            selectedFilter={currentFilter}
          />
        </div>
      </div>
      <div className="h-4"></div>
      <div className="p-0 w-11/12 md:w-8/12 m-auto flex flex-row flex-wrap">
        <ChineseInput
          placeholder="搜索"
          className="flex-[0_0_auto] w-full md:w-2/3 border-2 rounded-3xl pl-2 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-2 text-base"
          onValueChange={onSearchTextChange}
        />
        <Button
          variant="outline"
          className="flex-[0_0_auto] w-full md:w-1/6 rounded-3xl border-2"
          onClick={onShuffle}
        >
          打乱顺序👻
        </Button>
        <Button
          variant="outline"
          className="flex-[0_0_auto] w-full md:w-1/6 rounded-3xl border-2"
          onClick={onCopyRandom}
        >
          随便听听
        </Button>
      </div>
      <div className="h-4"></div>
      <div className="p-0 md:p-1 w-11/12 md:w-8/12 m-auto border-2 rounded-2xl">
        <SongList songs={finalData}></SongList>
      </div>
    </div>
  );
}
