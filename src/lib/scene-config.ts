/**
 * ============================================================================
 * THE SCENE — TUNING
 * ============================================================================
 *
 * This is the one file to edit to move the car, the giant word or the copy in
 * any of the "sandwich" sections (docs/02 §3.9). There are four:
 *
 *     Home featured exhibit ................. id "featured"
 *     Collection · Cullinan ................. id "row-rolls-royce-cullinan"
 *     Collection · Flying Spur (light room) . id "row-bentley-flying-spur-mulliner"
 *     Collection · Continental GT ........... id "row-bentley-continental-gt-azure"
 *
 * §3.9 says five and names the Home hero as the first of them. Since September
 * 2026 the Home hero is a page-hero photograph instead — one plate of the real
 * showroom with the giant word over it, no cut-out — at the client's request.
 * It has no block here. The deviation is recorded in qa/LOG.md.
 *
 * Nothing here is animation. Every value below becomes a CSS custom property on
 * the section, and the layout is built from margins, insets, widths and font
 * sizes only — never `transform`, which belongs to the motion layer
 * (SceneMotion.tsx and the .scene--enter keyframes). Change these freely
 * without touching, or being touched by, the animations.
 *
 * ── How to change something ─────────────────────────────────────────────────
 *
 * Every vehicle has its own block in SCENE_TUNING, with every knob written out.
 * Nothing is shared between them: moving the Cullinan cannot move the Flying
 * Spur, and each block can be read on its own without tracing a fallback chain.
 *
 * 1. Find the vehicle in SCENE_TUNING at the bottom of this file.
 * 2. Change a number under `mobile` (< 768 px) or `desktop` (≥ 768 px).
 * 3. `node scripts/scenes.mjs cul --base http://localhost:3000` to see it.
 *    No arguments shoots all four at 390 and 1440 into qa/scenes/.
 *
 * The blocks start with identical numbers because that is the composition as
 * shipped, not a recommendation — look at each background and move them.
 *
 * To try a value without a rebuild: open the page, inspect the <section>, and
 * edit its CSS variable live in devtools — every knob is one of them, and the
 * variable name is listed against each key below. When you like the number,
 * put it in the block.
 *
 * BASE and LAYOUT_DEFAULTS below still exist as the fallback for a Scene with
 * no id, or one added later with no block of its own. Deleting a line from a
 * vehicle's block is safe — it falls back — but the block is easier to read
 * when everything is spelled out.
 *
 * ── The mobile composition (< 768 px) ───────────────────────────────────────
 *
 * Three blocks placed independently against the frame, NOT a stack. The eyebrow
 * and the word+car pair are each pinned to their own offset from the top of the
 * section, so moving one cannot push the others — and, because the section's
 * height does not change, the background photograph does not reframe under them.
 *
 *     ┌──────────────────────┐ ─┬─ top of the section
 *     │  ◆ EYEBROW           │  │  ← padTop        moves the eyebrow, nothing else
 *     │                      │  │
 *     │   ≡≡ CULLINAN ≡≡     │ ─┴─ ← stageTop      moves the word AND the car
 *     │      ███████         │     ← wordSize      resizes the word; the car follows it
 *     │    ███████████       │     ← wordHidden    how deep the roofline cuts the word
 *     │  ███████████████     │     ← carWidth      resizes the car, in place
 *     │                      │                      (carShiftX / wordShiftX nudge sideways)
 *     │  Headline            │ ─── ← copyTop       moves the copy and the card
 *     │  Sub-line            │
 *     │  [ Primary ]         │
 *     │  [ Secondary ]       │
 *     │  ▒ glass card ▒      │
 *     │                      │     ← padBottom     space under the copy
 *     └──────────────────────┘
 *
 * The copy and the card are the one part still in normal flow, on purpose: the
 * section grows to contain them, so a longer Arabic line lengthens the section
 * instead of colliding with the car. That is why `copyTop` and `padBottom` are
 * the only two mobile knobs that change the section's height — and so the only
 * two that reframe the background. Everything above them is free.
 *
 * Nothing is stopping the car from overlapping the copy if you push it there.
 * `node scripts/scenes.mjs` will show you.
 *
 * ── The desktop composition (≥ 768 px) ──────────────────────────────────────
 *
 * The car and the word are one absolutely-placed "stage" pinned to the end side
 * and the floor; the copy is a column on the start side.
 *
 *     ┌───────────────────────────────────────────────────────────┐
 *     │                       ≡≡≡ C U L L I N A N ≡≡≡ │← wordInset│
 *     │  Headline               ████████████████████  │           │
 *     │  in Display XL        ████████████████████████│← stageBleed
 *     │  Sub-line, silver.   ██████ car cut-out ██████│           │
 *     │  [ Primary ] [ Sec ]  ████████████████████████│           │
 *     │  │← copyWidth →│         │← stageWidth ──────→│  ▒ card ▒ │
 *     └──────────┬────────────────────────┬──────────────────┬────┘
 *           copyBottom                  floor          cardBottom/cardEnd
 *
 * `side="start"` (the Flying Spur row) mirrors all of it; `side="center"` (the
 * featured exhibit) stands the car in the middle with the copy beneath, and uses
 * `centreWidth` / `centreCopyGap` instead of stageWidth / stageBleed.
 *
 * ── What is NOT a knob ──────────────────────────────────────────────────────
 *
 * The roofline and the floor of each cut-out are measured from the PNG's own
 * alpha channel (src/lib/bounds.json, written by scripts/blur-placeholders.mjs).
 * That is a fact about the photograph, not a matter of taste, so the maths below
 * reads it rather than exposing it. It is what lets `wordHidden` mean the same
 * thing for a front-on Cullinan and a side-profile Continental GT.
 */

