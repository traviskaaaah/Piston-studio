export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration?: number;
}

export interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  isLoading: boolean;
  isShuffle: boolean;
  repeatMode: 'off' | 'one' | 'all';
}
