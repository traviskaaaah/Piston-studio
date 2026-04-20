'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import type { Track, AudioState } from '@/types/audio';

interface AudioContextType extends AudioState {
  playlist: Track[];
  currentIndex: number;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  loadTrack: (track: Track, index: number) => void;
  setPlaylist: (tracks: Track[]) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AudioState>({
    currentTrack: null,
    isPlaying: false,
    volume: 0.7,
    progress: 0,
    duration: 0,
    isLoading: false,
    isShuffle: false,
    repeatMode: 'off',
  });

  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const soundRef = useRef<Howl | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update progress
  const updateProgress = useCallback(() => {
    if (soundRef.current && state.isPlaying) {
      const seek = soundRef.current.seek() as number;
      const duration = soundRef.current.duration();
      setState((prev) => ({ ...prev, progress: seek, duration }));
    }
  }, [state.isPlaying]);

  useEffect(() => {
    if (state.isPlaying) {
      progressIntervalRef.current = setInterval(updateProgress, 100);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [state.isPlaying, updateProgress]);

  const loadTrack = useCallback((track: Track, index: number) => {
    // Cleanup previous sound
    if (soundRef.current) {
      soundRef.current.unload();
    }

    setState((prev) => ({ ...prev, isLoading: true, currentTrack: track }));
    setCurrentIndex(index);

    const sound = new Howl({
      src: [track.url],
      html5: true,
      volume: state.volume,
      onload: () => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          duration: sound.duration(),
        }));
      },
      onplay: () => {
        setState((prev) => ({ ...prev, isPlaying: true }));
      },
      onpause: () => {
        setState((prev) => ({ ...prev, isPlaying: false }));
      },
      onend: () => {
        // Handle repeat and next track
        if (state.repeatMode === 'one') {
          sound.play();
        } else if (state.repeatMode === 'all' || currentIndex < playlist.length - 1) {
          next();
        } else {
          setState((prev) => ({ ...prev, isPlaying: false, progress: 0 }));
        }
      },
      onloaderror: () => {
        setState((prev) => ({ ...prev, isLoading: false, isPlaying: false }));
      },
      onplayerror: () => {
        setState((prev) => ({ ...prev, isLoading: false, isPlaying: false }));
      },
    });

    soundRef.current = sound;
  }, [state.volume, state.repeatMode, currentIndex, playlist.length]);

  const play = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  }, []);

  const next = useCallback(() => {
    if (playlist.length === 0) return;

    let nextIndex: number;
    if (state.isShuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    loadTrack(playlist[nextIndex], nextIndex);
    play();
  }, [playlist, currentIndex, state.isShuffle, loadTrack, play]);

  const previous = useCallback(() => {
    if (playlist.length === 0) return;

    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    loadTrack(playlist[prevIndex], prevIndex);
    play();
  }, [playlist, currentIndex, loadTrack, play]);

  const seek = useCallback((time: number) => {
    if (soundRef.current) {
      soundRef.current.seek(time);
      setState((prev) => ({ ...prev, progress: time }));
    }
  }, []);

  const setVolumeHandler = useCallback((volume: number) => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
    setState((prev) => ({ ...prev, volume }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState((prev) => ({ ...prev, isShuffle: !prev.isShuffle }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      repeatMode: prev.repeatMode === 'off' ? 'all' : prev.repeatMode === 'all' ? 'one' : 'off',
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const value: AudioContextType = {
    ...state,
    playlist,
    currentIndex,
    play,
    pause,
    next,
    previous,
    seek,
    setVolume: setVolumeHandler,
    toggleShuffle,
    toggleRepeat,
    loadTrack,
    setPlaylist,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
