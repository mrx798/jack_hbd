import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chapters } from '../../data/config';
import { useViewportSize } from '../../hooks/useViewportSize';

interface ChapterNavProps {
  activeChapter: number;
}

export function ChapterNav({ activeChapter }: ChapterNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useViewportSize();

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Mobile: floating action button
  if (isMobile) {
    return (
      <>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-xl"
          whileTap={{ scale: 0.9 }}
          aria-label="Chapter navigation"
        >
          <span className="font-serif text-sm font-bold text-white/80">
            {chapters[activeChapter]?.number || '00'}
          </span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
              <motion.nav
                className="fixed bottom-20 left-6 z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25 }}
              >
                <ul className="space-y-1">
                  {chapters.map((ch, i) => (
                    <li key={ch.id}>
                      <button
                        onClick={() => scrollToChapter(ch.id)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                          i === activeChapter
                            ? 'bg-violet-500/20 text-white'
                            : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                        }`}
                      >
                        <span className="font-mono text-xs opacity-60">{ch.number}</span>
                        <span className="text-sm">{ch.label}</span>
                        {i === activeChapter && (
                          <motion.div
                            className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400"
                            layoutId="active-dot-mobile"
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop: side nav
  return (
    <motion.nav
      className="fixed right-8 top-1/2 z-50 -translate-y-1/2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <ul className="space-y-1">
        {chapters.map((ch, i) => (
          <li key={ch.id}>
            <button
              onClick={() => scrollToChapter(ch.id)}
              className="group flex items-center gap-3 py-1"
              aria-label={`Go to ${ch.label}`}
            >
              {/* Label (shows on hover) */}
              <span
                className={`text-right text-xs transition-all duration-300 ${
                  i === activeChapter
                    ? 'text-white/80 opacity-100'
                    : 'text-white/40 opacity-0 group-hover:opacity-100'
                }`}
                style={{ minWidth: 80 }}
              >
                {ch.number} {ch.label}
              </span>

              {/* Dot */}
              <div className="relative flex h-3 w-3 items-center justify-center">
                <div
                  className={`rounded-full transition-all duration-500 ${
                    i === activeChapter
                      ? 'h-2.5 w-2.5 bg-violet-400 shadow-lg shadow-violet-500/50'
                      : 'h-1.5 w-1.5 bg-white/30 group-hover:bg-white/50'
                  }`}
                />
                {i === activeChapter && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-violet-400/30"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
