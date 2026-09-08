"use client";

import { useEffect } from "react";
import { setStickyConfig, type StickyConfig } from "@/lib/shell-store";

/** Rendered by a page to pre-fill the sticky bar (docs/02 §3.14: a car detail page pre-fills its car). */
export function StickyBarConfig(config: StickyConfig) {
  const { enquireHref, enquireLabel, whatsappHref } = config;
  useEffect(() => {
    setStickyConfig({ enquireHref, enquireLabel, whatsappHref });
    return () => setStickyConfig({});
  }, [enquireHref, enquireLabel, whatsappHref]);
  return null;
}
