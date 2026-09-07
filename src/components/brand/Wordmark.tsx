import { cn } from "@/lib/cn";
import { WORDMARK, WORDMARK_AR, LOCKUP } from "./paths";

type Variant = "latin" | "arabic" | "lockup";

/** MAY BACH wordmark traced from mb-br-01. `title` makes it an accessible image; omit for decoration. */
export function Wordmark({
  variant = "latin",
  className,
  title,
}: {
  variant?: Variant;
  className?: string;
  title?: string;
}) {
  const p = variant === "arabic" ? WORDMARK_AR : variant === "lockup" ? LOCKUP : WORDMARK;
  return (
    <svg
      viewBox={`0 0 ${p.w} ${p.h}`}
      fill="currentColor"
      fillRule="evenodd"
      className={cn("block", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={p.d} />
    </svg>
  );
}
