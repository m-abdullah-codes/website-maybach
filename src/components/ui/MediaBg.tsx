import Image from "next/image";
import { cn } from "@/lib/cn";
import { img } from "@/lib/images";

export type Overlay = "x" | "y" | "none";

interface MediaBgProps {
  /** Desktop master (-d). Used above 768 px. */
  desktop: string;
  /** Mobile master (-m). Used under 768 px. Falls back to `desktop` for single-master images. */
  mobile?: string;
  priority?: boolean;
  /** Legibility gradient (docs/02 §2.1): 'x' is horizontal on desktop and vertical on mobile. */
  overlay?: Overlay;
  className?: string;
  /** object-position for the desktop image, e.g. "50% 40%". */
  position?: string;
  positionMobile?: string;
}

/**
 * docs/03 §4.2: two next/image elements, one per breakpoint; only the visible one loads.
 * Backgrounds are presentational: empty alt, aria-hidden wrapper.
 */
export function MediaBg({ desktop, mobile, priority, overlay = "none", className, position, positionMobile }: MediaBgProps) {
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
        className="object-cover md:hidden"
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
        className="hidden object-cover md:block"
        style={position ? { objectPosition: position } : undefined}
      />
      {overlay === "x" && (
        <>
          <div className="overlay-y absolute inset-0 md:hidden" />
          <div className="overlay-x absolute inset-0 hidden md:block" />
        </>
      )}
      {overlay === "y" && <div className="overlay-y absolute inset-0" />}
    </div>
  );
}
