'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !taglineRef.current) return;

    const ctx = gsap.context(() => {
      // Tagline animation
      gsap.from(taglineRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 200,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          {/* Fallback gradient jika video tidak ada */}
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div ref={taglineRef} className="text-center px-6">
          {/* Brand */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white mb-0" style={{ letterSpacing: '-10px' }}>
            PISTON
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl tracking-widest text-white/80 -mt-2">
            Reset The System , Ignite The Chamber.
          </p>
        </div>
      </div>
    </section>
  );
}
