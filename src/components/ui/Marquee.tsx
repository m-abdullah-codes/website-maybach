"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/motion";

export interface MarqueTile {
  name: string;
  logo: string | null;
}

/**
 * docs/02 §3.7: eight marque tiles (120 / 96 px, carbon, hairline, radius 20, logo white at 70%),
 * continuous 40 s loop, pauses on hover, the tile nearest the centre scales 1.15 at full opacity.
 * Reduced motion: a static, wrapped row. Logos are official SVGs in /public/logos; a marque whose
 * file is missing shows its name in the UI face until the client supplies it.
 */
export function Marquee({ tiles }: { tiles: MarqueTile[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion()) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".mtile"));
    let frame = 0;
    const tick = () => {
      const mid = root.getBoundingClientRect().left + root.clientWidth / 2;
      let best: HTMLElement | null = null;
      let bestD = Infinity;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = el;
        }
      }
      for (const el of items) el.classList.toggle("is-centre", el === best);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const set = (key: string, hidden: boolean) => (
    <ul className="marquee__set" aria-hidden={hidden || undefined} key={key}>
      {tiles.map((t) => (
        <li key={`${key}-${t.name}`} className="mtile">
          {t.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.logo} alt={hidden ? "" : t.name} className="mtile__logo" loading="lazy" decoding="async" />
          ) : (
            <span className="mtile__name">{t.name}</span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={ref} className="marquee">
      <div className="marquee__track">
        {set("a", false)}
        {set("b", true)}
      </div>
    </div>
  );
}
