"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { img } from "@/lib/images";
import { reducedMotion } from "@/lib/motion";
import { Emblem } from "@/components/brand/Emblem";
import { Wordmark } from "@/components/brand/Wordmark";

const KEY = "mb-preloaded";
const glow = img("ut-glow-01");

/**
 * docs/02 §3.16: obsidian screen, UT-GLOW-01 faint at the centre, the emblem drawing itself (700 ms),
 * the wordmark fading in beneath (400 ms), then the curtain lifts (--d-base). ≤ 1.6 s, once per session.
 * The inline script in the layout hides it before hydration on repeat visits.
 */
export function Preloader({ arabic }: { arabic: boolean }) {
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
    const lift = window.setTimeout(
      () => {
        setState("lifting");
        // docs/02 H0: the hero starts its entrance as the curtain lifts.
        window.dispatchEvent(new CustomEvent("mb:preloader-lift"));
      },
      reduced ? 400 : 850,
    );
    const end = window.setTimeout(
      () => {
        setState("done");
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new CustomEvent("mb:preloader-done"));
      },
      reduced ? 650 : 1650,
    );
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(end);
    };
  }, []);

  if (state === "done") return null;

  return (
    <div className={cn("preloader", state === "lifting" && "is-lifting")} aria-hidden="true">
      <Image
        src={glow.src}
        alt=""
        width={glow.width}
        height={glow.height}
        sizes="60vmin"
        priority
        className="preloader__glow"
      />
      <div className="preloader__lockup">
        <Emblem className="preloader__emblem" />
        <Wordmark variant={arabic ? "arabic" : "latin"} className="preloader__wordmark" />
      </div>
    </div>
  );
}
