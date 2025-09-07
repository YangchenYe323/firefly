export { usePlayerState, useCurrentTime } from "./hooks";

export type { Track } from "./types";

export { 
	getPlayerSingleton, 
	initializePlayer, 
	createDummyState, 
	createPlayer,
	type Player 
} from "./player";
