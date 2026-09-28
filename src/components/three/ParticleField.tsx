import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ParticleFieldProps {
  colors: [string, string, string];
  intensity: number;
  isMobile: boolean;
}

export function ParticleField({ colors, intensity, isMobile }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const particleCount = isMobile ? 60 : 120;

  const { positions, sizes, colorArray, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colorArray = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(colors[0]);
    const c2 = new THREE.Color(colors[1]);
    const c3 = new THREE.Color(colors[2]);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 3;

      sizes[i] = Math.random() * 3 + 0.5;

      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      const t = Math.random();
      const color = t < 0.33 ? c1 : t < 0.66 ? c2 : c3;
      colorArray[i3] = color.r;
      colorArray[i3 + 1] = color.g;
      colorArray[i3 + 2] = color.b;
    }

    return { positions, sizes, colorArray, velocities };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount]);

  // Smoothly interpolate colors when mood changes
  const targetColors = useRef(colors);

  useEffect(() => {
    targetColors.current = colors;
  }, [colors]);

  useFrame((_state, delta) => {
    if (reducedMotion || !pointsRef.current) return;

    const geom = pointsRef.current.geometry;
    const pos = geom.attributes.position.array as Float32Array;
    const col = geom.attributes.color.array as Float32Array;

    // Smoothly interpolate colors
    const lerpSpeed = delta * 0.5;
    const tc1 = new THREE.Color(targetColors.current[0]);
    const tc2 = new THREE.Color(targetColors.current[1]);
    const tc3 = new THREE.Color(targetColors.current[2]);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Move particles
      pos[i3] += velocities[i3] * intensity;
      pos[i3 + 1] += velocities[i3 + 1] * intensity;
      pos[i3 + 2] += velocities[i3 + 2] * intensity;

      // Wrap around
      if (pos[i3] > 10) pos[i3] = -10;
      if (pos[i3] < -10) pos[i3] = 10;
      if (pos[i3 + 1] > 10) pos[i3 + 1] = -10;
      if (pos[i3 + 1] < -10) pos[i3 + 1] = 10;

      // Lerp colors
      const t = i / particleCount;
      const target = t < 0.33 ? tc1 : t < 0.66 ? tc2 : tc3;
      col[i3] += (target.r - col[i3]) * lerpSpeed;
      col[i3 + 1] += (target.g - col[i3 + 1]) * lerpSpeed;
      col[i3 + 2] += (target.b - col[i3 + 2]) * lerpSpeed;
    }

    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;

    // Gentle rotation
    pointsRef.current.rotation.y += delta * 0.01;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float dist = length(mvPosition.xyz);
            vAlpha = smoothstep(15.0, 3.0, dist) * 0.7;
            gl_PointSize = size * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float glow = exp(-d * 4.0) * 0.8 + smoothstep(0.5, 0.0, d) * 0.4;
            gl_FragColor = vec4(vColor, glow * vAlpha);
          }
        `,
        vertexColors: true,
      }),
    []
  );

  if (reducedMotion) return null;

  return (
    <points ref={pointsRef} material={shaderMaterial} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colorArray, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
}
