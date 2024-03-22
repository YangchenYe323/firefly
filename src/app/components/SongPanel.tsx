"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dislikeSong, likeSong } from "../actions/reaction";
import {
  onCopyToClipboard,
  orderNewSongsFirst,
  shuffleArray,
} from "@/lib/utils";
import { useEffect, useState } from "react";

import { Button } from "../../components/ui/button";
import ChineseInput from "../../components/ChineseInput";
import { Icons } from "../../components/Icons";
import SearchGrid from "./SearchGrid";
import { Song } from "@/generated/client";
import SongTableRow from "./SongTableRow";
import { toast } from "sonner";

interface PropType {
  allSongs: Song[];
}

export type SongFilter = (song: Song) => boolean;
export type SongFilterBuilder<T> = (arg: T) => SongFilter;

export interface Filter {
  value: string;
  predicate: SongFilter;
}

const filterForeignLang: SongFilter = (song) => {
  return song.lang.length > 1 || song.lang[0] != "国语";
};

const filterOnTag: SongFilterBuilder<string> = (tag) => (song) => {
  return song.tag.indexOf(tag) != -1;
};

const filterOnCaptain: SongFilter = (song) =>
  song.remark.indexOf("当日限定") != -1;

const filterOnOriginal: SongFilter = (song) =>
  song.remark.indexOf("原创") != -1;

const filterOnPaid: SongFilter = (song) => song.remark.indexOf("SC点歌") != -1;

const filterOnUrlAvailable: SongFilter = (song) => song.url != null;

const filterAll = {
  value: "全部",
  predicate: () => true,
};

const filters: Filter[] = [
  filterAll,
  {
    value: "流行",
    predicate: filterOnTag("流行"),
  },
  {
    value: "古风",
    predicate: filterOnTag("古风"),
  },
  {
    value: "民谣",
    predicate: filterOnTag("民谣"),
  },
  {
    value: "其他语种",
    predicate: filterForeignLang,
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
  {
    value: "歌切链接",
    predicate: filterOnUrlAvailable,
  },
];


export const getNumLikes = (song: Song) => {
  if (
    song.extra &&
    typeof song.extra == "object" &&
    "numLikes" in song.extra &&
    typeof song.extra.numLikes == "number"
  ) {
    return song.extra.numLikes;
  }

  return 0;
};

export const getNumDislikes = (song: Song) => {
  if (
    song.extra &&
    typeof song.extra == "object" &&
    "numDislikes" in song.extra &&
    typeof song.extra.numDislikes == "number"
  ) {
    return song.extra.numDislikes;
  }

  return 0;
};

export default function SongPanel({ allSongs }: PropType) {
  const [originalData, setOriginalData] = useState(orderNewSongsFirst(allSongs));
  const [currentFilter, setCurrentFilter] = useState<Filter>(filterAll);
  const [searchText, setSearchText] = useState<string>("");
  const [finalData, setFinalData] = useState<Song[]>([]);

  const containSearchTextInTitleOrArtist = (song: Song, text: string) => {
    if (text.length === 0) {
      return true;
    }

    return song.title.indexOf(text) != -1 || song.artist.indexOf(text) != -1;
  };

  useEffect(() => {
    const combinedFilter = (song: Song) => {
      return (
        currentFilter.predicate(song) &&
        containSearchTextInTitleOrArtist(song, searchText)
      );
    };

    const filteredData = originalData.filter(combinedFilter);
    setFinalData(filteredData);
  }, [currentFilter, searchText, originalData]);

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
    // Create a random seed string
    setFinalData(data => shuffleArray(data));
  };

  const onCopyRandom = () => {
    const randomIdx = Math.floor(Math.random() * finalData.length);
    onCopyToClipboard(finalData[randomIdx]);
  };

  return (
    <div>
      <div className="p-0 md:p-2 w-11/12 md:w-8/12 m-auto border rounded-2xl bg-hikari_blue/20">
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
          className="flex-[0_0_auto] w-full md:w-2/3 border rounded-3xl pl-2 text-base bg-white/80"
          onValueChange={onSearchTextChange}
        />
        <Button
          variant="outline"
          className="flex-[0_0_auto] w-full md:w-1/6 rounded-3xl border bg-white/80"
          onClick={onShuffle}
        >
          换个顺序👻
        </Button>
        <Button
          variant="outline"
          className="flex-[0_0_auto] w-full md:w-1/6 rounded-3xl border bg-white/80"
          onClick={onCopyRandom}
        >
          随便听听
        </Button>
      </div>
      <div className="h-4"></div>
      <div className="p-0 md:p-1 w-11/12 md:w-8/12 m-auto border rounded-2xl bg-hikari_lavender_lighter/80">
        <Table className="border-collapse">
          <TableHeader className="border-b-2 border-black">
            <TableRow>
              <TableHead className="w-1/6"></TableHead>
              <TableHead className="w-2/5 text-sm md:text-base font-medium text-black text-start whitespace-nowrap">
                歌名
              </TableHead>
              <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center whitespace-nowrap">
                歌手
              </TableHead>
              <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center whitespace-nowrap">
                语种
              </TableHead>
              <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center whitespace-nowrap">
                标签
              </TableHead>
              <TableHead className="w-1/5 text-sm md:text-base font-medium text-black text-center whitespace-nowrap">
                备注
              </TableHead>
              <TableHead className="w-1/3 text-sm md:text-base font-medium text-black text-center whitespace-nowrap">
                反应
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {finalData.map((song) => {
              return (
                <SongTableRow
                  song={song}
                  key={song.id}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="py-4 px-10 w-11/12 md:w-8/12 m-auto mt-4 text-center border-t border-b border-t-black border-b-black">
        <span className="font-alex font-thin text-3xl">
          And in case I don’t see you, good afternoon, good evening and good
          night!
        </span>
      </div>
    </div>
  );
}
