import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';

export const metadata: Metadata = {
  title: 'PISTON',
  description: 'Reset The System, Ignite The Chamber. Official website of piston music collective.',
};

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen">
      <HeroSection />
    </main>
  );
}
