import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { Envelope } from '../components/interactive/Envelope';
import { getMemoriesByChapter } from '../data/memories';
import { useState } from 'react';

function PremiumPhotoFrame({ src, alt, delay, direction }: {
  src: string;
  alt: string;
  delay: number;
  direction: 'left' | 'right';
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <RevealOnScroll delay={delay} direction={direction}>
      <div
        className="group relative overflow-hidden rounded-xl"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Subtle warm bloom behind the frame */}
        <div
          className="pointer-events-none absolute -inset-3 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(232,121,168,0.06), rgba(168,85,247,0.04), transparent 70%)',
          }}
        />

        {/* Frame border with subtle warm highlight */}
        <div
          className="absolute inset-0 z-10 rounded-xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 20px rgba(232,121,168,0.04), 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
          }}
        />

        {/* Loading state */}
        {!loaded && !error && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-900/30 to-purple-900/20" />
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-950/50 to-purple-950/30">
            <span className="text-3xl">📸</span>
          </div>
        )}

        {/* Blurred background version of the image for letterboxing */}
        {!error && (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl opacity-40"
          />
        )}

        {/* Main image — object-contain so full image is always visible */}
        {!error && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`relative z-[1] h-full w-full object-contain transition-all duration-700 group-hover:scale-[1.01] ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Hover overlay — very subtle */}
        <div
          className="absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent 40%)',
          }}
        />
      </div>
    </RevealOnScroll>
  );
}

export function UsMyChapter() {
  const photos = getMemoriesByChapter('us');

  return (
    <section id="us" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-300/40">
            07 — Us
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            My Chapter With Her
          </h2>
          <p className="mt-4 font-garamond text-base text-white/30 sm:text-lg">
            The one where it's just us. No context needed.
          </p>
        </RevealOnScroll>

        {/* Photo pair — premium treatment */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
          {photos.slice(0, 2).map((photo, i) => (
            <PremiumPhotoFrame
              key={photo.id}
              src={photo.src}
              alt="A memory of us"
              delay={0.3 + i * 0.2}
              direction={i === 0 ? 'left' : 'right'}
            />
          ))}
        </div>

        {/* Friendship line */}
        <RevealOnScroll delay={0.5}>
          <div className="mt-12 text-center">
            <p className="font-garamond text-lg text-white/50 sm:text-xl leading-relaxed">
              More care, more fights, more misunderstandings — yet somehow, through it all, we keep choosing each other and staying together.
            </p>
          </div>
        </RevealOnScroll>

        {/* The letter */}
        <RevealOnScroll delay={0.7}>
          <div className="mt-16 flex justify-center">
            <Envelope />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
