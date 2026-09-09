"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The spec strip's mobile scroll affordance. Eight chips run 1400 px inside a 340 px window and
 * nothing on screen said so — the strip looked like a card with two specs on it.
 *
 * docs/02 §D3 already answers this for the gallery ("a hairline progress bar beneath"), so the strip
 * borrows it rather than inventing a second idiom, with a faint track behind the fill: without one a
 * short line reads as a rule, not as a position. Always rendered, so nothing shifts on hydration; the
 * desktop grid hides it in CSS.
 */
export function SpecScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>(".glance__strip");
    if (!el) return;
    const read = () => {
      const max = el.scrollWidth - el.clientWidth;
      // scrollLeft is negative in RTL; the fraction travelled is what the bar shows either way.
      setProgress(max > 0 ? Math.min(1, Math.abs(el.scrollLeft) / max) : 1);
    };
    read();
    el.addEventListener("scroll", read, { passive: true });
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", read);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={ref}>
      {children}
      <div className="glance__progress" aria-hidden="true">
        <span className="glance__progress-track">
          <span className="glance__progress-bar" style={{ transform: `scaleX(${Math.max(progress, 0.16)})` }} />
        </span>
      </div>
    </div>
  );
}
