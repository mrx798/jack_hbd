import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfettiBlast } from '../ui/ConfettiBlast';

export function InteractiveCake() {
  const candleCount = 21;
  const [litCandles, setLitCandles] = useState<Set<number>>(
    new Set(Array.from({ length: candleCount }, (_, i) => i))
  );
  const [allBlown, setAllBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const blowCandle = (index: number) => {
    if (allBlown) return;
    setLitCandles((prev) => {
      const next = new Set(prev);
      next.delete(index);
      if (next.size === 0) {
        setTimeout(() => {
          setAllBlown(true);
          setTimeout(() => setShowWish(true), 800);
        }, 300);
      }
      return next;
    });
  };

  const resetCake = () => {
    setAllBlown(false);
    setShowWish(false);
    setLitCandles(new Set(Array.from({ length: candleCount }, (_, i) => i)));
  };

  return (
    <div className="relative mx-auto flex flex-col items-center">
      <ConfettiBlast active={allBlown} particleCount={80} />

      {/* Light bloom effect on blow-out */}
      <AnimatePresence>
        {allBlown && (
          <motion.div
            className="absolute inset-0 -inset-x-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      {/* Candles */}
      <div className="relative mb-4 flex flex-wrap items-end justify-center gap-1 px-4 sm:gap-1.5">
        {Array.from({ length: candleCount }, (_, i) => {
          const isLit = litCandles.has(i);
          const height = 28 + Math.sin(i * 0.8) * 8;
          
          return (
            <motion.button
              key={i}
              onClick={() => blowCandle(i)}
              className="relative flex flex-col items-center"
              whileTap={{ scale: 0.9 }}
              aria-label={`Candle ${i + 1} — ${isLit ? 'tap to blow out' : 'blown out'}`}
            >
              {/* Flame */}
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    className="relative mb-0.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="h-3 w-2 rounded-full bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100"
                      animate={{
                        scaleX: [1, 1.2, 0.8, 1],
                        scaleY: [1, 1.1, 0.9, 1],
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      style={{
                        boxShadow: '0 0 8px rgba(251,191,36,0.6), 0 0 16px rgba(251,191,36,0.3)',
                      }}
                    />
                    {/* Glow */}
                    <div
                      className="absolute -inset-2 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle stick */}
              <div
                className="w-1.5 rounded-sm sm:w-2"
                style={{
                  height,
                  background: `linear-gradient(to bottom, ${
                    i % 3 === 0 ? '#e879a8' : i % 3 === 1 ? '#a78bfa' : '#fbbf24'
                  }, ${
                    i % 3 === 0 ? '#be185d' : i % 3 === 1 ? '#6d28d9' : '#d97706'
                  })`,
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Cake body */}
      <div className="relative w-full max-w-xs sm:max-w-sm">
        {/* Top layer */}
        <div className="relative mx-auto h-12 rounded-t-xl border-x border-t border-rose-300/20 bg-gradient-to-b from-rose-200/90 to-rose-300/90 sm:h-14">
          <div className="absolute inset-x-0 top-2 flex justify-center gap-3">
            {['🍓', '🫐', '🍓', '🫐', '🍓'].map((emoji, i) => (
              <span key={i} className="text-xs">{emoji}</span>
            ))}
          </div>
        </div>
        {/* Frosting drip */}
        <div className="mx-auto flex h-2 justify-around">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="w-3 rounded-b-full bg-rose-100/80"
              style={{ height: 6 + Math.random() * 6 }}
            />
          ))}
        </div>
        {/* Bottom layer */}
        <div className="mx-auto h-14 rounded-b-xl border-x border-b border-amber-400/20 bg-gradient-to-b from-amber-100/80 to-amber-200/80 sm:h-16" />
        {/* Plate */}
        <div className="mx-auto -mt-1 h-3 rounded-b-[50%] bg-white/20" style={{ width: '110%', marginLeft: '-5%' }} />
      </div>

      {/* Instruction or wish */}
      <div className="mt-6 text-center">
        <AnimatePresence mode="wait">
          {!allBlown && (
            <motion.p
              key="instruction"
              className="text-sm text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Tap each candle to blow it out ✨
              <br />
              <span className="text-xs text-white/30">
                {litCandles.size} of {candleCount} remaining
              </span>
            </motion.p>
          )}
          {showWish && (
            <motion.div
              key="wish"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-serif text-2xl text-champagne sm:text-3xl">Make a wish ✨</p>
              <button
                onClick={resetCake}
                className="mt-4 text-xs text-white/30 underline underline-offset-4 transition-colors hover:text-white/50"
              >
                Light them again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
