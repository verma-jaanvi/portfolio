import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface ScrollTilt3DProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Default 14. Keep between 8-18 for a subtle feel. */
  intensity?: number;
  /** Perspective depth in px. Lower = more dramatic. Default 1200. */
  perspective?: number;
}

export function ScrollTilt3D({
  children,
  className = "",
  intensity = 14,
  perspective = 1200,
}: ScrollTilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 35%"],
  });

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const effectiveIntensity = isMobile ? intensity * 0.4 : intensity;

  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [effectiveIntensity, 0],
  );
  const translateY = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-140, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ perspective }}>
      <motion.div
        style={{
          rotateX,
          translateY,
          translateZ,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
