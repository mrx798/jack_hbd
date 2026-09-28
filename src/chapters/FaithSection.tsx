import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { VerseReveal } from '../components/interactive/VerseReveal';
import { PhotoCard } from '../components/ui/PhotoCard';
import { getMemoriesByChapter } from '../data/memories';

export function FaithSection() {
  const photos = getMemoriesByChapter('faith');

  return (
    <section id="faith" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-amber-200/40">
            11 — Faith
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            Her Foundation 🕊️
          </h2>
          <p className="mt-4 max-w-xl font-garamond text-base text-white/30 sm:text-lg">
            The anchor beneath everything. The quiet strength she carries.
          </p>
        </RevealOnScroll>

        {/* Faith photos */}
        {photos.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-3">
            {photos.map((photo, i) => (
              <RevealOnScroll key={photo.id} delay={i * 0.15}>
                <PhotoCard
                  src={photo.src}
                  caption={photo.caption}
                  aspectRatio="1/1"
                />
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* Verse reveals */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-12">
            <h3 className="mb-6 font-serif text-lg text-amber-200/50">
              Words She Carries ✝️
            </h3>
            <VerseReveal />
          </div>
        </RevealOnScroll>

        {/* Closing thought */}
        <RevealOnScroll delay={0.6}>
          <div className="mx-auto mt-16 max-w-md text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
            <p className="mt-6 font-garamond text-base italic text-amber-100/30">
              Her faith isn't loud. It's the kind that shows up in how she treats people —
              the quiet patience, the grace under pressure, the choice to care even when it costs her.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
