import { useState } from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { MemoryVideo } from '../components/ui/MemoryVideo';
import { ViewportLoopVideo } from '../components/ui/ViewportLoopVideo';

// ─── Data-driven media list (exact order) ────────────────

type MemoryMedia =
  | {
      id: string;
      type: 'image';
      src: string;
    }
  | {
      id: string;
      type: 'video';
      src: string;
      behavior: 'click-to-play';
    }
  | {
      id: string;
      type: 'video';
      src: string;
      behavior: 'viewport-loop';
      muted: true;
    };

const galleryMedia: MemoryMedia[] = [
  // 01–06: Normal click-to-play videos with audio
  { id: 'mem-01', type: 'video', src: '/videos/gallery/video1.mp4', behavior: 'click-to-play' },
  { id: 'mem-02', type: 'video', src: '/videos/gallery/video2.mp4', behavior: 'click-to-play' },
  { id: 'mem-03', type: 'video', src: '/videos/gallery/video3.mp4', behavior: 'click-to-play' },
  { id: 'mem-04', type: 'video', src: '/videos/gallery/video4.mp4', behavior: 'click-to-play' },
  { id: 'mem-05', type: 'video', src: '/videos/gallery/video5.mp4', behavior: 'click-to-play' },
  { id: 'mem-06', type: 'video', src: '/videos/gallery/video6.mp4', behavior: 'click-to-play' },
  // 07: Special 3-second looping ambient video — muted, no controls
  { id: 'mem-07', type: 'video', src: '/videos/gallery/loop.mp4', behavior: 'viewport-loop', muted: true },
  // 08–10: Regular photographs
  { id: 'mem-08', type: 'image', src: '/images/gallery/_img.jpg' },
  { id: 'mem-09', type: 'image', src: '/images/gallery/img_2.jpg' },
  { id: 'mem-10', type: 'image', src: '/images/gallery/img_3.jpg' },
];

export function MemoryGallery() {
  return (
    <section id="gallery" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-300/40">
            09 — Memories
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            Memory Gallery 📸
          </h2>
          <p className="mt-4 max-w-xl font-garamond text-base text-white/30 sm:text-lg">
            Moments that became memories. Memories that became the story.
          </p>
        </RevealOnScroll>

        {/* Masonry-style grid — CSS columns with natural media heights */}
        <div className="mt-12 columns-2 gap-3 space-y-3 sm:columns-3 sm:gap-4 sm:space-y-4">
          {galleryMedia.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 0.08}>
              <div className="break-inside-avoid">
                {item.type === 'video' && item.behavior === 'click-to-play' && (
                  <GalleryVideoFrame src={item.src} />
                )}
                {item.type === 'video' && item.behavior === 'viewport-loop' && (
                  <GalleryLoopFrame src={item.src} />
                )}
                {item.type === 'image' && (
                  <GalleryPhotoFrame src={item.src} />
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Frames ──────────────────────────────────────
// Each frame lets its media content determine the natural height.
// NO forced aspect-ratio. NO object-fit: cover cropping.
// The card wraps the media tightly with consistent visual styling.

function GalleryVideoFrame({ src }: { src: string }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <MemoryVideo src={src} />

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

function GalleryLoopFrame({ src }: { src: string }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <ViewportLoopVideo
        src={src}
        className="w-full block"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

function GalleryPhotoFrame({ src }: { src: string }) {
  const [error, setError] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {error ? (
        <div className="flex items-center justify-center bg-gradient-to-br from-violet-950/50 to-purple-950/30 py-16">
          <span className="text-3xl">📸</span>
        </div>
      ) : (
        <img
          src={src}
          alt="Memory"
          loading="lazy"
          onError={() => setError(true)}
          className="w-full block"
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
