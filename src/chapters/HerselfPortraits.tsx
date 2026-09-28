import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { ViewportLoopVideo } from '../components/ui/ViewportLoopVideo';
import { getMemoriesByChapter } from '../data/memories';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function HerselfPortraits() {
  const photos = getMemoriesByChapter('portraits');

  return (
    <section id="herself" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-rose-300/40">
            08 — Her
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            The Girl Behind All of It
          </h2>
          <p className="mt-4 max-w-xl font-garamond text-base text-white/30 sm:text-lg">
            Before the titles, the achievements, the future — there's just her.
          </p>
        </RevealOnScroll>

        {/* Portrait gallery — 6 items in 2-column grid, slightly reduced frame size */}
        <div className="mx-auto mt-12 max-w-3xl grid grid-cols-2 gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <RevealOnScroll key={photo.id} delay={i * 0.15}>
              <div className="group relative overflow-hidden rounded-xl">
                {photo.type === 'video' ? (
                  <HerVideoFrame src={photo.src} />
                ) : (
                  <HerPhotoFrame src={photo.src} />
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Centered affirmation */}
        <RevealOnScroll delay={0.5}>
          <p className="mt-12 text-center font-serif text-xl italic text-rose-200/40 sm:text-2xl">
            "She was never just one thing. She was all of them — all at once."
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/**
 * Photo frame with intelligent fit — preserves the full image
 * inside a consistent 3/4 aspect frame. Uses object-cover for
 * most images (keeping faces centered), and falls back to a
 * blurred-bg + contain approach for extreme aspect differences.
 */
function HerPhotoFrame({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    const img = e.currentTarget;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    // Frame is 3/4 = 0.75 aspect ratio
    // Only switch to contain for very extreme mismatches (e.g. ultra-wide panoramas)
    const frameRatio = 3 / 4;
    if (Math.abs(imgRatio - frameRatio) > 0.6) {
      setFitMode('contain');
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      style={{ aspectRatio: '3/4' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Placeholder / loading state */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-900/30 to-purple-900/20" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-950/50 to-purple-950/30">
          <span className="text-3xl">📸</span>
        </div>
      )}

      {!error && (
        <>
          {/* Blurred same-photo background — only for extreme aspect mismatches */}
          {fitMode === 'contain' && loaded && (
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.3] opacity-80"
            />
          )}

          {/* Main image */}
          <img
            src={src}
            alt="Memory"
            loading="lazy"
            onLoad={handleLoad}
            onError={() => setError(true)}
            className={`relative h-full w-full transition-all duration-700 ${
              fitMode === 'contain' ? 'object-contain' : 'object-cover object-center'
            } ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}
          />
        </>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

/**
 * Video frame — same dimensions as photo frames.
 * Uses ViewportLoopVideo for ambient autoplay.
 */
function HerVideoFrame({ src }: { src: string }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      style={{ aspectRatio: '3/4' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <ViewportLoopVideo
        src={src}
        className="h-full w-full object-cover"
      />

      {/* Hover overlay — same as photo frames */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
