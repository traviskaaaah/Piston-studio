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
    audioUrl: '/audio/Piston Studio - Bukit Besak.wav',
    coverImage: '/piston-logo.png',
  },
  {
    id: '2',
    title: 'Decimal',
    artist: 'Piston Studio',
    audioUrl: '/audio/Piston Studio - Decimal.mp3',
    coverImage: '/piston-logo.png',
  },
  {
    id: '3',
    title: 'False Virtue',
    artist: 'Piston Studio',
    audioUrl: '/audio/Piston Studio - False Virtue.wav',
    coverImage: '/piston-logo.png',
  },
  {
    id: '4',
    title: 'Problematic B',
    artist: 'Piston Studio',
    audioUrl: '/audio/Piston Studio - Problematic B.wav',
    coverImage: '/piston-logo.png',
  },
  {
    id: '5',
    title: 'Transmute',
    artist: 'Piston Studio',
    audioUrl: '/audio/Piston Studio - Transmute.mp3',
    coverImage: '/piston-logo.png',
  },
];
