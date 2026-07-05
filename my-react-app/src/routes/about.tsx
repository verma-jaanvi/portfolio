import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleField } from "../components/ParticleField";
import { Reveal } from "../components/Reveal";
import SoftAurora from "../components/SoftAurora";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Origin — Jahnvi Verma (JV)" },
      {
        name: "description",
        content:
          "The story, obsessions, and philosophy of Jahnvi Verma — a creative technologist exploring AI, software, and digital craft.",
      },
      { property: "og:title", content: "Origin — Jahnvi Verma (JV)" },
      {
        property: "og:description",
        content:
          "A multidisciplinary maker's journey through code, design, and emerging tech.",
      },
    ],
  }),
  component: About,
});

const timeline = [
  {
    year: "2024",
    title: "First commit",
    body: "Discovered the strange poetry of typing words that summon things.",
  },
  {
    year: "2025",
    title: "Dove deep into open source",
    body: "Started contributing to open-source projects, collaborated with developers worldwide, and strengthened my real-world development skills.",
  },
  {
    year: "2026",
    title: "Started Freelancing",
    body: "Began working as a freelance developer, building modern web applications and AI-powered solutions for clients while expanding my professional portfolio.",
  },
  {
    year: "2026",
    title: "Software Development Internship",
    body: "Joined my first software development internship, gaining industry experience by working on production-ready applications and collaborative engineering workflows.",
  },
  {
    year: "Present",
    title: "Building the Future",
    body: "Continuing to create impactful software, contribute to open source, explore AI, and grow as a full-stack developer.",
  },
];

const obsessions = [
  {
    title: "Latent space cartography",
    desc: "Mapping the hidden geometry of generative models.",
  },
  {
    title: "Slow software",
    desc: "Tools that breathe, wait, and respond like living things.",
  },
  {
    title: "Cinematic interfaces",
    desc: "UI that feels like a scene, not a screen.",
  },
  {
    title: "Speculative play",
    desc: "Toys that ask 'what if?' instead of 'how can we ship?'",
  },
];

