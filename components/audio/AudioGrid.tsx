'use client';

import AudioCard from './AudioCard';
import { AudioItem } from '@/config/audio';

interface AudioGridProps {
  tracks: AudioItem[];
}

export default function AudioGrid({ tracks }: AudioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tracks.map((track) => (
        <AudioCard key={track.id} track={track} />
      ))}
    </div>
  );
}
