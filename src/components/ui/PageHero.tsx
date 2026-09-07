import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Section } from "./Section";
import { MediaBg } from "./MediaBg";
import { Eyebrow } from "./Eyebrow";
import { GiantWord } from "./GiantWord";

interface PageHeroProps {
  desktop: string;
  mobile: string;
  eyebrow: string;
  word: string;
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
 */
export function PageHero({
  desktop,
  mobile,
  eyebrow,
  word,
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
          <GiantWord text={word} hero className="page-hero__word" />
        </div>
        <div className="page-hero__copy">
          <h1 className="t-display-xl measure">{title}</h1>
          {sub && <p className="t-body-l measure mt-4 text-silver">{sub}</p>}
          {children}
        </div>
      </div>
    </Section>
  );
}
