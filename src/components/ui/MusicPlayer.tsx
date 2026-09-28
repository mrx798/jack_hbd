import { motion } from 'framer-motion';
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic';

export function MusicPlayer() {
  const { toggle, isPlaying, currentTime, duration } = useBackgroundMusic();

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl"
      style={{ width: 56, height: 56 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, type: 'spring' }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
    >
      {/* Glow ring */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r="26"
          fill="none"
          stroke="rgba(168, 85, 247, 0.15)"
          strokeWidth="1.5"
        />
        {isPlaying && (
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="url(#progress-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${progressPercent * 1.634} 163.4`}
            transform="rotate(-90 28 28)"
            style={{ transition: 'stroke-dasharray 0.3s ease' }}
          />
        )}
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#e879a8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Vinyl disc */}
      <motion.div
        className="relative flex h-8 w-8 items-center justify-center rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #1a1a2e, #2d1b4e, #1a1a2e, #2d1b4e, #1a1a2e)',
        }}
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isPlaying
            ? { duration: 3, repeat: Infinity, ease: 'linear' }
            : { duration: 0.5 }
        }
      >
        {/* Center dot */}
        <div className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-400 to-rose-400" />
        {/* Groove lines */}
        <div className="absolute inset-1 rounded-full border border-white/5" />
        <div className="absolute inset-2 rounded-full border border-white/5" />
      </motion.div>

      {/* Playing glow */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(232, 121, 168, 0.15)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
