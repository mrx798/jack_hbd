import { useState } from 'react';
import { motion } from 'framer-motion';

interface FriendPhotoCardProps {
  src: string;
  orientation: 'horizontal' | 'vertical' | 'square';
  className?: string;
}

/**
 * A photo card that preserves the ENTIRE photograph inside a square frame.
 * - Square images fill naturally.
 * - Horizontal/vertical images use `object-fit: contain` in the foreground
 *   with a blurred, darkened version of the same image behind to avoid
 *   ugly empty bars. No face is ever cropped.
 */
export function FriendPhotoCard({
  src,
  orientation,
  className = '',
}: FriendPhotoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Square images can safely use cover since they fill the square frame naturally
  const needsContain = orientation !== 'square';

  return (
    <motion.div
      className={`group relative cursor-pointer overflow-hidden rounded-xl ${className}`}
      style={{ aspectRatio: '1/1' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Placeholder / loading state */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-900/30 to-purple-900/20" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-950/50 to-purple-950/30">
          <span className="text-3xl">📸</span>
        </div>
      )}

      {/* Blurred background fill — only for non-square images */}
      {!error && needsContain && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover blur-xl scale-110 brightness-[0.35] saturate-[0.6] transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Main image — full photograph, no cropping */}
      {!error && (
        <img
          src={src}
          alt="Memory"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`relative h-full w-full transition-all duration-700 ${
            needsContain ? 'object-contain' : 'object-cover'
          } ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}
          style={
            orientation === 'square'
              ? { objectPosition: 'center center' }
              : undefined
          }
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
