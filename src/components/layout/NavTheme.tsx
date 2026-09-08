"use client";

import { useEffect } from "react";

/** Flags a page whose hero is the light room so the transparent nav sets in ink until it becomes the pill. */
export function NavTheme({ light }: { light: boolean }) {
  useEffect(() => {
    if (!light) return;
    document.documentElement.dataset.navLight = "";
    return () => {
      delete document.documentElement.dataset.navLight;
    };
  }, [light]);
  return null;
}
