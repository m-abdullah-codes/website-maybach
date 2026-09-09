import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { img, bounds } from "@/lib/images";
import { resolveSceneTuning, sceneVars, type SceneLayout, type SceneTuningOverride } from "@/lib/scene-config";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { GiantWord } from "@/components/ui/GiantWord";
import { GiantCycle } from "@/components/ui/GiantCycle";
import { SceneCut } from "./SceneCut";

export interface SceneProps {
  /** Also the key into SCENE_TUNING (src/lib/scene-config.ts). */
  id?: string;
  bg: { d: string; m: string };
  cut: { a: string; b: string };
  /** Still photograph used if the cut-out fails to load (docs/02 §3.9). */
  fallback?: { d: string; m: string };
  word: string;
  /** A second phrase for the word to alternate with, in a loop (the Home hero). */
  wordAlt?: string;
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
   * Escape hatch for a one-off composition (the styleguide, a future scene). Prefer adding the scene
   * to SCENE_TUNING by its id — that keeps every knob for every scene in one file.
   */
  tuning?: SceneTuningOverride;
  /** "immediate": the entrance runs from the first paint (the hero). "inview": it waits for the viewport. */
  enter?: "immediate" | "inview";
}

/**
 * The three-layer signature (docs/02 §3.9), used in exactly five places. Layers, bottom to top:
 * background photograph → legibility overlay → rim glow → giant word → car cut-out → copy and glass card.
 *
 * Static composition with data hooks. Where things sit is tuned in src/lib/scene-config.ts, which
 * resolves to the custom properties set on the section below; how things move is SceneMotion and the
 * .scene--enter keyframes, which own `transform` on the [data-scene-*] nodes. Neither touches the other.
 */
export function Scene({
  id,
  bg,
  cut,
  fallback,
  word,
  wordAlt,
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
  tuning,
  enter = "inview",
}: SceneProps) {
  const a = img(cut.a);
  const b = img(cut.b);
  const layout: SceneLayout = side === "center" ? "centre" : height === "hero" ? "hero" : "row";
  const t = resolveSceneTuning(id, layout);
  const vars = sceneVars(tuning ? { mobile: { ...t.mobile, ...tuning.mobile }, desktop: { ...t.desktop, ...tuning.desktop } } : t, layout, {
    a,
    b,
    boundsA: bounds(cut.a),
    boundsB: bounds(cut.b),
  });

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
          {wordAlt ? (
            <GiantCycle
              words={[word, wordAlt]}
              reveal={enter === "immediate" ? "immediate" : "inview"}
              align={side === "center" ? "center" : "end"}
              alignMobile="center"
              data-scene-word-inner=""
            />
          ) : (
            <GiantWord
              text={word}
              align={side === "center" ? "center" : "end"}
              alignMobile="center"
              reveal={enter === "immediate" ? "immediate" : "inview"}
              data-scene-word-inner=""
            />
          )}
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
