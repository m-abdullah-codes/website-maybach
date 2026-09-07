"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

/**
 * docs/02 H4 motion. Desktop: the section pins for 1.5 viewports and the three cards slide up one after
 * another into a stack while the photograph pans 60 px. Mobile and reduced motion: staggered reveals.
 */
export function PromiseStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = ref.current;
    const section = inner?.closest<HTMLElement>("[data-promise]");
    if (!inner || !section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>(".promise__card"));
    const desktop = window.matchMedia("(min-width: 768px)").matches;

    if (reducedMotion() || !desktop) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("is-in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      cards.forEach((c, i) => {
        c.style.setProperty("--i", String(i));
        c.classList.add("promise__card--reveal");
        io.observe(c);
      });
      return () => io.disconnect();
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const bg = section.querySelector<HTMLElement>("[data-promise-bg]");
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top top", end: "+=150%", pin: true, scrub: 0.6, anticipatePin: 1 },
        });
        if (bg) tl.fromTo(bg, { y: 0 }, { y: -60, ease: "none", duration: 3 }, 0);
        cards.forEach((card, i) => {
          tl.fromTo(card, { y: window.innerHeight * 0.9, opacity: 0.6 }, { y: 0, opacity: 1, ease: "power2.out", duration: 1 }, i * 0.7);
        });
      }, section);
      cleanup = () => {
        ctx.revert();
        ScrollTrigger.refresh();
      };
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={ref} className="promise__pin">
      {children}
    </div>
  );
}
