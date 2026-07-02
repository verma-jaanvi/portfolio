import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ParticleField } from "../components/ParticleField";
import { Reveal } from "../components/Reveal";
import { ScrollTilt3D } from "../components/ScrollTilt3D";
import { Marquee } from "../components/Marquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jahnvi Verma (JV) — Creative Technologist" },
      {
        name: "description",
        content:
          "Immersive portfolio of a creative developer exploring AI, design, and emergent digital experiences.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <ManifestoStrip />
      <FeaturedWorks />
      <Capabilities />
      <ExperimentsLab />
      <SignalsTeaser />
      <CTA />
    </>
  );
}

function Hero() {
  const orbRef = useRef<HTMLDivElement>(null);

  const now = new Date();

  const transmission = `${now.getFullYear()}.${String(
    now.getMonth() + 1,
  ).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      orbRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="bg-aurora relative isolate flex min-h-screen items-center overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-[0.12]" />
      <div className="bg-noise absolute inset-0 opacity-40" />
      <ParticleField density={90} />

      <div
        ref={orbRef}
        className="pointer-events-none absolute right-[5%] top-1/2 z-0 hidden -translate-y-1/2 transition-transform duration-700 ease-out md:block"
      >
        <div className="relative h-[480px] w-[480px] lg:h-[540px] lg:w-[540px]">
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-gradient-to-br from-violet via-magenta/60 to-cyan opacity-30 blur-3xl" />
          <div
            className="absolute inset-12 rounded-full border border-cyan/30"
            style={{ animation: "drift 30s linear infinite" }}
          />
          <div
            className="absolute inset-24 rounded-full border border-violet/30"
            style={{ animation: "drift 24s linear infinite reverse" }}
          />
          <div className="absolute inset-40 rounded-full border border-magenta/20" />
          <div
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan to-violet opacity-90 blur-md"
            style={{ animation: "float 6s ease-in-out infinite" }}
          />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * 360;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_20px_var(--cyan)]"
                style={{
                  transform: `rotate(${angle}deg) translateY(-200px)`,
                  animation: `pulse-glow ${3 + (i % 3)}s ease-in-out infinite ${i * 0.9}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 mb-15">
        <Reveal>
          <div className="font-mono inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
            now broadcasting · {transmission} transmission
          </div>
        </Reveal>

        <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.2] tracking-tight sm:text-5xl md:text-[6rem] lg:text-[8rem]">
          <Reveal as="span" className="block text-gradient-soft">
            Crafting the
          </Reveal>
          <Reveal delay={120} as="span" className="block">
            <span className="text-gradient italic">future </span> of
          </Reveal>
          <Reveal delay={240} as="span" className="block text-gradient-soft">
            digital worlds.
          </Reveal>
        </h1>

        <Reveal delay={400}>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-foreground/90 md:text-lg">
            I'm a creative technologist building experimental software at the
            intersection of{" "}
            <span className="text-cyan">artificial intelligence</span>,{" "}
            <span className="text-violet">interactive design</span>, and{" "}
            <span className="text-magenta">emergent storytelling</span> —
            turning ideas into living systems.
          </p>
        </Reveal>

        <Reveal delay={520}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-violet via-magenta to-cyan px-7 py-3 text-sm font-medium text-background shadow-aurora transition hover:scale-[1.02]"
            >
              <span className="relative z-10">Enter the works →</span>
            </Link>
            <Link
              to="/about"
              className="group flex items-center gap-3 rounded-full border border-border bg-background/40 px-6 py-3 text-sm backdrop-blur transition-all duration-300 hover:border-cyan/60 hover:bg-white/5"
            >
              <span className="inline-block h-1 w-1 rounded-full bg-cyan group-hover:animate-ping" />
              The story behind the signal
            </Link>
          </div>
        </Reveal>

        <Reveal delay={700}>
          <div className="mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-border/60 pt-8 font-mono text-xs text-muted-foreground">
            <Stat n="03+" label="Years exploring" />
            {/* <Stat n="11" label="Shipped systems" /> */}
            <Stat n="∞" label="Ideas in flight" />
          </div>
        </Reveal>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            scroll · descend
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-cyan to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-foreground">{n}</div>
      <div className="mt-1">{label}</div>
    </div>
  );
}

