"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

interface SceneMotionProps {
  /** Wait for the preloader hand-off (docs/02 H0) before the entrance. Home hero only. */
  afterPreloader?: boolean;
  /** Horizontal drift direction of the word on scroll (docs/02 H1: -40 px). */
  drift?: number;
  children: ReactNode;
}

/**
 * docs/02 §2.6 and §3.9. Entrance: background scales 1.06→1 over 1600 ms, the word rises under a mask over
 * --d-slow, the car fades and rises 40 px over --d-slow with a 200 ms delay, copy staggers, the glass card
 * arrives last. Scroll: background 0.85×, word 0.92× with a ±40 px drift and opacity 1→.35, car 1×.
 * Pointer parallax on hover-capable screens: car ±10 px, word ±6 px opposite, lerp .05.
 * Reduced motion: a 200 ms opacity fade and nothing else. Cut-out failure: fall back to the still.
 */
export function SceneMotion({ afterPreloader, drift = -40, children }: SceneMotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current?.querySelector<HTMLElement>("[data-scene]");
    if (!root) return;

    // Cut-out fallback (docs/02 §3.9): swap to the still, hide the word.
    const cars = Array.from(root.querySelectorAll<HTMLImageElement>("[data-scene-car] img"));
    const fail = () => {
      root.dataset.cutFailed = "";
    };
    cars.forEach((img) => {
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail();
      img.addEventListener("error", fail);
    });

    const reduced = reducedMotion();
    root.dataset.motion = reduced ? "reduced" : "ready";
    if (reduced) {
      root.dataset.entered = "";
      return () => cars.forEach((img) => img.removeEventListener("error", fail));
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let started = false;

    const start = () =>
      loadGsap().then(({ gsap, ScrollTrigger }) => {
        if (cancelled || started) return;
        started = true;
        const bg = root.querySelector<HTMLElement>("[data-scene-bg]");
        const word = root.querySelector<HTMLElement>("[data-scene-word]");
        const wordInner = root.querySelector<HTMLElement>("[data-scene-word-inner]");
        const carWrap = root.querySelector<HTMLElement>("[data-scene-car]");
        const carImgs = carWrap ? Array.from(carWrap.querySelectorAll<HTMLElement>("img")) : [];
        const copy = root.querySelector<HTMLElement>("[data-scene-copy]");
        const copyItems = copy ? Array.from(copy.children) : [];
        const card = root.querySelector<HTMLElement>("[data-scene-card]");
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          if (bg) tl.fromTo(bg, { scale: 1.06 }, { scale: 1, duration: 1.6 }, 0);
          if (word)
            tl.fromTo(
              word,
              { clipPath: "inset(0 0 100% 0)", y: 40 },
              { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.2, clearProps: "clipPath" },
              0.1,
            );
          if (carWrap) tl.fromTo(carWrap, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, 0.3);
          if (copyItems.length) tl.fromTo(copyItems, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.5);
          if (card) tl.fromTo(card, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 1.0);
          tl.add(() => {
            root.dataset.entered = "";
          }, 0);

          // Scroll parallax as the section leaves.
          const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
          if (bg) gsap.to(bg, { yPercent: 15, ease: "none", scrollTrigger: st });
          if (word) gsap.to(word, { yPercent: 8, x: drift, opacity: 0.35, ease: "none", scrollTrigger: st });

          // Pointer parallax, desktop only.
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

    // docs/02 H0: the curtain lifts to reveal the hero already mid-motion.
    const onLift = () => start();
    let fallbackTimer = 0;
    const preloaderPending = !!document.querySelector(".preloader") && !document.documentElement.classList.contains("preloaded");
    if (afterPreloader && preloaderPending) {
      window.addEventListener("mb:preloader-lift", onLift, { once: true });
      fallbackTimer = window.setTimeout(start, 2500);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      window.removeEventListener("mb:preloader-lift", onLift);
      window.clearTimeout(fallbackTimer);
      cars.forEach((img) => img.removeEventListener("error", fail));
      cleanup?.();
    };
  }, [afterPreloader, drift]);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
