"use client";

import { useSyncExternalStore } from "react";

/** Per-page overrides for the sticky bar (a car detail page pre-fills its car). */
export interface StickyConfig {
  enquireHref?: string;
  enquireLabel?: string;
  whatsappHref?: string;
}

let config: StickyConfig = {};
const listeners = new Set<() => void>();

export function setStickyConfig(next: StickyConfig) {
  config = next;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const EMPTY: StickyConfig = {};

export function useStickyConfig(): StickyConfig {
  return useSyncExternalStore(subscribe, () => config, () => EMPTY);
}
