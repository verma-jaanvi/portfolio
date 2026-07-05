import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { MutableRefObject } from 'react';
import type { Points } from 'three';

interface AmbientFieldProps {
  scrollProgress: MutableRefObject<number>;
  reducedMotion: MutableRefObject<boolean>;
}

export default function AmbientField({ scrollProgress, reducedMotion }: AmbientFieldProps) {
  const pointsRef = useRef<Points>(null);
  const count = 400;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const speed = reducedMotion.current ? 0.004 : 0.015;
    pointsRef.current.rotation.y =
      t * speed + scrollProgress.current * Math.PI * 0.5;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    pointsRef.current.position.y = scrollProgress.current * -2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8b9cff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
