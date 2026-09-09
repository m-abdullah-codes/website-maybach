import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Section } from "./Section";
import { MediaBg } from "./MediaBg";
import { Eyebrow } from "./Eyebrow";
import { GiantWord } from "./GiantWord";
import { GiantCycle } from "./GiantCycle";

interface PageHeroProps {
  desktop: string;
  mobile: string;
  eyebrow: string;
  /** Omit to render the hero with no giant word at all (the Home hero since September 2026). */
  word?: string;
  /** A second phrase for the word to alternate with (the Home hero only). */
  wordAlt?: string;
  title: string;
  sub?: string;
  /** "top": word under the eyebrow (Collection, Services, Visit). "sky": word high in the photo, copy at the bottom (Showroom). */
  wordPlacement?: "top" | "sky";
  children?: ReactNode;
  className?: string;
  position?: string;
  positionMobile?: string;
}

/**
 * docs/02 §3.9: the page-hero words (COLLECTION, RIYADH, BEYOND, MAJLIS) sit over a photograph at
 * reduced opacity, with no cut-out. A two-layer treatment that shares the type but never competes with a car.
 *
 * The Home hero uses this too since September 2026 (see Hero.tsx), which is why `wordAlt` exists: it
 * makes the word cycle. The four page heroes do not pass it, so their markup is unchanged.
 *
 * The word stays decorative in both cases and the headline keeps the h1 — "Where Riyadh keeps its
 * finest." names the page better than a wordmark that changes every few seconds, and a heading whose
 * text cycles is a heading whose accessible name has to lie about half of it.
 */
export function PageHero({
  desktop,
  mobile,
  eyebrow,
  word,
  wordAlt,
  title,
  sub,
  wordPlacement = "top",
  children,
  className,
  position,
  positionMobile,
}: PageHeroProps) {
  return (
    <Section className={cn("page-hero", `page-hero--${wordPlacement}`, className)}>
      <MediaBg desktop={desktop} mobile={mobile} priority overlay="y" position={position} positionMobile={positionMobile} />
      <div className="wrap page-hero__inner">
        <div className="page-hero__top">
          <Eyebrow>{eyebrow}</Eyebrow>
          {word &&
            (wordAlt ? (
              <GiantCycle words={[word, wordAlt]} hero reveal="immediate" className="page-hero__word" />
            ) : (
              <GiantWord text={word} hero reveal="immediate" className="page-hero__word" />
            ))}
        </div>
        <div className="page-hero__copy scrim">
          <h1 className="t-display-xl measure">{title}</h1>
          {sub && <p className="t-body-l measure mt-4 text-silver">{sub}</p>}
          {children}
        </div>
      </div>
    </Section>
  );
}
