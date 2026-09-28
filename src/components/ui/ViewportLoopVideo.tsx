import { useRef, useEffect, useCallback } from 'react';

interface ViewportLoopVideoProps {
  src: string;
  className?: string;
}

/**
 * An ambient cinematic video element that:
 * - Plays automatically when its frame enters the viewport
 * - Loops continuously while visible
 * - Pauses and resets to 0 when leaving the viewport
 * - Is always muted with no controls
 * - Uses playsInline for mobile Safari
 */
export function ViewportLoopVideo({ src, className = '' }: ViewportLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;
    video.currentTime = 0;

    video.play().catch(() => {
      // Autoplay was prevented — fail silently.
      // The frame will remain as a static poster/first frame.
    });
  }, []);

  const handlePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted state is always set
    video.muted = true;
    video.volume = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const nowVisible = entry.isIntersecting;

        // Only transition on state change
        if (nowVisible && !isVisibleRef.current) {
          isVisibleRef.current = true;
          handlePlay();
        } else if (!nowVisible && isVisibleRef.current) {
          isVisibleRef.current = false;
          handlePause();
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px',
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      // Clean up: pause on unmount
      video.pause();
    };
  }, [handlePlay, handlePause]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      playsInline
      loop
      preload="metadata"
      // No controls — this is an ambient video
    />
  );
}
