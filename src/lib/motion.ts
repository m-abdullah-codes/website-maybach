// Motion tokens (docs/02 §2.6). GSAP and ScrollTrigger are registered in the client wrappers that use them.
export const EASE_OUT = "cubic-bezier(.16, 1, .3, 1)";
export const EASE_INOUT = "cubic-bezier(.65, 0, .35, 1)";
/** The same curves as GSAP custom-ease-free approximations. */
export const GSAP_EASE_OUT = "expo.out";
export const GSAP_EASE_INOUT = "power2.inOut";
export const D = { fast: 0.32, base: 0.8, slow: 1.2 } as const;

export function reducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
