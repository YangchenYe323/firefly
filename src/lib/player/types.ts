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
  // Playable tracks, encoding order information
  playableTracks: Track[];
  // Whether the track list should be played in random order
  mode: PlayMode;
  currentTrack: Track | null;
  currentTrackIndex: number | null;
};

export enum PlayMode {
  Random,
  Order,
  Repeat,
}
