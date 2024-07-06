"use client";

import { IconProps, Icons } from "@/components/Icons";
import { PlayMode, Track } from "@/lib/player/types";

import getPlayerSingleton, {
  useCurrentTime,
  usePlayerState,
} from "@/lib/player";

import { Slider } from "@/components/ui/slider";

import { formatMMSS } from "@/lib/utils";
import { useEffect } from "react";

interface PropType {
  tracks: Track[];
}

export default function SongPlayer({ tracks }: PropType) {
  const { playableTracks, currentTrack, playing, mode, duration } =
    usePlayerState();
  const currentTime = useCurrentTime();
  const player = getPlayerSingleton();

  useEffect(() => {
    player.setQueue(tracks);
  }, [player, tracks]);

  const handlePlay = () => {
    if (playing) {
      player.pause();
      return;
    }

    if (currentTrack) {
      player.play();
      return;
    }

    if (playableTracks.length > 0) {
      player.playTrack(0);
    }
  };

  const PlayOrPauseIcon = (props: IconProps) =>
    playing ? (
      <Icons.player_pause_button {...props} />
    ) : (
      <Icons.player_play_button {...props} />
    );

  const PlayModeIcon = (props: IconProps) => {
    if (mode === PlayMode.Order) {
      return <Icons.player_order_button {...props} />;
    } else if (mode === PlayMode.Random) {
      return <Icons.player_random_button {...props} />;
    } else {
      return <Icons.player_repeat_button {...props} />;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-0 flex items-center justify-center">
      <div className="flex items-center w-8/12 md:w-5/12">
        <div className="flex justify-between items-center p-4">
          <Icons.player_prev_button onClick={() => player.prev()} />
          <PlayOrPauseIcon className="ml-2" onClick={handlePlay} />
          <Icons.player_next_button
            className="ml-2"
            onClick={() => player.next()}
          />
        </div>
        <div className="flex flex-col w-full h-full p-0 justify-start">
          <div className="flex h-1/2 justify-between">
            <div className="flex justify-center text-sm w-fit mb-2">
              <div className="leading-4">
                {currentTrack ? currentTrack.title : "点击播放键开始播放"}
              </div>
              <div className="leading-4 ml-2">
                {currentTrack ? currentTrack.artist : ""}
              </div>
            </div>
            <div className="text-sm w-fit leading-4 ml-auto">{`${formatMMSS(
              currentTime
            )}/${formatMMSS(duration)}`}</div>
          </div>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(values) => {
              const value = values[0];
              player.seek(value);
            }}
          />
        </div>
        <div className="flex justify-center items-center w-fit p-4">
          <PlayModeIcon onClick={() => player.switchMode()} />
          <Icons.player_close_button className="ml-2" />
        </div>
      </div>
    </div>
  );
}
