import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RevealLines } from "./RevealLines";

type Tag = "div" | "p" | "h1" | "h2" | "h3" | "span" | "ul" | "li" | "section";

interface RevealProps {
  as?: Tag;
  className?: string;
  /** ms before the reveal starts once in view. */
  delay?: number;
  /** Headline mode (docs/02 §2.6): each rendered line is masked and rises over --d-slow. Children must be a string. */
  lines?: boolean;
  /** Stagger direct children by 80 ms instead of revealing the block. */
  stagger?: boolean;
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
}

/**
 * docs/02 §2.6: elements enter with opacity 0→1, translateY 24→0, --d-base --ease-out, staggered 80 ms.
 * Server-rendered with a data attribute; RevealObserver (one per page) adds `is-in` on intersection.
 * Headlines (`lines`) use the client RevealLines. Under prefers-reduced-motion the CSS reduces everything
 * to a 200 ms opacity. Without JS nothing is hidden (html.js gates the initial state).
 */
export function Reveal({ as: Tag = "div", className, delay = 0, lines, stagger, children, id, style }: RevealProps) {
  if (lines && typeof children === "string") {
    const LinesTag = (["div", "p", "h1", "h2", "h3", "span"].includes(Tag) ? Tag : "div") as "div" | "p" | "h1" | "h2" | "h3" | "span";
    return <RevealLines as={LinesTag} className={className} delay={delay} text={children} id={id} style={style} />;
  }
  const vars = { "--delay": `${delay}ms`, ...style } as CSSProperties;
  return (
    <Tag id={id} data-reveal="" className={cn(stagger ? "reveal-stagger" : "reveal", className)} style={vars}>
      {children}
    </Tag>
  );
}

/** Statement-style word-by-word reveal (docs/02 H2): 120 ms per word, server-rendered, observer-driven. */
export function RevealWords({ as: Tag = "p", className, text, delay = 0 }: { as?: Tag; className?: string; text: string; delay?: number }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag data-reveal="" className={cn("words", className)} style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="word" style={{ "--i": i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
