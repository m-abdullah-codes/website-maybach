"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { loadGsap } from "@/lib/gsap";
import { LETTERS, runLetters } from "@/lib/split";
import { reducedMotion } from "@/lib/motion";

interface GiantWordProps {
  text: string;
  align?: "start" | "center" | "end";
  /** Under 768 px the word takes this alignment instead; the Scene's mobile composition centres it (docs/02 §3.9). */
  alignMobile?: "start" | "center" | "end";
  /** Page-hero treatment: over a photograph at reduced opacity, no cut-out (docs/02 §3.9). */
  hero?: boolean;
  light?: boolean;
  /**
   * The element to render. Decorative by default. Pass "h1" where the giant word *is* the page's
   * heading (the Home hero, which has no headline of its own): the word then carries an aria-label
   * so the split characters are never announced one at a time, and the page keeps a real h1.
   */
  as?: "div" | "h1" | "h2";

  /**
   * When the letters start. "immediate": a word already on screen (the Home hero, the page heroes).
   * "inview": when it is scrolled to (the Collection rows). Omitted: it does not animate.
   */
  reveal?: "immediate" | "inview";
  /** Seconds before the first letter. The word leads the frame in, so it waits for nothing by default. */
  delay?: number;
  /** Seconds a single letter takes. */
  duration?: number;
  /** ms between one letter and the next. */
  stagger?: number;
  ease?: string;
  /** Overrides the shared start state; the giant word rises by a share of its own size, not a fixed 26 px. */
  from?: gsap.TweenVars;
  className?: string;
  style?: CSSProperties;
  [dataAttr: `data-${string}`]: string | undefined;
}

// Arabic letters join to their neighbours: split one into characters and every letter drops to its
// isolated form, which spells the word wrong. Arabic animates a word at a time (AGENTS.md §3).
const JOINING = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

// A giant letter rises by a share of its own size: 26 px under a 300 px capital would not read as movement.
const GIANT_FROM: gsap.TweenVars = { opacity: 0, y: "0.35em" };
// The giant word is the slowest thing on the page. The section headings keep the shared cadence, but at
// their 26 ms a seven-letter word has every letter in flight at once and reads as a block fading in --
// the word has to assemble itself, one character at a time, so the letters are spaced much further apart
// and each takes longer to arrive. The first letter goes on stage immediately; MAY BACH is complete after
// ~1.9 s and COLLECTION after ~2.2 s.
const GIANT_STAGGER = 90;
const GIANT_DURATION = 1.4;
// The site's expo.out reaches 90% of its travel in a quarter of its duration, so a letter looks arrived
// almost as soon as it starts and the cascade closes up. power3.out (the ease of the reference component)
// holds each letter in motion for far longer, which is what makes the word read one character at a time.
const GIANT_EASE = "power3.out";

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

/** The word, cut into the pieces that animate: characters in Latin, whole words in Arabic. */
function split(text: string) {
  const words = text.split(" ").filter(Boolean);
  const perChar = !JOINING.test(text);
  let i = 0;
  return words.map((word, w) => ({
    key: w,
    last: w === words.length - 1,
    // Each word is a line on mobile (.giant__word is display:block there), so it carries the slice of the
    // top-to-bottom fade that its line would have had — the gradient still runs across the whole word.
    fill: {
      "--fill-h": `${words.length * 100}%`,
      "--fill-y": words.length > 1 ? `${((w / (words.length - 1)) * 100).toFixed(2)}%` : "0%",
    } as CSSProperties,
    units: (perChar ? Array.from(word) : [word]).map((unit) => ({ unit, i: i++ })),
  }));
}

// Written out so Tailwind sees every class it has to emit.
const ALIGN = { start: "text-start", center: "text-center", end: "text-end" } as const;
const ALIGN_MD = { start: "md:text-start", center: "md:text-center", end: "md:text-end" } as const;

/**
 * The giant serif word. Decorative by default: aria-hidden, with the real heading in the copy. Where the
 * copy has no headline the word takes the job instead — `as="h1"` (see the prop). Reserves its box for CLS 0.
 *
 * It arrives a letter at a time. The pieces are rendered on the server and animated by CSS keyframes, so
 * the word — which sits above the fold on every page it appears on, sandwiched between the background and
 * the car cut-out — starts moving on the first paint, with no JavaScript, no measurement and no layout work.
 */
export function GiantWord({
  text,
  align = "start",
  alignMobile,
  hero,
  light,
  as: Tag = "div",
  reveal,
  delay = 0,
  duration = GIANT_DURATION,
  stagger = GIANT_STAGGER,
  ease = GIANT_EASE,
  from = GIANT_FROM,
  className,
  style,
  ...rest
}: GiantWordProps) {
  const vars = fitSizes(text);
  const words = split(text);
  const ref = useRef<HTMLDivElement>(null);
  const start = useRef({ delay, duration, stagger, ease, from });
  start.current = { delay, duration, stagger, ease, from };

  useEffect(() => {
    const el = ref.current;
    // A word already on screen is animated by the CSS keyframes instead, from the first paint: putting the
    // hero's entrance behind React hydration costs 6.4 s on a throttled phone. The keyframes carry the same
    // numbers as runLetters (no delay, 1.4 s a letter, 90 ms apart, power3.out), so the two are one animation
    // in two engines. Only a word that has to be scrolled to waits for GSAP, by which time it is long loaded.
    if (!el || !reveal || reveal === "immediate") return;
    if (reducedMotion()) {
      el.classList.add("is-in");
      return;
    }

    let settled = false;
    let tween: gsap.core.Tween | null = null;
    let timer = 0;
    // If GSAP is late the CSS keyframes take the entrance instead, so the word is never left blank and
    // never waits on a network it cannot control.
    const plain = () => {
      if (settled) return;
      settled = true;
      el.classList.add("is-in");
    };

    const run = () => {
      timer = window.setTimeout(plain, 600);
      loadGsap()
        .then(({ gsap }) => {
          window.clearTimeout(timer);
          if (settled || !ref.current) return;
          const pieces = Array.from(el.querySelectorAll<HTMLElement>(".giant__char"));
          if (!pieces.length) return plain();
          settled = true;
          tween = runLetters(gsap, pieces, {
            ...LETTERS,
            from: start.current.from,
            duration: start.current.duration,
            stagger: start.current.stagger,
            ease: start.current.ease,
            delay: start.current.delay,
            onReady: () => el.classList.add("is-lettered"),
          });
        })
        .catch(plain);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        run();
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      tween?.kill();
    };
  }, [reveal, text]);

  const heading = Tag !== "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLHeadingElement>}
      aria-hidden={heading ? undefined : "true"}
      aria-label={heading ? text : undefined}
      className={cn(
        "giant giant--split",
        hero && "giant--hero",
        light && "giant--light",
        reveal && "giant--gated",
        // Server-rendered, so the letters are already moving on the first frame the word is painted.
        reveal === "immediate" && "is-in",
        ALIGN[alignMobile ?? align],
        alignMobile && ALIGN_MD[align],
        className,
      )}
      style={{ minHeight: ".85em", ...vars, ...style }}
      {...rest}
    >
      {/* Multi-word texts (MAY BACH) break one word per line under 768 px regardless of which font has loaded, so the box never shifts. */}
      {words.map((w) => (
        <span key={w.key} className="giant__word" style={w.fill}>
          {w.units.map((u) => (
            <span key={u.i} className="giant__char" style={{ "--i": u.i } as CSSProperties}>
              {u.unit}
            </span>
          ))}
          {w.last ? "" : " "}
        </span>
      ))}
    </Tag>
  );
}
