import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface GiantWordProps {
  text: string;
  align?: "start" | "center" | "end";
  /** Page-hero treatment: over a photograph at reduced opacity, no cut-out (docs/02 §3.9). */
  hero?: boolean;
  light?: boolean;
  className?: string;
  style?: CSSProperties;
}

// Bodoni Moda capitals measure ~0.62 em per character with the -0.02em tracking. On mobile a word longer
// than seven characters would overflow the viewport at 22vw (docs/03 §12 anticipates this), so longer
// words scale to fit the viewport minus the 24 px gutters. Multi-word texts (MAY BACH) wrap naturally
// and keep the spec size.
const EM_PER_CHAR = 0.62;
function mobileSize(text: string): string | undefined {
  const isLatin = /^[A-Za-z0-9 .'-]+$/.test(text);
  const longest = Math.max(...text.split(/\s+/).map((w) => w.length));
  if (!isLatin || longest <= 7) return undefined;
  return `clamp(56px, calc((100vw - 48px) / ${(longest * EM_PER_CHAR).toFixed(2)}), 112px)`;
}

/** The giant serif word. Decorative: aria-hidden; the real heading lives in the copy. Reserves its box for CLS 0. */
export function GiantWord({ text, align = "start", hero, light, className, style }: GiantWordProps) {
  const fit = mobileSize(text);
  const vars = fit ? ({ "--giant-m": fit } as CSSProperties) : undefined;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "giant",
        hero && "giant--hero",
        light && "giant--light",
        align === "center" ? "text-center" : align === "end" ? "text-end" : "text-start",
        className,
      )}
      style={{ minHeight: ".85em", ...vars, ...style }}
    >
      {text}
    </div>
  );
}
