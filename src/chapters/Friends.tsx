import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { FriendPhotoCard } from '../components/ui/FriendPhotoCard';
import { friends as friendsData } from '../data/friends';

export function Friends() {
  return (
    <section id="friends" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-pink-300/40">
            06 — Friends
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
            Her Crew 💜
          </h2>
          <p className="mt-4 max-w-xl font-garamond text-base text-white/30 sm:text-lg">
            The ones who get the unfiltered version. The 2AM texts and the loudest laughs.
          </p>
        </RevealOnScroll>

        {/* Friend photos — 3-column grid, photo only, no metadata */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {friendsData.map((friend, i) => (
            <RevealOnScroll key={friend.id} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-500 hover:border-pink-400/20 hover:bg-white/[0.04]">
                <FriendPhotoCard
                  src={friend.src}
                  orientation={friend.orientation}
                  className="rounded-xl"
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
