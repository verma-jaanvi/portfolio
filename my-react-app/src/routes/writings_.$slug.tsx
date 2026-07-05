import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";
import { ParticleField } from "../components/ParticleField";
import SoftAurora from "../components/SoftAurora";

// ─── Shared post data (source of truth) ────────────────────────────────────
export const posts = [
  {
    slug: "on-the-texture-of-latent-space",
    date: "2026.04.18",
    title: "On the texture of latent space",
    excerpt:
      "What if we treated embeddings less like coordinates and more like weather?",
    read: 7,
    tag: "AI",
    featured: true,
    content: `
What does it feel like to move through latent space? The standard mental model — a high-dimensional coordinate system — is technically accurate and experientially useless. Coordinates suggest a map. A grid. Fixed addresses. But latent space isn't a city. It's more like atmosphere.

## The weather metaphor

When you shift a prompt slightly — a word here, a tone there — the output doesn't move predictably. It drifts. It clouds. Sometimes it clears into something startling. This is weather behaviour: sensitive to initial conditions, shaped by invisible pressure systems, beautiful in its unpredictability.

I've started thinking of embeddings as points of atmospheric pressure rather than coordinates. Similar concepts cluster not because they're adjacent on a grid, but because they share the same pressure — the same emotional weather, the same semantic tension. "Grief" and "nostalgia" aren't close because they're neighbours on a map. They're close because they inhabit the same kind of sky.

## What this changes about how I prompt

If latent space is weather, then prompting is less like navigating and more like forecasting. You're not saying "go to position (x, y, z)." You're saying "create the conditions for this kind of weather to form."

This reframe has practical consequences:

**Texture over precision.** Instead of being very specific about what I want, I've started describing the *feel* of the thing. "Write this as if it's raining lightly outside" produces different text than "write this with a melancholy tone" — even though they should be semantically close. Texture words seem to activate richer weather patterns.

**Contrast as navigation.** In weather, you can't directly specify a weather pattern — but you can create conditions that make it more or less likely. In prompting, contrast works the same way. "Not clinical, not chatty — something between a field note and a letter" is more effective than either pole alone.

**Patience with drift.** Weather doesn't arrive on command. Neither does the right output. I've become more tolerant of iterating — not fixing, but watching conditions shift until something I recognise appears.

## The deeper implication

If we accept the weather metaphor, then the question "what is in this model?" becomes less interesting than "what kinds of weather are possible here?" Not an inventory, but a climate study.

I don't know if this is technically accurate. But I've found it's phenomenologically useful — it changes how I interact with generative models, makes me more patient, more attentive to texture, more willing to let meaning form rather than forcing it.

And sometimes, that's enough.
    `.trim(),
  },
  {
    slug: "why-interfaces-should-breathe",
    date: "2026.03.30",
    title: "Why interfaces should breathe",
    excerpt: "A small case for software that exhales.",
    read: 5,
    tag: "Design",
    content: `
There is a kind of software that holds its breath.

You know it immediately. Every pixel is accounted for. Every white space is a mistake waiting to be corrected. The density is total. Open the app and you feel the pressure of it — the sense that you've stepped into a room where nothing is allowed to be still.

And then there's software that breathes.

## What breathing looks like

Breathing software has rhythm. It loads progressively, not all at once. Elements arrive rather than appear. There are pauses — not emptiness, but space where attention can settle before the next thing asks for it.

The Mac OS menu bar clock has always felt like this to me. It updates once a minute. No animation, no pulse. Just a quiet change that you notice without being startled by it. It's the most invisible thing on the screen and somehow the most calming.

Compare that to a notification counter — a red badge demanding you acknowledge it. That's held breath. That's software that needs something from you right now.

## The design of exhale

I've been trying to identify what specifically makes software feel like it exhales, and I keep returning to three things:

**Deferred density.** Don't show everything at once. Let the user settle into one layer before the next unfolds. This isn't about hiding information — it's about sequencing it so it arrives rather than accumulates.

**Transitions that complete.** When something moves on screen, let it finish. Interrupted or clipped animations create the same anxiety as a sentence that — transitions that resolve create a sense of things settling, landing, being okay.

**Silence as signal.** Empty space isn't wasted space. It's the exhale between words that makes speech intelligible. Generous padding, unhurried line height, room between interactive elements — these are the design equivalent of a calm voice.

## Why it matters

I think breathing software is less likely to create anxiety because it doesn't constantly perform urgency. It assumes you have time. It trusts that you'll come back. It doesn't need to hold you.

That's a different relationship with the user than most software aspires to. Most software wants to maximise time-in-app. Breathing software wants to minimise friction-per-insight.

The metric is different. The experience is entirely different.

Build software that exhales. Let it trust the world a little.
    `.trim(),
  },
  {
    slug: "notes-from-a-year-of-building-with-llms",
    date: "2026.02.14",
    title: "Notes from a year of building with LLMs",
    excerpt: "Twelve months, forty prototypes, six lessons that stuck.",
    read: 12,
    tag: "Essays",
    content: `
I spent the last twelve months building almost nothing but LLM-powered tools. Some shipped. Most didn't. All of them taught me something. Here are six things that stuck.

## 1. The prompt is the product

Early on I thought of prompts as configuration — technical scaffolding, not design. I was wrong. The prompt is the primary UX artefact. It shapes what the model can do in your context far more than the architecture around it. I now spend as much time on prompts as I do on interface design.

## 2. Latency is a UX problem, not an infrastructure problem

Users don't hate waiting. They hate *feeling* like they're waiting. I've shipped experiences with 8-second generation times that felt fast because the interface was doing something meaningful during the wait — showing structure forming, offering context, making the time feel used rather than wasted. And I've shipped 2-second responses that felt slow because the interface went blank and gave you nothing to look at.

## 3. The failure modes matter more than the success cases

Any LLM, given a good prompt and good input, will produce good output most of the time. The product is decided by what happens in the 15% of cases when it doesn't. I now design failure modes first: what does the interface do when the model is confidently wrong? When it refuses? When it produces something technically correct but useless?

## 4. Users anthropomorphise immediately

Even technically sophisticated users will start saying "it" and "it seems like" within minutes of using an LLM-powered tool. This isn't naive — it's a completely reasonable cognitive shortcut. The interface needs to be honest about this without being clinical about it. Design for the relationship the user is actually forming, not the one you think they should form.

## 5. Small context is a feature, not a bug

I've been conditioned to want bigger context windows. But I've shipped several tools that deliberately constrain context — forcing the model to work with a small, well-curated slice of information rather than a firehose — and the outputs are consistently better. Constraints are a design tool.

## 6. Ship the prototype

Every single time I've shipped something I thought wasn't ready, I've learned things I couldn't have learned in another month of iteration. LLM-powered products have a particular quality: the interesting problems only appear at scale. You have to have real users doing real things before the meaningful failure modes emerge. Ship earlier than you're comfortable with.

---

Twelve months. Forty prototypes. Six lessons. None of them are finished — they're starting points. That's the thing about working at the edge of a technology that's still becoming itself. The notes are always provisional.
    `.trim(),
  },
  {
    slug: "designing-for-the-second-glance",
    date: "2026.01.20",
    title: "Designing for the second glance",
    excerpt: "The interfaces I love reveal themselves slowly.",
    read: 6,
    tag: "Design",
    content: `
The best interfaces I know are more interesting the second time you look at them.

The first glance gives you function — what this is, what it does, whether you're in the right place. The second glance, if you bother to take it, gives you something else: craft you didn't notice, decisions made at a scale below the threshold of immediate attention, a sense that someone cared about this beyond the obvious.

## The problem with optimising for first impressions

Most interface design is optimised for the first glance. This is sensible — you have about 50 milliseconds to convey credibility before someone bounces. But optimising only for the first glance produces interfaces that are immediately legible and quickly boring. Interfaces that feel like they've shown you everything immediately because they have.

The most enduring products I know do something different. They reward return. There's a detail you didn't notice the first time. A behaviour that only reveals itself after you've used it for a week. A choice that seemed arbitrary and turns out to be elegant.

## What "second glance" design looks like

It's not about hiding things — that's the wrong lesson. It's about having more to offer than the first glance can consume.

Concretely, this might mean:

**Micro-details in typography.** The character spacing on a hover state. The specific easing curve on a transition. These don't register consciously on a first look, but they accumulate into a feeling of quality that the user will attribute to the product as a whole without knowing why.

**Coherent logic beneath the surface.** When the spacing system, the colour palette, and the interaction patterns all obey the same underlying logic, the interface has a coherence that reveals itself gradually. You start to feel that you understand how it thinks.

**Behaviours that emerge through use.** Some of the best interaction patterns are invisible until they happen. The way a scroll position is remembered. The way selections persist. These are only encountered in use, which means they're only appreciated by people who return.

## The audience you're designing for

Designing for the second glance means designing for users who stayed. Not the ones who bounced in 50 milliseconds — them, you've already lost — but the ones who decided this was worth their time. These users are more forgiving of first-impression roughness and more sensitive to long-term quality.

I think this is the better audience to optimise for. More loyal, more patient, more likely to tell other people. Harder to win, impossible to fake your way into.

The second glance is a bet that they'll come back. Worth making.
    `.trim(),
  },
  {
    slug: "slow-software-is-a-luxury",
    date: "2025.12.04",
    title: "Slow software is a luxury",
    excerpt: "On building tools that aren't in a hurry.",
    read: 8,
    tag: "Essays",
    content: `
A calendar app that loads in 3 seconds instead of 0.8 is a bad calendar app. But a meditation timer that loads in 3 seconds? Different question entirely.

I've been thinking about what makes software feel slow, and I keep arriving at the same answer: mismatch. Software feels slow when it takes longer than the task demands. But the task — what the user actually needs to do, the pace they need to do it at — varies enormously. We've been applying the metrics of transaction software (fast, efficient, invisible) to every kind of software, including kinds that would benefit from a different rhythm entirely.

## The tyranny of the performance metric

Performance in software is measured almost entirely in time. Lighthouse scores. Core Web Vitals. Time to interactive. The framework is temporal, and time is treated as an unambiguous cost — more of it is always worse.

This makes complete sense for transactional software. You're buying something, booking something, finding something. The software is a means to an end. Every millisecond it takes is a millisecond you're not at the end.

But what about software that's meant to be the experience itself? A tool for journaling. A meditation app. A portfolio. An interactive essay. For these, the temporal model is wrong. Time spent in the software isn't cost — it's the product.

## Slow software as design choice

I've been experimenting with deliberate pacing in the tools I build. Not slow because I didn't optimise — slow because I decided that was the right speed.

A writing tool I built last year has a fade-in for the text area that takes 1.2 seconds. By Lighthouse standards this is an atrocity. By the standards of what the tool is for — slowing down, being present, writing without urgency — it's exactly right. Users have told me it makes them feel like the tool is ready for them, not waiting impatiently for them to start.

## The luxury problem

Here's the uncomfortable truth: slow software is a luxury. It requires users who have enough time and security to not need things immediately. It requires builders who care more about the quality of the experience than the conversion rate.

Most software is built under conditions that can't afford either. Slow software is a choice made from abundance — of time, of attention, of willingness to prioritise depth over throughput.

I think this is worth naming honestly. Not everyone has the resources to build tools that breathe. But for those who do: the performance dashboard is not the whole picture. Sometimes the most sophisticated choice is to take your time.
    `.trim(),
  },
  {
    slug: "field-notes-a-week-in-touchdesigner",
    date: "2025.11.11",
    title: "Field notes: a week in TouchDesigner",
    excerpt: "Fragments and screenshots from a strange, generous week.",
    read: 4,
    tag: "Field notes",
    content: `
I spent a week trying to learn TouchDesigner. These are the notes I kept, mostly for myself.

---

**Day 1.** The node graph is immediately overwhelming and immediately beautiful. I keep zooming out to see the shape of it — the whole network as a visual form — rather than any individual node. There's something meditative about this. I forget to eat lunch.

The paradigm is completely different from anything I've worked in. In code, you describe transformations sequentially. Here, you describe a graph of relationships that are all happening simultaneously. The result exists as a steady state rather than a computation. I think this might rewire something in my brain and I'm not sure if I want it to.

---

**Day 2.** I made something move in response to audio. I don't know what I made — a blob of light that throbs with the music — but I made it in about four hours and it felt like magic. The feedback loop in TouchDesigner is unlike anything else. You change a parameter and the output changes immediately, continuously, in real time. There's no compile step. No page refresh. Just live consequence.

I've been making software for six years and I haven't felt this much like a beginner in a long time. It's uncomfortable and excellent.

---

**Day 3.** I tried to build something intentional today, with a concept and everything, and failed completely. The accidental things I made on days 1 and 2 were better than anything I attempted deliberately. I think this is a lesson about exploration versus execution — some tools are better approached as instruments than as compilers.

---

**Day 4.** Found the GLSL shader operators and lost several hours. I've written GLSL before, for three.js projects, but there's something different about writing it here — the feedback is so immediate, so continuous, that you can feel your way toward results rather than reasoning toward them. More painting, less programming.

---

**Day 5.** I made something I actually want to show people. A sound-reactive particle system that responds to the microphone with what I can only describe as emotional accuracy — the particles move like anxiety, like calm, like urgency, in ways that feel responsive rather than programmatic. I have no idea how to reproduce this intentionally. That might be fine.

---

A week in a tool is not enough to know the tool. But it might be enough to know if you want to know the tool. I want to know this one.
    `.trim(),
  },
  {
    slug: "how-i-prototype-with-paper-first",
    date: "2025.10.02",
    title: "How I prototype with paper first",
    excerpt: "Why the best UI starts on a napkin.",
    read: 5,
    tag: "Process",
    content: `
Every good interface I've designed started on paper. Not as a sketch I later translated into Figma — as a thing I worked through on paper, with all the slowness and constraint that implies, before touching any digital tool.

This is the opposite of how most people I know work. The typical flow is: idea → Figma → iteration → handoff. Paper, if it appears at all, is a quick thumbnail before the "real" design begins. I think this is backwards.

## What paper does that Figma can't

Paper is slow in the right ways. You can't auto-align. You can't use a component library. You can't toggle between variants with a click. Every change requires drawing.

This is a feature. The friction of drawing means you only draw things you've actually decided to draw. You can't mindlessly adjust spacing until it "feels right" — you have to know what spacing you want before you make the mark. The constraint forces decisiveness.

The other thing paper does is keep the level of fidelity honest. A paper sketch looks like a paper sketch. It signals "this is unresolved" in a way that a Figma frame — with its clean lines and component instances — can't. I've sat in design reviews where people spent an hour debating the exact shade of a button that was meant to represent "some kind of CTA here, details TBD." The fidelity of the artefact invited a level of engagement the idea didn't warrant yet.

Paper invites the right level of engagement.

## My actual process

I carry a specific kind of notebook: Leuchtturm1917, A5, dotted. The dot grid is small enough to feel unconstrained but present enough to keep lines roughly straight. I use a 0.5mm fineliner and a pencil for things I'm not sure about.

For UI work, I draw approximate device frames — never perfectly proportioned — and sketch inside them. I annotate heavily: what this does, why it's here, what happens when you tap it. The annotations are often more important than the drawing.

I try to sketch at least three fundamentally different directions before committing to any of them. The first idea is almost always the obvious one. The second is a reaction against the first. The third is where something interesting usually appears.

## When to leave paper behind

Paper is for thinking. Figma is for communicating. The transition happens when I know what I'm building — not every detail, but the logic of it, the hierarchy, the primary interactions. Then I take the paper sketch and use it as a constraint rather than a reference: I try to replicate the logic in Figma, not the appearance.

The napkin isn't the design. It's the design's skeleton. But you need the skeleton first.
    `.trim(),
  },
];

