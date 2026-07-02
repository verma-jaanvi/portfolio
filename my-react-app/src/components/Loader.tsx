import { useEffect, useState, useRef, useCallback } from "react";

// ─── types ────────────────────────────────────────────────────────────────────
interface LoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

// ─── constants ────────────────────────────────────────────────────────────────
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyz01";

const SEQUENCE = [
  { text: "mounting environment",        accent: "white"  },
  { text: "tracing signal vectors",      accent: "cyan"   },
  { text: "calibrating creative layer",  accent: "purple" },
  { text: "rendering digital worlds",    accent: "pink"   },
  { text: "compiling your experience",   accent: "cyan"   },
  { text: "ready",                       accent: "white"  },
] as const;

type Accent = "white" | "cyan" | "purple" | "pink";

const ACCENT_COLORS: Record<Accent, string> = {
  white:  "rgba(255,255,255,0.9)",
  cyan:   "#67e8f9",
  purple: "#c084fc",
  pink:   "#f0abfc",
};

const CHAR_DELAY   = 34;   // ms / char
const LINE_HOLD    = 420;  // ms before advancing
const GLITCH_PROB  = 0.18; // probability a not-yet-typed char is scrambled

// ─── scramble hook ────────────────────────────────────────────────────────────
function useScramble(target: string, revealed: number) {
  const [display, setDisplay] = useState("");
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const base = target.slice(0, revealed);
    const rest = target.slice(revealed);
    if (!rest) { setDisplay(base); return; }

    const scrambled = rest
      .split("")
      .map((ch) =>
        ch === " "
          ? " "
          : Math.random() < GLITCH_PROB
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : ch
      )
      .join("");

    setDisplay(base + scrambled);

    frameRef.current = setTimeout(() => {}, 60);
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  }, [target, revealed]);

  return display;
}

// ─── typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(onDone: () => void) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone]       = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (done) return;
    const line = SEQUENCE[lineIdx].text;

    if (charIdx < line.length) {
      timer.current = setTimeout(() => setCharIdx((c) => c + 1), CHAR_DELAY);
    } else {
      timer.current = setTimeout(() => {
        if (lineIdx < SEQUENCE.length - 1) {
          setLineIdx((i) => i + 1);
          setCharIdx(0);
        } else {
          setDone(true);
          onDone();
        }
      }, LINE_HOLD);
    }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [lineIdx, charIdx, done, onDone]);

  return { lineIdx, charIdx };
}

// ─── sub: scanline grid ───────────────────────────────────────────────────────
function ScanGrid() {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.035,
      }}
    >
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

// ─── sub: ambient monogram ────────────────────────────────────────────────────
function Monogram() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        right: "-6vw",
        bottom: "-8vh",
        fontSize: "clamp(18rem, 32vw, 42rem)",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.08em",
        lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.04)",
        userSelect: "none",
        pointerEvents: "none",
        animation: "mono-breathe 6s ease-in-out infinite",
      }}
    >
      JV
    </div>
  );
}

// ─── sub: orb field ───────────────────────────────────────────────────────────
function OrbField() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* main purple orb */}
      <div style={{
        position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.5,
        width: 560, height: 560, top: -160, right: -100,
        background: "radial-gradient(circle, #7c3aed 0%, transparent 68%)",
        animation: "orb-drift 9s ease-in-out infinite alternate",
      }} />
      {/* cyan orb */}
      <div style={{
        position: "absolute", borderRadius: "50%", filter: "blur(80px)", opacity: 0.38,
        width: 380, height: 380, bottom: -100, left: -70,
        background: "radial-gradient(circle, #06b6d4 0%, transparent 68%)",
        animation: "orb-drift 9s ease-in-out infinite alternate",
        animationDelay: "-4s",
      }} />
      {/* pink accent */}
      <div style={{
        position: "absolute", borderRadius: "50%", filter: "blur(60px)", opacity: 0.28,
        width: 240, height: 240, top: "38%", left: "52%",
        background: "radial-gradient(circle, #e879f9 0%, transparent 65%)",
        animation: "orb-drift 7s ease-in-out infinite alternate",
        animationDelay: "-2s",
      }} />
      {/* concentric rings */}
      {[520, 780, 1060].map((size, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          width: size, height: size,
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          border: `1px solid rgba(${i === 1 ? "6,182,212" : "124,58,237"},${0.14 - i * 0.04})`,
          animation: `ring-pulse 5s ease-in-out infinite`,
          animationDelay: `${-i * 1.6}s`,
        }} />
      ))}
    </div>
  );
}

