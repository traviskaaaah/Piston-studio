'use client';

import { useAudio } from '@/lib/audio/AudioContext';
import { useEffect, useRef, useState } from 'react';

export default function ProgressBar() {
  const { currentTrack, progress: currentTime, duration, seek } = useAudio();
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const displayTime = isDragging ? dragTime : currentTime;
  const progress = duration > 0 ? (displayTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateProgress(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateProgress(e);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      updateProgress(e);
      seek(dragTime);
      setIsDragging(false);
    }
  };

  const updateProgress = (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    setDragTime(newTime);
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
  }, [isDragging, dragTime]);

  if (!currentTrack) return null;

  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      {/* Current Time */}
      <span className="text-xs text-white/60 tabular-nums min-w-[40px]">
        {formatTime(displayTime)}
      </span>

      {/* Progress Bar */}
      <div
        ref={progressRef}
        className="relative flex-1 h-1 bg-white/10 rounded-full cursor-pointer group"
        onMouseDown={handleMouseDown}
      >
        {/* Progress Fill */}
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Drag Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Duration */}
      <span className="text-xs text-white/60 tabular-nums min-w-[40px]">
        {formatTime(duration)}
      </span>
    </div>
  );
}
