"use client";

import { type IconProps, Icons } from "@/components/Icons";
import { PlayMode, type Track } from "@/lib/player/types";

import getPlayerSingleton, {
	useCurrentTime,
	usePlayerState,
} from "@/lib/player";

import { Slider } from "@/components/ui/slider";

import { formatMMSS } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface PropType {
	visible: boolean;
	closePlayer: () => void;
	tracks: Track[];
}

export default function SongPlayer({ visible, tracks, closePlayer }: PropType) {
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
		}
		if (mode === PlayMode.Random) {
			return <Icons.player_random_button {...props} />;
		}
		return <Icons.player_repeat_button {...props} />;
	};

	return (
		<motion.div
			className="fixed bottom-0 left-0 w-full duration-300"
			animate={{ y: visible ? 0 : 100 }}
			transition={{ type: "just", duration: 0 }}
		>
			<div className="w-full shadow-lg p-0 border border-hikari_blue/20 bg-background/95">
				<div className="flex items-center justify-between max-w-[500px] md:max-w-[500px] m-auto">
					<div className="flex justify-between items-center p-1">
						<Icons.player_prev_button
							onClick={() => player.prev()}
							className="fill-black hover:fill-gray-600"
						/>
						<PlayOrPauseIcon
							onClick={handlePlay}
							className="ml-2 fill-black hover:fill-gray-600"
						/>
						<Icons.player_next_button
							onClick={() => player.next()}
							className="ml-2 fill-black hover:fill-gray-600"
						/>
					</div>
					<div className="flex flex-col w-full h-full p-0 justify-start mx-2">
						<div className="flex h-1/2 justify-between">
							<div className="flex justify-center text-sm md:max-w-[500px] h-full mb-2">
								<div className="leading-4">
									{currentTrack ? currentTrack.title : "点击播放键开始播放"}
								</div>
								<div className="leading-4 ml-2">
									{currentTrack ? currentTrack.artist : ""}
								</div>
							</div>
							<div className="text-sm leading-4 ml-auto font-thin">{`${formatMMSS(
								currentTime,
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
					<div className="flex justify-center items-center p-4">
						<PlayModeIcon
							onClick={() => player.switchMode()}
							className="fill-black hover:fill-gray-600"
						/>
						<Icons.player_close_button
							className="ml-2 fill-black hover:fill-gray-600"
							onClick={closePlayer}
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
