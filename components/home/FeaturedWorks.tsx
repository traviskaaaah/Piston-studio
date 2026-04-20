'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryMedia } from '@/config/media';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Get first 6 items for preview
  const featuredItems = galleryMedia.slice(0, 6);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      });

      // Grid items stagger animation
      const items = gridRef.current?.querySelectorAll('.featured-item');
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 70%',
          },
          opacity: 0,
          y: 50,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (featuredItems.length === 0) {
    return (
      <section ref={sectionRef} className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 ref={titleRef} className="font-display text-4xl md:text-5xl tracking-wider text-white text-center mb-12">
            Featured Works
          </h2>
          <p className="text-center text-white/40 text-sm">
            Gallery content akan muncul di sini setelah user menambahkan media files
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="font-display text-4xl md:text-5xl tracking-wider text-white mb-4">
            Featured Works
          </h2>
          <p className="text-white/40 text-sm tracking-wider">
            VISUAL CHRONICLES FROM THE CHAMBER
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredItems.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="featured-item group relative aspect-square overflow-hidden rounded-lg bg-white/5"
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.title || 'Featured work'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <video
                  src={item.url}
                  poster={item.thumbnail}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Title */}
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white font-medium text-lg tracking-wide">
                    {item.title}
                  </h3>
                  {item.category && (
                    <p className="text-primary text-xs tracking-wider uppercase mt-1">
                      {item.category}
                    </p>
                  )}
                </div>
              )}

              {/* Play icon for videos */}
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
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 tracking-wider text-sm font-medium"
          >
            VIEW ALL WORKS
          </Link>
        </div>
      </div>
    </section>
  );
}
