'use client';

import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from 'lucide-react';
import { useAudio } from '@/lib/audio/AudioContext';

export default function PlayerControls() {
  const {
    isPlaying,
    isLoading,
    isShuffle,
    repeatMode,
    play,
    pause,
    next,
    previous,
    toggleShuffle,
    toggleRepeat,
  } = useAudio();

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;

  return (
    <div className="flex items-center gap-4">
      {/* Shuffle */}
      <button
        onClick={toggleShuffle}
        className={`transition-colors duration-300 ${
          isShuffle ? 'text-primary' : 'text-white/60 hover:text-white'
        }`}
        aria-label="Shuffle"
      >
        <Shuffle size={18} />
      </button>

      {/* Previous */}
      <button
        onClick={previous}
        className="text-white/80 hover:text-white transition-colors duration-300"
        aria-label="Previous track"
      >
        <SkipBack size={20} />
      </button>

      {/* Play/Pause */}
      <button
        onClick={isPlaying ? pause : play}
        disabled={isLoading}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary hover:bg-primary/80 transition-all duration-300 disabled:opacity-50"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause size={24} fill="white" />
        ) : (
          <Play size={24} fill="white" className="ml-1" />
        )}
      </button>

      {/* Next */}
      <button
        onClick={next}
        className="text-white/80 hover:text-white transition-colors duration-300"
        aria-label="Next track"
      >
        <SkipForward size={20} />
      </button>

      {/* Repeat */}
      <button
        onClick={toggleRepeat}
        className={`transition-colors duration-300 ${
          repeatMode !== 'off' ? 'text-primary' : 'text-white/60 hover:text-white'
        }`}
        aria-label="Repeat"
      >
        <RepeatIcon size={18} />
      </button>
    </div>
  );
}
