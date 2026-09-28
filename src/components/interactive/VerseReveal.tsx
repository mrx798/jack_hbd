import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { verses } from '../../data/verses';

export function VerseReveal() {
  const [activeVerse, setActiveVerse] = useState<string | null>(null);

  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {verses.map((verse, i) => (
        <motion.button
          key={verse.id}
          onClick={() => setActiveVerse(activeVerse === verse.id ? null : verse.id)}
          className="group relative overflow-hidden rounded-xl border border-white/5 text-left transition-all duration-500 hover:border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          style={{
            background: activeVerse === verse.id
              ? 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(254,243,199,0.03))'
              : 'rgba(255,255,255,0.02)',
          }}
        >
          <div className="p-4 sm:p-5">
            {/* Reference */}
            <p className="font-mono text-xs tracking-wider text-amber-200/50 uppercase">
              {verse.reference}
            </p>

            {/* Theme badge */}
            {verse.theme && (
              <span className="mt-2 inline-block rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/30">
                {verse.theme}
              </span>
            )}

            {/* Verse text */}
            <AnimatePresence>
              {activeVerse === verse.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 border-t border-white/5 pt-3 font-garamond text-sm italic leading-relaxed text-amber-100/60 sm:text-base">
                    {verse.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tap indicator */}
            <p className="mt-2 text-[10px] text-white/20">
              {activeVerse === verse.id ? 'Tap to close' : 'Tap to reveal'}
            </p>
          </div>

          {/* Subtle glow */}
          {activeVerse === verse.id && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(251,191,36,0.05), transparent 70%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
