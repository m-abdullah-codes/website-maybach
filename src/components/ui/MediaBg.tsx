import { getImageProps } from "next/image";
import { cn } from "@/lib/cn";
import { img } from "@/lib/images";

/** 'x' darkens the start side on desktop; 'x-end' the end side (copy end-side rows). Both turn vertical under 768 px. */
export type Overlay = "x" | "x-end" | "y" | "none";

interface MediaBgProps {
  /** Desktop master (-d). Used above 768 px. */
  desktop: string;
  /** Mobile master (-m). Used under 768 px. Falls back to `desktop` for single-master images. */
  mobile?: string;
  priority?: boolean;
  /** Legibility gradient (docs/02 §2.1). */
  overlay?: Overlay;
  className?: string;
  /** object-position for the desktop image, e.g. "50% 40%". */
  position?: string;
  positionMobile?: string;
  /** Extra classes on the <img>. */
  imgClassName?: string;
}

const BREAK = 768;

/** One candidate of a srcset (for the no-JavaScript copy, which needs no responsive set). */
function candidate(srcSet: string | undefined, width: number): string | undefined {
  if (!srcSet) return undefined;
  const hit = srcSet.split(", ").find((c) => c.endsWith(` ${width}w`));
  return (hit ?? srcSet.split(", ").pop() ?? "").replace(/ \d+w$/, "");
}

/**
 * docs/03 §4.2: one <picture> with the -m master under 768 px and the -d master above, so only the
 * matching file is ever requested. A hero (`priority`) adds media-scoped high-priority preloads. Every
 * other photograph is deferred: its sources sit in data attributes until the section comes within 600 px
 * (RevealObserver), with a <noscript> copy for clients without JavaScript, so nothing below the fold
 * competes with the hero for bandwidth. Backgrounds are presentational.
 */
export function MediaBg({ desktop, mobile, priority, overlay = "none", className, position, positionMobile, imgClassName }: MediaBgProps) {
  const d = img(desktop);
  const m = img(mobile ?? desktop);
  const common = { alt: "", sizes: "100vw", quality: 75 } as const;
  const { props: dProps } = getImageProps({ ...common, src: d.src, width: d.width, height: d.height });
  const { props: mProps } = getImageProps({
    ...common,
    src: m.src,
    width: m.width,
    height: m.height,
    placeholder: "blur",
    blurDataURL: m.blurDataURL,
  });
  const sameSource = d.src === m.src;
  const objectPosition = position || positionMobile ? `var(--pos-m, ${positionMobile ?? "50% 50%"})` : undefined;
  const imgStyle = { ...(mProps.style as React.CSSProperties), ...(objectPosition ? { objectPosition } : {}) };
  const imgClass = cn("media-bg__img", imgClassName);

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={position || positionMobile ? ({ "--pos-m": positionMobile ?? "50% 50%", "--pos-d": position ?? "50% 50%" } as React.CSSProperties) : undefined}
    >
      {priority ? (
        <>
          {!sameSource && (
            <link rel="preload" as="image" imageSrcSet={mProps.srcSet} imageSizes="100vw" media={`(max-width: ${BREAK - 1}px)`} fetchPriority="high" />
          )}
          <link rel="preload" as="image" imageSrcSet={dProps.srcSet} imageSizes="100vw" media={sameSource ? undefined : `(min-width: ${BREAK}px)`} fetchPriority="high" />
          <picture>
            {!sameSource && <source media={`(min-width: ${BREAK}px)`} srcSet={dProps.srcSet} sizes="100vw" />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mProps.src} srcSet={mProps.srcSet} sizes="100vw" alt="" role="presentation" decoding="async" loading="eager" fetchPriority="high" className={imgClass} style={imgStyle} />
          </picture>
        </>
      ) : (
        <>
          <picture>
            {!sameSource && <source media={`(min-width: ${BREAK}px)`} srcSet={dProps.srcSet} sizes="100vw" />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-src={mProps.src} data-srcset={mProps.srcSet} sizes="100vw" alt="" role="presentation" decoding="async" loading="lazy" fetchPriority="low" className={imgClass} style={imgStyle} />
          </picture>
          <noscript>
            <picture>
              {!sameSource && <source media={`(min-width: ${BREAK}px)`} srcSet={candidate(dProps.srcSet, 1440)} />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={candidate(mProps.srcSet, 768)} alt="" role="presentation" loading="lazy" className={imgClass} />
            </picture>
          </noscript>
        </>
      )}
      {(overlay === "x" || overlay === "x-end") && (
        <>
          <div className="overlay-y absolute inset-0 md:hidden" />
          <div className={cn("absolute inset-0 hidden md:block", overlay === "x" ? "overlay-x" : "overlay-x-end")} />
        </>
      )}
      {overlay === "y" && <div className="overlay-y absolute inset-0" />}
    </div>
  );
}
