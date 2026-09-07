"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

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

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * docs/02 §2.6: elements enter with opacity 0→1, translateY 24→0, --d-base --ease-out, staggered 80 ms.
 * Headlines reveal per line with a mask over --d-slow. Under prefers-reduced-motion the CSS reduces
 * everything to a 200 ms opacity. Without JS nothing is hidden (html.js gates the initial state).
 */
export function Reveal({ as: Tag = "div", className, delay = 0, lines, stagger, children, id, style }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [lineGroups, setLineGroups] = useState<string[][] | null>(null);
  const text = lines && typeof children === "string" ? children : null;

  // Group words into rendered lines so each line can be masked separately.
  useIsoLayoutEffect(() => {
    if (!text || !ref.current) return;
    const el = ref.current;
    const measure = () => {
      const words = text.split(/\s+/).filter(Boolean);
      const probe = document.createElement(Tag);
      probe.className = el.className.replace(/\breveal\S*/g, "");
      // Available width: the parent's content box (a flex-centred headline shrinks to its content, so its own width would be wrong).
      const parent = el.parentElement;
      const pcs = parent ? getComputedStyle(parent) : null;
      const available = parent && pcs ? parent.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight) : el.clientWidth;
      const max = parseFloat(getComputedStyle(el).maxWidth);
      const width = Number.isFinite(max) && max > 0 ? Math.min(available, max) : available;
      probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;inset-inline-start:0;top:0;white-space:normal;width:" + width + "px;";
      probe.innerHTML = words.map((w) => `<span>${w.replace(/</g, "&lt;")}</span>`).join(" ");
      el.parentElement?.appendChild(probe);
      const spans = Array.from(probe.querySelectorAll("span"));
      const groups: string[][] = [];
      let lastTop: number | null = null;
      spans.forEach((s, i) => {
        const top = s.offsetTop;
        if (lastTop === null || Math.abs(top - lastTop) > 2) {
          groups.push([words[i]]);
          lastTop = top;
        } else {
          groups[groups.length - 1].push(words[i]);
        }
      });
      probe.remove();
      setLineGroups(groups);
    };
    measure();
    let t = 0;
    let alive = true;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
    // Re-measure once the web fonts are in, so lines are grouped with the real metrics.
    document.fonts?.ready.then(() => {
      if (alive) measure();
    });
    return () => {
      alive = false;
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, [text, Tag]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const vars = { "--delay": `${delay}ms`, ...style } as CSSProperties;

  if (text) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const T = Tag as any;
    return (
      <T ref={ref} id={id} className={cn("reveal reveal--lines", inView && "is-in", className)} style={vars}>
        {lineGroups
          ? lineGroups.map((g, i) => (
              <span key={i} className="line" style={{ "--i": i } as CSSProperties}>
                <span>{g.join(" ")}</span>
              </span>
            ))
          : text}
      </T>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any;
  return (
    <T ref={ref} id={id} className={cn(stagger ? "reveal-stagger" : "reveal", inView && "is-in", className)} style={vars}>
      {children}
    </T>
  );
}

/** Statement-style word-by-word reveal (docs/02 H2): 120 ms per word. */
export function RevealWords({ as: Tag = "p", className, text, delay = 0 }: { as?: Tag; className?: string; text: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const words = text.split(/\s+/).filter(Boolean);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any;
  return (
    <T ref={ref} className={cn("words", inView && "is-in", className)} style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="word" style={{ "--i": i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </T>
  );
}
