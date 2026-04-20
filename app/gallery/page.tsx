'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import MasonryGrid from '@/components/gallery/MasonryGrid';
import Lightbox from '@/components/gallery/Lightbox';
import AudioGrid from '@/components/audio/AudioGrid';
import { galleryMedia } from '@/config/media';
import { audioTracks } from '@/config/audio';
import type { MediaItem } from '@/config/media';

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleMediaClick = (item: MediaItem, index: number) => {
    setLightboxIndex(index);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handleNavigate = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <main className="relative z-10 min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-4">
        {/* Gallery Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-400">
            Visual archive by Piston Studio
          </p>
        </div>

        <MasonryGrid items={galleryMedia} onItemClick={handleMediaClick} />

        {/* Audio Section */}
        <div className="mt-32">
          <div className="mb-12 text-center">
            <h2 className="font-medieval text-4xl md:text-6xl text-white mb-4">
              Sound Records
            </h2>
            <p className="text-xl text-gray-400">
              Audio archive by Piston Studio
            </p>
          </div>

          <AudioGrid tracks={audioTracks} />
        </div>

        {lightboxIndex !== null && (
          <Lightbox
            items={galleryMedia}
            currentIndex={lightboxIndex}
            onClose={handleClose}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </main>
  );
}
