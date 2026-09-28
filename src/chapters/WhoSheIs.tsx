import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { PhotoCard } from '../components/ui/PhotoCard';

export function WhoSheIs() {
  return (
    <section id="who-she-is" className="relative min-h-screen px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-300/40">
            02 — Who She Is
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            Meet <span className="text-rose-300">Jack</span>
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-8 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:items-start">
          <RevealOnScroll delay={0.3} direction="left">
            <PhotoCard
              src="/images/cover_pic.png"
              caption="Jacqueline Veronica"
              aspectRatio="3/4"
              className="mx-auto max-w-[340px] sm:mt-2"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.5} direction="right">
            <div className="space-y-4">
              <p className="font-garamond text-lg leading-relaxed text-white/60 sm:text-xl">
                You’re a little girl with a heart far bigger than the world could ever hold. You have this beautiful way of making everyone around you smile, even when life isn't kind to you. There is something so pure about your smile—so much warmth, innocence, and positivity.
              </p>
              <p className="font-garamond text-lg leading-relaxed text-white/60 sm:text-xl">
                You've faced your own storms and carried your own battles, yet you never let them make you unkind. Somehow, you turn every difficult chapter into strength and still bring light to the people around you. Maybe that's why I feel like you're one of God's little children.
              </p>
              <p className="font-garamond text-lg leading-relaxed text-white/60 sm:text-xl">
                And now you're <span className="font-medium text-white/80">21, Jack. 🥹🤍</span> There is still so much life ahead—so many memories to make and beautiful chapters to write. I hope life is gentle with you and gives you the happiness you deserve. <span className="font-medium text-white/80">Happy 21st, Jack. 🤍</span>
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
