import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface GiantWordProps {
  text: string;
  align?: "start" | "center" | "end";
  /** Under 768 px the word takes this alignment instead; the Scene's mobile composition centres it (docs/02 §3.9). */
  alignMobile?: "start" | "center" | "end";
  /** Page-hero treatment: over a photograph at reduced opacity, no cut-out (docs/02 §3.9). */
  hero?: boolean;
  light?: boolean;
  className?: string;
  style?: CSSProperties;
  [dataAttr: `data-${string}`]: string | undefined;
}

// Bodoni Moda capitals measure ~0.62 em per character with the -0.02em tracking. On mobile a word longer
// than seven characters would overflow the viewport at 22vw (docs/03 §12 anticipates this), so longer
// words scale to fit the viewport minus the 24 px gutters. Multi-word texts (MAY BACH) wrap naturally
// and keep the spec size.
const EM_PER_CHAR = 0.62;
function fitSizes(text: string): CSSProperties | undefined {
  const isLatin = /^[A-Za-z0-9 .'-]+$/.test(text);
  const longest = Math.max(...text.split(/\s+/).map((w) => w.length));
  if (!isLatin || longest <= 7) return undefined;
  const ems = (longest * EM_PER_CHAR).toFixed(2);
  return {
    "--giant-m": `clamp(56px, calc((100vw - 48px) / ${ems}), 112px)`,
    // Desktop: COLLECTION (10) at 15vw is wider than a 1440 container; cap to the container minus gutters.
    "--giant-d": `min(clamp(120px, 15vw, 300px), calc((100vw - 160px) / ${ems}))`,
  } as CSSProperties;
}

// Written out so Tailwind sees every class it has to emit.
const ALIGN = { start: "text-start", center: "text-center", end: "text-end" } as const;
const ALIGN_MD = { start: "md:text-start", center: "md:text-center", end: "md:text-end" } as const;

/** The giant serif word. Decorative: aria-hidden; the real heading lives in the copy. Reserves its box for CLS 0. */
export function GiantWord({ text, align = "start", alignMobile, hero, light, className, style, ...rest }: GiantWordProps) {
  const vars = fitSizes(text);
  return (
    <div
      aria-hidden="true"
      className={cn(
        "giant",
        hero && "giant--hero",
        light && "giant--light",
        ALIGN[alignMobile ?? align],
        alignMobile && ALIGN_MD[align],
        className,
      )}
      style={{ minHeight: ".85em", ...vars, ...style }}
      {...rest}
    >
      {/* Multi-word texts (MAY BACH) break one word per line under 768 px regardless of which font has loaded, so the box never shifts. */}
      {text.includes(" ")
        ? text.split(" ").map((w, i) => (
            <span key={i} className="giant__word">
              {w}
              {i < text.split(" ").length - 1 ? " " : ""}
            </span>
          ))
        : text}
    </div>
  );
}
