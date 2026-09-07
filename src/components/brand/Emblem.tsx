import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * The interlocked-diamond emblem (mb-br-02), redrawn from measurements of the master as three
 * single strokes, so the preloader can draw it with stroke-dashoffset. Colour is currentColor.
 */
export function Emblem({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="88 398 1078 474"
      fill="none"
      stroke="currentColor"
      strokeWidth={46}
      strokeLinejoin="round"
      strokeLinecap="butt"
      aria-hidden="true"
      className={cn("block", className)}
      {...rest}
    >
      <path pathLength={1} d="M119 649 384 430 625 635 867 430 1130 647" />
      <path pathLength={1} d="M191 677 381 840 580 668" />
      <path pathLength={1} d="M672 668 870 840 1033 693 866 550 752 648" />
    </svg>
  );
}
