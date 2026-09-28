import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { ConfettiBlast } from '../components/ui/ConfettiBlast';
import { Countdown } from '../components/ui/Countdown';
import { siteConfig } from '../data/config';
import { getBirthdayStatus } from '../utils/dateUtils';

export function BirthdayReveal() {
  const [showConfetti, setShowConfetti] = useState(false);
  const status = getBirthdayStatus(siteConfig.birthdayDate);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 1500);
    const hide = setTimeout(() => setShowConfetti(false), 5000);
    return () => { clearTimeout(timer); clearTimeout(hide); };
  }, []);

  return (
    <section
      id="reveal"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20"
    >
      <ConfettiBlast active={showConfetti} particleCount={50} />

      {/* Main reveal text */}
      <div className="text-center">
        <RevealOnScroll delay={0.2} direction="none">
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-300/40"
            initial={{ letterSpacing: '0.8em', opacity: 0 }}
            whileInView={{ letterSpacing: '0.5em', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            September 28, 2026
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5} direction="none">
          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl md:text-8xl">
            <span className="block bg-gradient-to-r from-rose-300 via-violet-300 to-amber-200 bg-clip-text text-transparent">
              Happy
            </span>
            <span className="block bg-gradient-to-r from-amber-200 via-rose-300 to-violet-300 bg-clip-text text-transparent">
              Birthday
            </span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8} direction="up">
          <div className="mt-8">
            <p className="font-serif text-2xl italic text-rose-200/70 sm:text-3xl">
              Jacqueline Veronica
            </p>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={1.2} direction="up">
          <p className="mt-6 font-garamond text-base text-white/40 sm:text-lg">
            Today is about you. All of it. Every pixel. ✨
          </p>
        </RevealOnScroll>

        {/* Countdown or Birthday message */}
        <RevealOnScroll delay={1.5} direction="up">
          <div className="mt-10">
            {status.isFuture ? (
              <div>
                <p className="mb-4 text-xs uppercase tracking-widest text-white/25">
                  counting down to your day
                </p>
                <Countdown />
              </div>
            ) : (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-5xl">🎂</span>
              </motion.div>
            )}
          </div>
        </RevealOnScroll>
      </div>

      {/* Scroll indicator */}
      <RevealOnScroll delay={2} direction="up" className="absolute bottom-10">
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-[10px] uppercase tracking-widest text-white/15">scroll</p>
          <div className="h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </RevealOnScroll>
    </section>
  );
}