import type { CSSProperties } from "react";
import type { Bounds, Img } from "./images";

export interface SceneMobileTuning {
  /** Space above the eyebrow, clearing the nav. CSS var `--pad-top-m`. */
  padTop: string;
  /** Space below the copy block. CSS var `--pad-bottom-m`. */
  padBottom: string;
  /** Giant word font size. CSS var `--giant-m`. */
  wordSize: string;
  /**
   * How deep the car's roofline sits into the giant word, as a fraction of the
   * word's box height. 0 = the roofline just touches the word's bottom; 0.5 =
   * half the word is behind the car. Raise it to bury the word, lower it to
   * drop the car down the frame. Feeds `--car-pull-m`.
   */
  wordHidden: number;
  /** Cut-out width. Any CSS length — `96vw`, `100%`, `340px`. CSS var `--car-w-m`. */
  carWidth: string;
  /** Horizontal nudge for an optically off-centre cut-out. CSS var `--car-x-m`. */
  carShiftX: string;
  /** Horizontal nudge for the giant word, which is otherwise centred. CSS var `--word-x-m`. */
  wordShiftX: string;
  /**
   * Where the giant word's top edge sits, measured from the top of the section.
   * The word and the car are placed here as one block, out of the page flow, so
   * moving them cannot move the copy, the card, or the section's height — which
   * is what keeps the background photograph still. CSS var `--stage-top-m`.
   * A px value is right: this clears fixed chrome (nav, filter bar).
   */
  stageTop: string;
  /**
   * Where the copy block starts, measured from the top of the section. CSS var
   * `--copy-top-m`. A vw value is right: the car is sized in vw, so a vw offset
   * keeps the same relationship to it on a wider phone. Widen `carWidth` a lot
   * and you will want to raise this to match.
   */
  copyTop: string;
}

export interface SceneDesktopTuning {
  /** Giant word font size. CSS var `--giant-d`. */
  wordSize: string;
  /**
   * Fraction of the giant word's height hidden behind the car — docs/02 §3.9:
   * "top of the word above the roofline, bottom behind the car". Feeds `--word-bottom`.
   */
  wordHidden: number;
  /** The word's inset from the frame's end edge, on top of the stage's bleed. Feeds `--word-end`. */
  wordInset: string;
  /** Stage (car) width as a percentage of the frame. CSS var `--stage-w`. */
  stageWidth: number;
  /** How far the stage hangs past the end edge, as a percentage. CSS var `--stage-bleed`. */
  stageBleed: number;
  /** The stage's distance from the bottom of the section. CSS var `--floor`. */
  floor: string;
  /** Max width of the copy column, as a percentage of the frame. CSS var `--copy-w`. */
  copyWidth: number;
  /** The copy block's distance from the bottom of the section. CSS var `--copy-bottom`. */
  copyBottom: string;
  /** Extra inset for the copy column beyond the page gutter, for a background whose dark
   *  area does not start at the frame's edge. CSS var `--copy-inset`. */
  copyInset: string;
  /** The floating glass card's insets. CSS vars `--card-end`, `--card-bottom`. */
  cardEnd: string;
  cardBottom: string;
  /** side="center" only: the car's width as a percentage of the frame. CSS var `--stage-w`. */
  centreWidth: number;
  /** side="center" only: space between the bottom of the car and the copy. */
  centreCopyGap: string;
  /** side="center" only: space above the word, clearing the nav. CSS var `--centre-top`. */
  centreTop: string;
  /** side="center" only: max width of the centred copy column. CSS var `--copy-w`. */
  centreCopyWidth: number;
}

