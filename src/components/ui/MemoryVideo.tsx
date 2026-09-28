import { useRef, useEffect, useCallback, useState } from 'react';
import { duckForVideo, restoreFromDuck } from '../../hooks/useBackgroundMusic';

// ─── Single Active Video Enforcement ─────────────────────
// Module-level ref: only ONE normal memory video may play at a time.
let activeVideo: HTMLVideoElement | null = null;
let activeVideoCleanup: (() => void) | null = null;

function setActiveVideo(
  video: HTMLVideoElement | null,
  cleanup: (() => void) | null
) {
  // Pause the previously active video (if different)
  if (activeVideo && activeVideo !== video) {
    activeVideo.pause();
    if (activeVideoCleanup) activeVideoCleanup();
  }
  activeVideo = video;
  activeVideoCleanup = cleanup;
}

// ─── Component ───────────────────────────────────────────

interface MemoryVideoProps {
  src: string;
  className?: string;
}

export function MemoryVideo({ src, className = '' }: MemoryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [_ended, setEnded] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // ── Play handler ─────────────────────────────────────
  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // If video ended, restart from beginning
    if (video.ended) {
      video.currentTime = 0;
    }

    // Register as the active video before playing
    setActiveVideo(video, () => {
      setPlaying(false);
      restoreFromDuck();
    });

    duckForVideo();

    video.play().then(() => {
      setPlaying(true);
      setEnded(false);
    }).catch((err) => {
      console.warn('[MemoryVideo] Play failed:', err.message);
      restoreFromDuck();
    });
  }, []);

  // ── Pause handler ────────────────────────────────────
  const handlePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setPlaying(false);

    // Only restore music if this video was the active one
    if (activeVideo === video) {
      setActiveVideo(null, null);
      restoreFromDuck();
    }
  }, []);

  // ── Toggle ───────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [handlePlay, handlePause]);

  // ── Video Events ─────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => {
      setPlaying(false);
      setEnded(true);
      if (activeVideo === video) {
        setActiveVideo(null, null);
        restoreFromDuck();
      }
    };

    const onTimeUpdate = () => {
      if (video.duration > 0) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const onLoadedData = () => setLoaded(true);
    const onError = () => setError(true);

    video.addEventListener('ended', onEnded);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('error', onError);
    };
  }, []);

  // ── Pause when leaving viewport ──────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!entry.isIntersecting) {
          const video = videoRef.current;
          if (video && !video.paused) {
            video.pause();
            setPlaying(false);
            if (activeVideo === video) {
              setActiveVideo(null, null);
              restoreFromDuck();
            }
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // ── Cleanup on unmount ───────────────────────────────
  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video && activeVideo === video) {
        video.pause();
        setActiveVideo(null, null);
        restoreFromDuck();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full block"
        playsInline
        preload="metadata"
        // NOT muted — these videos have intentional audio
      />

      {/* Loading placeholder */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-900/30 to-purple-900/20" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-950/50 to-purple-950/30">
          <span className="text-3xl">📸</span>
        </div>
      )}

      {/* Click overlay — entire frame is clickable */}
      {!error && (
        <button
          className="absolute inset-0 z-10 flex items-center justify-center focus:outline-none"
          onClick={togglePlay}
          aria-label={playing ? 'Pause memory video' : 'Play memory video'}
        >
          {/* Play / Pause icon */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${
              playing
                ? 'bg-black/30 opacity-0 group-hover:opacity-100'
                : 'bg-black/40 opacity-100'
            }`}
            style={{
              boxShadow: playing
                ? 'none'
                : '0 0 20px rgba(168, 85, 247, 0.25)',
            }}
          >
            {playing ? (
              // Pause icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
                <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
              </svg>
            ) : (
              // Play icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M8 5.14v13.72a1 1 0 001.5.86l11.24-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" fill="white" />
              </svg>
            )}
          </div>
        </button>
      )}

      {/* Minimal progress bar */}
      {playing && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-violet-400 to-rose-400 transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
