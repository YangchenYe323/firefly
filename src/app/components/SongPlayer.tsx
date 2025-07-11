"use client";

import { type IconProps, Icons } from "@/components/Icons";
import { PlayMode, type Track } from "@/lib/player/types";

import getPlayerSingleton, {
	useCurrentTime,
	usePlayerState,
} from "@/lib/player";

import { Slider } from "@/components/ui/slider";

import { formatMMSS } from "@/lib/utils";
import { cubicBezier, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PropType {
	visible: boolean;
	closePlayer: () => void;
	tracks: Track[];
	apiUrl?: string;
}

export default function SongPlayer({
	visible,
	tracks,
	closePlayer,
	apiUrl,
}: PropType) {
	const { playableTracks, currentTrack, playing, mode, duration } =
		usePlayerState();
	const currentTime = useCurrentTime();
	const player = getPlayerSingleton();
	const [imgError, setImgError] = useState(false);

	useEffect(() => {
		player.setQueue(tracks, apiUrl);
	}, [player, tracks, apiUrl]);

	// Reset image error state when track changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: when track changes, the image error state should be reset
	useEffect(() => {
		setImgError(false);
	}, [currentTrack?.title, currentTrack?.artist]);

	// Construct album art URL for current track
	const albumArtUrl =
		currentTrack && apiUrl
			? `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(currentTrack.title)}&artist=${encodeURIComponent(currentTrack.artist)}&size=small`
			: null;

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
			className="fixed bottom-0 left-0 right-0 duration-300 z-50"
			animate={{ y: visible ? 0 : 100 }}
			transition={{ duration: 0, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) }}
		>
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white/80 backdrop-blur-md rounded-t-xl shadow-xl border border-gray-200/50">
					<div className="flex items-center justify-between p-4">
						{/* Album Artwork */}
						<div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shadow-sm">
							{!imgError && albumArtUrl ? (
								<Image
									src={albumArtUrl}
									alt={`${currentTrack?.title || "Unknown"} album art`}
									width={32}
									height={32}
									className="object-cover w-8 h-8"
									onError={() => setImgError(true)}
									unoptimized={false}
								/>
							) : (
								<Icons.music_note className="w-4 h-4 text-gray-600" />
							)}
						</div>

						{/* Playback Controls */}
						<div className="flex items-center gap-1">
							<Icons.player_prev_button
								onClick={() => player.prev()}
								className="ml-2 fill-gray-700 hover:fill-gray-800 cursor-pointer"
							/>
							<PlayOrPauseIcon
								onClick={handlePlay}
								className="ml-1 fill-gray-700 hover:fill-gray-800 cursor-pointer"
							/>
							<Icons.player_next_button
								onClick={() => player.next()}
								className="ml-1 fill-gray-700 hover:fill-gray-800 cursor-pointer"
							/>
						</div>

						{/* Song Info and Progress */}
						<div className="flex flex-col w-full h-full p-0 justify-start mx-2">
							<div className="flex h-1/2 justify-between">
								<div className="flex justify-center text-sm md:max-w-[500px] h-full mb-2">
									<div className="leading-4 text-gray-800">
										{currentTrack ? currentTrack.title : "点击播放键开始播放"}
									</div>
									<div className="leading-4 ml-2 text-gray-600">
										{currentTrack ? currentTrack.artist : ""}
									</div>
								</div>
								<div className="text-sm leading-4 ml-auto font-thin text-gray-600">{`${formatMMSS(
									currentTime,
								)}/${formatMMSS(duration)}`}</div>
							</div>
							<div className="flex justify-center items-center p-1">
								<Slider
									value={[currentTime]}
									max={duration}
									step={1}
									onValueChange={(values) => {
										const value = values[0];
										player.seek(value);
									}}
									className="[&>span]:bg-gray-500 [&>span]:hover:bg-gray-600"
								/>
							</div>
						</div>

						{/* Mode and Close Controls */}
						<div className="flex justify-center items-center p-2">
							<PlayModeIcon
								onClick={() => player.switchMode()}
								className="fill-gray-700 hover:fill-gray-800 cursor-pointer"
							/>
							<Icons.player_close_button
								className="ml-2 fill-gray-700 hover:fill-gray-800 cursor-pointer"
								onClick={closePlayer}
							/>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
