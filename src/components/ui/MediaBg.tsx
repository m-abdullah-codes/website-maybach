import Image from "next/image";
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
  /** Extra classes on both <img> elements (e.g. for hover scaling). */
  imgClassName?: string;
}

/**
 * docs/03 §4.2: two next/image elements, one per breakpoint; only the visible one loads.
 * Backgrounds are presentational: empty alt, aria-hidden wrapper.
 */
export function MediaBg({
  desktop,
  mobile,
  priority,
  overlay = "none",
  className,
  position,
  positionMobile,
  imgClassName,
}: MediaBgProps) {
  const d = img(desktop);
  const m = img(mobile ?? desktop);
  return (
    <div aria-hidden="true" className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={m.src}
        alt=""
        role="presentation"
        fill
        sizes="100vw"
        priority={priority}
        placeholder="blur"
        blurDataURL={m.blurDataURL}
        className={cn("object-cover md:hidden", imgClassName)}
        style={positionMobile ? { objectPosition: positionMobile } : undefined}
      />
      <Image
        src={d.src}
        alt=""
        role="presentation"
        fill
        sizes="100vw"
        fetchPriority={priority ? "high" : undefined}
        placeholder="blur"
        blurDataURL={d.blurDataURL}
        className={cn("hidden object-cover md:block", imgClassName)}
        style={position ? { objectPosition: position } : undefined}
      />
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
