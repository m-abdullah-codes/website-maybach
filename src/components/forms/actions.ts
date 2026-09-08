"use server";

import { z } from "zod";

export type FieldError = "required" | "phone";
export interface FormState {
  status: "idle" | "ok" | "error";
  errors?: Partial<Record<"name" | "phone" | "datetime" | "message", FieldError>>;
  generic?: boolean;
}

const schema = z.object({
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

/**
 * docs/03 §5 EnquiryForm → Resend. Without RESEND_API_KEY / CONCIERGE_EMAIL the enquiry is logged to
 * the server console and the form still shows its success state (docs/03 Phase 5 acceptance).
 */
export async function sendEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: FormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name") errors.name = "required";
      if (key === "phone") errors.phone = String(raw.phone ?? "").trim() ? "phone" : "required";
      if (key === "company") return { status: "ok" }; // honeypot filled: pretend success, send nothing
    }
    if (Object.keys(errors).length === 0) return { status: "error", generic: true };
    return { status: "error", errors };
  }

  const d = parsed.data;
  const lines = [
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.car ? `Car of interest: ${d.car}` : null,
    d.datetime ? `Preferred date & time: ${d.datetime}` : null,
    d.message ? `Message: ${d.message}` : null,
    `Language: ${d.locale}`,
    d.page ? `Page: ${d.page}` : null,
  ].filter(Boolean);
  const text = lines.join("\n");
  const subject = `May Bach enquiry${d.car ? ` · ${d.car}` : ""} · ${d.name}`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONCIERGE_EMAIL;
  if (!key || !to) {
    console.log(`[enquiry] (Resend not configured)\n${subject}\n${text}`);
    return { status: "ok" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.ENQUIRY_FROM || "May Bach <concierge@maybach.sa>",
      to,
      subject,
      text,
      replyTo: undefined,
    });
    if (error) {
      console.error("[enquiry] resend error", error);
      return { status: "error", generic: true };
    }
    return { status: "ok" };
  } catch (err) {
    console.error("[enquiry] failed", err);
    return { status: "error", generic: true };
  }
}