// ─── sub: history line ────────────────────────────────────────────────────────
function HistoryLine({ text, index }: { text: string; index: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        fontSize: "clamp(0.68rem, 1.4vw, 0.78rem)",
        color: `rgba(255,255,255,${Math.max(0.1, 0.22 - index * 0.04)})`,
        letterSpacing: "0.03em",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      <span style={{ color: "rgba(6,182,212,0.35)", flexShrink: 0 }}>✓</span>
      <span>{text}</span>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function Loader({ onComplete, minDuration = 3400 }: LoaderProps) {
  const [visible, setVisible]       = useState(true);
  const [exitPhase, setExitPhase]   = useState<"idle"|"wipe"|"gone">("idle");
  const [progress, setProgress]     = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [canExit, setCanExit]       = useState(false);
  const startRef = useRef(Date.now());

  const handleTypingDone = useCallback(() => setTypingDone(true), []);
  const { lineIdx, charIdx } = useTypewriter(handleTypingDone);

  const currentLine = SEQUENCE[lineIdx];
  const scrambled   = useScramble(currentLine.text, charIdx);

  // minimum duration gate
  useEffect(() => {
    const left = minDuration - (Date.now() - startRef.current);
    const t = setTimeout(() => setCanExit(true), Math.max(0, left));
    return () => clearTimeout(t);
  }, [minDuration]);

  // progress bar — advances with each completed line
  useEffect(() => {
    const target = ((lineIdx + charIdx / (currentLine.text.length || 1)) / SEQUENCE.length) * 100;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= target) return p;
        return Math.min(p + 0.8, target);
      });
    }, 30);
    return () => clearInterval(t);
  }, [lineIdx, charIdx, currentLine.text.length]);

  // exit sequence
  useEffect(() => {
    if (!typingDone || !canExit) return;
    setProgress(100);
    const t1 = setTimeout(() => setExitPhase("wipe"), 400);
    const t2 = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [typingDone, canExit, onComplete]);

  if (!visible) return null;

  const accentColor = ACCENT_COLORS[currentLine.accent as Accent];

  return (
    <>
      <style>{`
        @keyframes orb-drift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(28px,-36px) scale(1.09); }
        }
        @keyframes ring-pulse {
          0%,100% { opacity:0.25; transform:translate(-50%,-50%) scale(1); }
          50%      { opacity:0.65; transform:translate(-50%,-50%) scale(1.015); }
        }
        @keyframes mono-breathe {
          0%,100% { opacity:1; transform:scale(1) rotate(-1deg); }
          50%      { opacity:0.7; transform:scale(1.012) rotate(-1deg); }
        }
        @keyframes cursor-blink {
          0%,49% { opacity:1; } 50%,100% { opacity:0; }
        }
        @keyframes curtain-out {
          0%   { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 0 100% 0); }
        }
        @keyframes glitch-shift {
          0%,100% { transform:translateX(0); }
          20%     { transform:translateX(-2px); }
          40%     { transform:translateX(2px); }
          60%     { transform:translateX(-1px); }
        }
        .jv-loader.wipe {
          animation: curtain-out 0.75s cubic-bezier(0.76,0,0.24,1) forwards;
        }
        .typed-text {
          transition: color 0.3s ease;
        }
        .cursor-bar {
          display:inline-block;
          width:2px; height:1.1em;
          background:#06b6d4;
          margin-left:3px;
          vertical-align:middle;
          border-radius:1px;
          animation: cursor-blink 1.05s step-end infinite;
        }
      `}</style>

      <div
        className={`jv-loader${exitPhase === "wipe" ? " wipe" : ""}`}
        role="status"
        aria-label="Loading"
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "#07060f",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
        }}
      >
        {/* ambient layers */}
        <OrbField />
        <ScanGrid />
        <Monogram />

        {/* noise */}
        <svg aria-hidden style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none" }}>
          <filter id="ldr-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
          <rect width="100%" height="100%" filter="url(#ldr-noise)" opacity="0.055" />
        </svg>

        {/* ── content ── */}
        <div style={{
          position:"relative", zIndex:2,
          display:"flex", flexDirection:"column", alignItems:"flex-start",
          gap:"1.6rem", width:"min(660px,88vw)",
        }}>

          {/* top row: wordmark + timestamp */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.7rem" }}>
              <div style={{
                width:36, height:36, borderRadius:"50%",
                background:"linear-gradient(135deg,#7c3aed,#06b6d4)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Inter',sans-serif", fontWeight:800, fontSize:"0.78rem",
                color:"#fff", letterSpacing:"-0.05em", flexShrink:0,
              }}>JV</div>
              <div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"0.9rem", color:"#fff", letterSpacing:"-0.03em", lineHeight:1 }}>
                  Jahnvi
                </div>
                <div style={{ fontSize:"0.62rem", color:"rgba(255,255,255,0.35)", marginTop:2, letterSpacing:"0.04em" }}>
                  creative technologist
                </div>
              </div>
            </div>

            {/* live clock */}
            <LiveClock />
          </div>

          {/* divider */}
          <div style={{
            width:"100%", height:"1px",
            background:"linear-gradient(90deg,rgba(124,58,237,0.5),rgba(6,182,212,0.3),transparent)",
            marginTop:"-0.4rem",
          }} />

          {/* history */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.3rem", minHeight: `${(SEQUENCE.length - 1) * 1.4}rem` }}>
            {SEQUENCE.slice(0, lineIdx).map((line, i) => (
              <HistoryLine key={i} text={line.text} index={lineIdx - 1 - i} />
            ))}
          </div>

          {/* active line */}
          <div style={{ minHeight:"2.2rem", display:"flex", alignItems:"center" }}>
            <span style={{
              fontSize:"clamp(0.95rem,2vw,1.12rem)",
              fontWeight:500,
              letterSpacing:"0.02em",
              lineHeight:1.4,
              color:"rgba(255,255,255,0.7)",
            }}>
              <span style={{ color:"#7c3aed", fontWeight:700, marginRight:"0.15em" }}>&gt;</span>
              <span className="typed-text" style={{ color: accentColor }}>
                {scrambled}
              </span>
              <span className="cursor-bar" />
            </span>
          </div>

          {/* progress section */}
          <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"0.55rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.25)", letterSpacing:"0.14em", textTransform:"uppercase" }}>
                signal strength
              </span>
              <span style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.35)", fontVariantNumeric:"tabular-nums" }}>
                {String(Math.round(Math.min(progress, 100))).padStart(3, "\u2007")}%
              </span>
            </div>

            {/* segmented progress */}
            <SegmentedBar progress={progress} total={SEQUENCE.length} current={lineIdx} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─── live clock ───────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  useEffect(() => {
    const t = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ textAlign:"right" }}>
      <div style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.55)", fontVariantNumeric:"tabular-nums", letterSpacing:"0.05em" }}>
        {time}
      </div>
      <div style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.22)", letterSpacing:"0.08em", marginTop:1 }}>
        {new Date().toISOString().slice(0,10).replace(/-/g,".")}
      </div>
    </div>
  );
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit", second:"2-digit" });
}

