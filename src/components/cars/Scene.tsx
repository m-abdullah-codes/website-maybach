import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { img, bounds } from "@/lib/images";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { GiantWord } from "@/components/ui/GiantWord";

export interface SceneProps {
  id?: string;
  bg: { d: string; m: string };
  cut: { a: string; b: string };
  /** Still photograph used if the cut-out fails to load (docs/02 §3.9). */
  fallback?: { d: string; m: string };
  word: string;
  carAlt: string;
  side?: "start" | "end" | "center";
  light?: boolean;
  height?: "hero" | "row";
  priority?: boolean;
  accent?: string;
  /** Rendered at the top on mobile and inside the copy block on desktop. */
  eyebrow?: ReactNode;
  /** Liquid badge and environment caption in the top corners (collection rows). */
  badges?: ReactNode;
  children: ReactNode;
  card?: ReactNode;
  className?: string;
  /**
   * Desktop: how much of the giant word (as a fraction of its box height) sits below the roofline,
   * hidden by the car. docs/02 §3.9 sketch: top of the word above the roofline, bottom behind the car.
   */
  wordHidden?: number;
}

const STAGE_WIDTH = { hero: 0.58, row: 0.54 } as const;
const STAGE_BLEED = 0.06;

/**
 * The three-layer signature (docs/02 §3.9), used in exactly five places. Layers, bottom to top:
 * background photograph → legibility overlay → rim glow → giant word → car cut-out → copy and glass card.
 * Static composition with data hooks; SceneMotion attaches the entrance, parallax and pointer drift.
 */
export function Scene({
  id,
  bg,
  cut,
  fallback,
  word,
  carAlt,
  side = "end",
  light,
  height = "hero",
  priority,
  accent,
  eyebrow,
  badges,
  children,
  card,
  className,
  wordHidden = 0.3,
}: SceneProps) {
  const a = img(cut.a);
  const b = img(cut.b);
  const ba = bounds(cut.a);
  const bb = bounds(cut.b);

  const roofline = ((1 - ba.top) * 100).toFixed(2);
  const wordBottom = `calc(${roofline}% - ${(wordHidden * 0.85).toFixed(3)} * var(--giant-d))`;
  const stageW = STAGE_WIDTH[height];
  const wordEnd = `calc(${((STAGE_BLEED / stageW) * 100).toFixed(2)}% + 2vw)`;
  // Mobile: front-on portrait cut-outs run 112vw (docs/02 §3.9); a landscape side profile would lose its
  // nose and tail at 112vw, so it fills the viewport instead.
  const ratioB = b.height / b.width;
  const carWidthM = ratioB >= 1 ? "112vw" : "100vw";
  const carPull = `calc(-${carWidthM} * ${(ratioB * bb.top).toFixed(4)} - .34 * var(--giant-m))`;
  const copyPullM = `calc(-${carWidthM} * ${(ratioB * bb.bottom).toFixed(4)} + 24px)`;
  // Centred exhibit on desktop: the car box is 70vw wide; pull it up over the word and the copy up over
  // the transparent floor margin of the cut-out.
  const ratioA = a.height / a.width;
  const carPullD = `calc(-70vw * ${(ratioA * ba.top).toFixed(4)} - ${(wordHidden * 0.85).toFixed(3)} * var(--giant-d))`;
  const copyPullD = `calc(-70vw * ${(ratioA * ba.bottom).toFixed(4)} + 32px)`;

  const vars = {
    "--word-bottom": wordBottom,
    "--word-end": side === "center" ? "auto" : wordEnd,
    "--car-pull-m": carPull,
    "--car-w-m": carWidthM,
    "--copy-pull-m": copyPullM,
    "--car-pull-d": carPullD,
    "--copy-pull-d": copyPullD,
    "--stage-w": `${stageW * 100}%`,
  } as CSSProperties;

  return (
    <Section
      id={id}
      light={light}
      accent={accent}
      className={cn("scene", `scene--${side}`, height === "hero" ? "scene--hero" : "scene--row", className)}
      style={vars}
      data-scene=""
    >
      <div className="absolute inset-0" data-scene-bg="">
        <MediaBg desktop={bg.d} mobile={bg.m} priority={priority} overlay="x" />
      </div>
      {fallback && (
        <div className="scene__fallback">
          <MediaBg desktop={fallback.d} mobile={fallback.m} overlay="x" />
        </div>
      )}

      {badges && <div className="scene__badges wrap">{badges}</div>}
      {eyebrow && <div className="scene__eyebrow">{eyebrow}</div>}

      <div className="scene__stage">
        <div className="rim-glow scene__glow" aria-hidden="true" />
        <div className="scene__word" data-scene-word="">
          <GiantWord text={word} align={side === "center" ? "center" : "end"} data-scene-word-inner="" />
        </div>
        <div className="scene__car-wrap" data-scene-car="">
          <Image
            src={a.src}
            alt={carAlt}
            width={a.width}
            height={a.height}
            sizes="(min-width: 768px) 60vw, 1px"
            priority={priority}
            placeholder="blur"
            blurDataURL={a.blurDataURL}
            className="car-cut scene__car scene__car--d"
          />
          <Image
            src={b.src}
            alt={carAlt}
            width={b.width}
            height={b.height}
            sizes="(min-width: 768px) 1px, 112vw"
            priority={priority}
            placeholder="blur"
            blurDataURL={b.blurDataURL}
            className="car-cut scene__car scene__car--m"
          />
        </div>
      </div>

      <div className="wrap scene__copy">
        <div className="scene__copy-inner" data-scene-copy="">
          {eyebrow}
          {children}
        </div>
      </div>

      {card && (
        <div className="scene__card" data-scene-card="">
          {card}
        </div>
      )}
    </Section>
  );
}
