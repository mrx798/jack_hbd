import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setDone(true), 400);
        setTimeout(onComplete, 1000);
      }
    };
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0d0618]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glowing center dot */}
          <motion.div
            className="mb-8 h-3 w-3 rounded-full"
            style={{
              background: 'radial-gradient(circle, #a855f7, #6b21a8)',
              boxShadow: '0 0 30px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.2)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Progress bar */}
          <div className="relative h-[1px] w-48 overflow-hidden bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-rose-400"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/20"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            preparing something special
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
