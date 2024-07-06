import type { AudioState } from "./types";
import { createPubSub } from "../pubsub";

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

	const setup = () => {
		element.addEventListener("durationchange", () =>
			setState({ duration: element.duration }),
		);
		element.addEventListener("playing", () => setState({ playing: true }));
		element.addEventListener("pause", () => setState({ playing: false }));
		element.addEventListener("timeupdate", () => {
			const newCurrentTime = Math.round(element.currentTime);

			if (currentTime !== newCurrentTime) {
				currentTime = newCurrentTime;

				audioPubSub.publish("change-current-time", currentTime);
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
	};
};
