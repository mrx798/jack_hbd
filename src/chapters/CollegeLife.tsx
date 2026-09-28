import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { FriendPhotoCard } from '../components/ui/FriendPhotoCard';
import { asset } from '../utils/asset';

interface CollegeSection {
  title: string;
  images: { id: string; src: string; orientation: 'horizontal' | 'vertical' | 'square' }[];
}

const collegeSections: CollegeSection[] = [
  {
    title: 'How It Started',
    images: [
      { id: 'college-start-1', src: asset('/images/college/firstimg.png'), orientation: 'square' },
      { id: 'college-start-2', src: asset('/images/college/shaha.jpg'),    orientation: 'horizontal' },
      { id: 'college-start-3', src: asset('/images/college/jama.jpg'),     orientation: 'vertical' },
    ],
  },
  {
    title: "How It's Going",
    images: [
      { id: 'college-now-1', src: asset('/images/college/gan.jpg'),   orientation: 'vertical' },
      { id: 'college-now-2', src: asset('/images/college/whole.png'), orientation: 'horizontal' },
      { id: 'college-now-3', src: asset('/images/college/song.jpg'),  orientation: 'vertical' },
    ],
  },
];

export function CollegeLife() {
  return (
    <section id="college" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-300/40">
            04 — College Life
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            BSc Nursing 🩺
          </h2>
          <p className="mt-4 max-w-2xl font-garamond text-base text-white/30 sm:text-lg">
            Christian Fellowship Hospital — where long hours become long stories, and a girl who chose
            to care for strangers became someone who could hold someone's world together.
          </p>
        </RevealOnScroll>

        {/* Two-part story */}
        {collegeSections.map((section, sectionIdx) => (
          <div key={section.title} className={sectionIdx === 0 ? 'mt-12' : 'mt-16'}>
            <RevealOnScroll delay={0.1}>
              <h3 className="mb-6 font-serif text-lg text-cyan-200/50 sm:text-xl">
                {section.title}
              </h3>
            </RevealOnScroll>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
              {section.images.map((img, i) => (
                <RevealOnScroll key={img.id} delay={(sectionIdx * 3 + i) * 0.1}>
                  <div className="group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-500 hover:border-cyan-400/20 hover:bg-white/[0.04]">
                    <FriendPhotoCard
                      src={img.src}
                      orientation={img.orientation}
                      className="rounded-xl"
                    />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        ))}

        {/* Quote */}
        <RevealOnScroll delay={0.5}>
          <blockquote className="mx-auto mt-12 max-w-xl text-center">
            <p className="font-garamond text-lg italic text-white/40 sm:text-xl">
              "The discipline, the long hospital hours, the quiet courage it takes to be the person
              who shows up at someone else's hardest moment — that's not just a career choice.
              That's character."
            </p>
          </blockquote>
        </RevealOnScroll>
      </div>
    </section>
  );
}
