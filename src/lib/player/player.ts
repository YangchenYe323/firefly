import { PlayMode, type PlayerState, type Track } from "./types";

import { createAudio, type MediaMetadata } from "./audio";
import { createPubSub } from "../pubsub";
import { shuffleArray } from "../utils";

function createPlayer() {
	const playerPubSub = createPubSub();
	const audio = createAudio();

	let state: PlayerState = {
		...audio.getState(),
		mode: PlayMode.Order,
		tracks: [],
		playableTracks: [],
		currentTrackIndex: null,
		currentTrack: null,
		apiUrl: "",
	};

	const getPlayableTracks = (mode: PlayMode) => {
		if (mode === PlayMode.Repeat) {
			return state.currentTrack
				? [state.currentTrack]
				: state.tracks.length > 0
					? [state.tracks[0]]
					: [];
		}
		if (mode === PlayMode.Random) {
			return shuffleArray(state.tracks);
		}
		return [...state.tracks];
	};

	const setState = (value: Partial<PlayerState>) => {
		state = { ...state, ...value };

		playerPubSub.publish("change", state);
	};

	// Audio state change should propagate to external-facing player state change
	audio.subscribe(setState);

	// Handle media session previous/next track events
	audio.onPreviousTrack(() => {
		prev();
	});

	audio.onNextTrack(() => {
		next();
	});

	// Play current track
	const playCurrentTrack = (apiUrl?: string) => {
		const track = state.currentTrack;

		if (track) {
			audio.setUrl(track.url);

			// Construct artwork URL for media metadata
			const artworkUrl = apiUrl
				? `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}&size=large`
				: undefined;

			// Set media metadata for iOS lockscreen
			const metadata: MediaMetadata = {
				title: track.title,
				artist: track.artist,
				artwork: artworkUrl,
			};

			audio.setMediaMetadata(metadata);

			audio.play();
		}
	};

	const next = () => {
		if (state.currentTrackIndex === null) {
			return;
		}

		let newIndex: number;

		switch (state.mode) {
			case PlayMode.Repeat:
				// In repeat mode, stay on the same track
				newIndex = state.currentTrackIndex;
				break;
			case PlayMode.Random:
				// In random mode, pick a random track (different from current)
				if (state.tracks.length > 1) {
					do {
						newIndex = Math.floor(Math.random() * state.tracks.length);
					} while (
						newIndex === state.currentTrackIndex &&
						state.tracks.length > 1
					);
				} else {
					newIndex = state.currentTrackIndex; // Stay on same track if only one
				}
				break;
			default: // PlayMode.Order
				// In order mode, go to next track
				newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
				break;
		}

		setState({
			currentTrackIndex: newIndex,
			currentTrack: state.tracks[newIndex],
		});

		playCurrentTrack(state.apiUrl);
	};

	const prev = () => {
		if (state.currentTrackIndex === null) {
			return;
		}

		let newIndex: number;

		switch (state.mode) {
			case PlayMode.Repeat:
				// In repeat mode, stay on the same track
				newIndex = state.currentTrackIndex;
				break;
			case PlayMode.Random:
				// In random mode, pick a random track (different from current)
				if (state.tracks.length > 1) {
					do {
						newIndex = Math.floor(Math.random() * state.tracks.length);
					} while (
						newIndex === state.currentTrackIndex &&
						state.tracks.length > 1
					);
				} else {
					newIndex = state.currentTrackIndex; // Stay on same track if only one
				}
				break;
			default: // PlayMode.Order
				// In order mode, go to previous track
				newIndex =
					(state.currentTrackIndex - 1 + state.tracks.length) %
					state.tracks.length;
				break;
		}

		setState({
			currentTrackIndex: newIndex,
			currentTrack: state.tracks[newIndex],
		});
		playCurrentTrack(state.apiUrl);
	};

	const switchMode = () => {
		const nextMode =
			state.mode === PlayMode.Order
				? PlayMode.Repeat
				: state.mode === PlayMode.Repeat
					? PlayMode.Random
					: PlayMode.Order;

		const nextPlayableTracks = getPlayableTracks(nextMode);

		setState({ mode: nextMode, playableTracks: nextPlayableTracks });
	};

	audio.onEnded(next);

	return {
		play: audio.play,
		pause: audio.pause,
		seek: audio.seek,
		volume: audio.volume,
		getCurrentTime: audio.getCurrentTime,
		getElement: audio.getElement,
		onChangeCurrentTime: audio.onChangeCurrentTime,

		getState() {
			return state;
		},

		setQueue(tracks: Track[], apiUrl?: string) {
			setState({
				tracks,
				playableTracks: [...tracks],
				mode: PlayMode.Order,
				apiUrl,
			});
		},

		playTrack(trackIndex: number) {
			setState({
				currentTrackIndex: trackIndex,
				currentTrack: state.tracks[trackIndex],
			});

			playCurrentTrack(state.apiUrl);
		},

		next,

		prev,

		switchMode,

		subscribe(listener: (newState: PlayerState) => void) {
			return playerPubSub.subscribe("change", listener);
		},
	};
}

export type Player = ReturnType<typeof createPlayer>;

let playerGlobal: Player | undefined = undefined;

const getPlayerSingleton = (): Player | null => {
	return playerGlobal || null;
};

const initializePlayer = (): Player => {
	if (!playerGlobal) {
		playerGlobal = createPlayer();
	}
	return playerGlobal;
};

// Create a dummy state for SSR compatibility
const createDummyState = (): PlayerState => ({
	duration: 0,
	playing: false,
	volume: 0,
	mode: PlayMode.Order,
	tracks: [],
	playableTracks: [],
	currentTrackIndex: null,
	currentTrack: null,
	apiUrl: "",
});

export {
	getPlayerSingleton,
	initializePlayer,
	createDummyState,
	createPlayer,
}
