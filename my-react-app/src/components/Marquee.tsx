import type { ReactNode } from "react";

export function Marquee({ children, reverse = false }: { children: ReactNode; reverse?: boolean }) {
  return (
    <div className="group relative flex w-full overflow-hidden">
      <div
        className="flex shrink-0 items-center gap-12 pr-12"
        style={{
          animation: `marquee 35s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
