import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Index", code: "00" },
  { to: "/about", label: "Origin", code: "01" },
  { to: "/projects", label: "Works", code: "02" },
  { to: "/writings", label: "Signals", code: "03" },
  { to: "/contact", label: "Transmit", code: "04" },
] as const;

export function Nav() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const t = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }) +
          " UTC"
      );
    };
    t();
    const i = setInterval(t, 1000 * 30);
    return () => clearInterval(i);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="glass-strong mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet to-cyan opacity-90 blur-[2px] transition group-hover:blur-[6px]" />
            <div className="absolute inset-[3px] rounded-full bg-background" />
            <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-cyan to-magenta animate-pulse-glow" />
          </div>
          <div className="leading-none">
            <div className="font-display text-sm font-semibold tracking-wide">JV</div>
            <div className="font-mono text-[10px] text-muted-foreground">
              v2.6 · creative technologist
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className="group relative rounded-full px-3 py-1.5 text-sm transition"
              >
                <span className="font-mono mr-1.5 text-[10px] text-muted-foreground">{l.code}</span>
                <span
                  className={
                    active
                      ? "text-gradient font-medium"
                      : "text-foreground/80 group-hover:text-foreground"
                  }
                >
                  {l.label}
                </span>
                {active && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="font-mono text-[10px] text-muted-foreground">{time}</span>
          <Link
            to="/contact"
            className="group relative overflow-hidden rounded-full border border-violet/40 bg-violet/10 px-4 py-1.5 text-xs font-medium text-foreground transition hover:bg-violet/20"
          >
            <span className="relative z-10">Initiate contact ↗</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-full border border-border p-2"
          aria-label="Menu"
        >
          <div className="space-y-1">
            <span className={`block h-px w-5 bg-foreground transition ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-foreground transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="glass-strong mx-auto mt-2 max-w-7xl rounded-3xl p-4 md:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 rounded-2xl px-3 py-3 hover:bg-white/5"
              >
                <span className="font-mono text-[10px] text-muted-foreground">{l.code}</span>
                <span className="text-lg font-display">{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
