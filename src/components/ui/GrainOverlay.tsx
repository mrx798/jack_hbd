import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GrainOverlayProps {
  opacity?: number;
}

export function GrainOverlay({ opacity = 0.03 }: GrainOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 256;
    canvas.height = 256;

    const imageData = ctx.createImageData(256, 256);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);

    if (!reduced) {
      let frame: number;
      const animate = () => {
        for (let i = 0; i < data.length; i += 16) {
          const v = Math.random() * 255;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
        }
        ctx.putImageData(imageData, 0, 0);
        frame = requestAnimationFrame(animate);
      };

      // Update grain at lower framerate
      let lastTime = 0;
      const throttledAnimate = (time: number) => {
        if (time - lastTime > 100) {
          // ~10fps for grain
          lastTime = time;
          for (let i = 0; i < data.length; i += 16) {
            const v = Math.random() * 255;
            data[i] = v;
            data[i + 1] = v;
            data[i + 2] = v;
          }
          ctx.putImageData(imageData, 0, 0);
        }
        frame = requestAnimationFrame(throttledAnimate);
      };
      frame = requestAnimationFrame(throttledAnimate);

      return () => cancelAnimationFrame(frame);
    }
  }, [reduced]);

  return (
    <AnimatePresence>
      <motion.div
        className="pointer-events-none fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ mixBlendMode: 'overlay' }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{
            opacity,
            imageRendering: 'pixelated',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
