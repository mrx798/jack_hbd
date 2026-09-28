import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { InteractiveCake } from '../components/interactive/InteractiveCake';

export function TheCake() {
  return (
    <section id="cake" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-lg w-full">
        <RevealOnScroll>
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.5em] text-amber-300/40">
            15 — The Cake
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 text-center font-serif text-3xl font-bold text-white sm:text-5xl">
            Make a Wish 🕯️
          </h2>
          <p className="mt-4 text-center font-garamond text-base text-white/30 sm:text-lg">
            21 candles. One wish. Blow them all out.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <div className="mt-12">
            <InteractiveCake />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
