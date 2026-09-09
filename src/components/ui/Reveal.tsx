import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tag = "div" | "p" | "h1" | "h2" | "h3" | "span" | "ul" | "li" | "section";

interface RevealProps {
  as?: Tag;
  className?: string;
  /** ms before the reveal starts once in view. */
  delay?: number;
  /** Stagger direct children by 80 ms instead of revealing the block. */
  stagger?: boolean;
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
}

/**
 * docs/02 §2.6: elements enter with opacity 0→1, translateY 24→0, --d-base --ease-out, staggered 80 ms.
 * Server-rendered with a data attribute; RevealObserver (one per page) adds `is-in` on intersection.
 * Headlines take the letter-by-letter entrance instead — see SplitText. Under prefers-reduced-motion the
 * CSS reduces everything to a 200 ms opacity. Without JS nothing is hidden (html.js gates the initial state).
 */
export function Reveal({ as: Tag = "div", className, delay = 0, stagger, children, id, style }: RevealProps) {
  const vars = { "--delay": `${delay}ms`, ...style } as CSSProperties;
  return (
    <Tag id={id} data-reveal="" className={cn(stagger ? "reveal-stagger" : "reveal", className)} style={vars}>
      {children}
    </Tag>
  );
}
