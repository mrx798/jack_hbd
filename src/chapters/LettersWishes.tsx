import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { OpenWhenCards } from '../components/interactive/OpenWhenCards';
import { wishes } from '../data/wishes';

export function LettersWishes() {
  return (
    <section id="letters" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-rose-300/40">
            12 — Letters & Wishes
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            Words for You 💌
          </h2>
        </RevealOnScroll>

        {/* Open When cards */}
        <RevealOnScroll delay={0.3}>
          <div className="mt-12">
            <h3 className="mb-6 font-serif text-lg text-rose-200/50">
              Open When…
            </h3>
            <OpenWhenCards />
          </div>
        </RevealOnScroll>

        {/* Wishes wall */}
        <RevealOnScroll delay={0.5}>
          <div className="mt-20">
            <h3 className="mb-6 font-serif text-lg text-rose-200/50">
              Birthday Wishes 🎂
            </h3>
            <div className="space-y-4">
              {wishes.map((wish, i) => (
                <RevealOnScroll key={wish.id} delay={i * 0.1}>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/10">
                    <p className="font-garamond text-sm leading-relaxed text-white/50 sm:text-base">
                      "{wish.message}"
                    </p>
                    <p className="mt-3 text-xs text-rose-300/50">— {wish.from}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
