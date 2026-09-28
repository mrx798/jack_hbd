import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { futureLetter } from '../data/letter';

export function FutureTimeCapsule() {
  return (
    <section id="future" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-indigo-300/40">
            13 — Future
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            Time Capsule 🔮
          </h2>
          <p className="mt-4 font-garamond text-base text-white/30 sm:text-lg">
            To Jack, one year from now.
          </p>
        </RevealOnScroll>

        {/* Time capsule letter */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
            {/* Wax seal */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/10">
                <span className="text-2xl">🕰️</span>
              </div>
            </div>

            {/* Salutation */}
            <p className="mb-6 font-serif text-xl text-indigo-200/60">
              {futureLetter.salutation}
            </p>

            {/* Body */}
            <div className="space-y-4">
              {futureLetter.paragraphs.map((para, i) => (
                <RevealOnScroll key={i} delay={0.5 + i * 0.3}>
                  <p className="font-garamond text-sm leading-relaxed text-white/40 sm:text-base">
                    {para}
                  </p>
                </RevealOnScroll>
              ))}
            </div>

            {/* Closing */}
            <div className="mt-8">
              <p className="font-garamond text-sm italic text-white/30">{futureLetter.closing}</p>
              <p className="mt-1 font-serif text-base text-indigo-200/50">{futureLetter.signature}</p>
            </div>

            {/* Time lock badge */}
            <div className="mt-8 flex justify-center">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/25">
                  📅 Sealed September 28, 2026
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
