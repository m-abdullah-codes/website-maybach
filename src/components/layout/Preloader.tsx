"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import { reducedMotion } from "@/lib/motion";
import { Emblem } from "@/components/brand/Emblem";
import { Wordmark } from "@/components/brand/Wordmark";

const KEY = "mb-preloaded";

export interface GlowImage {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

/**
 * docs/02 §3.16: obsidian screen, UT-GLOW-01 faint at the centre, the emblem drawing itself (700 ms),
 * the wordmark fading in beneath (400 ms), then the curtain lifts (--d-base). ≤ 1.6 s, once per session.
 * The inline script in the layout hides it before hydration on repeat visits.
 */
export function Preloader({ arabic, glow }: { arabic: boolean; glow: GlowImage }) {
  const [state, setState] = useState<"idle" | "lifting" | "done">("idle");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) {
        setState("done");
        return;
      }
    } catch {
      /* storage unavailable: play once */
    }
    const reduced = reducedMotion();
    const liftAt = reduced ? 400 : 850;
    const gap = (reduced ? 650 : 1650) - liftAt;
    // §3.16 budgets the screen at ≤ 1.6 s. That has to be measured from the navigation, not from this
    // effect: the timers used to start at hydration, so a slow connection paid for the whole load and
    // then 1.65 s more — 6.5 s of obsidian on throttled 4G, which is also what wrecked Speed Index.
    // performance.now() is the time since the navigation started, so the screen now ends 1.65 s after
    // the visitor asked for the page however long the JavaScript took to arrive. A fast load is
    // unchanged (hydration lands well inside the budget); a slow one lifts as soon as it can.
    const liftIn = Math.max(60, liftAt - performance.now());
    const lift = window.setTimeout(() => {
      setState("lifting");
      // docs/02 H0: the hero starts its entrance as the curtain lifts.
      window.dispatchEvent(new CustomEvent("mb:preloader-lift"));
    }, liftIn);
    const end = window.setTimeout(() => {
      setState("done");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new CustomEvent("mb:preloader-done"));
    }, liftIn + gap);
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(end);
    };
  }, []);

  if (state === "done") return null;

  return (
    <div className={cn("preloader", state === "lifting" && "is-lifting")} aria-hidden="true">
      <Photo
        src={glow.src}
        alt=""
        width={glow.width}
        height={glow.height}
        sizes="60vmin"
        loading="eager"
        fetchPriority="low"
        className="preloader__glow"
      />
      <div className="preloader__lockup">
        <Emblem className="preloader__emblem" />
        <Wordmark variant={arabic ? "arabic" : "latin"} className="preloader__wordmark" />
      </div>
    </div>
  );
}
