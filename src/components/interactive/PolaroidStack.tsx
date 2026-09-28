import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';

// ─── Data: Exact photo order (FINAL — do not reorder) ─────────────
const moments = [
  { id: 'moment-01', src: '/images/moments/img_1.jpg' },
  { id: 'moment-02', src: '/images/moments/img_2.jpg' },
  { id: 'moment-03', src: '/images/moments/img_3.jpg' },
  { id: 'moment-04', src: '/images/moments/img_4.png' },
  { id: 'moment-05', src: '/images/moments/img_5.jpg' },
  { id: 'moment-06', src: '/images/moments/img_6.jpg' },
  { id: 'moment-07', src: '/images/moments/img_7.jpg' },
  { id: 'moment-08', src: '/images/moments/img_8.jpg' },
  { id: 'moment-09', src: '/images/moments/img_9.png' },
  { id: 'moment-10', src: '/images/moments/img_10.png' },
  { id: 'moment-11', src: '/images/moments/img_11.jpg' },
] as const;

const TOTAL = moments.length; // 11

// ─── Slide animation variants ──────────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 260 : -260,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -260 : 260,
    opacity: 0,
    scale: 0.92,
  }),
};

const transition = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 30,
  mass: 0.8,
};

// ─── Component ─────────────────────────────────────────────────────
export function PolaroidStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const swipeThreshold = 50;

  // ── Navigation helpers (circular) ──
  const goNext = useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TOTAL);
  }, [isAnimating]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TOTAL) % TOTAL);
  }, [isAnimating]);

  // ── Swipe handler ──
  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (isAnimating) return;
      const { offset, velocity } = info;
      const swipe = Math.abs(offset.x) * velocity.x;

      if (offset.x < -swipeThreshold || swipe < -5000) {
        goNext();
      } else if (offset.x > swipeThreshold || swipe > 5000) {
        goPrev();
      }
    },
    [goNext, goPrev, isAnimating]
  );

  // ── Click to advance ──
  const handleClick = useCallback(() => {
    if (isAnimating) return;
    goNext();
  }, [goNext, isAnimating]);

  // ── Keyboard navigation ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // ── Preload adjacent images ──
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % TOTAL;
    const prevIdx = (currentIndex - 1 + TOTAL) % TOTAL;
    [nextIdx, prevIdx].forEach((idx) => {
      const img = new Image();
      img.src = moments[idx].src;
    });
  }, [currentIndex]);

  const current = moments[currentIndex];
  const counterText = String(currentIndex + 1).padStart(2, '0') + ' / ' + String(TOTAL).padStart(2, '0');

  return (
    <div
      className="flex flex-col items-center"
      ref={containerRef}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Stack container */}
      <div
        className="relative"
        style={{
          width: 'min(80vw, 440px)',
          /* Let height be determined by content — no fixed height */
        }}
      >
        {/* Background stacked cards for depth effect */}
        <div
          className="absolute left-1/2 top-0 -z-10"
          style={{
            width: 'min(80vw, 440px)',
            height: '100%',
            transform: 'translateX(-50%) rotate(3deg) translateY(8px)',
          }}
        >
          <div
            className="h-full w-full rounded-md"
            style={{
              background: 'rgba(255,255,255,0.06)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          />
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10"
          style={{
            width: 'min(80vw, 440px)',
            height: '100%',
            transform: 'translateX(-50%) rotate(-2deg) translateY(4px)',
          }}
        >
          <div
            className="h-full w-full rounded-md"
            style={{
              background: 'rgba(255,255,255,0.04)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* Main polaroid card with animated content */}
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
            role="button"
            aria-label={`Memory ${currentIndex + 1} of ${TOTAL}. Click or swipe for next memory`}
            tabIndex={0}
            className="cursor-pointer select-none"
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="rounded-md"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: 'clamp(8px, 2vw, 16px)',
                boxShadow:
                  '0 8px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              {/* Photo area — preserves natural aspect ratio, never crops */}
              <div
                className="overflow-hidden rounded-sm"
                style={{
                  background: '#f0f0f0',
                  width: '100%',
                }}
              >
                <img
                  src={current.src}
                  alt={`Memory ${currentIndex + 1}`}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    maxHeight: 'min(60vh, 520px)',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Bottom area — counter only, no caption */}
              <div
                className="flex items-center justify-center"
                style={{
                  paddingTop: 'clamp(6px, 1.5vw, 14px)',
                  paddingBottom: 'clamp(2px, 0.5vw, 6px)',
                }}
              >
                <span
                  className="text-gray-400"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(10px, 1.5vw, 13px)',
                    letterSpacing: '0.12em',
                  }}
                >
                  {counterText}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swipe hint */}
      <p
        className="mt-4 text-center text-white/20"
        style={{ fontSize: 'clamp(9px, 1.2vw, 11px)' }}
      >
        Swipe to see more
      </p>

      {/* Accessible previous/next buttons — visually minimal */}
      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous memory"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/20 transition-colors hover:bg-white/5 hover:text-white/40"
          style={{ fontSize: '14px' }}
        >
          ‹
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next memory"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/20 transition-colors hover:bg-white/5 hover:text-white/40"
          style={{ fontSize: '14px' }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
