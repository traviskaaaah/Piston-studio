export interface AudioItem {
  id: string;
  title: string;
  artist?: string;
  audioUrl: string;
  coverImage?: string;
  duration?: string;
  description?: string;
}

export const audioTracks: AudioItem[] = [
  {
    id: '1',
    title: 'Bukit Besak',
    artist: 'Piston Studio',
    audioUrl: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/audio/Piston%20Studio%20-%20Bukit%20Besak.wav',
    coverImage: '/piston-logo.png',
  },
  {
    id: '2',
    title: 'Decimal',
    artist: 'Piston Studio',
    audioUrl: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/audio/Piston%20Studio%20-%20Decimal.mp3',
    coverImage: '/piston-logo.png',
  },
  {
    id: '3',
    title: 'False Virtue',
    artist: 'Piston Studio',
    audioUrl: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/audio/Piston%20Studio%20-%20False%20Virtue.wav',
    coverImage: '/piston-logo.png',
  },
  {
    id: '4',
    title: 'Problematic B',
    artist: 'Piston Studio',
    audioUrl: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/audio/Piston%20Studio%20-%20Problematic%20B.wav',
    coverImage: '/piston-logo.png',
  },
  {
    id: '5',
    title: 'Transmute',
    artist: 'Piston Studio',
    audioUrl: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/audio/Piston%20Studio%20-%20Transmute.mp3',
    coverImage: '/piston-logo.png',
  },
];
