'use client';

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/loading-bg-compressed.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay untuk readability */}
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
