import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useScrollProgress } from '../three/useScrollProgress';
import AmbientField from '../three/AmbientField';

export default function Scene3D() {
  const { progress, reducedMotion } = useScrollProgress();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#7dd3fc" />
          <pointLight position={[-5, -3, -5]} intensity={1} color="#e879f9" />
          <AmbientField scrollProgress={progress} reducedMotion={reducedMotion} />
        </Suspense>
        
      </Canvas>
    </div>
  );
}
