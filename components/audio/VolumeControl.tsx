'use client';

import { useAudio } from '@/lib/audio/AudioContext';
import { useState, useRef, useEffect } from 'react';

export default function VolumeControl() {
  const { volume, setVolume } = useAudio();
  const [isDragging, setIsDragging] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [dragVolume, setDragVolume] = useState(volume);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayVolume = isDragging ? dragVolume : volume;
  const isMuted = displayVolume === 0;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateVolume(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateVolume(e);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      updateVolume(e);
      setVolume(dragVolume);
      setIsDragging(false);
    }
  };

  const updateVolume = (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const y = rect.bottom - e.clientY;
    const percentage = Math.max(0, Math.min(1, y / rect.height));
    setDragVolume(percentage);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(0.7);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragVolume]);

  // Close slider when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSlider(false);
      }
    };

    if (showSlider) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSlider]);

  return (
    <div ref={containerRef} className="relative">
      {/* Volume Slider */}
      {showSlider && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-black/90 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl">
          <div
            ref={sliderRef}
            className="relative w-1 h-24 bg-white/10 rounded-full cursor-pointer group"
            onMouseDown={handleMouseDown}
          >
            {/* Volume Fill */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-primary rounded-full transition-all duration-100"
              style={{ height: `${displayVolume * 100}%` }}
            />

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Drag Handle */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              style={{ bottom: `${displayVolume * 100}%`, transform: 'translate(-50%, 50%)' }}
            />
          </div>

          {/* Volume Percentage */}
          <div className="text-xs text-white/60 text-center mt-2 tabular-nums">
            {Math.round(displayVolume * 100)}%
          </div>
        </div>
      )}

      {/* Volume Button */}
      <button
        onClick={toggleMute}
        onMouseEnter={() => setShowSlider(true)}
        className="p-2 text-white/60 hover:text-white transition-colors duration-300"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : displayVolume < 0.5 ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>
    </div>
  );
}
