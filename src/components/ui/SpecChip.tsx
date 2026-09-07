import { cn } from "@/lib/cn";

/**
 * docs/02 §3.6: transparent, hairline bottom only; Small pewter label, Spec value platinum, tabular.
 * Values are Latin/numeric and are isolated LTR so they keep their order inside Arabic layout.
 */
export function SpecChip({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("hairline-bottom min-w-0 pb-3", className)}>
      <div className="t-spec-label">{label}</div>
      <div className="t-spec mt-1.5">
        <span dir="ltr" className="inline-block">
          {value}
        </span>
      </div>
    </div>
  );
}
