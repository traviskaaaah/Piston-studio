# Piston Collective Website

Immersive portfolio website untuk collective musik "piston" dengan tagline **"Reset The System, Ignite The Chamber"**.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **GSAP** + **Lenis** (smooth scroll & animations)
- **Framer Motion** (page transitions)
- **Howler.js** (audio player)
- **Tailwind CSS** (styling)
- **Medieval Sharp** (Google Fonts)

## Features

- Full immersive experience dengan smooth scroll kompleks
- Custom audio player persistent across pages
- Masonry gallery dengan autoplay video on hover
- Lightbox untuk full-screen media view
- Custom cursor animation
- Loading screen dengan brand animation
- Parallax effects
- Full black theme (#000000, #ffffff, #ff3b00, #00d9ff)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Upload Media Files

Upload file media kamu ke folder berikut:

```
public/
├── audio/          # Audio tracks (.mp3, .wav, dll)
├── videos/         # Video files (.mp4, .webm, dll)
├── images/         # Images (.jpg, .png, .webp, dll)
└── logo.png        # Logo Piston Collective
```

### 3. Update Configuration

**Audio Tracks** (`config/audio.ts`):
```typescript
export const audioTracks: Track[] = [
  {
    id: '1',
    title: 'Track Title',
    artist: 'Artist Name',
    url: '/audio/track-name.mp3',
    cover: '/images/cover-art.jpg',
    duration: 180 // in seconds
  },
  // Add more tracks...
];
```

**Gallery Media** (`config/media.ts`):
```typescript
export const galleryMedia: MediaItem[] = [
  {
    id: '1',
    type: 'image', // or 'video'
    url: '/images/photo-1.jpg',
    thumbnail: '/images/photo-1-thumb.jpg',
    title: 'Photo Title',
    description: 'Photo description'
  },
  // Add more media...
];
```

**Hero Video** (`components/home/HeroSection.tsx`):
Update line 44:
```typescript
<source src="/videos/hero-video.mp4" type="video/mp4" />
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## Deployment (Netlify)

1. Push code ke GitHub repository
2. Connect repository ke Netlify
3. Netlify akan auto-detect `netlify.toml` config
4. Deploy!

Atau via Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Project Structure

```
piston-collective/
├── app/
│   ├── page.tsx              # Home page
│   ├── gallery/page.tsx      # Gallery page
│   ├── contact/page.tsx      # Contact page
│   └── layout.tsx            # Root layout
├── components/
│   ├── animations/           # SmoothScroll, CustomCursor, LoadingScreen
│   ├── audio/                # Audio player components
│   ├── gallery/              # MasonryGrid, Lightbox
│   ├── home/                 # HeroSection, FeaturedWorks
│   └── layout/               # Header, Footer
├── lib/
│   ├── animations/           # GSAP utilities
│   └── audio/                # AudioContext
├── config/
│   ├── audio.ts              # Audio tracks config
│   └── media.ts              # Gallery media config
├── types/
│   └── audio.ts              # TypeScript types
└── public/                   # Static assets

```

## Pages

- **Home** (`/`) - Hero dengan video background, tagline, featured works
- **Gallery** (`/gallery`) - Masonry grid layout dengan lightbox
- **Contact** (`/contact`) - Social links & contact form

## Social Links

- Instagram: [@pis_._ton](https://www.instagram.com/pis_._ton/)
- Google Drive: [Media Archive](https://drive.google.com/drive/folders/1QF7bu6QJC8dgPWHswvFDk83VzXWFjSk8)

## Color Palette

- Background: `#000000` (Black)
- Text: `#ffffff` (White)
- Primary: `#ff3b00` (Hot Orange)
- Secondary: `#00d9ff` (Electric Cyan)

## Font

- **Medieval Sharp** (Google Fonts) - Display font untuk branding

---

Built with ❤️ by Piston Collective
