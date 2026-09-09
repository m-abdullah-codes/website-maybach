import { z } from "zod";

/**
 * The enquiry form's contract, shared by the browser and the one Worker route that still runs
 * (src/worker/index.ts). It used to be a server action; a static site has no server to run one on, so
 * the validation and the wording moved here and the form POSTs to /api/enquiry instead. The shape the
 * form reads back is unchanged.
 */
export type FieldError = "required" | "phone";
export interface FormState {
  status: "idle" | "ok" | "error";
  errors?: Partial<Record<"name" | "phone" | "datetime" | "message", FieldError>>;
  generic?: boolean;
}

export const enquirySchema = z.object({
  name: z.string().trim().min(1),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{7,}$/),
  car: z.string().trim().max(120).optional().or(z.literal("")),
  datetime: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  locale: z.enum(["en", "ar"]).default("en"),
  page: z.string().max(200).optional().or(z.literal("")),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type Enquiry = z.infer<typeof enquirySchema>;

/**
 * Validates a submission. A filled honeypot reports success and sends nothing, which is the whole
 * point of it — a bot that is told it failed simply tries again.
 */
export function parseEnquiry(raw: Record<string, unknown>): { ok: true; data: Enquiry } | { ok: false; state: FormState } {
  const parsed = enquirySchema.safeParse(raw);
  if (parsed.success) return { ok: true, data: parsed.data };

  const errors: FormState["errors"] = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0];
    if (key === "company") return { ok: false, state: { status: "ok" } };
    if (key === "name") errors.name = "required";
    if (key === "phone") errors.phone = String(raw.phone ?? "").trim() ? "phone" : "required";
  }
  if (Object.keys(errors).length === 0) return { ok: false, state: { status: "error", generic: true } };
  return { ok: false, state: { status: "error", errors } };
}

/** The email the concierge receives. Plain text, in the order the form asks the questions. */
export function enquiryMessage(d: Enquiry): { subject: string; text: string } {
  const text = [
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.car ? `Car of interest: ${d.car}` : null,
    d.datetime ? `Preferred date & time: ${d.datetime}` : null,
    d.message ? `Message: ${d.message}` : null,
    `Language: ${d.locale}`,
    d.page ? `Page: ${d.page}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  return { subject: `May Bach enquiry${d.car ? ` · ${d.car}` : ""} · ${d.name}`, text };
}
