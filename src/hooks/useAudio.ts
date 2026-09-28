import { useState, useCallback, useRef, useEffect } from 'react';
import { Howl } from 'howler';

interface UseAudioOptions {
  src: string;
  loop?: boolean;
  volume?: number;
}

interface UseAudioReturn {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
  progress: number;
  duration: number;
}

export function useAudio({ src, loop = true, volume = 0.5 }: UseAudioOptions): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const howl = new Howl({
      src: [src],
      loop,
      volume,
      html5: true,
      preload: true,
      onplay: () => {
        setIsPlaying(true);
        setDuration(howl.duration());
        const updateProgress = () => {
          setProgress(howl.seek() as number);
          rafRef.current = requestAnimationFrame(updateProgress);
        };
        rafRef.current = requestAnimationFrame(updateProgress);
      },
      onpause: () => {
        setIsPlaying(false);
        cancelAnimationFrame(rafRef.current);
      },
      onstop: () => {
        setIsPlaying(false);
        setProgress(0);
        cancelAnimationFrame(rafRef.current);
      },
      onend: () => {
        if (!loop) {
          setIsPlaying(false);
          setProgress(0);
          cancelAnimationFrame(rafRef.current);
        }
      },
    });
    howlRef.current = howl;

    return () => {
      cancelAnimationFrame(rafRef.current);
      howl.unload();
    };
  }, [src, loop, volume]);

  const play = useCallback(() => {
    howlRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    howlRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (howlRef.current?.playing()) {
      howlRef.current.pause();
    } else {
      howlRef.current?.play();
    }
  }, []);

  return { play, pause, toggle, isPlaying, progress, duration };
}
