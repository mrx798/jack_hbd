import { motion } from 'framer-motion';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { siteConfig } from '../data/config';

export function Credits() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const creditLines = [
    { text: 'A memory film', delay: 0 },
    { text: `featuring ${siteConfig.recipientNickname}`, delay: 0.3 },
    { text: `written by ${siteConfig.authorName}`, delay: 0.6 },
    { text: 'crafted with every pixel of love', delay: 0.9 },
    { text: '·', delay: 1.2 },
    { text: 'The End', delay: 1.5 },
    { text: '(but not really)', delay: 1.8 },
  ];

  return (
    <section id="credits" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="text-center">
        {creditLines.map((line, i) => (
          <RevealOnScroll key={i} delay={line.delay} direction="up">
            <p
              className={`mb-4 ${
                line.text === '·'
                  ? 'text-2xl text-white/10'
                  : line.text === 'The End'
                  ? 'font-serif text-2xl text-white/50 sm:text-3xl'
                  : line.text === '(but not really)'
                  ? 'font-garamond text-base italic text-white/20'
                  : i === 0
                  ? 'font-garamond text-lg text-white/30 sm:text-xl'
                  : i === 1
                  ? 'font-serif text-xl text-rose-200/40 sm:text-2xl'
                  : 'font-garamond text-sm text-white/20 sm:text-base'
              }`}
            >
              {line.text}
            </p>
          </RevealOnScroll>
        ))}

        {/* Replay button */}
        <RevealOnScroll delay={2.2}>
          <motion.button
            onClick={scrollToTop}
            className="mt-8 rounded-full border border-white/10 px-8 py-3 font-serif text-sm uppercase tracking-[0.2em] text-white/30 transition-all hover:border-violet-400/30 hover:text-white/60"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Again
          </motion.button>
        </RevealOnScroll>

        {/* Footer */}
        <RevealOnScroll delay={2.5}>
          <p className="mt-12 text-[10px] text-white/10">
            Made with ✨ for the most extraordinary person I know
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
