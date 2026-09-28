import { useState } from 'react';
import { motion } from 'framer-motion';

interface PhotoCardProps {
  src: string;
  caption?: string;
  aspectRatio?: string;
  onClick?: () => void;
  className?: string;
}

export function PhotoCard({
  src,
  caption,
  aspectRatio = '4/3',
  onClick,
  className = '',
}: PhotoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      className={`group relative cursor-pointer overflow-hidden rounded-xl ${className}`}
      style={{ aspectRatio }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Placeholder / loading state */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-900/30 to-purple-900/20" />
      )}

      {/* Error state — still looks beautiful */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-950/50 to-purple-950/30">
          <div className="text-center">
            <span className="text-3xl">📸</span>
            <p className="mt-2 font-sans text-xs text-white/40">
              {caption || '[DROP PHOTO HERE]'}
            </p>
          </div>
        </div>
      )}

      {/* Image */}
      {!error && (
        <img
          src={src}
          alt={caption || 'Memory'}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'
          }`}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
          <p className="font-sans text-xs text-white/80">{caption}</p>
        </div>
      )}
    </motion.div>
  );
}
