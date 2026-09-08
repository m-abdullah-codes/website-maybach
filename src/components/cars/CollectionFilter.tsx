"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import type { CategoryOption } from "@/lib/content";
import { cn } from "@/lib/cn";
import { loadGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/motion";
import { getLenis } from "@/lib/lenis";

interface CollectionFilterProps {
  options: CategoryOption[];
  /** "{count} cars" template from site.common.carCount. */
  countTemplate: string;
  total: number;
  children: ReactNode;
}

/**
 * docs/02 §3.8 and C2: single-select filter chips that sit on the hero's bottom edge and stick under the
 * nav. On change, rows that leave fade and shrink to .98, the rest close the gap with a FLIP, a single
 * surviving card of a pair renders full width. The rows themselves are server-rendered children.
 */
export function CollectionFilter({ options, countTemplate, total, children }: CollectionFilterProps) {
  const [active, setActive] = useState("all");
  const [count, setCount] = useState(total);
  const rowsRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const apply = useCallback(
    async (key: string) => {
      const container = rowsRef.current;
      if (!container || busy.current) return;
      busy.current = true;
      setActive(key);
      const rows = Array.from(container.querySelectorAll<HTMLElement>("[data-row]"));
      const reduced = reducedMotion();
      const { gsap, ScrollTrigger } = reduced ? { gsap: null, ScrollTrigger: null } : await loadGsap();

      const first = new Map(rows.map((el) => [el, el.getBoundingClientRect().top]));
      const plan = rows.map((el) => {
        const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-cat]"));
        let show: boolean;
        let visibleCards = 0;
        if (cards.length) {
          cards.forEach((c) => {
            const on = key === "all" || c.dataset.cat === key;
            if (on) visibleCards++;
            c.dataset.pending = on ? "show" : "hide";
          });
          show = visibleCards > 0;
        } else {
          const cats = (el.dataset.cats ?? "").split(",");
          show = key === "all" || cats.includes(key);
        }
        return { el, show, wasHidden: el.hidden, visibleCards, cards };
      });
      const leaving = plan.filter((p) => !p.wasHidden && !p.show).map((p) => p.el);

      if (gsap && leaving.length) {
        await gsap.to(leaving, { opacity: 0, scale: 0.98, duration: 0.32, ease: "power2.out" }).then();
      }

      let visibleTotal = 0;
      plan.forEach((p) => {
        p.cards.forEach((c) => {
          c.hidden = c.dataset.pending === "hide";
          delete c.dataset.pending;
        });
        // The row wrapper is static DOM; the card grid inside is React-managed and would drop a toggled class on re-render.
        p.el.toggleAttribute("data-single", p.cards.length > 0 && p.visibleCards === 1);
        p.el.hidden = !p.show;
        if (p.show) visibleTotal += p.cards.length ? p.visibleCards : 1;
      });
      setCount(visibleTotal);

      if (gsap) {
        const staying = plan.filter((p) => p.show && !p.wasHidden).map((p) => p.el);
        const entering = plan.filter((p) => p.show && p.wasHidden).map((p) => p.el);
        gsap.set(leaving, { clearProps: "opacity,scale" });
        staying.forEach((el) => {
          const delta = (first.get(el) ?? 0) - el.getBoundingClientRect().top;
          if (Math.abs(delta) > 1) gsap.fromTo(el, { y: delta }, { y: 0, duration: 0.8, ease: "expo.out", clearProps: "transform" });
        });
        if (entering.length) gsap.fromTo(entering, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.8, ease: "expo.out", clearProps: "opacity,scale" });
        ScrollTrigger?.refresh();
      }

      // Bring the results into view when the visitor filters from deep in the list.
      const bar = barRef.current;
      if (bar && bar.getBoundingClientRect().top < 0) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(bar, { offset: -88, immediate: reduced });
        else bar.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
      }
      busy.current = false;
    },
    [],
  );

  return (
    <div className="collection">
      <div ref={barRef} className="filters">
        <div className="wrap filters__inner">
          <div className="filters__chips" role="group">
            {options.map((o) => (
              <button
                key={o.key}
                type="button"
                className={cn("chip", active === o.key && "is-active")}
                aria-pressed={active === o.key}
                onClick={() => apply(o.key)}
              >
                {o.label}
              </button>
            ))}
          </div>
          <p className="filters__count t-small text-pewter" aria-live="polite">
            {countTemplate.replace("{count}", String(count))}
          </p>
        </div>
      </div>
      <div ref={rowsRef} className="collection__rows">
        {children}
      </div>
    </div>
  );
}
