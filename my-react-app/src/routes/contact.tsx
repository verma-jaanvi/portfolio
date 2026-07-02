import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ParticleField } from "../components/ParticleField";
import { Reveal } from "../components/Reveal";
import { submitContact } from "@/lib/content.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Transmit — Jahnvi Verma (JV)" },
      {
        name: "description",
        content:
          "Open a transmission with JV. Collaborations, commissions, and curious questions welcome.",
      },
      { property: "og:title", content: "Transmit — Get in touch with JV" },
      {
        property: "og:description",
        content: "Let's build something extraordinary together.",
      },
    ],
  }),
  component: Contact,
});

const intents = [
  "A collaboration",
  "A commission",
  "A residency",
  "Just to say hi",
] as const;

function Contact() {
  const [intent, setIntent] =
    useState<(typeof intents)[number]>("A collaboration");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!name || !email || !message) {
      setError("Please fill in name, email, and message.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("That email address doesn't look right.");
      return;
    }

    setSubmitting(true);
    try {
      await submitContact({
        name,
        email,
        intent,
        message,
        honeypot: String(form.get("website") || ""),
        userAgent:
          typeof navigator !== "undefined"
            ? navigator.userAgent.slice(0, 500)
            : undefined,
      });
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-aurora relative isolate min-h-screen overflow-hidden pb-28 pt-16 md:pb-40 md:pt-35">
      <ParticleField density={45} />
      <div className="bg-grid absolute inset-0 opacity-[0.08]" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 md:gap-24">
        {/* Top: Hero */}
        <div className="relative z-10 w-full mb-10">
          <Reveal>
            <div className="font-mono inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
              now broadcasting · open.transmission
            </div>
          </Reveal>

          <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.0] tracking-tight sm:text-5xl md:text-[6rem] lg:text-[8rem]">
            <Reveal as="span" className="block text-gradient-soft">
              Let's build
            </Reveal>
            <Reveal delay={120} as="span" className="block">
              something
            </Reveal>
            <Reveal delay={240} as="span" className="block text-gradient-soft">
              <span className="text-gradient italic">extraordinary.</span>
            </Reveal>
          </h1>

          <Reveal delay={400}>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-foreground/90 md:text-lg">
              Drop a signal. I read every message and reply within a few
              rotations of the planet.
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-10 space-y-3 font-mono text-sm">
              <a
                href="mailto:vermajaanvi64@gmail.com"
                className="group flex w-fit items-center gap-4 rounded-full border border-transparent px-4 py-2 text-foreground/90 transition-all duration-300 hover:border-cyan/40 hover:bg-white/5 hover:text-cyan"
              >
                <span className="h-px w-8 bg-cyan transition-all duration-300 group-hover:w-16" />
                vermajaanvi64@gmail.com
              </a>
              <a
                href="https://github.com/verma-jaanvi"
                target="_blank"
                rel="noreferrer"
                className="group flex w-fit items-center gap-4 rounded-full border border-transparent px-4 py-2 text-foreground/90 transition-all duration-300 hover:border-violet/40 hover:bg-white/5 hover:text-violet"
              >
                <span className="h-px w-8 bg-violet transition-all duration-300 group-hover:w-16" />
                github.com/verma-jaanvi
              </a>
              <a
                href="https://www.linkedin.com/in/jahnvi-verma-7b09612b0/"
                target="_blank"
                rel="noreferrer"
                className="group flex w-fit items-center gap-4 rounded-full border border-transparent px-4 py-2 text-foreground/90 transition-all duration-300 hover:border-magenta/40 hover:bg-white/5 hover:text-magenta"
              >
                <span className="h-px w-8 bg-magenta transition-all duration-300 group-hover:w-16" />
                linkedin.com/in/jahnvi-verma
              </a>
            </div>
          </Reveal>

          <Reveal delay={700}>
            <div className="mt-12 flex items-center gap-3 w-fit rounded-full border border-border bg-background/40 px-6 py-3 text-sm backdrop-blur transition-all duration-300 hover:border-cyan/60 hover:bg-white/5">
              <span className="inline-block h-1 w-1 rounded-full bg-cyan animate-ping" />
              Currently accepting Q3 2026 projects
            </div>
          </Reveal>
        </div>

        {/* Bottom: Form */}
        <div >
          <Reveal delay={200}>
            <div className="border-glow glass-strong relative overflow-hidden rounded-3xl p-8 md:p-10">
              {sent ? (
                <div className="py-20 text-center">
                  <div className="mx-auto h-16 w-16 animate-pulse-glow rounded-full bg-gradient-to-br from-cyan to-violet" />
                  <h2 className="mt-8 font-display text-4xl">
                    Signal received.
                  </h2>
                  <p className="mt-4 leading-relaxed text-foreground/90">
                    Thanks for transmitting. JV will respond within a few days.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-10 rounded-full border border-border px-6 py-2.5 text-sm transition-all duration-300 hover:border-cyan/60 hover:bg-white/5"
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  {/* Honeypot — hidden from humans, bots fill it and get silently blocked */}
                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  />
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      01 / I'm reaching out about
                    </label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {intents.map((i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setIntent(i)}
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            intent === i
                              ? "border-violet/60 bg-violet/15 text-foreground"
                              : "border-border bg-background/40 text-foreground/70 hover:border-violet/40"
                          }`}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field
                    label="02 / Your name"
                    name="name"
                    placeholder="Ada Lovelace"
                  />
                  <Field
                    label="03 / Reply channel"
                    name="email"
                    type="email"
                    placeholder="you@signal.io"
                  />
                  <Field
                    label="04 / The transmission"
                    name="message"
                    placeholder="Tell me about your idea, your vision, your strange dream..."
                    textarea
                  />

                  {error && (
                    <p className="font-mono text-xs text-magenta">⚠ {error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-violet via-magenta to-cyan py-4 text-sm font-medium text-background shadow-aurora transition hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70"
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      {submitting ? "Transmitting…" : "Transmit signal"}
                      <span className="transition-transform group-hover:translate-x-1">
                        ↗
                      </span>
                    </span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="group block">
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      {textarea ? (
        <textarea
          name={name}
          required
          placeholder={placeholder}
          rows={5}
          maxLength={5000}
          className="mt-3 w-full resize-none rounded-2xl border border-border bg-background/40 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 transition focus:border-cyan/60 focus:bg-background/70 focus:outline-none focus:ring-2 focus:ring-cyan/20"
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          placeholder={placeholder}
          maxLength={type === "email" ? 320 : 200}
          className="mt-3 w-full rounded-full border border-border bg-background/40 px-5 py-3 text-foreground placeholder:text-muted-foreground/60 transition focus:border-cyan/60 focus:bg-background/70 focus:outline-none focus:ring-2 focus:ring-cyan/20"
        />
      )}
    </label>
  );
}
