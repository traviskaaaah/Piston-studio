'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      },
    });

    // Animate logo only
    tl.from('.loading-logo', {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: 'power3.out',
    })
      .to('.loading-logo', {
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .to('.loading-logo', {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.in',
      })
      .to('.loading-screen', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen fixed inset-0 z-[10000] flex items-center justify-center bg-black">
      {/* Logo */}
      <div className="loading-logo">
        <Image
          src="/piston-logo.png"
          alt="Piston Collective Logo"
          width={200}
          height={200}
          priority
        />
      </div>
    </div>
  );
}
