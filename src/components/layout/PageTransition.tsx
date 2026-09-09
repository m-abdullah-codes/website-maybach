"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis";
import { reducedMotion } from "@/lib/motion";
import { Emblem } from "@/components/brand/Emblem";

const WIPE = 800; // --d-base, ease-inout
const LIFT = 600;
const SAFETY = 4000;

/**
 * The navigation in flight, held at module scope rather than in a ref. A language switch changes the
 * [locale] segment, so React unmounts this component with the old layout and mounts a fresh one with
 * the new — refs do not survive that, and the instance that handles the click is never the instance
 * that sees the route arrive. Module state is: there is only ever one PageTransition, and the chunk
 * outlives both instances.
 */
let pending: { hash: string; coveredAt: number; curtained: boolean } | null = null;

/**
 * docs/02 §2.6: on internal navigation an obsidian curtain wipes up (--d-base --ease-inout), the emblem
 * draws itself (600 ms) in the centre, the curtain lifts once the new route has rendered. Under 1.4 s.
 * Under prefers-reduced-motion the curtain is skipped, but the navigation is still routed through here,
 * because this component owns where the new page starts.
 *
 * Why it owns it: every push below passes `scroll: false`, so Next's own scroll-and-focus handler is
 * off. That handler walks the changed segment for the first element to scroll to and skips any element
 * whose bounding rect is all zeros — which is every `display: contents` wrapper, including the Home
 * hero. It therefore picked the *second* section and scrolled it into view. It only showed on a locale
 * switch (the one navigation where the changed segment is the whole [locale] layout rather than the
 * page) and only under 768 px, where the second section's top sits below the fold; at 1440 it lands
 * exactly at the viewport height and passes the handler's "already visible" test by a pixel. Resetting
 * the scroll here instead is both the fix and the honest description of what the curtain already did.
 */
export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  /** Where the new route starts: its #target if the link had one, otherwise the top. */
  const land = useCallback((hash: string) => {
    const id = hash.replace(/^#/, "");
    const target = id ? document.getElementById(id) : null;
    const lenis = getLenis();
    if (target) {
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else target.scrollIntoView();
    } else {
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    // `scroll: false` also turns off Next's focus handoff, so make it ourselves. preventScroll keeps
    // it from undoing the line above.
    document.getElementById("main")?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      const samePath = url.pathname === location.pathname && url.search === location.search;
      if (samePath) return;
      e.preventDefault();
      const target = url.pathname + url.search + url.hash;
      // `scroll: false` on both paths: `land()` below decides where the new page starts.
      if (reducedMotion()) {
        pending = { hash: url.hash, coveredAt: performance.now(), curtained: false };
        router.push(target, { scroll: false });
        return;
      }
      pending = { hash: url.hash, coveredAt: performance.now(), curtained: true };
      setPhase("in");
      window.setTimeout(() => router.push(target, { scroll: false }), Math.round(WIPE * 0.45));
    };
    // Capture phase, and that is load-bearing. React delegates every onClick to a listener it attaches
    // to the document when it hydrates, which is before this effect runs, so a bubble-phase listener
    // here fires *after* next/link has already navigated with its own `scroll: true` — the curtain
    // still played, but the push below was a second, losing navigation. Capturing puts this first;
    // next/link then sees e.defaultPrevented and stands down (its own guard), so there is exactly one
    // navigation and it is this one.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The route changed: land the new page, and (when there is one) wait for the wipe before lifting.
  // This runs on mount too, which is the point — after a language switch this is a new instance.
  useEffect(() => {
    if (!pending) return;
    const { hash, coveredAt, curtained } = pending;
    pending = null;
    if (!curtained) {
      land(hash);
      return;
    }
    const t = window.setTimeout(
      () => {
        // PromiseStack's pin teardown calls ScrollTrigger.refresh() while the old page is being
        // deleted, and refresh() restores the scroll position it recorded. Landing after the wipe
        // puts us past that, so the new page starts where it should and not where the last one was.
        land(hash);
        setPhase("out");
        window.setTimeout(() => setPhase("idle"), LIFT);
      },
      Math.max(0, WIPE - (performance.now() - coveredAt)),
    );
    return () => window.clearTimeout(t);
  }, [pathname, land]);

  // Never trap the visitor behind the curtain.
  useEffect(() => {
    if (phase !== "in") return;
    const t = window.setTimeout(() => {
      pending = null;
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
