// Media configuration for gallery
// User akan menambahkan media files ke folder public/images/ dan public/videos/
// Lalu update array ini dengan media info yang sesuai

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
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/%28wave1%2Cw%2Cwave2%29.mp4',
    title: 'Wave',
    category: 'studio',
  },
  {
    id: '2',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/ascii%20slide.mp4',
    title: 'ASCII Slide',
    category: 'studio',
  },
  {
    id: '3',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Beyond%20The%20Voyage.mov',
    title: 'Beyond The Voyage',
    category: 'studio',
  },
  {
    id: '4',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/fraktall.mp4',
    title: 'Fraktall',
    category: 'studio',
  },
  {
    id: '5',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Into%20The%20Void.mp4',
    title: 'Into The Void',
    category: 'studio',
  },
  {
    id: '6',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Jabo%202.mp4',
    title: 'Jabo 2',
    category: 'live',
  },
  {
    id: '7',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/jabo.mp4',
    title: 'Jabo',
    category: 'live',
  },
  {
    id: '8',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/particles.mp4',
    title: 'Particles',
    category: 'studio',
  },
  {
    id: '9',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/react%20active%20slide.mp4',
    title: 'React Active Slide',
    category: 'studio',
  },
  {
    id: '10',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/sketch_210906a%202022-05-13%2017-10-09.mov',
    title: 'Sketch 210906a',
    category: 'behind-the-scenes',
  },
  {
    id: '11',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Tiger%20Dance.mp4',
    title: 'Tiger Dance',
    category: 'live',
  },
  {
    id: '12',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/tribute.mov',
    title: 'Tribute',
    category: 'studio',
  },
  {
    id: '13',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Visual%20Piston%20%203.mp4',
    title: 'Visual Piston 3',
    category: 'promo',
  },
  {
    id: '14',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Visual%20Piston%201.mp4',
    title: 'Visual Piston 1',
    category: 'promo',
  },
  {
    id: '15',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Visual%20Piston%202.mp4',
    title: 'Visual Piston 2',
    category: 'promo',
  },
  {
    id: '16',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Visual%20Piston%204.mp4',
    title: 'Visual Piston 4',
    category: 'promo',
  },
  {
    id: '17',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Visual%20Piston%205.mp4',
    title: 'Visual Piston 5',
    category: 'promo',
  },
  {
    id: '18',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/Visual%20Piston%206.mp4',
    title: 'Visual Piston 6',
    category: 'promo',
  },
  {
    id: '19',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/PISTON%20BOM.mp4',
    title: 'Quarter Calibration',
    category: 'promo',
  },
  {
    id: '20',
    type: 'video',
    url: 'https://bqa3lah1kvo0jzhq.public.blob.vercel-storage.com/videos/loading-bg.mp4',
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
