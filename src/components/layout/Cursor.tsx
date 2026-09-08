"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/motion";

/**
 * docs/02 §3.17: a 10 px platinum dot in difference blend. Over a car row it becomes a 72 px glass circle
 * carrying the word View; over a button or a link it hides and lets the control's own hover speak. Never
 * on touch devices, and never when the visitor asks for less motion — the dot then follows without a lerp.
 */
export function Cursor({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches) return;

    const reduced = reducedMotion();
    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const cur = { ...target };
    let raf = 0;
    let shown = false;

    const frame = () => {
      const k = reduced ? 1 : 0.18;
      cur.x += (target.x - cur.x) * k;
      cur.y += (target.y - cur.y) * k;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        shown = true;
        el.dataset.on = "";
        // The page only gives up its arrow once a mouse has actually moved, so a stationary pointer is
        // never left invisible.
        document.documentElement.classList.add("has-cursor");
      }
      // A row's own stretched link is a View target, not a control to hide behind; a button inside the
      // row still hides the cursor and lets its own hover speak.
      const node = e.target as Element | null;
      const control = node?.closest?.("a, button, input, textarea, select, label, [role='button']");
      const view = node?.closest?.("[data-cursor-view]");
      el.dataset.state = control && !control.hasAttribute("data-cursor-view") ? "hidden" : view ? "view" : "dot";
    };
    const onLeave = () => {
      shown = false;
      delete el.dataset.on;
      document.documentElement.classList.remove("has-cursor");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__ring">
        <span className="cursor__label">{label}</span>
      </span>
    </div>
  );
}