export interface SceneTuning {
  mobile: SceneMobileTuning;
  desktop: SceneDesktopTuning;
}

type Partial2<T> = { [K in keyof T]?: Partial<T[K]> };
export type SceneTuningOverride = Partial2<SceneTuning>;

/** Which set of layout defaults a scene starts from. */
export type SceneLayout = "hero" | "row" | "centre";

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const BASE: SceneTuning = {
  mobile: {
    padTop: "88px",
    padBottom: "24px",
    wordSize: "clamp(72px, 22vw, 112px)",
    // docs/02 §3.9 sketches the front-on cut-out at 112vw and the roofline high in
    // the word. At 390 px that is a 437 px car over a 390 px frame: it bleeds off
    // both edges, takes two thirds of the viewport and buries the word. 96vw and a
    // shallower bite are the client-approved deviation, logged in qa/LOG.md.
    wordHidden: 0.18,
    carWidth: "96vw",
    carShiftX: "0px",
    wordShiftX: "0px",
    stageTop: "113px",
    copyTop: "140vw",
  },
  desktop: {
    wordSize: "clamp(120px, 15vw, 300px)",
    wordHidden: 0.3,
    wordInset: "2vw",
    stageWidth: 58,
    stageBleed: 6,
    floor: "5vh",
    copyWidth: 44,
    copyBottom: "12vh",
    copyInset: "0px",
    cardEnd: "80px",
    cardBottom: "6vh",
    centreWidth: 70,
    centreCopyGap: "32px",
    centreTop: "calc(120px + 4vh)",
    centreCopyWidth: 60,
  },
};

const LAYOUT_DEFAULTS: Record<SceneLayout, SceneTuningOverride> = {
  hero: {},
  row: {
    mobile: {
      // A Collection row scrolls under the sticky filter bar (it ends at 124 px at 390),
      // so the eyebrow and the top of the word start below it rather than behind it.
      padTop: "136px",
      // ...and the copy comes to rest above the 64 px sticky bar (docs/02 §3.14).
      padBottom: "88px",
    },
    // A Collection row is shorter than a hero, so its stage is a little narrower.
    desktop: { stageWidth: 54 },
  },
  centre: {},
};

// ---------------------------------------------------------------------------
// PER-VEHICLE TUNING — edit here
// ---------------------------------------------------------------------------

/**
 * One block per scene, keyed by the Scene's `id`, and every knob is written out
 * so you can read a vehicle's whole composition in one place and change any
 * number without tracing a fallback chain.
 *
 * They start identical on purpose — this is the composition as shipped, not a
 * recommendation. Look at each background, then move the numbers in its block.
 * Nothing here is shared: a change to the Cullinan cannot touch the Flying Spur.
 *
 * Deleting a line is safe — it falls back to LAYOUT_DEFAULTS and then BASE — but
 * you rarely want to. Keep them all listed and the block stays readable.
 */
