import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  trigger?: boolean;
}

export function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  className = '',
  onComplete,
  trigger = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  const startTyping = useCallback(() => {
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [trigger, delay, startTyping]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          className="inline-block h-[1.1em] w-[2px] translate-y-[0.1em] bg-current"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </span>
  );
}
