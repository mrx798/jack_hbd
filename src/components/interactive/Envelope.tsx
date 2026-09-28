import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterText } from '../ui/TypewriterText';
import { letter } from '../../data/letter';

export function Envelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowLetter(true), 800);
  };

  const handleClose = () => {
    setShowLetter(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Envelope */}
      <AnimatePresence>
        {!showLetter && (
          <motion.button
            onClick={handleOpen}
            className="group relative"
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Open letter"
          >
            {/* Envelope body */}
            <div className="relative h-36 w-56 rounded-lg border border-white/10 bg-gradient-to-br from-violet-950/80 to-purple-950/60 shadow-2xl backdrop-blur-sm sm:h-44 sm:w-72">
              {/* Flap */}
              <motion.div
                className="absolute -top-px left-0 right-0 h-[45%] origin-top overflow-hidden"
                animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d', perspective: 400 }}
              >
                <div
                  className="h-full w-full border-x border-t border-white/10"
                  style={{
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(168,85,247,0.2))',
                  }}
                />
              </motion.div>

              {/* Seal */}
              <div className="absolute left-1/2 top-[35%] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-rose-400/30 bg-gradient-to-br from-rose-500/40 to-rose-600/30">
                <span className="text-sm">💌</span>
              </div>

              {/* Label */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="font-serif text-sm italic text-white/40">For Jack</p>
              </div>
            </div>

            {/* Glow on hover */}
            <div className="absolute -inset-4 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)' }}
            />

            {!isOpen && (
              <p className="mt-4 text-xs text-white/30">Tap to open</p>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Letter content */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            className="w-full max-w-xl rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Salutation */}
            <p className="mb-6 font-serif text-xl text-rose-300 sm:text-2xl">
              <TypewriterText text={letter.salutation} speed={60} />
            </p>

            {/* Paragraphs */}
            <div className="space-y-4">
              {letter.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  className="font-garamond text-sm leading-relaxed text-white/70 sm:text-base" style={{ lineHeight: '1.8' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.4, duration: 0.6 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Closing */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + letter.paragraphs.length * 0.4, duration: 0.8 }}
            >
              <p className="font-garamond text-sm italic text-white/50">{letter.closing}</p>
              <p className="mt-1 font-serif text-lg text-violet-300">{letter.signature}</p>
            </motion.div>

            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="mt-6 text-xs text-white/30 underline underline-offset-4 transition-colors hover:text-white/50"
              aria-label="Close letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Close letter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
