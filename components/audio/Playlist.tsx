'use client';

import { useAudio } from '@/lib/audio/AudioContext';
import { useState } from 'react';

export default function Playlist() {
  const { playlist, currentTrack, currentIndex, loadTrack, isPlaying } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  if (playlist.length === 0) return null;

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white/60 hover:text-white transition-colors duration-300"
        aria-label="Toggle Playlist"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      </button>

      {/* Playlist Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed bottom-20 right-4 w-96 max-h-[60vh] bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg tracking-wider text-white">
                  Playlist
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Close Playlist"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <p className="text-xs text-white/40 mt-1">
                {playlist.length} {playlist.length === 1 ? 'track' : 'tracks'}
              </p>
            </div>

            {/* Track List */}
            <div className="overflow-y-auto max-h-[calc(60vh-80px)] custom-scrollbar">
              {playlist.map((track, index) => {
                const isCurrentTrack = currentTrack?.id === track.id;
                const isActive = index === currentIndex;

                return (
                  <button
                    key={track.id}
                    onClick={() => loadTrack(track, index)}
                    className={`w-full p-4 text-left transition-all duration-300 border-b border-white/5 hover:bg-white/5 ${
                      isActive ? 'bg-primary/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Track Number / Playing Indicator */}
                      <div className="w-6 flex-shrink-0 text-center">
                        {isCurrentTrack && isPlaying ? (
                          <div className="flex items-center justify-center gap-0.5">
                            <span className="w-0.5 h-3 bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
                            <span className="w-0.5 h-4 bg-primary animate-pulse" style={{ animationDelay: '150ms' }} />
                            <span className="w-0.5 h-3 bg-primary animate-pulse" style={{ animationDelay: '300ms' }} />
                          </div>
                        ) : (
                          <span className={`text-xs ${isActive ? 'text-primary' : 'text-white/40'}`}>
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-medium truncate ${
                          isActive ? 'text-primary' : 'text-white'
                        }`}>
                          {track.title}
                        </h4>
                        <p className="text-xs text-white/40 truncate mt-0.5">
                          {track.artist}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="text-xs text-white/40 tabular-nums flex-shrink-0">
                        {track.duration}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
