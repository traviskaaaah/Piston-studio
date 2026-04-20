// Media configuration for gallery
// Compressed videos served from /public/videos/compressed/

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  category?: string;
}

export const galleryMedia: MediaItem[] = [
  {
    id: '1',
    type: 'video',
    url: '/videos/compressed/(wave1,w,wave2).mp4',
    title: 'Wave',
    category: 'studio',
  },
  {
    id: '2',
    type: 'video',
    url: '/videos/compressed/ascii slide.mp4',
    title: 'ASCII Slide',
    category: 'studio',
  },
  {
    id: '3',
    type: 'video',
    url: '/videos/compressed/Beyond The Voyage.mp4',
    title: 'Beyond The Voyage',
    category: 'studio',
  },
  {
    id: '4',
    type: 'video',
    url: '/videos/compressed/fraktall.mp4',
    title: 'Fraktall',
    category: 'studio',
  },
  {
    id: '5',
    type: 'video',
    url: '/videos/compressed/Into The Void.mp4',
    title: 'Into The Void',
    category: 'studio',
  },
  {
    id: '6',
    type: 'video',
    url: '/videos/compressed/Jabo 2.mp4',
    title: 'Jabo 2',
    category: 'live',
  },
  {
    id: '7',
    type: 'video',
    url: '/videos/compressed/jabo.mp4',
    title: 'Jabo',
    category: 'live',
  },
  {
    id: '8',
    type: 'video',
    url: '/videos/compressed/particles.mp4',
    title: 'Particles',
    category: 'studio',
  },
  {
    id: '9',
    type: 'video',
    url: '/videos/compressed/react active slide.mp4',
    title: 'React Active Slide',
    category: 'studio',
  },
  {
    id: '10',
    type: 'video',
    url: '/videos/compressed/sketch_210906a 2022-05-13 17-10-09.mp4',
    title: 'Sketch 210906a',
    category: 'behind-the-scenes',
  },
  {
    id: '11',
    type: 'video',
    url: '/videos/compressed/Tiger Dance.mp4',
    title: 'Tiger Dance',
    category: 'live',
  },
  {
    id: '12',
    type: 'video',
    url: '/videos/compressed/tribute.mp4',
    title: 'Tribute',
    category: 'studio',
  },
  {
    id: '13',
    type: 'video',
    url: '/videos/compressed/Visual Piston  3.mp4',
    title: 'Visual Piston 3',
    category: 'promo',
  },
  {
    id: '14',
    type: 'video',
    url: '/videos/compressed/Visual Piston 1.mp4',
    title: 'Visual Piston 1',
    category: 'promo',
  },
  {
    id: '15',
    type: 'video',
    url: '/videos/compressed/Visual Piston 2.mp4',
    title: 'Visual Piston 2',
    category: 'promo',
  },
  {
    id: '16',
    type: 'video',
    url: '/videos/compressed/Visual Piston 4.mp4',
    title: 'Visual Piston 4',
    category: 'promo',
  },
  {
    id: '17',
    type: 'video',
    url: '/videos/compressed/Visual Piston 5.mp4',
    title: 'Visual Piston 5',
    category: 'promo',
  },
  {
    id: '18',
    type: 'video',
    url: '/videos/compressed/Visual Piston 6.mp4',
    title: 'Visual Piston 6',
    category: 'promo',
  },
  {
    id: '19',
    type: 'video',
    url: '/videos/compressed/PISTON BOM.mp4',
    title: 'Quarter Calibration',
    category: 'promo',
  },
  {
    id: '20',
    type: 'video',
    url: '/videos/loading-bg-compressed.mp4',
    title: 'Loading Background',
    category: 'studio',
  },
];

// Media categories for filtering
export const mediaCategories = [
  'all',
  'live',
  'studio',
  'behind-the-scenes',
  'promo',
];
