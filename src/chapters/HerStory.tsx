import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { PhotoCard } from '../components/ui/PhotoCard';
import { timeline } from '../data/timeline';

export function HerStory() {
  return (
    <section id="her-story" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-300/40">
            03 — Her Story
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            The Life of <span className="text-rose-300">Jack</span>
          </h2>
          <p className="mt-4 font-garamond text-base text-white/30 sm:text-lg">
            Twenty-one years. Every chapter brought her here.
          </p>
        </RevealOnScroll>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/20 via-rose-400/20 to-amber-300/20 sm:left-1/2" />

          {timeline.map((event, i) => (
            <RevealOnScroll
              key={event.id}
              delay={i * 0.15}
              direction={i % 2 === 0 ? 'left' : 'right'}
            >
              <div
                className={`relative mb-12 flex flex-col gap-4 pl-14 sm:flex-row sm:items-center sm:gap-8 sm:pl-0 ${
                  i % 2 === 0 ? 'sm:flex-row-reverse sm:text-right' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-1 flex h-5 w-5 items-center justify-center sm:left-1/2 sm:-translate-x-1/2">
                  <div className="h-3 w-3 rounded-full border-2 border-violet-400/40 bg-violet-500/20" />
                  <div className="absolute h-5 w-5 animate-ping rounded-full bg-violet-400/10" />
                </div>

                {/* Content side */}
                <div className="flex-1 sm:w-1/2">
                  <span className="font-mono text-xs text-white/25">{event.year}</span>
                  <h3 className="mt-1 font-serif text-lg text-white/80 sm:text-xl">
                    <span className="mr-2">{event.icon}</span>
                    {event.title}
                  </h3>
                  <p className="mt-2 font-garamond text-sm leading-relaxed text-white/40 sm:text-base">
                    {event.description}
                  </p>
                </div>

                {/* Photo side */}
                <div className="flex-1 sm:w-1/2">
                  {event.image && (
                    <PhotoCard
                      src={event.image}
                      caption={event.title}
                      aspectRatio="16/10"
                      className="max-w-[300px]"
                    />
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