// ─── Route ─────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/writings_/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Signal"} — Jahnvi Verma (JV)` },
      { name: "description", content: loaderData?.excerpt ?? "" },
      { property: "og:title", content: loaderData?.title ?? "" },
      { property: "og:description", content: loaderData?.excerpt ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="font-mono text-muted-foreground">Signal not found.</p>
    </div>
  ),
  component: PostPage,
});

// ─── Minimal Markdown renderer (no dependency) ──────────────────────────────
function renderContent(md: string) {
  return md.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-14 font-display text-2xl font-semibold sm:text-3xl"
        >
          {block.slice(3)}
        </h2>
      );
    }
    if (block.startsWith("---")) {
      return <hr key={i} className="my-10 border-border/50" />;
    }
    // Bold within paragraph
    const parts = block.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
    return (
      <p key={i} className="mt-6 leading-[1.85] text-foreground/75">
        {parts}
      </p>
    );
  });
}

// ─── Page component ─────────────────────────────────────────────────────────
function PostPage() {
  const post = Route.useLoaderData();

  return (
    <>
      {/* Hero */}
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
            bandHeight={0.2}
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

        <ParticleField density={30} />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6">
          <Reveal>
            <div className="font-mono inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
              <Link to="/writings" className="hover:text-cyan transition">
                ← signals.journal
              </Link>
              <span>·</span>
              <span>{post.tag}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.read} min read</span>
            </div>
          </Reveal>

          <h1 className="mt-8 pb-3 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            <Reveal as="span" className="block text-gradient-soft">
              {post.title}
            </Reveal>
          </h1>

          <Reveal delay={200}>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-foreground/90 md:text-lg">
              {post.excerpt}
            </p>
          </Reveal>

          {/* Decorative separator */}
          <Reveal delay={300}>
            <div className="mt-12 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-violet/60 via-cyan/40 to-transparent" />
              <span className="font-mono text-xs text-muted-foreground">
                transmission begins
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-6 pb-32 pt-12">
        <Reveal>
          <article className="prose-custom">
            {renderContent(post.content)}
          </article>
        </Reveal>

        {/* Footer nav */}
        <Reveal>
          <div className="mt-20 flex items-center justify-between border-t border-border/50 pt-10">
            <Link
              to="/writings"
              className="group flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-cyan transition"
            >
              <span className="h-px w-8 bg-cyan transition-all group-hover:w-16" />
              back to signals
            </Link>
            <div className="font-mono text-xs text-muted-foreground">
              {post.date}
            </div>
          </div>
        </Reveal>

        {/* Next signal card */}
        {(() => {
          const currentIndex = posts.findIndex((p) => p.slug === post.slug);
          const next = posts[(currentIndex + 1) % posts.length];
          return (
            <Reveal>
              <div className="mt-10">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  // explore the next
                </p>
                <Link
                  to="/writings/$slug"
                  params={{ slug: next.slug }}
                  className="group relative mt-4 block overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur transition hover:border-violet/50 hover:bg-violet/5 sm:p-10"
                >
                  {/* Glow orb */}
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-violet/30 to-cyan/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-70 opacity-40" />

                  <div className="relative">
                    <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                      <span className="uppercase tracking-widest text-cyan">
                        next signal
                      </span>
                      <span>
                        {next.tag} · {next.read} min
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-2xl font-semibold leading-tight transition group-hover:text-gradient sm:text-3xl md:text-4xl">
                      {next.title}
                    </h2>

                    <p className="mt-3 max-w-xl text-sm text-foreground/60">
                      {next.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-3 font-mono text-xs">
                      <span className="h-px w-8 bg-gradient-to-r from-cyan to-violet transition-all duration-500 group-hover:w-20" />
                      <span className="text-muted-foreground group-hover:text-cyan transition">
                        read signal →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </Reveal>
          );
        })()}
      </section>
    </>
  );
}
