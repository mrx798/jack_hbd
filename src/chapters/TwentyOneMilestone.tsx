import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { twentyOneThings } from '../data/twentyOneThings';

export function TwentyOneMilestone() {
  return (
    <section id="twenty-one" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-amber-300/40">
            12 — The Milestone
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-5xl font-bold sm:text-7xl">
            <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-violet-300 bg-clip-text text-transparent">
              21
            </span>
          </h2>
          <p className="mt-4 font-serif text-xl text-white/50 sm:text-2xl">
            Things I Hope She Never Forgets
          </p>
        </RevealOnScroll>

        {/* The list */}
        <div className="mt-12 space-y-1">
          {twentyOneThings.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 0.08}>
              <div className={`group flex gap-4 rounded-lg p-3 transition-colors sm:p-4 ${
                item.id === 21
                  ? 'mt-4 border border-amber-300/20 bg-amber-300/[0.03]'
                  : 'hover:bg-white/[0.02]'
              }`}>
                {/* Number */}
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-all sm:h-9 sm:w-9 ${
                  item.id === 21
                    ? 'border-amber-300/40 text-amber-300/80 shadow-[0_0_12px_rgba(251,191,36,0.15)]'
                    : 'border-white/10 text-white/30 group-hover:border-amber-300/30 group-hover:text-amber-300/60'
                }`}>
                  {String(item.id).padStart(2, '0')}
                </span>
                {/* Text */}
                <p className={`pt-1 font-garamond text-sm leading-relaxed sm:text-base ${
                  item.id === 21
                    ? 'text-amber-100/70 font-medium'
                    : 'text-white/50'
                }`}>
                  {item.text}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Closing */}
        <RevealOnScroll delay={0.5}>
          <div className="mt-12 text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
            <p className="mt-6 font-serif text-base italic text-amber-200/30">
              Twenty-one and already extraordinary.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
