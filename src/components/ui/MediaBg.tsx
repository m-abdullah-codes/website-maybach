import { getImageProps } from "next/image";
import { cn } from "@/lib/cn";
import { avifSet, img } from "@/lib/images";
import { videoFor } from "@/lib/videos";

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
 *
 * Two of the mobile stills have a moving version (src/lib/videos.ts). Where one exists the clip is
 * layered over the photograph rather than replacing it: the <img> below is still what paints, still
 * what LCP measures and still what a visitor sees if the clip never arrives — on desktop, under
 * prefers-reduced-motion, on Save-Data, or with JavaScript off. The <video> carries no src and no
 * poster attribute (the poster would pull the PNG the optimiser exists to avoid); RevealObserver
 * gives it one after the page has loaded and only while it is near the viewport, then fades it in
 * over the still it matches.
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
  // The AVIF twin of each set, offered above the webp the <img> carries (src/lib/images.ts → avifSet).
  const dAvif = avifSet(dProps.srcSet);
  const mAvif = avifSet(mProps.srcSet);
  const motion = videoFor(m.src);
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
          {/* The preload names the AVIF and declares its type, so a browser without AVIF skips it rather
              than fetching a file it will not use; the <img> below is still eager and high priority there. */}
          {!sameSource && (
            <link rel="preload" as="image" type="image/avif" imageSrcSet={mAvif} imageSizes="100vw" media={`(max-width: ${BREAK - 1}px)`} fetchPriority="high" />
          )}
          <link rel="preload" as="image" type="image/avif" imageSrcSet={dAvif} imageSizes="100vw" media={sameSource ? undefined : `(min-width: ${BREAK}px)`} fetchPriority="high" />
          <picture>
            {!sameSource && <source media={`(min-width: ${BREAK}px)`} type="image/avif" srcSet={dAvif} sizes="100vw" />}
            {!sameSource && <source media={`(min-width: ${BREAK}px)`} srcSet={dProps.srcSet} sizes="100vw" />}
            <source type="image/avif" srcSet={mAvif} sizes="100vw" />
            <img src={mProps.src} srcSet={mProps.srcSet} sizes="100vw" alt="" role="presentation" decoding="async" loading="eager" fetchPriority="high" className={imgClass} style={imgStyle} />
          </picture>
        </>
      ) : (
        <>
          {/* Deferred, so every candidate waits in a data attribute — including the desktop one, which
              used to be a live <source> and loaded under native lazy loading before the observer had
              said anything. RevealObserver promotes the whole <picture> at once. */}
          <picture>
            {!sameSource && <source media={`(min-width: ${BREAK}px)`} type="image/avif" data-srcset={dAvif} sizes="100vw" />}
            {!sameSource && <source media={`(min-width: ${BREAK}px)`} data-srcset={dProps.srcSet} sizes="100vw" />}
            <source type="image/avif" data-srcset={mAvif} sizes="100vw" />
            <img data-src={mProps.src} data-srcset={mProps.srcSet} sizes="100vw" alt="" role="presentation" decoding="async" loading="lazy" fetchPriority="low" className={imgClass} style={imgStyle} />
          </picture>
          <noscript>
            <picture>
              {!sameSource && <source media={`(min-width: ${BREAK}px)`} srcSet={candidate(dProps.srcSet, 1440)} />}
              <img src={candidate(mProps.srcSet, 768)} alt="" role="presentation" loading="lazy" className={imgClass} />
            </picture>
          </noscript>
        </>
      )}
      {motion && (
        <video
          className="media-bg__video"
          data-video={motion.file}
          width={motion.width}
          height={motion.height}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          disablePictureInPicture
          style={objectPosition ? ({ objectPosition } as React.CSSProperties) : undefined}
        />
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
