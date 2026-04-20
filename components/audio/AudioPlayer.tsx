'use client';

import { useAudio } from '@/lib/audio/AudioContext';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import Playlist from './Playlist';

export default function AudioPlayer() {
  const { currentTrack, isLoading } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-6">
          {/* Track Info */}
          <div className="flex items-center gap-4 min-w-0 w-64">
            {/* Album Art Placeholder */}
            <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center flex-shrink-0">
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
              )}
            </div>

            {/* Track Details */}
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium text-white truncate">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-white/40 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Center Controls */}
          <div className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <PlayerControls />
            <ProgressBar />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <VolumeControl />
            <Playlist />
          </div>
        </div>
      </div>
    </div>
  );
}
