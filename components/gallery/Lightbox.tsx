'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { MediaItem } from '@/config/media';

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentItem = items[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  useEffect(() => {
    // Entrance animation
    if (overlayRef.current && contentRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  const handleClose = () => {
    if (overlayRef.current && contentRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: onClose,
      });
      gsap.to(contentRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onNavigate(currentIndex + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 p-2 text-white/60 hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Navigation Buttons */}
      {hasPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
          aria-label="Previous"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
          aria-label="Next"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-w-7xl max-h-full w-full h-full flex flex-col">
          {/* Media */}
          <div className="flex-1 flex items-center justify-center mb-6">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {currentItem.type === 'image' ? (
              <img
                src={currentItem.url}
                alt={currentItem.title || 'Gallery item'}
                className="max-w-full max-h-full object-contain"
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <video
                ref={videoRef}
                src={currentItem.url}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain"
                onLoadedData={() => setIsLoading(false)}
              />
            )}
          </div>

          {/* Info */}
          <div className="text-center">
            {currentItem.title && (
              <h3 className="text-white text-xl font-medium tracking-wide mb-2">
                {currentItem.title}
              </h3>
            )}
            {currentItem.description && (
              <p className="text-white/60 text-sm mb-2">
                {currentItem.description}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 text-xs text-white/40">
              {currentItem.category && (
                <span className="text-primary uppercase tracking-wider">
                  {currentItem.category}
                </span>
              )}
              <span>
                {currentIndex + 1} / {items.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