function ManifestoStrip() {
  const words = [
    "Build the unbuilt.",
    "Question the default.",
    "Make it luminous.",
    "Code as poetry.",
    "Ship wonder.",
  ];
  return (
    <section className="border-y border-border/40 bg-midnight/60 py-8">
      <Marquee>
        {words.map((w, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl text-foreground/70 sm:text-3xl md:text-xl">
              {w}
            </span>
            <span className="text-gradient text-3xl sm:text-4xl">✦</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

const works = [
  {
    code: "01",
    title: "CIRCUIT VISION",
    tag: "Alternative KiCad Frontend",
    desc: "A modern desktop environment for designing, simulating, and visualizing electronic circuits with an intuitive workflow.",
    grad: "from-violet to-magenta",
  },
  {
    code: "02",
    title: "TEXT GUARDIAN",
    tag: "AI Plagiarism Checker",
    desc: "Combines web scraping with AI-powered text analysis to detect copied and paraphrased content.",
    grad: "from-cyan to-azure",
  },
  {
    code: "03",
    title: "WEATHER MOOD",
    tag: "Weather-Based Music Generator",
    desc: "Blends real-time weather data with Spotify listening habits to curate mood-perfect playlists.",
    grad: "from-magenta to-violet",
  },
  {
    code: "04",
    title: "APPOINT IT",
    tag: "Doctor Appointment App",
    desc: "Android app that helps users discover nearby doctors and schedule appointments seamlessly.",
    grad: "from-cyan to-violet",
  },
];

function FeaturedWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <Reveal>
          <div className="min-w-0">
            <p className="font-mono text-xs text-muted-foreground">
              // section.02 — selected works
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl md:text-7xl">
              Things I've <span className="text-gradient italic">conjured</span>
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <Link
            to="/projects"
            className="shrink-0 rounded-full border border-border px-4 py-2 text-sm transition-all duration-300 hover:border-cyan/60 hover:bg-white/5"
          >
            see the archive →
          </Link>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        {works.map((w, i) => (
          <ScrollTilt3D key={w.code} intensity={12}>
            <Reveal delay={i * 80}>
              <Link
                to="/projects"
                className="hover-lift group relative block overflow-hidden rounded-3xl border border-border bg-card/50 p-6 backdrop-blur transition-all duration-300 sm:p-10"
              >
                <div
                  className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${w.grad} opacity-70 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-50`}
                />
                <div className="relative z-10 flex h-72 flex-col justify-between">
                  <div className="flex items-start justify-between font-mono text-[11px] text-foreground/90">
                    <span>{w.code}</span>
                    <span>{w.tag}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-4xl">
                      {w.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/90">
                      {w.desc}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs">
                      <span className="h-px w-8 bg-gradient-to-r from-cyan to-violet transition-all duration-500 group-hover:w-16" />
                      enter
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </ScrollTilt3D>
        ))}
      </div>
    </section>
  );
}

const skills = [
  {
    k: "AI / Machine Learning",
    v: [
      "Large Language Models (LLMs)",
      "Prompt Engineering",
      "RAG Pipelines",
      "Vector Databases",
      "Embeddings",
      "AI Agent Workflows",
    ],
  },
  {
    k: "Frontend",
    v: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "HTML5 & CSS3",
    ],
  },
  {
    k: "Backend",
    v: [
      "Node.js",
      "Express.js",
      "Python",
      "Django",
      "REST APIs",
      "Authentication",
    ],
  },
  {
    k: "Mobile & Desktop",
    v: ["Android Development", "React Native", "PyQt5", "Electron"],
  },
  {
    k: "Databases",
    v: ["PostgreSQL", "SQLite", "MongoDB", "Firebase"],
  },
  {
    k: "DevOps & Cloud",
    v: [
      "Docker",
      "Git & GitHub",
      // "Linux",
      "CI/CD",
      "Vercel",
      "AWS (Learning)",
    ],
  },
  {
    k: "Programming",
    v: ["C++", "Python", "Java", "TypeScript", "JavaScript", "SQL"],
  },
  {
    k: "Graphics & Creative",
    v: ["Three.js", "WebGL", "GLSL", "Canvas API", "GSAP", "Framer Motion"],
  },
];

function Capabilities() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="font-mono text-xs text-muted-foreground">
          // section.03 — capabilities
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[0.95] sm:text-5xl md:text-7xl">
          A multidisciplinary{" "}
          <span className="text-gradient italic">toolkit</span> for building
          futures.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-4">
        {skills.map((s, i) => {
          const open = active === i;
          return (
            <button
              key={s.k}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-2xl border p-8 text-left transition-all duration-300 ${
                open
                  ? "border-violet/60 bg-violet/10 md:col-span-2"
                  : "border-border bg-card/30 hover:border-violet/30 hover:bg-card/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] text-foreground/90">
                  0{i + 1}
                </span>
                <span
                  className={`text-xl transition ${open ? "text-cyan" : "text-muted-foreground"}`}
                >
                  {open ? "−" : "+"}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl">{s.k}</h3>
              <ul
                className={`mt-5 grid gap-2 overflow-hidden text-sm leading-relaxed text-foreground/90 transition-all duration-500 ${
                  open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {s.v.map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-cyan" />
                    {x}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ExperimentsLab() {
  return (
    <section className="relative overflow-hidden border-y border-border/40">
      <div className="bg-grid absolute inset-0 opacity-[0.08]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div>
              <p className="font-mono text-xs text-muted-foreground">
                // section.04 — the laboratory
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-[0.95] sm:text-5xl md:text-6xl">
                A space for
                <br />
                <span className="text-gradient italic">unfinished ideas.</span>
              </h2>
              <p className="mt-7 max-w-md leading-relaxed text-foreground/90">
                Half my work lives here — fragments, prototypes, half-spoken
                thoughts. The lab is where I test what hasn't been named yet.
              </p>
              <Link
                to="/projects"
                className="mt-8 inline-flex items-center gap-2 text-sm hover:text-cyan"
              >
                <div className="group/wander inline-flex items-center gap-2 text-xs">
                  <span className="h-px w-10 bg-gradient-to-r from-cyan to-violet transition-all duration-500 group-hover/wander:w-20" />
                  wander the lab
                </div>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative aspect-square">
              <div className="absolute inset-0 grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="glass relative overflow-hidden rounded-2xl"
                    style={{
                      animation: `float ${4 + (i % 3)}s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background: `radial-gradient(circle at ${30 + i * 10}% ${50 + (i % 3) * 15}%, ${
                          ["#8B5CF6", "#22D3EE", "#EC4899"][i % 3]
                        }55, transparent 70%)`,
                      }}
                    />
                    <span className="absolute bottom-2 left-2 font-mono text-[10px] text-foreground/60">
                      exp.{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SignalsTeaser() {
  const posts = [
    { date: "2026.04", title: "On the texture of latent space", read: "7 min" },
    { date: "2026.03", title: "Why interfaces should breathe", read: "5 min" },
    {
      date: "2026.02",
      title: "Notes from a year of building with LLMs",
      read: "12 min",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <p className="font-mono text-xs text-muted-foreground">
              // section.05 — signals
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl md:text-7xl">
              Recent <span className="text-gradient italic">transmissions</span>
            </h2>
          </div>
          <Link
            to="/writings"
            className="shrink-0 rounded-full border border-border px-4 py-2 text-sm transition-all duration-300 hover:border-cyan/60 hover:bg-white/5"
          >
            all signals →
          </Link>
        </div>
      </Reveal>
      <div className="mt-12 divide-y divide-border/50 border-y border-border/50">
        {posts.map((p, i) => (
          <Reveal key={p.title} delay={i * 60}>
            <Link
              to="/writings"
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 rounded-xl px-3 py-7 transition-all duration-300 hover:bg-violet/5 sm:gap-6"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {p.date}
              </span>
              <span className="min-w-0 font-display text-lg transition group-hover:translate-x-2 group-hover:text-gradient sm:text-2xl md:text-3xl">
                {p.title}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {p.read}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="group hover-lift border-glow glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-10 md:p-20">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet/30 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-50" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan/30 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-50" />

          <div className="relative">
            <p className="font-mono text-xs text-muted-foreground">
              // initiate.collaboration
            </p>

            <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.95] sm:text-5xl md:text-6xl">
              Have an idea that 
              <br />
              <span className="text-gradient italic">shouldn't exist yet? </span>
            </h2>

            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-all duration-300 hover:bg-cyan hover:scale-105"
            >
              Open a transmission channel
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
