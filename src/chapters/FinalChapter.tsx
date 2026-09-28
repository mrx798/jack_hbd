import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { PhotoCard } from '../components/ui/PhotoCard';
import { asset } from '../utils/asset';

export function FinalChapter() {
  return (
    <section
      id="finale"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto max-w-xl text-center">
        {/* Single hero photo */}
        <RevealOnScroll duration={1.2}>
          <div className="mx-auto max-w-[280px] sm:max-w-[320px]">
            <PhotoCard
              src={asset('/images/hero/hero.png')}
              caption="Jacqueline Veronica"
              aspectRatio="95/128"
              className="shadow-2xl shadow-violet-500/10"
            />
          </div>
        </RevealOnScroll>

        {/* Name */}
        <RevealOnScroll delay={0.5} duration={1}>
          <h2 className="mt-10 font-serif text-3xl font-bold text-white sm:text-5xl">
            Jacqueline Veronica.
          </h2>
        </RevealOnScroll>

        {/* Birthday */}
        <RevealOnScroll delay={0.8} duration={1}>
          <p className="mt-4 font-serif text-xl text-rose-200/60 sm:text-2xl">
            Happy Birthday. 🎂
          </p>
        </RevealOnScroll>

        {/* Closing message */}
        <RevealOnScroll delay={1.2} duration={1}>
          <div className="mx-auto mt-8 max-w-md">
            <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="mt-6 space-y-4 font-garamond text-base leading-relaxed text-white/30 sm:text-lg">
              <p>
                {"And once again happy birthday jackkk it's your day your year nalla enjoy pannu uhh ena aanalum serii!!  unkuda yarume ilainaalum serii... una yaarum nambhala naalum serii... Na epavume unkuda dha nipenn..."}
              </p>
              <p>
                {"My life is valued when you are with me and you'll be valued until my last breath of life... And you're the best person I have seen in my life and Thanks for being with me...!!"}
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Signature */}
        <RevealOnScroll delay={1.6}>
          <p className="mt-8 font-serif text-sm text-violet-300/40">
            With everything, always —
          </p>
          <p className="mt-1 font-serif text-base text-violet-200/50">
            Chaos Partner
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
