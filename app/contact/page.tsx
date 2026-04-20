'use client';

import type { Metadata } from 'next';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.contact-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.fromTo('.contact-link', 
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.4,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const instagramIcon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );

  const soundcloudIcon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 17l1-3-1-3m2 6l2-3-2-3m2 6l2-3-2-3m2 6l2-3-2-3m2 6l2-3-2-3"/>
      <path d="M12 11v6m2-8v8m2-10v10m2-9v8m2-7v6"/>
    </svg>
  );

  const socialLinks = [
    {
      name: '@remot__',
      url: 'https://www.instagram.com/remot__/',
      icon: instagramIcon,
      description: 'Follow Remot',
    },
    {
      name: '@ghavaramadhan',
      url: 'https://www.instagram.com/ghavaramadhan/',
      icon: instagramIcon,
      description: 'Follow Ghavara',
    },
    {
      name: '@ryanfbrian',
      url: 'https://www.instagram.com/ryanfbrian/',
      icon: instagramIcon,
      description: 'Follow Ryan',
    },
    {
      name: '@ghafaradeandra',
      url: 'https://www.instagram.com/ghafaradeandra/',
      icon: instagramIcon,
      description: 'Follow Ghafara',
    },
    {
      name: '@pis_._ton',
      url: 'https://www.instagram.com/pis_._ton/',
      icon: instagramIcon,
      description: 'Follow Piston Collective',
    },
  ];

  return (
    <main ref={containerRef} className="relative z-10 min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="contact-title text-5xl md:text-7xl font-bold text-white mb-4">
              Get In Touch
            </h1>
            <p className="contact-subtitle text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Connect with us through our social channels and explore our collective's work
            </p>
          </div>

          {/* Social Links */}
          <div className="mb-12" style={{ opacity: 1 }}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-500 hover:bg-white/10 hover:border-primary hover:scale-105"
                >
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-white/60 group-hover:text-primary transition-colors duration-300 mb-4">
                      {link.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                      {link.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {link.description}
                    </p>
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-8 right-8 text-white/20 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"/>
                        <polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Bottom 2 cards centered */}
            <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
              {socialLinks.slice(3).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-500 hover:bg-white/10 hover:border-primary hover:scale-105"
                >
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-white/60 group-hover:text-primary transition-colors duration-300 mb-4">
                      {link.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                      {link.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {link.description}
                    </p>
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-8 right-8 text-white/20 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"/>
                        <polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* SoundCloud Section */}
          <div className="mb-20">
            <a
              href="https://soundcloud.com/piston-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-500 hover:bg-white/10 hover:border-secondary hover:scale-105 block max-w-2xl mx-auto"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-white/60 group-hover:text-secondary transition-colors duration-300 mb-4">
                  {soundcloudIcon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                  SoundCloud
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Listen to our audio productions
                </p>
                
                {/* Arrow Icon */}
                <div className="absolute top-8 right-8 text-white/20 group-hover:text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
              </div>
            </a>
          </div>

          {/* Business Inquiries */}
          <div className="text-center">
            <p className="text-xl md:text-2xl text-gray-400">
              Business inquiries: <a href="mailto:piston.creative@gmail.com" className="text-white hover:text-primary transition-colors duration-300">piston.creative@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
