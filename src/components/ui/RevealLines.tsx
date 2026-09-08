"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Tag = "div" | "p" | "h1" | "h2" | "h3" | "span";

// All headlines on a page measure in one batch (one reflow), off the critical path.
type Job = { prepare: () => HTMLElement; read: (probe: HTMLElement) => void };
let queue: Job[] = [];
let scheduled = false;
function schedule(job: Job) {
  queue.push(job);
  if (scheduled) return;
  scheduled = true;
  const run = () => {
    const jobs = queue;
    queue = [];
    scheduled = false;
    const probes = jobs.map((j) => j.prepare());
    jobs.forEach((j, i) => j.read(probes[i]));
    probes.forEach((p) => p.remove());
  };
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(run, { timeout: 500 });
  else window.setTimeout(run, 80);
}

/**
 * docs/02 §2.6: headlines reveal per rendered line with a mask over --d-slow. The text is server-rendered;
 * once idle, each line is measured (batched across the page), wrapped and masked; fonts trigger a re-measure.
 */
export function RevealLines({ as: Tag = "h2", className, delay = 0, text, id, style }: { as?: Tag; className?: string; delay?: number; text: string; id?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [lineGroups, setLineGroups] = useState<string[][] | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let alive = true;
    const words = text.split(/\s+/).filter(Boolean);
    const measure = () =>
      schedule({
        prepare: () => {
          const probe = document.createElement(Tag);
          probe.className = el.className.replace(/\breveal\S*|\bis-in\b/g, "");
          const parent = el.parentElement;
          const pcs = parent ? getComputedStyle(parent) : null;
          const available = parent && pcs ? parent.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight) : el.clientWidth;
          const max = parseFloat(getComputedStyle(el).maxWidth);
          const width = Number.isFinite(max) && max > 0 ? Math.min(available, max) : available;
          probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;inset-inline-start:0;top:0;white-space:normal;width:" + width + "px;";
          probe.innerHTML = words.map((w) => `<span>${w.replace(/</g, "&lt;")}</span>`).join(" ");
          (parent ?? document.body).appendChild(probe);
          return probe;
        },
        read: (probe) => {
          if (!alive) return;
          const groups: string[][] = [];
          let lastTop: number | null = null;
          Array.from(probe.querySelectorAll("span")).forEach((s, i) => {
            const top = s.offsetTop;
            if (lastTop === null || Math.abs(top - lastTop) > 2) {
              groups.push([words[i]]);
              lastTop = top;
            } else groups[groups.length - 1].push(words[i]);
          });
          setLineGroups(groups);
        },
      });
    measure();
    document.fonts?.ready.then(() => alive && measure());
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
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
    return () => {
      alive = false;
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [text, Tag]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any;
  return (
    <T ref={ref} id={id} className={cn("reveal reveal--lines", inView && "is-in", className)} style={{ "--delay": `${delay}ms`, ...style } as CSSProperties}>
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
