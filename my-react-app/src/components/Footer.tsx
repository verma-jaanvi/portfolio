import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/50">
      <div className="bg-noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">
              // outro.transmission
            </p>
            <h3 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-6xl">
              Let's build something
              <br />
              <span className="text-gradient italic">extraordinary.</span>
            </h3>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/90 hover:text-foreground"
            >
              <div className="group/wander inline-flex items-center gap-2 text-xs">
                <span className="h-px w-10 bg-gradient-to-r from-cyan to-violet transition-all duration-500 group-hover/wander:w-20" />
                open transmission channel
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Navigate
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link to="/about" className="hover:text-cyan">
                    Origin
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-cyan">
                    Works
                  </Link>
                </li>
                <li>
                  <Link to="/writings" className="hover:text-cyan">
                    Signals
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-cyan">
                    Transmit
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Channels
              </p>
              <ul className="mt-3 space-y-2 text-foreground/80">
                <li>
                  <a
                    href="https://github.com/verma-jaanvi"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan"
                  >
                    github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/jahnvi-verma-7b09612b0/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan"
                  >
                    linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:vermajaanvi64@gmail.com"
                    className="hover:text-cyan"
                  >
                    mail
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Coordinates
              </p>
              <p className="mt-3 text-foreground/80">
                Currently orbiting
                <br />
                <span className="text-gradient">the open web</span>
              </p>
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                async · everywhere
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-6 font-mono text-[10px] text-foreground/80 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} JV — handcrafted in the
            dark.
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
            system online · accepting signals
          </div>
        </div>
      </div>
    </footer>
  );
}
