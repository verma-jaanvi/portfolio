import { useEffect, useRef } from "react";

interface Props {
  density?: number;
  className?: string;
}

export function ParticleField({ density = 60, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Respect reduced motion — render a static, low-cost field.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Adapt density to viewport so mobiles don't melt.
    const isSmall = window.innerWidth < 768;
    const target = Math.round(density * (isSmall ? 0.5 : 1));

    let raf = 0;
    let running = true;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    const colors = ["#8B5CF6", "#22D3EE", "#EC4899", "#3B82F6"];
    const particles = Array.from({ length: target }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
      c: colors[Math.floor(Math.random() * colors.length)],
      a: Math.random() * 0.6 + 0.2,
    }));

    const mouse = { x: -1000, y: -1000 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    if (!prefersReduced) window.addEventListener("mousemove", onMove, { passive: true });

    // Pause when offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !prefersReduced) raf = requestAnimationFrame(tick);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // Pause when tab hidden
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running && !prefersReduced) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVis);

    const linkDist2 = isSmall ? 5000 : 8000;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (!prefersReduced) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const f = (1 - d2 / 14000) * 0.6;
            p.vx += (dx / Math.sqrt(d2 + 1)) * f * 0.05;
            p.vy += (dy / Math.sqrt(d2 + 1)) * f * 0.05;
          }
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        }

        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // links — skip on small screens for perf
      if (!isSmall) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < linkDist2) {
              ctx.globalAlpha = (1 - d2 / linkDist2) * 0.15;
              ctx.strokeStyle = "#8B5CF6";
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    const tick = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(tick);
    };

    if (prefersReduced) {
      draw(); // single static frame
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
