"use client";

import { useEffect } from "react";
import { reducedMotion } from "@/lib/motion";

/**
 * One observer for the page (docs/03 §13.2): server-rendered [data-reveal] elements get `is-in` when they
 * enter the viewport, and deferred images (img[data-src], below the fold) receive their sources when they
 * come within 600 px, so nothing below the fold competes with the hero for bandwidth. No per-element hydration.
 *
 * The motion backgrounds (MediaBg, src/lib/videos.ts) are the same idea with the dial turned further,
 * because a clip is a third of a megabyte against a photograph's twenty:
 * - nothing is fetched until the page has finished loading, so the hero photograph, the fonts and the
 *   first paint have the connection to themselves. The car hero is the section that moves *and* the
 *   LCP element, so this is the whole difference between a motion background and a slow one;
 * - a clip loads once it is actually on screen and pauses again when it leaves, so a phone is never
 *   decoding video that has been scrolled past;
 * - `.media-bg__video` is display:none above 768 px, so it has no box, so it can never intersect —
 *   that, rather than a media query in here, is what keeps these clips off a desktop connection, and
 *   it re-evaluates by itself when a phone is rotated;
 * - reduced motion, Save-Data and a 2G connection skip it altogether and keep the still.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            reveal.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    const images = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const img = e.target as HTMLImageElement;
          // A <picture>'s own candidates are held back the same way, so that a deferred photograph has
          // nothing at all to fetch until this fires. They have to be promoted first: the browser
          // re-runs its source selection when the <img> below gets its srcset, and the AVIF candidate
          // has to be in place by then or the webp underneath wins the race.
          const picture = img.parentElement;
          if (picture instanceof HTMLPictureElement) {
            picture.querySelectorAll<HTMLSourceElement>("source[data-srcset]").forEach((s) => {
              s.srcset = s.dataset.srcset ?? "";
              delete s.dataset.srcset;
            });
          }
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;
          if (srcset) img.srcset = srcset;
          if (src) img.src = src;
          delete img.dataset.src;
          delete img.dataset.srcset;
          images.unobserve(img);
        }
      },
      { rootMargin: "600px 0px 600px 0px", threshold: 0 },
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn = (navigator as any).connection;
    const wantsMotion =
      !reducedMotion() && conn?.saveData !== true && !/2g$/.test(String(conn?.effectiveType ?? ""));

    const videos = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (!e.isIntersecting) {
            if (!v.paused) v.pause();
            continue;
          }
          const src = v.dataset.video;
          if (src) {
            delete v.dataset.video;
            v.addEventListener("playing", () => v.classList.add("is-playing"), { once: true });
            v.src = src;
          }
          // Autoplay can still be refused — Low Power Mode, a per-site setting. The still is already
          // on screen underneath, so there is nothing to fall back to and nothing to report.
          void v.play().catch(() => {});
        }
      },
      // No margin, unlike the images above. A clip costs main-thread decode, not just bandwidth, and
      // the home page's moving section starts 1036 px down on a 390 px screen — a 200 px margin
      // pulled it in while the page was still settling and doubled Total Blocking Time. It loads when
      // it is actually on screen instead; the still it dissolves out of is the same frame, so the
      // wait is invisible.
      { rootMargin: "0px", threshold: 0 },
    );

    let watchVideos = false;
    const observeAll = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => reveal.observe(el));
      document.querySelectorAll<HTMLImageElement>("img[data-src], img[data-srcset]").forEach((el) => images.observe(el));
      if (watchVideos) document.querySelectorAll<HTMLVideoElement>("video[data-video]").forEach((el) => videos.observe(el));
    };
    observeAll();

    // Hold the clips back until the page has finished loading, then let the observer take over.
    let idle = 0;
    const startVideos = () => {
      watchVideos = true;
      observeAll();
    };
    const armVideos = () => {
      idle =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(startVideos, { timeout: 2000 })
          : window.setTimeout(startVideos, 400);
    };
    if (wantsMotion) {
      if (document.readyState === "complete") armVideos();
      else window.addEventListener("load", armVideos, { once: true });
    }

    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      reveal.disconnect();
      images.disconnect();
      videos.disconnect();
      mo.disconnect();
      window.removeEventListener("load", armVideos);
      if (idle) {
        if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      }
    };
  }, []);
  return null;
}
