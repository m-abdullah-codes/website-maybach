"use client";

import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import { getLenis } from "./lenis";

type Bundle = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

let promise: Promise<Bundle> | null = null;

/** GSAP + ScrollTrigger, loaded once on first use (docs/03 §13.2: ScrollTrigger lazily), synced with Lenis. */
export function loadGsap(): Promise<Bundle> {
  if (!promise) {
    promise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
      const gsap = g.gsap;
      const ScrollTrigger = s.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = getLenis();
      if (lenis) lenis.on("scroll", ScrollTrigger.update);
      return { gsap, ScrollTrigger };
    });
  }
  return promise;
}
