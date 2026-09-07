"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

interface ScrollFxProps {
  /** Total vertical travel in px across the element's pass through the viewport (docs/02 §3.10: 40). */
  parallax?: number;
  /** Ken Burns by scroll (docs/02 H6): scale from this value to 1 across the section's scroll. */
  scaleFrom?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Scroll-linked transform on a wrapper (transform only, scrubbed by ScrollTrigger). The wrapper is
 * absolutely positioned to fill its section so it can hold a MediaBg. Off under prefers-reduced-motion.
 */
export function ScrollFx({ parallax, scaleFrom, className, children }: ScrollFxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || (!parallax && !scaleFrom)) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const trigger = el.parentElement ?? el;
      const tweens: gsap.core.Tween[] = [];
      if (parallax) {
        tweens.push(
          gsap.fromTo(
            el,
            { y: -parallax / 2 },
            {
              y: parallax / 2,
              ease: "none",
              scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
            },
          ),
        );
      }
      if (scaleFrom) {
        tweens.push(
          gsap.fromTo(
            el,
            { scale: scaleFrom },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
            },
          ),
        );
      }
      cleanup = () => {
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
        ScrollTrigger.refresh();
      };
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [parallax, scaleFrom]);

  return (
    <div ref={ref} className={className ?? "absolute inset-0 will-change-transform"}>
      {children}
    </div>
  );
}
