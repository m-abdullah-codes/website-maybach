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
    // A 2%-wide band at the centre: the tile crossing it is the one nearest the middle. No per-frame work.
    const items = Array.from(root.querySelectorAll<HTMLElement>(".mtile"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("is-centre", e.isIntersecting);
      },
      { root, rootMargin: "0px -49% 0px -49%", threshold: 0 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
