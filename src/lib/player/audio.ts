import type { AudioState } from "./types";
import { createPubSub } from "../pubsub";

export interface MediaMetadata {
	title: string;
	artist: string;
	album?: string;
	artwork?: string;
}

export const createAudio = () => {
	const audioPubSub = createPubSub();
	const element = document.createElement("audio");
	let currentTime = 0;

	let state: AudioState = {
		duration: 0,
		playing: false,
		volume: 0,
	};

	const setState = (value: Partial<AudioState>) => {
		state = { ...state, ...value };

		audioPubSub.publish("change", state);
	};

	/**
	 * Set media metadata for iOS lockscreen and media controls
	 * Uses the MediaSession API to display song information
	 */
	const updateMediaMetadata = (metadata: MediaMetadata) => {
		if ("mediaSession" in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: metadata.title,
				artist: metadata.artist,
				album: metadata.album || "蝶蝶Hikari 歌曲集",
				artwork: metadata.artwork
					? [
							{
								src: metadata.artwork,
								sizes: "512x512",
								type: "image/jpeg",
							},
						]
					: undefined,
			});

			// Set up media session action handlers
			(navigator.mediaSession as any).setActionHandler("play", () => {
				element.play();
			});

			(navigator.mediaSession as any).setActionHandler("pause", () => {
				element.pause();
			});

			(navigator.mediaSession as any).setActionHandler("previoustrack", () => {
				// This will be handled by the player
				audioPubSub.publish("previous-track", null);
			});

			(navigator.mediaSession as any).setActionHandler("nexttrack", () => {
				// This will be handled by the player
				audioPubSub.publish("next-track", null);
			});

			(navigator.mediaSession as any).setActionHandler(
				"seekto",
				(details: any) => {
					if (details.seekTime !== undefined) {
						element.currentTime = details.seekTime;
					}
				},
			);

			(navigator.mediaSession as any).setActionHandler(
				"seekforward",
				(details: any) => {
					const skipTime = details.seekOffset || 10;
					element.currentTime = Math.min(
						element.currentTime + skipTime,
						element.duration,
					);
				},
			);

			(navigator.mediaSession as any).setActionHandler(
				"seekbackward",
				(details: any) => {
					const skipTime = details.seekOffset || 10;
					element.currentTime = Math.max(element.currentTime - skipTime, 0);
				},
			);
		}
	};

	/**
	 * Update media session playback state
	 */
	const updateMediaSessionPlaybackState = (isPlaying: boolean) => {
		if ("mediaSession" in navigator) {
			navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
		}
	};

	/**
	 * Update media session position state
	 */
	const updateMediaSessionPositionState = () => {
		if (
			"mediaSession" in navigator &&
			"setPositionState" in navigator.mediaSession
		) {
			navigator.mediaSession.setPositionState({
				duration: element.duration || 0,
				playbackRate: element.playbackRate,
				position: element.currentTime || 0,
			});
		}
	};

	const setup = () => {
		element.addEventListener("durationchange", () => {
			setState({ duration: element.duration });
			updateMediaSessionPositionState();
		});
		element.addEventListener("playing", () => {
			setState({ playing: true });
			updateMediaSessionPlaybackState(true);
		});
		element.addEventListener("pause", () => {
			setState({ playing: false });
			updateMediaSessionPlaybackState(false);
		});
		element.addEventListener("timeupdate", () => {
			const newCurrentTime = Math.round(element.currentTime);

			if (currentTime !== newCurrentTime) {
				currentTime = newCurrentTime;

				audioPubSub.publish("change-current-time", currentTime);
				updateMediaSessionPositionState();
			}
		});
		element.addEventListener("volumechange", () =>
			setState({ volume: element.volume }),
		);
		setState({ volume: element.volume });
	};

	setup();

	return {
		seek(seconds: number) {
			element.currentTime = seconds;
			currentTime = seconds;

			audioPubSub.publish("change-current-time", currentTime);
		},

		getElement() {
			return element;
		},

		getState() {
			return state;
		},

		getCurrentTime() {
			return currentTime;
		},

		play() {
			element.play();
		},

		pause() {
			element.pause();
		},

		volume(value: number) {
			element.volume = value;
		},

		setUrl(url: string) {
			element.setAttribute("src", url);
			setState({ playing: false });
		},

		/**
		 * Set media metadata for the current track
		 */
		setMediaMetadata(metadata: MediaMetadata) {
			updateMediaMetadata(metadata);
		},

		subscribe(listener: (newState: AudioState) => void) {
			return audioPubSub.subscribe("change", listener);
		},

		onChangeCurrentTime(listener: (newCurrentTime: number) => void) {
			return audioPubSub.subscribe("change-current-time", listener);
		},

		onEnded(listener: () => void) {
			element.addEventListener("ended", listener);

			return () => element.removeEventListener("ended", listener);
		},

		onPreviousTrack(listener: () => void) {
			return audioPubSub.subscribe("previous-track", listener);
		},

		onNextTrack(listener: () => void) {
			return audioPubSub.subscribe("next-track", listener);
		},
	};
};
