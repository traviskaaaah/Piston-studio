'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black/80 backdrop-blur-sm border-t border-white/10 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left flex items-center gap-3">
            <Image
              src="/piston-logo.png"
              alt="Piston Collective Logo"
              width={32}
              height={32}
            />
            <div>
              <h2 className="font-medieval text-xl tracking-wider text-white">
              </h2>
              <p className="text-xs tracking-widest text-white/40 mt-1">
                Visual & Sound Chamber.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <Link
              href="https://drive.google.com/drive/folders/1QF7bu6QJC8dgPWHswvFDk83VzXWFjSk8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 text-white/60 hover:text-primary transition-colors duration-300 group"
              aria-label="Drive"
            >
              <Image
                src="/images/drive-logo.png"
                alt="Drive"
                width={32}
                height={32}
                className="opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="font-medieval text-sm tracking-wider text-white/60 group-hover:text-primary transition-colors">
                Open Vault
              </span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Piston Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
