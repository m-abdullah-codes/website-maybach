"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { getLenis } from "@/lib/lenis";

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  alt: string;
  span: "wide" | "tall" | "single";
}

export function GalleryGrid({ images, closeLabel }: { images: GalleryImage[]; closeLabel: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  // Mobile progress hairline.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? Math.abs(el.scrollLeft) / max : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const show = useCallback((i: number, from?: HTMLElement) => {
    if (from) opener.current = from;
    setOpen(i);
  }, []);
  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  // Lightbox: scroll lock, keys, focus.
  useEffect(() => {
    if (open === null) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(document.dir === "rtl" ? -1 : 1);
      if (e.key === "ArrowLeft") step(document.dir === "rtl" ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open, close, step]);

  return (
    <>
      <div ref={scroller} className="gallery__grid">
        {images.map((im, i) => (
          <button
            key={im.src}
            type="button"
            className={cn("gallery__tile", `gallery__tile--${im.span}`)}
            onClick={(e) => show(i, e.currentTarget)}
          >
            <Photo
              src={im.src}
              alt={im.alt}
              fill
              sizes={im.span === "wide" ? "(min-width: 1024px) 60vw, 86vw" : "(min-width: 1024px) 30vw, 86vw"}
              placeholder="blur"
              blurDataURL={im.blurDataURL}
              className="gallery__img"
            />
          </button>
        ))}
      </div>
      <div className="wrap gallery__progress md:hidden" aria-hidden="true">
        <span className="gallery__progress-bar" style={{ transform: `scaleX(${Math.max(progress, 0.12)})` }} />
      </div>

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={images[open].alt}
          onClick={close}
          onTouchStart={(e) => {
            touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }}
          onTouchEnd={(e) => {
            const t = touch.current;
            touch.current = null;
            if (!t) return;
            const dx = e.changedTouches[0].clientX - t.x;
            const dy = e.changedTouches[0].clientY - t.y;
            if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
          }}
        >
          <button ref={closeRef} type="button" className="lightbox__close" aria-label={closeLabel} onClick={close}>
            <Icon name="x" size={20} />
          </button>
          <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <Photo
              key={images[open].src}
              src={images[open].src}
              alt={images[open].alt}
              width={images[open].width}
              height={images[open].height}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={images[open].blurDataURL}
              className="lightbox__img"
              priority
            />
          </div>
          <p className="lightbox__count t-small text-pewter" aria-hidden="true">
            <span dir="ltr">{`${open + 1} / ${images.length}`}</span>
          </p>
        </div>
      )}
    </>
  );
}
