import { PlayMode, type PlayerState, type Track } from "./types";

import { createAudio } from "./audio";
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

	// Play current track
	const playCurrentTrack = () => {
		const track = state.currentTrack;

		if (track) {
			audio.setUrl(track.url);
			audio.play();
		}
	};

	const next = () => {
		if (state.currentTrackIndex === null) {
			return;
		}

		const newIndex =
			(state.currentTrackIndex + 1) % state.playableTracks.length;

		setState({
			currentTrackIndex: newIndex,
			currentTrack: state.playableTracks[newIndex],
		});

		playCurrentTrack();
	};

	const prev = () => {
		if (state.currentTrackIndex === null) {
			return;
		}

		const newIndex =
			(state.currentTrackIndex - 1 + state.playableTracks.length) %
			state.playableTracks.length;

		setState({
			currentTrack: state.playableTracks[newIndex],
			currentTrackIndex: newIndex,
		});
		playCurrentTrack();
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

		setQueue(tracks: Track[]) {
			setState({ tracks, playableTracks: [...tracks], mode: PlayMode.Order });
		},

		playTrack(trackIndex: number) {
			setState({
				currentTrackIndex: trackIndex,
				currentTrack: state.tracks[trackIndex],
			});

			playCurrentTrack();
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

const getPlayerSingleton = (): Player => {
	if (!playerGlobal) {
		playerGlobal = createPlayer();
	}
	return playerGlobal;
};

export default getPlayerSingleton;
