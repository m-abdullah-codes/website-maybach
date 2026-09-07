import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Emblem } from "@/components/brand/Emblem";

/** docs/02 §3.3: emblem 10 px + 24 px hairline + label, silver. */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "div" | "span";
}) {
  return (
    <Tag className={cn("eyebrow t-eyebrow", className)}>
      <Emblem className="eyebrow__mark" />
      <span className="eyebrow__rule" aria-hidden="true" />
      <span>{children}</span>
    </Tag>
  );
}
