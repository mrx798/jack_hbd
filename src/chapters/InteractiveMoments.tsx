import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { PolaroidStack } from '../components/interactive/PolaroidStack';

export function InteractiveMoments() {
  return (
    <section id="interactive" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-300/40">
            10 — Moments
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            Pause & Play ✨
          </h2>
          <p className="mt-4 font-garamond text-base text-white/30 sm:text-lg">
            Some memories are better when you hold them yourself.
          </p>
        </RevealOnScroll>

        {/* Polaroid Stack */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-12">
            <h3 className="mb-6 text-center font-serif text-lg text-white/50">
              Memory Stack
            </h3>
            <PolaroidStack />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
