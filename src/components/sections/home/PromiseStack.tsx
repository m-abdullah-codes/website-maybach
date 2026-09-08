"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";

/**
 * docs/02 H4 motion. The section pins for 1.5 viewports and the three cards slide up one after another
 * into a stack while the photograph pans.
 *
 * On mobile the same timeline runs, with two adjustments the narrow frame forces. The headline block
 * and three full cards do not both fit in one phone viewport, so the head lifts and fades as the first
 * card arrives — the promise is read, then the proof stacks over it — and the card list is anchored to
 * the foot of the pinned frame (`.promise.is-pinned`, see globals.css) so it can reach up into the
 * space the head vacates. The class is only added once this timeline is actually building, so the
 * reduced-motion and no-JS paths keep the plain flow layout and their staggered reveals.
 */
export function PromiseStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = ref.current;
    const section = inner?.closest<HTMLElement>("[data-promise]");
    if (!inner || !section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>(".promise__card"));

    if (reducedMotion()) {
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

    const desktop = window.matchMedia("(min-width: 768px)").matches;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      // A phone's address bar resizes the viewport mid-scroll; without this the pin recalculates and
      // the stack jumps. Harmless on desktop, where no such resize fires.
      ScrollTrigger.config({ ignoreMobileResize: true });
      const bg = section.querySelector<HTMLElement>("[data-promise-bg]");
      const head = section.querySelector<HTMLElement>(".promise__head");
      section.classList.add("is-pinned");
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: desktop ? "+=150%" : "+=170%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        if (bg) tl.fromTo(bg, { y: 0 }, { y: -60, ease: "none", duration: 3 }, 0);
        // Clear the head before the first card settles, so the two never sit on top of each other.
        if (head && !desktop) tl.fromTo(head, { y: 0, opacity: 1 }, { y: -40, opacity: 0, ease: "power1.in", duration: 0.7 }, 0.1);
        cards.forEach((card, i) => {
          tl.fromTo(
            card,
            { y: () => window.innerHeight * (desktop ? 0.9 : 0.72), opacity: 0.6 },
            { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
            i * 0.7,
          );
        });
      }, section);
      cleanup = () => {
        ctx.revert();
        section.classList.remove("is-pinned");
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
