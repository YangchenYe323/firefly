"use client";

import {
  LimitedFor,
  getLimitedFor,
  isNewlyAdded,
  onCopyToClipboard,
  wontSing,
} from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { getNumDislikes, getNumLikes } from "./SongPanel";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { Song } from "@/generated/client";
import { motion } from "framer-motion";

type PropType = {
  song: Song;
  onLikeSong: (id: number) => void;
  onDislikeSong: (id: number) => void;
};

function songScImg(song: Song) {
  if (song.remark.indexOf("30元SC") !== -1) {
    return "/icons/30.png";
  }
  if (song.remark.indexOf("100元SC") !== -1) {
    return "/icons/100.png";
  }
  if (song.remark.indexOf("200元SC") !== -1) {
    return "/icons/200.png";
  }
  if (song.remark.indexOf("1000元SC") !== -1) {
    return "/icons/1000.png";
  }
  if (song.remark.indexOf("10000元SC") !== -1) {
    return "/icons/10000.png";
  }
  return null;
}

export default function SongTableRow({
  song,
  onLikeSong,
  onDislikeSong,
}: PropType) {
  const onCopySong = () => onCopyToClipboard(song);

  const isNewSong = isNewlyAdded(song);
  const limitedFor = getLimitedFor(song);
  const no = wontSing(song);
  const scImg = songScImg(song);

  return (
    <TableRow
      key={song.id}
      className="h-0.5 md:h-1 hover:bg-accent hover:text-accent-foreground"
      onClick={onCopySong}
    >
      <TableCell className="p-0 md:p-0.5 text-end h-0.5 md:h-1 whitespace-nowrap">
        <div className="relative p-0 w-fit h-full flex justify-start items-center overflow-hidden">
          {isNewSong && (
            <div className="absolute mr-4 md:mr-1 left-[-21px] top-[0px] w-[60px] transform -rotate-45 bg-gradient-to-r from-red-800 to-red-400 text-center text-white font-thin text-xs">
              new
            </div>
          )}
          {/* Create an invisible div here so that subsequent elements won't overlap with the ribbon when the screen is narrow */}
          <div className="w-[30px]"></div>
          {limitedFor === LimitedFor.Captain && (
            <div className="relative h-[24px] w-[24px]">
              <Image src="/icons/舰-66.png" alt="captain" fill />
            </div>
          )}
          {limitedFor === LimitedFor.Admiral && (
            <div className="relative h-[24px] w-[24px]">
              <Image src="/icons/提-66.png" alt="captain" fill />
            </div>
          )}
          {limitedFor === LimitedFor.Governor && (
            <div className="relative h-[24px] w-[24px]">
              <Image src="/icons/总-66.png" alt="captain" fill />
            </div>
          )}
          {scImg && (
            <div className="relative h-[36px] w-[36px]">
              <Image src={scImg} alt="sc" fill />
            </div>
          )}
          {no && (
            <div className="relative h-[30px] w-[30px]">
              <Image src="/icons/icons8-no-66.png" alt="no" fill />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="p-0 text-start h-0.5 md:h-1 whitespace-nowrap">
        <Button
          variant="ghost"
          className="p-0 m-0 border-0 h-0.5 md:h-1 text-center font-semibold"
        >
          {song.title}
        </Button>
      </TableCell>
      {song.url ? (
        <TableCell>
          {" "}
          <Link
            href={song.url}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <Icons.play_button className="ml-2 inline" />
          </Link>
        </TableCell>
      ) : (
        <TableCell></TableCell>
      )}
      <TableCell className="p-0 md:p-0.5 font-mono text-center h-0.5 md:h-1 whitespace-nowrap">
        {song.artist}
      </TableCell>
      <TableCell className="p0 md:p-0.5 font-mono text-center h-0.5 md:h-1 whitespace-nowrap">
        {song.lang.join(", ")}
      </TableCell>
      <TableCell className="p0 md:p-0.5 font-mono text-center h-0.5 md:h-1 whitespace-nowrap">
        {song.tag.join(", ")}
      </TableCell>
      <TableCell className="p-0 md:p-0.5 font-mono text-center h-0.5 md:h-1 whitespace-nowrap">
        {song.remark}
      </TableCell>
      <TableCell className="p-0 md:p-0.5 h-0.5 md:h-1 whitespace-nowrap">
        <div className="min-w-10 h-full grid grid-flow-col-dense justify-start items-center auto-cols-min">
          <Button
            variant="ghost"
            className="space-x-1 mr-1 w-fit rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              onLikeSong(song.id);
            }}
          >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              ️❤️
            </motion.div>
            <div>{getNumLikes(song)}</div>
          </Button>
          <Button
            variant="ghost"
            className="space-x-1 w-fit rounded-full p-1"
            onClick={async (e) => {
              e.stopPropagation();
              onDislikeSong(song.id);
            }}
          >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              😅️️
            </motion.div>
            <div>{getNumDislikes(song)}</div>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
