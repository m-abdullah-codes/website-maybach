"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/motion";

/** docs/02 S3: figures count up from 0 over 1200 ms when in view (expo-out). Static under reduced motion. */
export function CountUp({ value, animate = true, className }: { value: number; animate?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(animate ? 0 : value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    if (reducedMotion()) {
      setN(value);
      return;
    }
    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1200);
          const eased = 1 - Math.pow(2, -10 * t);
          setN(Math.round(value * (t >= 1 ? 1 : eased)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, animate]);

  return (
    <span ref={ref} className={className} dir="ltr">
      {n}
    </span>
  );
}