export const SCENE_TUNING: Record<string, SceneTuningOverride> = {
  // =========================================================================
  // HOME FEATURED — Bentley Continental GT · "AZURE" · HM-FEAT-BG
  // Cool studio, one silver-blue column of light rising from the floor.
  // Side-profile cut-out, car centred, copy centred beneath — the one exhibit.
  // Only the centre* knobs and copyBottom apply here; stageWidth, stageBleed,
  // wordInset, copyWidth and the card knobs are unused by this layout.
  // =========================================================================
  featured: {
    mobile: {
      padTop: "88px",
      padBottom: "24px",
      wordSize: "clamp(72px, 22vw, 112px)",
      wordHidden: 0.18,
      wordShiftX: "0px",
      carWidth: "100vw",     // a side profile loses its nose and tail if narrowed
      carShiftX: "0px",
      stageTop: "265px",      // top of the giant word — the exhibit sits low — it is the one centred scene
      copyTop: "119.2vw",    // top of the copy block
    },
    desktop: {
      wordSize: "clamp(120px, 15vw, 300px)",
      // A side profile under a centred word needs a deeper bite than a front-on
      // car, or the word floats clear above the roof and they read as two things.
      wordHidden: 0.45,
      centreWidth: 70,
      centreTop: "calc(120px + 4vh)",
      centreCopyGap: "32px",
      centreCopyWidth: 60,
      copyBottom: "12vh",
    },
  },

  // =========================================================================
  // COLLECTION ROW 1 — Rolls-Royce Cullinan · "CULLINAN" · CUL-BG
  // Warm studio, a tall arched pool of amber light right of centre.
  // Front-on cut-out on mobile, front three-quarter on desktop. Car end side.
  // =========================================================================
  "row-rolls-royce-cullinan": {
    mobile: {
      padTop: "136px",       // clears the sticky filter bar, which ends at 124
      padBottom: "88px",     // rests on the 64 px sticky bar
      wordSize: "clamp(72px, 22vw, 112px)",
      wordHidden: 0.18,
      wordShiftX: "0px",
      carWidth: "96vw",
      carShiftX: "0px",
      stageTop: "191px",      // top of the giant word — starts under the sticky filter bar
      copyTop: "130.3vw",    // top of the copy block
    },
    desktop: {
      wordSize: "clamp(120px, 15vw, 300px)",
      wordHidden: 0.3,
      wordInset: "2vw",
      stageWidth: 54,        // a row is shorter than a hero
      stageBleed: 6,
      floor: "5vh",
      copyWidth: 44,
      copyBottom: "12vh",
      copyInset: "0px",
      cardEnd: "80px",       // the three-spec glass card
      cardBottom: "6vh",
    },
  },

  // =========================================================================
  // COLLECTION ROW 4 — Bentley Flying Spur · "MULLINER" · FSM-BG
  // THE LIGHT ROOM. Pale cyclorama, ink type, black serif word. Car START side,
  // so stageBleed, wordInset and cardEnd all mirror to the left automatically.
  // =========================================================================
  "row-bentley-flying-spur-mulliner": {
    mobile: {
      padTop: "136px",
      padBottom: "88px",
      wordSize: "clamp(72px, 22vw, 112px)",
      wordHidden: 0.18,
      wordShiftX: "0px",
      carWidth: "100vw",     // side profile
      carShiftX: "0px",
      stageTop: "214px",      // top of the giant word — starts under the sticky filter bar
      copyTop: "101vw",    // top of the copy block
    },
    desktop: {
      wordSize: "clamp(120px, 15vw, 300px)",
      wordHidden: 0.3,
      wordInset: "2vw",
      stageWidth: 54,
      stageBleed: 6,
      floor: "5vh",
      copyWidth: 44,
      copyBottom: "12vh",
      copyInset: "0px",
      cardEnd: "80px",
      cardBottom: "6vh",
    },
  },

  // =========================================================================
  // COLLECTION ROW 7 — Bentley Continental GT · "AZURE" · FSM-BG (the salon)
  // A light room, like every Scene since September 2026. Side-profile cut-out on
  // a pale cyclorama with no floor line. Car end side.
  // =========================================================================
  "row-bentley-continental-gt-azure": {
    mobile: {
      padTop: "136px",
      padBottom: "88px",
      wordSize: "clamp(72px, 22vw, 112px)",
      wordHidden: 0.18,
      wordShiftX: "0px",
      carWidth: "100vw",     // side profile
      carShiftX: "0px",
      // These are the shipped numbers. They were briefly moved to 300 / 128vw while this row stood on
      // the showroom's Glass Wall plate, whose wall/floor junction sits at 56% of the frame and left
      // the Bentley standing 90 px up the glass. The salon is a cyclorama with no floor line, so the
      // car has nothing to stand on and nothing to float above, and the composition goes back to
      // matching the Flying Spur row — same plate, same side profile, same 100vw.
      stageTop: "204px",      // top of the giant word — starts under the sticky filter bar
      copyTop: "103.6vw",    // top of the copy block
    },
    desktop: {
      wordSize: "clamp(120px, 15vw, 300px)",
      wordHidden: 0.3,
      wordInset: "2vw",
      stageWidth: 54,
      stageBleed: 6,
      floor: "5vh",
      copyWidth: 44,
      copyBottom: "12vh",
      copyInset: "0px",
      cardEnd: "80px",
      cardBottom: "6vh",
    },
  },
};

// ---------------------------------------------------------------------------
// Resolution — nothing below here is a setting
// ---------------------------------------------------------------------------

