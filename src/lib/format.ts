/** Western numerals in both languages (docs/02 §1.3): "9,800". */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Fills {placeholders} from `values`; any placeholder without a value is shown as a bracketed field,
 * the same convention as [Street] in the copy (AGENTS.md §3): visible until the client supplies it.
 */
export function fillOrBracket(template: string, values: Record<string, string | number | undefined>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => {
    const v = values[k];
    return v === undefined || v === "" ? `[${k}]` : String(v);
  });
}
