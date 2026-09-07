"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis";
import { reducedMotion } from "@/lib/motion";
import { Emblem } from "@/components/brand/Emblem";

const WIPE = 800; // --d-base, ease-inout
const LIFT = 600;
const SAFETY = 4000;

/**
 * docs/02 §2.6: on internal navigation an obsidian curtain wipes up (--d-base --ease-inout), the emblem
 * draws itself (600 ms) in the centre, the curtain lifts once the new route has rendered. Under 1.4 s.
 * Skipped under prefers-reduced-motion. Same-page hash links and external links are left alone.
 */
export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const coveredAt = useRef(0);
  const armed = useRef(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reducedMotion()) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      const samePath = url.pathname === location.pathname && url.search === location.search;
      if (samePath) return;
      e.preventDefault();
      coveredAt.current = performance.now();
      armed.current = true;
      setPhase("in");
      const target = url.pathname + url.search + url.hash;
      window.setTimeout(() => router.push(target), Math.round(WIPE * 0.45));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  // The route changed under the curtain: wait for the wipe to finish, reset scroll, lift.
  useEffect(() => {
    if (!armed.current) return;
    armed.current = false;
    const elapsed = performance.now() - coveredAt.current;
    const wait = Math.max(0, WIPE - elapsed);
    const t = window.setTimeout(() => {
      getLenis()?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      setPhase("out");
      window.setTimeout(() => setPhase("idle"), LIFT);
    }, wait);
    return () => window.clearTimeout(t);
  }, [pathname]);

  // Never trap the visitor behind the curtain.
  useEffect(() => {
    if (phase !== "in") return;
    const t = window.setTimeout(() => {
      armed.current = false;
      setPhase("out");
      window.setTimeout(() => setPhase("idle"), LIFT);
    }, SAFETY);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <div className={cn("curtain", phase === "in" && "is-in", phase === "out" && "is-out")} aria-hidden="true">
      <Emblem className="curtain__emblem" />
    </div>
  );
}
