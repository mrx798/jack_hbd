import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { PhotoCard } from '../components/ui/PhotoCard';
import { familyMembers } from '../data/family';

export function Family() {
  return (
    <section id="family" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-amber-300/40">
            04 — Family
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            Her People 🏠
          </h2>
          <p className="mt-4 max-w-xl font-garamond text-base text-white/30 sm:text-lg">
            Behind this beautiful girl is a family who made her feel loved, believed in, and never alone.
          </p>
        </RevealOnScroll>

        {/* Family photo grid — 4 cols on desktop, 2 cols on mobile */}
        <div className="family-grid mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {familyMembers.map((member, i) => (
            <RevealOnScroll key={member.id} delay={i * 0.15}>
              <PhotoCard
                src={member.image}
                aspectRatio="1/1"
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* Center the last partial row (items 9 & 10) on desktop 4-col grid */}
        <style>{`
          @media (min-width: 640px) {
            .family-grid > :nth-child(9) {
              grid-column-start: 2;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
