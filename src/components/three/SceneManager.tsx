import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { GlowOrbs } from './GlowOrbs';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useViewportSize } from '../../hooks/useViewportSize';
import type { ChapterMood } from '../../types';

interface SceneManagerProps {
  mood: ChapterMood;
}

export function SceneManager({ mood }: SceneManagerProps) {
  const reducedMotion = useReducedMotion();
  const { isMobile } = useViewportSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Pause rendering when tab is not visible
  useEffect(() => {
    const handleVisibility = () => {
      if (canvasRef.current) {
        const gl = canvasRef.current.getContext('webgl2') || canvasRef.current.getContext('webgl');
        if (gl) {
          if (document.hidden) {
            // Let R3F handle pause via frameloop
          }
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  if (reducedMotion) {
    // Static gradient fallback
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${mood.orbColors[0]}22, transparent 60%),
                       radial-gradient(ellipse at 70% 30%, ${mood.orbColors[1]}18, transparent 50%),
                       radial-gradient(ellipse at 50% 80%, ${mood.orbColors[2]}15, transparent 60%),
                       ${mood.backgroundTint}`,
          transition: 'background 2s ease',
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      {/* Background tint layer */}
      <div
        className="absolute inset-0"
        style={{
          background: mood.backgroundTint,
          transition: 'background 1.5s ease',
        }}
      />
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        frameloop={document.hidden ? 'demand' : 'always'}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <ParticleField
            colors={mood.orbColors}
            intensity={mood.particleIntensity}
            isMobile={isMobile}
          />
          <GlowOrbs
            colors={mood.orbColors}
            intensity={mood.particleIntensity}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
