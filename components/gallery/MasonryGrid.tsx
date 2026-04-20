'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MediaItem } from '@/config/media';

gsap.registerPlugin(ScrollTrigger);

interface MasonryGridProps {
  items: MediaItem[];
  onItemClick: (item: MediaItem, index: number) => void;
}

export default function MasonryGrid({ items, onItemClick }: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const gridItems = gridRef.current?.querySelectorAll('.masonry-item');
      if (gridItems) {
        gsap.from(gridItems, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 50,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power3.out',
        });
      }
    }, gridRef);

    // Intersection Observer for lazy loading videos
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoId = entry.target.getAttribute('data-video-id');
            if (videoId && !loadedVideos.has(videoId)) {
              setLoadedVideos((prev) => new Set(prev).add(videoId));
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading slightly before entering viewport
        threshold: 0.1,
      }
    );

    // Observe all video containers
    const videoContainers = gridRef.current?.querySelectorAll('[data-video-id]');
    videoContainers?.forEach((container) => observer.observe(container));

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, [items, loadedVideos]);

  // Handle video hover play/pause
  const handleMouseEnter = (itemId: string) => {
    setHoveredId(itemId);
    const video = videoRefs.current.get(itemId);
    if (video && loadedVideos.has(itemId)) {
      video.play().catch(() => {
        // Ignore play errors
      });
    }
  };

  const handleMouseLeave = (itemId: string) => {
    setHoveredId(null);
    const video = videoRefs.current.get(itemId);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-white/40 text-sm">
          No media found. Add media files to public/images/ or public/videos/ and update config/media.ts
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]"
    >
      {items.map((item, index) => {
        const isHovered = hoveredId === item.id;
        // Random height variation for masonry effect
        const spanClass = index % 5 === 0 ? 'row-span-2' : '';

        return (
          <div
            key={item.id}
            className={`masonry-item group relative overflow-hidden rounded-lg bg-white/5 cursor-pointer ${spanClass}`}
            onClick={() => onItemClick(item, index)}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
            data-video-id={item.type === 'video' ? item.id : undefined}
          >
            {/* Media Content */}
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={item.title || 'Gallery item'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <>
                {/* Placeholder while video not loaded */}
                {!loadedVideos.has(item.id) && (
                  <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="ml-1"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                )}
                {/* Video element - only render when in viewport */}
                {loadedVideos.has(item.id) && (
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current.set(item.id, el);
                    }}
                    src={item.url}
                    poster={item.thumbnail}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    preload="none"
                  />
                )}
              </>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              {item.title && (
                <h3 className="text-white font-medium text-lg tracking-wide mb-1">
                  {item.title}
                </h3>
              )}
              {item.category && (
                <p className="text-primary text-xs tracking-wider uppercase">
                  {item.category}
                </p>
              )}
              {item.description && (
                <p className="text-white/60 text-sm mt-2 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>

            {/* Play Icon for Videos */}
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="ml-1"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            )}

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}
