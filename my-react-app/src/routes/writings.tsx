import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { posts } from "./writings_.$slug";

export const Route = createFileRoute("/writings")({
  head: () => ({
    meta: [
      { title: "Signals — Jahnvi Verma (JV)" },
      { name: "description", content: "Essays, field notes, and fragments on AI, creative coding, design, and the texture of digital craft." },
      { property: "og:title", content: "Signals — Writings by Jahnvi Verma (JV)" },
      { property: "og:description", content: "A futuristic digital journal of essays and explorations." },
    ],
  }),
  component: Writings,
});

const tags = ["All", "Essays", "Field notes", "AI", "Design", "Process"] as const;

function Writings() {
  const [tag, setTag] = useState<(typeof tags)[number]>("All");
  const filtered = tag === "All" ? posts : posts.filter((p) => p.tag === tag);
  const featured = posts.find((p) => p.featured)!;

  return (
    <>
      <section className="relative pb-16 pt-36 md:pt-48">
        <div className="bg-grid absolute inset-0 opacity-[0.06]" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="font-mono text-xs text-muted-foreground">// signals.journal</p>
          </Reveal>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] sm:text-6xl md:text-8xl">
            <Reveal as="span" className="block text-gradient-soft">Notes from</Reveal>
            <Reveal delay={120} as="span" className="block"><span className="text-gradient italic">the signal</span></Reveal>
          </h1>
          <Reveal delay={240}>
            <p className="mt-10 max-w-xl leading-relaxed text-foreground/90">
              Essays, half-formed thoughts, and field notes on artificial intelligence,
              creative engineering, and the small details that make digital things feel alive.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <Link
            to="/writings/$slug"
            params={{ slug: featured.slug }}
            className="block"
          >
            <article className="border-glow glass-strong group relative overflow-hidden rounded-3xl p-8 sm:p-10 md:p-14 transition hover:scale-[1.01]">
              <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-violet/30 blur-3xl transition-all duration-700 group-hover:scale-125" />
              <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-cyan/30 blur-3xl transition-all duration-700 group-hover:scale-125" />
              <div className="relative">
                <div className="font-mono text-xs uppercase tracking-widest text-cyan">★ Featured signal</div>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl group-hover:text-gradient transition">
                  {featured.title}
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">{featured.excerpt}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.read} min read</span>
                  <span>·</span>
                  <span>{featured.tag}</span>
                  <span className="ml-auto flex items-center gap-2 text-cyan">
                    <span className="h-px w-6 bg-cyan transition-all group-hover:w-12" />
                    read signal →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </Reveal>
      </section>

      {/* Tag filter */}
      <section className="mx-auto max-w-5xl px-6 pt-8">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2 border-y border-border/50 py-4">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full px-3 py-1 font-mono text-[11px] transition ${
                  tag === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Post list */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-4 md:pb-32">
        <ul className="divide-y divide-border/50">
          {filtered.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 40}>
              <Link
                to="/writings/$slug"
                params={{ slug: p.slug }}
                className="group grid grid-cols-12 items-baseline gap-3 rounded-xl px-2 py-7 transition-all duration-300 hover:bg-violet/5 sm:gap-4 sm:py-8"
              >
                <span className="col-span-12 font-mono text-xs text-muted-foreground sm:col-span-2">
                  {p.date}
                </span>
                <span className="col-span-12 min-w-0 sm:col-span-7">
                  <h3 className="font-display text-xl font-medium transition group-hover:translate-x-2 group-hover:text-gradient sm:text-2xl md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">{p.excerpt}</p>
                </span>
                <span className="col-span-12 text-left font-mono text-xs text-muted-foreground sm:col-span-3 sm:text-right">
                  {p.tag} · {p.read} min →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
