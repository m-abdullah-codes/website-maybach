import { cn } from "@/lib/cn";
import type { Availability } from "@/lib/content";

const DOT: Record<Availability, string> = {
  available: "bg-ok",
  reserved: "bg-pewter",
  sold: "bg-muted",
};

/** docs/02 §3.5 and §3.18: liquid glass pill with a 6 px state dot, or a plain label (year). */
export function LiquidBadge({ state, label, className }: { state?: Availability; label: string; className?: string }) {
  return (
    <span className={cn("liquid inline-flex items-center gap-2", className)}>
      {state && <span className={cn("block h-1.5 w-1.5 rounded-full", DOT[state])} aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
}

/** The environment caption: Small pewter text with a 4 px --scene-accent dot before it (docs/02 §3.5). */
export function EnvCaption({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("t-small inline-flex items-center gap-2 text-pewter", className)}>
      <span className="accent-dot block h-1 w-1 rounded-full" aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}
