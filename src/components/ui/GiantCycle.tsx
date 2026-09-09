"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { loadGsap } from "@/lib/gsap";
import { LETTERS, runLetters } from "@/lib/split";
import { reducedMotion } from "@/lib/motion";
import { GiantWord } from "./GiantWord";

/** How long a word holds before it hands over. The entrance itself takes ~2.1 s of this. */
const HOLD = 5600;
/** The first hand-over waits longer: the hero's whole entrance has to land before anything moves again. */
const FIRST_HOLD = 6400;
/** Leaving is quicker than arriving, and continues upward — the word carries on the way it came in. */
const OUT_DURATION = 0.55;
const OUT_STAGGER = 45;
/** How often to look again while the section is off screen. One timer, no work. */
const OFFSCREEN_POLL = 700;

interface GiantCycleProps {
  /** Two or more. The first is the one the page paints, and the one the heading is named for. */
  words: string[];
  as?: "div" | "h1";
  /** Page-hero treatment: over a photograph at reduced opacity (.giant--hero, 60%). Forwarded to every layer. */
  hero?: boolean;
  /**
   * How word one arrives, exactly as GiantWord means it. "immediate" for a word already on screen
   * (the Home hero), "inview" for one that has to be scrolled to (the Collection rows, the featured
   * exhibit). The cycle then starts its own clock the first time the word is actually seen, so a row
   * five screens down does not hand over before it has finished arriving.
   */
  reveal?: "immediate" | "inview";
  align?: "start" | "center" | "end";
  alignMobile?: "start" | "center" | "end";
  className?: string;
  style?: CSSProperties;
  [dataAttr: `data-${string}`]: string | undefined;
}

/**
 * The giant word behind the car, alternating.
 *
 * Three things this has to get right, in order:
 *
 * **The car must not move.** On mobile the cut-out is positioned under the word and follows its rendered
 * box, so a taller second phrase would drop the car every few seconds. The words are therefore stacked
 * in a single grid cell: the container is as tall as the tallest of them and never changes, whichever
 * one is showing. CLS stays 0 because nothing is ever added or removed from the flow.
 *
 * **The first paint must not change.** Word one still renders server-side with `reveal="immediate"`, so
 * it starts moving on the first frame from CSS keyframes with no JavaScript — that is what keeps the
 * hero's entrance off the hydration path. The cycle only takes over afterwards, and only if GSAP loads.
 *
 * **The heading must stay still even when the text does not.** The outer element is the h1 and carries
 * `aria-label` of the first word, so a screen reader gets one stable name; every layer under it is
 * aria-hidden, as the giant word already is everywhere else on the site.
 *
 * Under prefers-reduced-motion nothing cycles: word one is painted and stays. The cycle also pauses
 * whenever the hero is off screen, so a phone is not animating a headline nobody is looking at.
 */
export function GiantCycle({ words, as: Tag = "div", hero, reveal = "immediate", align, alignMobile, className, style, ...rest }: GiantCycleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || words.length < 2 || reducedMotion()) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>(".giant-cycle__layer"));
    if (layers.length < 2) return;
    const charsOf = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLElement>(".giant__char"));

    let cancelled = false;
    let timer = 0;
    let onScreen = true;
    let visibleSince = performance.now();
    let hadFirst = false;
    let current = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsapRef: any = null;

    const schedule = (ms: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(tick, ms);
    };

    const tick = () => {
      if (cancelled || !gsapRef) return;
      // Off screen: hold the current word and look again shortly, rather than animating into the void.
      if (!onScreen || document.hidden) return schedule(OFFSCREEN_POLL);
      // The first hand-over is owed a full hold of being *visible*, however the load happened to order
      // itself. Measuring it here rather than arming a timer when the observer happens to fire is what
      // makes this deterministic: the section five screens down behaves like the one above the fold.
      if (!hadFirst) {
        const seen = performance.now() - visibleSince;
        if (seen < FIRST_HOLD) return schedule(FIRST_HOLD - seen);
        hadFirst = true;
      }
      const gsap = gsapRef;
      const from = layers[current];
      const next = layers[(current + 1) % layers.length];

      gsap.to(charsOf(from), {
        opacity: 0,
        y: "-0.3em",
        duration: OUT_DURATION,
        ease: "power2.in",
        stagger: OUT_STAGGER / 1000,
        onComplete: () => {
          from.style.visibility = "hidden";
        },
      });
      next.style.visibility = "visible";
      runLetters(gsap, charsOf(next), {
        from: { opacity: 0, y: "0.35em" },
        to: { opacity: 1, y: 0 },
        duration: LETTERS.duration + 0.4,
        ease: "power3.out",
        stagger: 90,
        delay: 0.28,
      });

      current = (current + 1) % layers.length;
      schedule(HOLD);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const now = entries.some((e) => e.isIntersecting);
        if (now && !onScreen) visibleSince = performance.now();
        onScreen = now;
      },
      { threshold: 0 },
    );
    io.observe(root);

    loadGsap()
      .then(({ gsap }) => {
        if (cancelled) return;
        gsapRef = gsap;
        // Everything but the painted word starts hidden and pre-set, so the first hand-over has no flash.
        layers.forEach((l, i) => {
          if (i === 0) return;
          l.style.visibility = "hidden";
          gsap.set(charsOf(l), { opacity: 0, y: "0.35em" });
        });
        // Start the loop; tick() decides whether it is time, so no ordering here matters.
        schedule(OFFSCREEN_POLL);
      })
      .catch(() => {
        /* no GSAP: word one is already painted, and stays */
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [words]);

  // As GiantWord: a heading carries one stable name, a decorative word is hidden outright rather than
  // labelled — an aria-label on a plain <div> names nothing, and the page's real heading is elsewhere.
  const heading = Tag !== "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLHeadingElement>}
      aria-label={heading ? words[0] : undefined}
      aria-hidden={heading ? undefined : "true"}
      className={cn("giant-cycle", className)}
      style={style}
      {...rest}
    >
      {words.map((w, i) => (
        <GiantWord
          key={w}
          text={w}
          hero={hero}
          align={align}
          alignMobile={alignMobile}
          // Only the first word animates itself in; the rest are handed to the cycle above.
          reveal={i === 0 ? reveal : undefined}
          className={cn("giant-cycle__layer", i > 0 && "giant-cycle__layer--waiting")}
        />
      ))}
    </Tag>
  );
}
