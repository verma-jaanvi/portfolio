import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

type ShapeType = 'torus' | 'octa' | 'sphere';

function Shape({ type, inView }: { type: ShapeType; inView: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (inView ? 0.4 : 0.05);
    ref.current.rotation.x += delta * 0.15;
    const targetScale = inView ? 1 : 0.6;
    ref.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );
  });

  return (
    <mesh ref={ref}>
      {type === 'torus' && <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />}
      {type === 'octa'  && <octahedronGeometry args={[0.8, 0]} />}
      {type === 'sphere' && <icosahedronGeometry args={[0.8, 1]} />}
      <meshStandardMaterial
        color="#a78bfa"
        roughness={0.2}
        metalness={0.7}
        wireframe
      />
    </mesh>
  );
}

interface SectionIconProps {
  shape?: ShapeType;
  size?: number;
}

export default function SectionIcon({ shape = 'torus', size = 220 }: SectionIconProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 40 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#22d3ee" />
        <Shape type={shape} inView={inView} />
      </Canvas>
    </div>
  );
}
