import { parseEnquiry, enquiryMessage, type FormState } from "../lib/enquiry";
import siteEn from "../../content/site.en.json";
import siteAr from "../../content/site.ar.json";

/**
 * The whole server side of maybach.sa.
 *
 * Every page, payload and photograph is a file in the asset store and is served without this Worker
 * being invoked at all (wrangler.jsonc → assets); Cloudflare only runs this when a request matches no
 * asset, which on this site means one path: the enquiry form. Everything else falls through to the
 * asset store, whose not_found_handling answers with the nearest 404.html.
 *
 * So a page view cannot cost CPU, and a burst of them cannot exhaust anything. The form is a fetch and
 * a JSON POST, once, when somebody presses Send.
 */
interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
  CONCIERGE_EMAIL?: string;
  ENQUIRY_FROM?: string;
}

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };

function state(value: FormState): Response {
  // Always 200 for a submission that was understood: the body *is* the answer, and a field the visitor
  // mistyped is not a transport failure. Only a malformed request gets a status of its own.
  return new Response(JSON.stringify(value), { status: 200, headers: JSON_HEADERS });
}

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/**
 * The answer a browser without JavaScript gets, since it posted the form rather than fetching it. The
 * enquiry has already been sent by the time this renders; the wording is the form's own, from
 * content/site.*.json, so there is no copy here that is not in the content files.
 */
function confirmation(locale: "en" | "ar", ok: boolean): Response {
  const site = locale === "ar" ? siteAr : siteEn;
  const line = ok ? site.form.success : site.form.errorGeneric;
  const home = locale === "ar" ? "/ar" : "/";
  const html = `<!doctype html><html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>${escape(site.brand.name)}</title>
<style>html{background:#0A0A0B;color:#F2F2F0;font:400 1rem/1.6 ${locale === "ar" ? "'IBM Plex Sans Arabic',system-ui" : "Manrope,system-ui"},sans-serif}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:2rem;text-align:center}
p{max-width:34ch;margin:0 0 2rem}a{color:#F2F2F0}</style>
<body><main><p>${escape(line)}</p><a href="${home}">${escape(site.nav.home)}</a></main>`;
  return new Response(html, {
    status: ok ? 200 : 500,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

async function sendEnquiry(request: Request, env: Env): Promise<Response> {
  // The form's own fetch asks for JSON. A browser submitting the same form without JavaScript does not,
  // and gets a page back instead — the enquiry reaches the concierge either way.
  const wantsJson = (request.headers.get("Accept") ?? "").includes("application/json");

  let raw: Record<string, unknown>;
  try {
    const form = await request.formData();
    raw = Object.fromEntries(form.entries());
  } catch {
    return new Response(JSON.stringify({ status: "error", generic: true } satisfies FormState), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }
  const locale = raw.locale === "ar" ? "ar" : "en";
  const answer = (value: FormState) => (wantsJson ? state(value) : confirmation(locale, value.status === "ok"));

  const parsed = parseEnquiry(raw);
  if (!parsed.ok) return answer(parsed.state);

  const { subject, text } = enquiryMessage(parsed.data);
  const key = env.RESEND_API_KEY;
  const to = env.CONCIERGE_EMAIL;
  if (!key || !to) {
    // docs/03 Phase 5 acceptance: without the keys the enquiry is logged and the form still confirms.
    console.log(`[enquiry] (Resend not configured)\n${subject}\n${text}`);
    return answer({ status: "ok" });
  }

  try {
    // Resend's REST API rather than its SDK: one fetch, nothing to bundle, no Node built-ins.
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.ENQUIRY_FROM || "May Bach <concierge@maybach.sa>", to, subject, text }),
    });
    if (!res.ok) {
      console.error(`[enquiry] resend ${res.status}: ${await res.text()}`);
      return answer({ status: "error", generic: true });
    }
    return answer({ status: "ok" });
  } catch (err) {
    console.error("[enquiry] failed", err);
    return answer({ status: "error", generic: true });
  }
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiry") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
      }
      return sendEnquiry(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