// ─── segmented progress bar ───────────────────────────────────────────────────
function SegmentedBar({ progress, total, current }: { progress: number; total: number; current: number }) {
  const segW = 100 / total;
  return (
    <div style={{ width:"100%", display:"flex", gap:3 }}>
      {Array.from({ length: total }).map((_, i) => {
        const segStart = i * segW;
        const segEnd   = segStart + segW;
        const fill     = Math.max(0, Math.min(1, (progress - segStart) / segW));
        const isActive = i === current;
        return (
          <div
            key={i}
            style={{
              flex:1, height:3, borderRadius:2,
              background:"rgba(255,255,255,0.07)",
              overflow:"hidden", position:"relative",
            }}
          >
            <div style={{
              position:"absolute", inset:0,
              background: i < current
                ? "linear-gradient(90deg,#7c3aed,#06b6d4)"
                : isActive
                ? "linear-gradient(90deg,#7c3aed,#06b6d4,#e879f9)"
                : "transparent",
              width: `${fill * 100}%`,
              transition:"width 0.08s linear",
              borderRadius:2,
            }} />
            {isActive && fill > 0 && (
              <div style={{
                position:"absolute",
                left:`${fill * 100}%`,
                top:"50%",
                transform:"translate(-50%,-50%)",
                width:5, height:5,
                borderRadius:"50%",
                background:"#06b6d4",
                boxShadow:"0 0 6px #06b6d4",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
