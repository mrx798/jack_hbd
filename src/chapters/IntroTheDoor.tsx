import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterText } from '../components/ui/TypewriterText';

interface IntroTheDoorProps {
  onEnter: () => void;
}

export function IntroTheDoor({ onEnter }: IntroTheDoorProps) {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 1200);
  };

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.section
          id="intro"
          className="relative flex min-h-screen flex-col items-center justify-center px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center">
            {/* Line 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <p className="font-garamond text-base text-white/30 sm:text-lg">
                <TypewriterText
                  text="Something has been waiting for you..."
                  speed={50}
                  delay={800}
                  onComplete={() => setStep(1)}
                />
              </p>
            </motion.div>

            {/* Line 2 — the name */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mt-6"
                >
                  <p className="font-serif text-sm uppercase tracking-[0.4em] text-violet-300/60">
                    <TypewriterText
                      text="for Jack"
                      speed={100}
                      delay={300}
                      onComplete={() => setStep(2)}
                    />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enter button */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-12"
                >
                  <motion.button
                    onClick={handleEnter}
                    className="group relative overflow-hidden rounded-full border border-white/10 px-10 py-4 font-serif text-sm uppercase tracking-[0.3em] text-white/60 transition-colors hover:border-violet-400/30 hover:text-white/90"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Glow background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/10 to-violet-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative">Enter</span>
                  </motion.button>

                  <motion.p
                    className="mt-4 text-[10px] text-white/15"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🔊 best with sound
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      ) : (
        <motion.div
          className="flex min-h-screen items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      )}
    </AnimatePresence>
  );
}
