"use client";

import { useEffect } from "react";

/**
 * One observer for the page (docs/03 §13.2): server-rendered [data-reveal] elements get `is-in` when they
 * enter the viewport, and deferred images (img[data-src], below the fold) receive their sources when they
 * come within 600 px, so nothing below the fold competes with the hero for bandwidth. No per-element hydration.
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
    const observeAll = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => reveal.observe(el));
      document.querySelectorAll<HTMLImageElement>("img[data-src], img[data-srcset]").forEach((el) => images.observe(el));
    };
    observeAll();
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      reveal.disconnect();
      images.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
