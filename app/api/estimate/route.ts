import { NextResponse } from "next/server";

// Receives the estimate form (multipart/form-data, with photos) and forwards it, still as
// multipart, to ESTIMATE_WEBHOOK_URL (a CRM / Zapier / Make webhook). See .env.example.
//
// Responses:
// - fetch() callers that send `Accept: application/json` get JSON: { ok, reason?, errors? }.
//   200 ok | 400 invalid (errors per field) | 413 too_large | 503 not_configured | 502 delivery_failed
// - Native (no-JS) form posts get a 303 redirect: /free-estimate/thanks on success,
//   or back to the page with ?estimate=error so the form shows its Call / Text fallback.

const MAX_PHOTOS = 10; // keep in step with MAX_PHOTOS in components/EstimateForm.tsx
/** Total photo bytes per request. The browser shrinks photos to fit; keep in step with EstimateForm. */
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
/** Whole request ceiling (photos + fields + multipart overhead), checked before parsing. */
const MAX_REQUEST_BYTES = 4.5 * 1024 * 1024;
/** Honeypot field name (non-semantic so browsers do not autofill it). */
const HONEYPOT = "hpx_9";
/** A person cannot fill the form faster than this. */
const MIN_ELAPSED_MS = 3000;

type Errors = Partial<Record<"name" | "phone" | "year" | "photos", string>>;

const str = (fd: FormData, k: string, max: number) => {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};

function respond(req: Request, status: number, body: { ok: boolean; reason?: string; errors?: Errors }) {
  const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
  if (wantsJson) return NextResponse.json(body, { status });
  const origin = new URL(req.url).origin;
  if (body.ok) return NextResponse.redirect(new URL("/free-estimate/thanks", origin), 303);
  const back = req.headers.get("referer");
  const url = back && back.startsWith(origin) ? new URL(back) : new URL("/free-estimate", origin);
  url.searchParams.set("estimate", "error");
  url.hash = "estimate";
  return NextResponse.redirect(url, 303);
}

export async function POST(req: Request) {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_REQUEST_BYTES) {
    return respond(req, 413, { ok: false, reason: "too_large", errors: { photos: "Photos are too large to send." } });
  }
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return respond(req, 400, { ok: false, reason: "bad_request" });
  }

  // Spam signals. Either one alone could be a real person (autofill can fill a hidden field; a
  // fast typist with autofill can be quick), so one signal only marks the lead; both drop it.
  // `elapsed` is sent by the JS form; native (no-JS) posts have none and are not timed.
  const honeypotFilled = !!str(fd, HONEYPOT, 200);
  const elapsedRaw = str(fd, "elapsed", 12);
  const tooFast = elapsedRaw !== "" && Number(elapsedRaw) < MIN_ELAPSED_MS;
  if (honeypotFilled && tooFast) return respond(req, 200, { ok: true }); // pretend success, send nothing
  const suspect = honeypotFilled ? "honeypot" : tooFast ? "too_fast" : "";

  const variant = str(fd, "variant", 10) === "compact" ? "compact" : "full";
  const lead = {
    variant,
    service: str(fd, "service", 80),
    name: str(fd, "name", 120),
    phone: str(fd, "phone", 40),
    contact: str(fd, "contact", 10) === "call" ? "call" : "text",
    year: str(fd, "year", 4),
    make: str(fd, "make", 60),
    model: str(fd, "model", 60),
    damage: fd
      .getAll("damage")
      .filter((d): d is string => typeof d === "string")
      .map((d) => d.slice(0, 40))
      .slice(0, 10),
    what: str(fd, "what", 2000),
    insurance: ["yes", "no", "not-sure"].includes(str(fd, "insurance", 10)) ? str(fd, "insurance", 10) : "",
    insurer: str(fd, "insurer", 120),
  };
  const photos = fd.getAll("photos").filter((p): p is File => typeof p !== "string" && p.size > 0);

  const errors: Errors = {};
  if (!lead.name) errors.name = "Enter your name.";
  const digits = lead.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) errors.phone = "Enter a 10-digit phone number.";
  if (lead.year && !/^\d{4}$/.test(lead.year)) errors.year = "Enter the year as four digits.";
  if (photos.length > MAX_PHOTOS) errors.photos = `Send up to ${MAX_PHOTOS} photos.`;
  else if (photos.reduce((sum, p) => sum + p.size, 0) > MAX_TOTAL_BYTES) errors.photos = "Photos are too large to send.";
  else if (photos.some((p) => p.type && !p.type.startsWith("image/"))) errors.photos = "Only photos can be attached.";
  if (Object.keys(errors).length) {
    return respond(req, errors.photos && Object.keys(errors).length === 1 ? 413 : 400, {
      ok: false,
      reason: "invalid",
      errors,
    });
  }

  const hook = process.env.ESTIMATE_WEBHOOK_URL;
  if (!hook) {
    console.error("[estimate] ESTIMATE_WEBHOOK_URL is not set; lead was not delivered.");
    return respond(req, 503, { ok: false, reason: "not_configured" });
  }

  const out = new FormData();
  for (const [k, val] of Object.entries(lead)) {
    if (Array.isArray(val)) val.forEach((d) => out.append(k, d));
    else out.append(k, val);
  }
  out.append("source", "candscollision website");
  if (suspect) out.append("suspect", suspect);
  out.append("receivedAt", new Date().toISOString());
  photos.forEach((p, i) => out.append("photos", p, p.name || `photo-${i + 1}.jpg`));

  try {
    const res = await fetch(hook, { method: "POST", body: out, signal: AbortSignal.timeout(20_000) });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return respond(req, 200, { ok: true });
  } catch (e) {
    console.error("[estimate] delivery failed:", e);
    return respond(req, 502, { ok: false, reason: "delivery_failed" });
  }
}
