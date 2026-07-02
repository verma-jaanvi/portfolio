import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ParticleField } from "../components/ParticleField";
import { Reveal } from "../components/Reveal";
import { ScrollTilt3D } from "../components/ScrollTilt3D";


export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Works — Jahnvi Verma (JV)" },
      {
        name: "description",
        content:
          "Selected projects spanning AI, creative coding, interactive design, and experimental software.",
      },
      { property: "og:title", content: "Works — Jahnvi Verma (JV)" },
      {
        property: "og:description",
        content:
          "Cinematic showcase of immersive digital experiments and shipped systems.",
      },
    ],
  }),
  component: Projects,
});

// const categories = ["All", "AI", "WebGL", "Interactive", "Tools", "Lab"] as const;

// const projects = [
//   { code: "01", title: "AURORA", cat: "AI", year: "2026", tag: "Generative weather", desc: "Real-time atmospheric data painted into living sky-canvases.", grad: "from-violet via-magenta to-cyan" },
//   { code: "02", title: "HELIOSTAT", cat: "WebGL", year: "2025", tag: "Solar interface", desc: "Trace your shadow across a year of light and motion.", grad: "from-cyan to-azure" },
//   { code: "03", title: "MNEMOSYNE", cat: "AI", year: "2025", tag: "Memory garden", desc: "An LLM-grown garden where prompts bloom into seasonal narratives.", grad: "from-magenta to-violet" },
//   { code: "04", title: "ZEROGRAV", cat: "Interactive", year: "2025", tag: "Physics typography", desc: "A typography playground where letters obey invented physics.", grad: "from-cyan to-violet" },
//   { code: "05", title: "ECHO//FORM", cat: "WebGL", year: "2024", tag: "Sound sculptures", desc: "Live audio carved into morphing 3D forms in real-time.", grad: "from-violet to-cyan" },
//   { code: "06", title: "PROMPT.TOWER", cat: "Tools", year: "2024", tag: "Prompt IDE", desc: "A composable IDE for building, branching, and versioning prompts.", grad: "from-magenta to-cyan" },
//   { code: "07", title: "NIGHT.CRAWLER", cat: "Lab", year: "2024", tag: "Web scraper", desc: "A tactile interface for exploring scraped corners of the web.", grad: "from-violet to-azure" },
//   { code: "08", title: "STARLOOM", cat: "Lab", year: "2023", tag: "Constellation maker", desc: "Draw constellations and let an AI write their forgotten myths.", grad: "from-cyan to-magenta" },
// ];

const categories = [
  "All",
  "AI / NLP",
  "Android dev",
  "Desktop App",
  "Web dev",
] as const;

const projects = [
  {
    code: "01",
    title: "EMPOWER MSME",
    cat: "Web dev",
    year: "working...",
    tag: "MSME Networking Platform",
    desc: "A LinkedIn-inspired platform connecting MSMEs with investors, mentors, and growth opportunities.",
    grad: "from-violet via-magenta to-cyan",
  },
  {
    code: "02",
    title: "CIRCUIT VISION",
    cat: "Desktop App",
    year: "2026",
    tag: "Alternative KiCad FrontEnd ",
    desc: "A modern desktop environment for designing, simulating, and visualizing electronic circuits with an intuitive workflow.",
    grad: "from-cyan to-azure",
  },
  {
    code: "03",
    title: "APPOINT IT",
    cat: "Android dev",
    year: "2025",
    tag: "Doctor Appointment App",
    desc: "Android app that helps users discover nearby doctors and schedule appointments seamlessly.",
    grad: "from-magenta to-violet",
  },
  {
    code: "04",
    title: "WEATHER MOOD",
    cat: "Web dev",
    year: "2024",
    tag: "Weather-Based Playlist Generator",
    desc: "Blends real-time weather data with Spotify listening habits to curate mood-perfect playlists.",
    grad: "from-cyan to-violet",
  },
  {
    code: "05",
    title: "TEXT GUARDIAN",
    cat: "AI / NLP",
    year: "2024",
    tag: "Plagarism Checker",
    desc: "Intelligent text comparison engine leveraging TF-IDF and similarity scoring with web scrapping api.",
    grad: "from-cyan to-magenta",
  },
];

function Projects() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <>
      <section className="bg-aurora relative isolate overflow-hidden pb-20 pt-36 md:pt-44 h-screen">
        <ParticleField density={40} />
        <div className="bg-grid absolute inset-0 opacity-[0.08]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="font-mono text-xs text-muted-foreground">
              // works.archive — {projects.length} entries
            </p>
          </Reveal>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.9] sm:text-7xl md:text-[7rem] lg:text-[9rem]">
            <Reveal as="span" className="block text-gradient-soft">
              Selected
            </Reveal>
            <Reveal delay={120} as="span" className="block">
              <span className="text-gradient italic">experiments</span> &
            </Reveal>
            <Reveal delay={240} as="span" className="block text-gradient-soft">
              small universes.
            </Reveal>
          </h1>

          
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-6 pb-24 md:pb-12">
        <Reveal delay={400}>
            <div className="my-12 flex flex-wrap items-center gap-2 md:mt-16">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full border px-4 py-1.5 font-mono text-xs transition ${
                    active === c
                      ? "border-cyan/60 bg-cyan/15 text-cyan"
                      : "border-border bg-background/40 text-foreground/70 hover:border-violet/40"
                  }`}
                >
                  {c}
                </button>
              ))}
              <span className="w-full font-mono text-[11px] text-muted-foreground sm:ml-auto sm:w-auto">
                showing {filtered.length} / {projects.length}
              </span>
            </div>
          </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {filtered.map((p, i) => (
            <ScrollTilt3D key={p.code} intensity={12}>
              <Reveal delay={i * 80}>
                <article className="hover-lift group relative block overflow-hidden rounded-3xl border border-border bg-card/50 p-6 backdrop-blur transition-all duration-300 sm:p-10">
                  {/* Target 3D Hover Gradient Blob */}
                  <div
                    className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${p.grad} opacity-70 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-50`}
                  />

                  {/* Target Content Structure */}
                  <div className="relative z-10 flex h-72 flex-col justify-between">
                    <div className="flex items-start justify-between font-mono text-[11px] text-foreground/90">
                      <span>{p.code}</span>
                      <span>
                        {p.year} · {p.cat}
                      </span>
                    </div>

                    <div>
                      <p className="mb-2 font-mono text-xs text-cyan">
                        {p.tag}
                      </p>
                      <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-4xl">
                        {p.title}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/90">
                        {p.desc}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-xs">
                        <span className="h-px w-8 bg-gradient-to-r from-cyan to-violet transition-all duration-500 group-hover:w-16" />
                        open case study
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </ScrollTilt3D>
          ))}
        </div>
      </section>
    </>
  );
}
