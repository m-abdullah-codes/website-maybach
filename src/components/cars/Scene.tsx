import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { img, bounds } from "@/lib/images";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { GiantWord } from "@/components/ui/GiantWord";
import { SceneCut } from "./SceneCut";

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
  /**
   * Mobile: how much of the giant word's box height the car's roofline rises over. Lower means the car
   * sits lower in the frame and more of the word survives.
   */
  wordHiddenMobile?: number;
  /** Mobile: the cut-out's width, overriding the front-on / side-profile default. */
  carWidthMobile?: string;
  /** "immediate": the entrance runs from the first paint (the hero). "inview": it waits for the viewport. */
  enter?: "immediate" | "inview";
}

const STAGE_WIDTH = { hero: 0.58, row: 0.54 } as const;
const STAGE_BLEED = 0.06;
// Mobile cut-out widths. docs/02 §3.9 sketches the front-on car at 112vw; at 390 px that is a 437 px
// car over a 390 px frame — it bleeds off both edges, eats two thirds of the viewport height and
// buries the giant word. 96vw keeps the drama and gives the word and the copy their air back.
const CAR_WIDTH_M = { portrait: "96vw", landscape: "100vw" } as const;
const WORD_HIDDEN_M = 0.18;

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
  wordHiddenMobile = WORD_HIDDEN_M,
  carWidthMobile,
  enter = "inview",
}: SceneProps) {
  const a = img(cut.a);
  const b = img(cut.b);
  const ba = bounds(cut.a);
  const bb = bounds(cut.b);

  const roofline = ((1 - ba.top) * 100).toFixed(2);
  const wordBottom = `calc(${roofline}% - ${(wordHidden * 0.85).toFixed(3)} * var(--giant-d))`;
  const stageW = STAGE_WIDTH[height];
  const wordEnd = `calc(${((STAGE_BLEED / stageW) * 100).toFixed(2)}% + 2vw)`;
  // Mobile: a front-on portrait cut-out overhangs the frame slightly; a landscape side profile would
  // lose its nose and tail at that width, so it fills the viewport exactly.
  const ratioB = b.height / b.width;
  const carWidthM = carWidthMobile ?? CAR_WIDTH_M[ratioB >= 1 ? "portrait" : "landscape"];
  const carPull = `calc(-${carWidthM} * ${(ratioB * bb.top).toFixed(4)} - ${wordHiddenMobile.toFixed(3)} * var(--giant-m))`;
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
      className={cn("scene scene--enter", enter === "immediate" && "is-in", `scene--${side}`, height === "hero" ? "scene--hero" : "scene--row", className)}
      style={vars}
      data-scene=""
      data-cursor-view={height === "row" ? "" : undefined}
      data-reveal={enter === "inview" ? "" : undefined}
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
          <GiantWord text={word} align={side === "center" ? "center" : "end"} alignMobile="center" data-scene-word-inner="" />
        </div>
        <div className="scene__car-wrap" data-scene-car="">
          <SceneCut a={a} b={b} alt={carAlt} priority={priority} />
        </div>
      </div>

      <div className="wrap scene__copy">
        {/* The centred exhibit puts its copy in the middle of the frame, where a wet road or a horizon can
            sit under it; the other compositions keep their copy on the side the overlay already darkens. */}
        <div className={cn("scene__copy-inner", side === "center" && "scrim")} data-scene-copy="">
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
