import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhenCards } from '../../data/openWhen';

export function OpenWhenCards() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {openWhenCards.map((card, i) => (
        <motion.button
          key={card.id}
          onClick={() => setOpenCard(openCard === card.id ? null : card.id)}
          className="group relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileTap={{ scale: 0.97 }}
        >
          <div
            className="relative overflow-hidden rounded-xl border border-white/10 p-4 text-left transition-all duration-500 sm:p-5"
            style={{
              background: openCard === card.id
                ? `linear-gradient(135deg, ${card.color}30, ${card.color}10)`
                : 'rgba(255,255,255,0.03)',
              borderColor: openCard === card.id ? `${card.color}40` : undefined,
            }}
          >
            {/* Emoji */}
            <span className="text-2xl">{card.emoji}</span>

            {/* Theme */}
            <p className="mt-2 font-serif text-sm text-white/70 sm:text-base">
              Open when {card.theme}
            </p>

            {/* Message reveal */}
            <AnimatePresence>
              {openCard === card.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 border-t border-white/10 pt-3">
                    <p className="font-garamond text-xs leading-relaxed text-white/50 sm:text-sm">
                      {card.message}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner indicator */}
            <div className="absolute right-2 top-2 text-xs text-white/20">
              {openCard === card.id ? '−' : '+'}
            </div>

            {/* Glow */}
            {openCard === card.id && (
              <motion.div
                className="absolute -inset-px rounded-xl"
                style={{
                  boxShadow: `0 0 30px ${card.color}20, inset 0 0 30px ${card.color}05`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
