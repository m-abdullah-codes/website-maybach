import type Lenis from "lenis";

// A single Lenis instance shared by the shell (SmoothScroll creates it; Nav, PageTransition use it).
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}
