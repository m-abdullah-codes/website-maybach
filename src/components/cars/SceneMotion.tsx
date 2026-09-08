"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

interface SceneMotionProps {
  /** Horizontal drift direction of the word on scroll (docs/02 H1: -40 px). */
  drift?: number;
  children: ReactNode;
}

/**
 * docs/02 §2.6 and §3.9, the scroll and pointer half. The entrance itself is CSS (see .scene--enter in
 * globals.css) so it runs from the first paint without waiting for JavaScript. Once the page is idle, GSAP
 * attaches: background 0.85×, word 0.92× with a ±40 px drift and opacity 1→.35 as the section leaves;
 * pointer parallax on hover-capable screens (car ±10 px, word ∓6 px, lerp .05). Cut-out failure swaps in
 * the still photograph and hides the word. Nothing runs under prefers-reduced-motion.
 */
export function SceneMotion({ drift = -40, children }: SceneMotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current?.querySelector<HTMLElement>("[data-scene]");
    if (!root) return;

    const cars = Array.from(root.querySelectorAll<HTMLImageElement>("[data-scene-car] img"));
    const fail = () => {
      root.dataset.cutFailed = "";
    };
    cars.forEach((img) => {
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail();
      img.addEventListener("error", fail);
    });

    if (reducedMotion()) {
      return () => cars.forEach((img) => img.removeEventListener("error", fail));
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const attach = () =>
      loadGsap().then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        const bg = root.querySelector<HTMLElement>("[data-scene-bg]");
        const word = root.querySelector<HTMLElement>("[data-scene-word]");
        const wordInner = root.querySelector<HTMLElement>("[data-scene-word-inner]");
        const carImgs = Array.from(root.querySelectorAll<HTMLElement>("[data-scene-car] img"));
        const ctx = gsap.context(() => {
          const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
          if (bg) gsap.to(bg, { yPercent: 15, ease: "none", scrollTrigger: st });
          if (word) gsap.to(word, { yPercent: 8, x: drift, opacity: 0.35, ease: "none", scrollTrigger: st });

          if (window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches) {
            const target = { x: 0, y: 0 };
            const cur = { x: 0, y: 0 };
            const onMove = (e: MouseEvent) => {
              const r = root.getBoundingClientRect();
              target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
              target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
            };
            const tick = () => {
              cur.x += (target.x - cur.x) * 0.05;
              cur.y += (target.y - cur.y) * 0.05;
              carImgs.forEach((img) => gsap.set(img, { x: cur.x * 10, y: cur.y * 10 }));
              if (wordInner) gsap.set(wordInner, { x: -cur.x * 6, y: -cur.y * 6 });
            };
            root.addEventListener("mousemove", onMove);
            gsap.ticker.add(tick);
            cleanup = () => {
              root.removeEventListener("mousemove", onMove);
              gsap.ticker.remove(tick);
            };
          }
        }, root);
        const prev = cleanup;
        cleanup = () => {
          prev?.();
          ctx.revert();
          ScrollTrigger.refresh();
        };
      });

    // Scroll-linked work can wait for idle time; the entrance is already running in CSS.
    let idleId = 0;
    if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(attach, { timeout: 2500 });
    else idleId = window.setTimeout(attach, 800);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      cars.forEach((img) => img.removeEventListener("error", fail));
      cleanup?.();
    };
  }, [drift]);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
