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
  word: string;
  carAlt: string;
  side?: "start" | "end" | "center";
  light?: boolean;
  height?: "hero" | "row";
  priority?: boolean;
  accent?: string;
  /** Rendered at the top on mobile and inside the copy block on desktop. */
  eyebrow?: ReactNode;
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
 * This is the static composition; the entrance and parallax are attached by SceneMotion in Phase 2.
 */
export function Scene({
  id,
  bg,
  cut,
  word,
  carAlt,
  side = "end",
  light,
  height = "hero",
  priority,
  accent,
  eyebrow,
  children,
  card,
  className,
  wordHidden = 0.3,
}: SceneProps) {
  const a = img(cut.a);
  const b = img(cut.b);
  const ba = bounds(cut.a);
  const bb = bounds(cut.b);

  // Desktop: the word is absolutely positioned inside the car box, so `bottom` is a % of the car image
  // height. Roofline = (1 - top) of the box; the word box bottom sits `wordHidden` of its height below it.
  const roofline = ((1 - ba.top) * 100).toFixed(2);
  const wordBottom = `calc(${roofline}% - ${(wordHidden * 0.85).toFixed(3)} * var(--giant-d))`;
  // The car box bleeds past the section edge; the word ends inside the viewport with a small gutter.
  const stageW = STAGE_WIDTH[height];
  const wordEnd = `calc(${((STAGE_BLEED / stageW) * 100).toFixed(2)}% + 2vw)`;
  // Mobile: pull the car up over the word so the roof hides the bottom third of the letters.
  const ratioB = b.height / b.width;
  const carPull = `calc(-112vw * ${(ratioB * bb.top).toFixed(4)} - .34 * var(--giant-m))`;

  const vars = {
    "--word-bottom": wordBottom,
    "--word-end": side === "center" ? "auto" : wordEnd,
    "--car-pull-m": carPull,
    "--stage-w": `${stageW * 100}%`,
  } as CSSProperties;

  return (
    <Section
      id={id}
      light={light}
      accent={accent}
      className={cn("scene", `scene--${side}`, height === "hero" ? "scene--hero" : "scene--row", className)}
      style={vars}
    >
      <MediaBg desktop={bg.d} mobile={bg.m} priority={priority} overlay="x" />

      {eyebrow && <div className="scene__eyebrow">{eyebrow}</div>}

      <div className="scene__stage">
        <div className="rim-glow scene__glow" aria-hidden="true" />
        <GiantWord text={word} className="scene__word" align={side === "center" ? "center" : "end"} />
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

      <div className="wrap scene__copy">
        <div className="scene__copy-inner">
          {eyebrow}
          {children}
        </div>
      </div>

      {card && <div className="scene__card">{card}</div>}
    </Section>
  );
}
