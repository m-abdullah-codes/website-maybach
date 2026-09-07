import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

interface GlassCardProps {
  icon?: string;
  title?: string;
  body?: string;
  children?: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}

/** docs/02 §3.4: frosted card, padding 32/24, 420 px on desktop, full width on mobile. Only ever on photography. */
export function GlassCard({ icon, title, body, children, className, as: Tag = "div" }: GlassCardProps) {
  return (
    <Tag className={cn("glass w-full max-w-full p-6 md:w-[420px] md:p-8", className)}>
      {icon && <Icon name={icon} className="text-silver" />}
      {title && <h3 className={cn("t-display-m", icon && "mt-6")}>{title}</h3>}
      {body && <p className="t-body-m measure mt-3 text-silver">{body}</p>}
      {children}
    </Tag>
  );
}