function About() {
  return (
    <>
      <section className="bg-aurora relative isolate min-h-screen overflow-hidden flex items-end pb-28 pt-36 md:pb-40 md:pt-48">
        <div className="pointer-events-none absolute inset-0 z-0 w-full h-full">
          <SoftAurora
            speed={1.3}
            scale={1.5}
            brightness={1.2}
            color1="#f7f7f7"
            color2="#e100ff"
            noiseFrequency={3.5}
            noiseAmplitude={0.6}
            bandOffsetFromTop={550}
            bandSpread={1.2}
            octaveDecay={0.15}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction={true}
            mouseInfluence={0.2}
          />
        </div>

        <div className="bg-grid absolute inset-0 z-[1] opacity-[0.12]" />
        <div className="bg-noise absolute inset-0 z-[1] opacity-30" />

        <ParticleField density={50} />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6">
          <Reveal>
            <div className="font-mono inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
              origin.story
            </div>
          </Reveal>
          <h1 className="mt-6 pb-3 font-display text-5xl font-semibold leading-[0.9] sm:text-7xl md:text-[7rem] lg:text-[8rem]">
            <Reveal as="span" className="block text-gradient-soft">
              A maker
            </Reveal>
            <Reveal delay={100} as="span" className="block">
              drawn to <span className="text-gradient italic">edges</span>
            </Reveal>
            <Reveal delay={200} as="span" className="block text-gradient-soft">
              of the medium.
            </Reveal>
          </h1>
          <Reveal delay={350}>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
              <p className="md:col-span-2 text-lg leading-relaxed text-foreground/90">
                I'm Jahnvi Verma — most people call me{" "}
                <span className="text-gradient">JV</span>. A creative
                technologist, sometimes-engineer, always a wanderer of strange
                systems. I build at the seams where artificial intelligence,
                interactive design, and emergent storytelling overlap, treating
                software as a medium for wonder rather than a vehicle for
                productivity.
                <br />
                <br />
                Half scientist, half artist, fully convinced that the most
                interesting interfaces haven't been invented yet.
              </p>
              <div className="space-y-4 font-mono text-xs text-muted-foreground">
                <Field k="NAME" v="Jahnvi Verma · JV" />
                <Field k="ROLE" v="Creative technologist" />
                <Field
                  k="STATUS"
                  v={<span className="text-cyan">Open to collaboration</span>}
                />
                <Field k="LANG" v="TS · Python · GLSL · prose" />
                <Field
                  k="LINKS"
                  v={
                    <a
                      href="https://github.com/verma-jaanvi"
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground hover:text-cyan"
                    >
                      github
                    </a>
                  }
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <Reveal>
          <p className="font-mono text-xs text-muted-foreground">
            // what i believe
          </p>
          <h2 className="mt-3 font-display text-5xl font-semibold leading-[1] md:text-7xl">
            Software should feel
            <br />
            <span className="text-gradient italic">inhabited.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Wonder over utility",
              b: "If a tool doesn't make you tilt your head, it could be more.",
            },
            {
              n: "02",
              t: "Craft the unseen",
              b: "Pixels. Latency. The way a button releases. All of it counts.",
            },
            {
              n: "03",
              t: "Stay strange",
              b: "Default aesthetics produce default ideas. Resist the template.",
            },
          ].map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div className="hover-lift glass relative h-full rounded-3xl p-10 transition-all duration-300 hover:bg-violet/5 hover:border-violet/30">
                <div className="font-mono text-xs text-muted-foreground">
                  {p.n}
                </div>
                <h3 className="mt-5 font-display text-2xl">{p.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                  {p.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-border/40 bg-midnight/40 py-36">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="font-mono text-xs text-muted-foreground">
              // trajectory
            </p>
            <h2 className="mt-3 font-display text-5xl font-semibold md:text-6xl">
              A non-linear path
            </h2>
          </Reveal>

          <ol className="relative mt-16 border-l border-border/60 pl-8">
            {timeline.map((t) => (
              <Timeline3DNode key={t.year} t={t} />
            ))}
          </ol>
        </div>
      </section>

      {/* Obsessions */}
      <section className="mx-auto max-w-7xl px-6 py-36">
        <Reveal>
          <p className="font-mono text-xs text-muted-foreground">
            // current obsessions
          </p>
          <h2 className="mt-3 font-display text-5xl font-semibold md:text-6xl">
            Things I can't stop{" "}
            <span className="text-gradient italic">thinking about</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/40 md:grid-cols-2">
          {obsessions.map((o, i) => (
            <Reveal
              key={o.title}
              delay={i * 60}
              className="bg-card/60 p-12 backdrop-blur transition-all duration-300 hover:bg-violet/8 hover:border-violet/20"
            >
              <h3 className="font-display text-3xl">{o.title}</h3>
              <p className="mt-4 leading-relaxed text-foreground/90">
                {o.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

// ------------------------------------
// Sub-components
// ------------------------------------

function Field({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-border/50 pb-3">
      <span className="w-16 text-muted-foreground">{k}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}

// Custom 3D Scroll Node for the Timeline
function Timeline3DNode({ t }: { t: (typeof timeline)[0] }) {
  const ref = useRef<HTMLLIElement>(null);

  // Tracks the element's position relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.6 1"], // Animation occurs between entering the screen bottom and reaching 60% up the viewport
  });

  // Map scroll progress to 3D CSS transforms
  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <motion.li
      ref={ref}
      style={{
        rotateX,
        y,
        opacity,
        scale,
        transformPerspective: 1200,
        transformOrigin: "left center", // Pivots dynamically from the timeline border
      }}
      className="relative pb-16 last:pb-0"
    >
      <span className="absolute -left-[37px] top-1.5 inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-violet to-cyan shadow-[0_0_20px_var(--violet)]" />
      <div className="font-mono text-xs text-muted-foreground">{t.year}</div>
      <h3 className="mt-1 font-display text-3xl">{t.title}</h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/90">
        {t.body}
      </p>
    </motion.li>
  );
}