function merge(...layers: SceneTuningOverride[]): SceneTuning {
  return {
    mobile: Object.assign({}, BASE.mobile, ...layers.map((l) => l.mobile ?? {})),
    desktop: Object.assign({}, BASE.desktop, ...layers.map((l) => l.desktop ?? {})),
  };
}

export function resolveSceneTuning(id: string | undefined, layout: SceneLayout): SceneTuning {
  return merge(LAYOUT_DEFAULTS[layout], (id && SCENE_TUNING[id]) || {});
}

/**
 * Turns the resolved tuning plus the cut-out's own alpha bounds into the custom
 * properties the Scene's CSS reads. `a` is the desktop cut-out, `b` the mobile
 * one; `bounds` are their transparent margins as fractions of the image.
 */
export function sceneVars(
  t: SceneTuning,
  layout: SceneLayout,
  cut: { a: Img; b: Img; boundsA: Bounds; boundsB: Bounds },
): CSSProperties {
  const { a, b, boundsA: ba, boundsB: bb } = cut;

  // --- Mobile: a flow column, so every offset is a margin. -------------------
  // The cut-out carries transparent air above the roof and below the wheels;
  // subtract it so `wordHidden` and `copyGap` describe the *car*, not the file.
  // The cut-out carries transparent air above the roof; subtract it so `wordHidden` describes where
  // the *car* meets the word, not where the file's edge does. Written against var(--car-w-m) rather
  // than the literal width, so overriding that one variable in devtools stays self-consistent.
  const ratioB = b.height / b.width;
  const carPullM = `calc(-1 * var(--car-w-m) * ${(ratioB * bb.top).toFixed(4)} - ${t.mobile.wordHidden.toFixed(3)} * var(--giant-m))`;

  // --- Desktop: the stage is absolute, so offsets are insets. ----------------
  // The word's bottom edge, measured from the stage's floor: the roofline, less
  // the slice of the word the car should cover. The 0.85 is the giant face's
  // line-height, so `wordHidden` counts letter height rather than leading.
  const roofline = ((1 - ba.top) * 100).toFixed(2);
  const wordBottom = `calc(${roofline}% - ${(t.desktop.wordHidden * 0.85).toFixed(3)} * var(--giant-d))`;
  // The stage hangs past the end edge, so the word has to come back in by that
  // much before `wordInset` means anything at the frame's edge.
  const stageW = layout === "centre" ? t.desktop.centreWidth : t.desktop.stageWidth;
  const wordEnd = `calc(${((t.desktop.stageBleed / stageW) * 100).toFixed(2)}% + ${t.desktop.wordInset})`;

  // The centred exhibit stacks like the mobile composition, at desktop sizes.
  const ratioA = a.height / a.width;
  const centre = `${t.desktop.centreWidth}vw`;
  const carPullD = `calc(-${centre} * ${(ratioA * ba.top).toFixed(4)} - ${(t.desktop.wordHidden * 0.85).toFixed(3)} * var(--giant-d))`;
  const copyPullD = `calc(-${centre} * ${(ratioA * ba.bottom).toFixed(4)} + ${t.desktop.centreCopyGap})`;

  return {
    "--pad-top-m": t.mobile.padTop,
    "--pad-bottom-m": t.mobile.padBottom,
    "--giant-m": t.mobile.wordSize,
    "--car-w-m": t.mobile.carWidth,
    "--car-x-m": t.mobile.carShiftX,
    "--car-pull-m": carPullM,
    "--stage-top-m": t.mobile.stageTop,
    "--copy-top-m": t.mobile.copyTop,

    "--giant-d": t.desktop.wordSize,
    "--stage-w": `${stageW}%`,
    "--stage-bleed": `${-t.desktop.stageBleed}%`,
    "--floor": t.desktop.floor,
    "--word-bottom": wordBottom,
    "--word-end": layout === "centre" ? "auto" : wordEnd,
    "--car-pull-d": carPullD,
    "--copy-pull-d": copyPullD,
    "--copy-w": `${layout === "centre" ? t.desktop.centreCopyWidth : t.desktop.copyWidth}%`,
    "--centre-top": t.desktop.centreTop,
    "--copy-bottom": t.desktop.copyBottom,
    "--copy-inset": t.desktop.copyInset,
    "--word-x-m": t.mobile.wordShiftX,
    "--card-end": t.desktop.cardEnd,
    "--card-bottom": t.desktop.cardBottom,
  } as CSSProperties;
}
