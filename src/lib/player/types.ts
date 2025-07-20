export type AudioState = {
	duration: number;
	playing: boolean;
	volume: number;
};

export type Track = {
	url: string;
	title: string;
	artist: string;
};

export type PlayerState = AudioState & {
	// All tracks
	tracks: Track[];
	// Playable tracks, e.g., if in repeat mode, the current track is the only playable track
	playableTracks: Track[];
	// Whether the track list should be played in random order
	mode: PlayMode;
	currentTrack: Track | null;
	currentTrackIndex: number | null;
	// API URL for artwork generation
	apiUrl?: string;
};

export enum PlayMode {
	Random = 0,
	Order = 1,
	Repeat = 2,
}
