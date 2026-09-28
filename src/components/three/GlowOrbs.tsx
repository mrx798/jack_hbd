import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GlowOrbsProps {
  colors: [string, string, string];
  intensity: number;
  isMobile: boolean;
}

export function GlowOrbs({ colors, intensity, isMobile }: GlowOrbsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const orbCount = isMobile ? 4 : 7;

  const targetColors = useRef(colors);
  useEffect(() => {
    targetColors.current = colors;
  }, [colors]);

  const orbData = useMemo(
    () =>
      Array.from({ length: orbCount }, (_, i) => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          -3 - Math.random() * 5
        ),
        scale: 1.5 + Math.random() * 2.5,
        speed: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        colorIndex: i % 3,
        color: new THREE.Color(colors[i % 3]),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orbCount]
  );

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;

    const t = state.clock.elapsedTime;

    groupRef.current.children.forEach((mesh, i) => {
      const data = orbData[i];
      if (!data || !(mesh instanceof THREE.Mesh)) return;

      // Gentle floating motion
      mesh.position.x = data.position.x + Math.sin(t * data.speed + data.phase) * 1.5;
      mesh.position.y = data.position.y + Math.cos(t * data.speed * 0.7 + data.phase) * 1.2;

      // Breathing scale
      const breathe = 1 + Math.sin(t * data.speed * 0.5 + data.phase) * 0.15 * intensity;
      mesh.scale.setScalar(data.scale * breathe);

      // Smooth color transition
      const targetColor = new THREE.Color(targetColors.current[data.colorIndex]);
      data.color.lerp(targetColor, delta * 0.3);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.color.copy(data.color);
      mat.opacity = 0.08 + intensity * 0.07;
    });
  });

  if (reducedMotion) return null;

  return (
    <group ref={groupRef}>
      {orbData.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
