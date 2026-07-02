import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import type { MutableRefObject } from 'react';
import type { Mesh } from 'three';

interface TotemProps {
  scrollProgress: MutableRefObject<number>;
  reducedMotion: MutableRefObject<boolean>;
  sectionCount?: number;
}

// Matches the site's cyan -> violet -> magenta -> azure gradient palette
const SECTION_COLORS = ['#60a5fa', '#a78bfa', '#f472b6', '#22d3ee'];

export default function Totem({
  scrollProgress,
  reducedMotion,
  sectionCount = 4,
}: TotemProps) {
  const meshRef = useRef<Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const color = useRef(new THREE.Color(SECTION_COLORS[0]));

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const p = scrollProgress.current;
    const spinMul = reducedMotion.current ? 0.3 : 1;

    const sectionFloat = p * (sectionCount - 1);
    const idx = Math.min(sectionCount - 2, Math.floor(sectionFloat));
    const localT = sectionFloat - idx;

    meshRef.current.rotation.y += delta * 0.15 * spinMul;
    meshRef.current.rotation.x = p * Math.PI * 1.2;

    meshRef.current.position.x = THREE.MathUtils.lerp(2.2, -2.2, p);
    meshRef.current.position.y = Math.sin(p * Math.PI * 2) * 0.6;
    meshRef.current.position.z = -1 - p * 2;

    const pulse = reducedMotion.current
      ? 1
      : 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    meshRef.current.scale.setScalar(pulse);

    const cA = new THREE.Color(SECTION_COLORS[idx]);
    const cB = new THREE.Color(
      SECTION_COLORS[idx + 1] ?? SECTION_COLORS[idx]
    );
    color.current.copy(cA).lerp(cB, localT);
    if (materialRef.current) {
      materialRef.current.color = color.current;
      materialRef.current.distort = 0.35 + localT * 0.15;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1.1, 4]} position={[2.2, 0, -1]}>
      <MeshDistortMaterial
        ref={materialRef}
        color={SECTION_COLORS[0]}
        roughness={0.15}
        metalness={0.6}
        distort={0.35}
        speed={1.5}
        transparent
        opacity={0.9}
      />
    </Icosahedron>
  );
}
