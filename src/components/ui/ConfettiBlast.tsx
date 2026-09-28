import { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiBlastProps {
  active: boolean;
  particleCount?: number;
  colors?: string[];
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: 'circle' | 'rect' | 'star';
  delay: number;
  velocityX: number;
  velocityY: number;
}

export function ConfettiBlast({
  active,
  particleCount = 60,
  colors = ['#a855f7', '#e879a8', '#fbbf24', '#f5c471', '#8b5cf6', '#ec4899', '#34d399'],
  duration = 3,
}: ConfettiBlastProps) {
  const particles = useMemo<Particle[]>(() => {
    if (!active) return [];
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 30,
      y: 50,
      rotation: Math.random() * 720,
      scale: 0.5 + Math.random() * 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: (['circle', 'rect', 'star'] as const)[Math.floor(Math.random() * 3)],
      delay: Math.random() * 0.3,
      velocityX: (Math.random() - 0.5) * 80,
      velocityY: -(30 + Math.random() * 60),
    }));
  }, [active, particleCount, colors]);

  const renderShape = useCallback((particle: Particle) => {
    switch (particle.shape) {
      case 'circle':
        return (
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: particle.color }}
          />
        );
      case 'rect':
        return (
          <div
            className="h-3 w-1.5 rounded-sm"
            style={{ backgroundColor: particle.color }}
          />
        );
      case 'star':
        return (
          <span style={{ color: particle.color, fontSize: 10 }}>✦</span>
        );
    }
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              initial={{
                opacity: 1,
                scale: 0,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [1, 1, 0],
                scale: p.scale,
                x: p.velocityX * 5,
                y: [p.velocityY * 3, p.velocityY * 3 + 200],
                rotate: p.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: duration,
                delay: p.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {renderShape(p)}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
