"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { business } from "@/content/site";
import { freeEstimate } from "@/content/pages";
import type { Link as ContentLink } from "@/content/types";
import { fill, needsOwner } from "@/lib/links";
import { Confirm, ConfirmDot, LineText } from "./ReviewMode";
import { AlertIcon, CameraIcon, CloseIcon, PhoneIcon, TextIcon } from "./Icons";

/**
 * Estimate request form, two variants from one component. All words come from freeEstimate.form.
 * - full:    3 steps (photos + what happened, vehicle + insurance, contact) with a progress indicator.
 * - compact: one step (name, phone, what happened, photos), optional preselected service.
 *
 * Sends multipart/form-data to /api/estimate. Photos are downscaled in the browser to a
 * 1600px long edge JPEG first. On success it routes to /free-estimate/thanks. On any failure
 * it keeps everything typed and shows an inline error with Text / Call buttons (it never
 * redirects to sms: on its own). Without JavaScript all steps render and the form posts natively.
 *
 * Other components can prefill "What happened?" by dispatching
 *   window.dispatchEvent(new CustomEvent("estimate:prefill", { detail: { text } }))
 */

const copy = freeEstimate.form;
const S = copy.steps;

type Variant = "full" | "compact";
type Field = "name" | "phone" | "year";
type Photo = { id: string; name: string; blob: Blob; url: string };
type Msg = { text: string; confirmed: boolean };

/** Matches the copy ("Add up to 10 photos"). Keep in step with MAX_PHOTOS in app/api/estimate/route.ts. */
export const MAX_PHOTOS = 10;
/** Total photo bytes per request (~4 MB with the text fields). Keep in step with the API route. */
export const MAX_TOTAL_BYTES = Math.floor(3.9 * 1024 * 1024);
/** Tried in order until the photo fits its share of the remaining budget. */
const ENCODINGS: [edge: number, quality: number][] = [
  [1600, 0.82],
  [1280, 0.72],
  [1024, 0.62],
  [800, 0.55],
];
/** Honeypot field name: non-semantic so browsers do not autofill it. Keep in step with the API route. */
export const HONEYPOT = "hpx_9";
const STEP_LABELS = [S.photos.label, S.vehicle.label, S.contact.label];
const STEP_FIELDS: Field[][] = [[], ["year"], ["name", "phone"]];
const FIELD_LABELS: Record<Field, string> = { name: S.contact.nameLabel, phone: S.contact.phoneLabel, year: S.vehicle.yearLabel };

/** Decode once, then return the first JPEG encoding that fits `target` bytes (or the smallest one). */
async function downscaleToFit(file: File, target: number): Promise<Blob> {
  const src = URL.createObjectURL(file);
  try {
    const img = new Image();
    // onload/onerror rather than img.decode(): decode() can stay pending for detached images in
    // background or unfocused tabs. onerror fires when the browser cannot open the file (e.g. HEIC).
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("cannot read image"));
      img.src = src;
    });
    let last: Blob | null = null;
    for (const [edge, quality] of ENCODINGS) {
      last = await encode(img, edge, quality);
      if (last.size <= target) return last;
    }
    if (!last) throw new Error("encode failed");
    return last;
  } finally {
    URL.revokeObjectURL(src);
  }
}

/** Draws to a canvas at `edge` (long edge) and encodes JPEG. Browsers apply EXIF orientation. */
async function encode(img: HTMLImageElement, edge: number, quality: number): Promise<Blob> {
  {
    const scale = Math.min(1, edge / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.round(img.naturalWidth * scale);
    const h = Math.round(img.naturalHeight * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no canvas");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
    if (!blob) throw new Error("encode failed");
    return blob;
  }
}

const digits = (s: string) => s.replace(/\D/g, "");
const isPhoto = (f: File) => f.type.startsWith("image/") || /\.(heic|heif|jpe?g|png|webp)$/i.test(f.name);

export default function EstimateForm({
  variant = "full",
  service,
  privacyLink = copy.privacy.link,
  action = "/api/estimate",
}: {
  variant?: Variant;
  /** Preselected service name (compact variant on service pages). Sent as a hidden field. */
  service?: string;
  privacyLink?: ContentLink;
  action?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (k: string) => `ef-${uid}-${k}`;
  const router = useRouter();
  const full = variant === "full";

  const [js, setJs] = useState(false);
  const [step, setStep] = useState(0);
  const [v, setV] = useState({
    what: "",
    damage: [] as string[],
    year: "",
    make: "",
    model: "",
    insurance: "",
    insurer: "",
    name: "",
    phone: "",
    contact: "text",
  });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [summary, setSummary] = useState<Field[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoMsg, setPhotoMsg] = useState<Msg[]>([]);
  const [processing, setProcessing] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "failed">("idle");

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const failRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);
  // Second spam signal next to the honeypot: how long the form was open before sending.
  const mountedAt = useRef(0);

  useEffect(() => {
    setJs(true);
    mountedAt.current = Date.now();
    // The no-JS fallback redirects back with ?estimate=error when sending failed.
    if (new URLSearchParams(window.location.search).get("estimate") === "error") setState("failed");
    // Damage self-check on service pages fills "What happened?".
    const onPrefill = (e: Event) => {
      const text = (e as CustomEvent<{ text: string }>).detail?.text;
      if (!text) return;
      setV((p) => ({ ...p, what: text }));
      if (full) setStep(0);
      requestAnimationFrame(() => {
        const el = document.getElementById(id("what"));
        el?.scrollIntoView({ block: "center" });
        el?.focus({ preventScroll: true });
      });
    };
    window.addEventListener("estimate:prefill", onPrefill);
    return () => window.removeEventListener("estimate:prefill", onPrefill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Move focus to the new step's heading after Next / Back.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (state === "failed") failRef.current?.focus();
  }, [state]);

  // Revoke preview URLs on unmount.
  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => () => photosRef.current.forEach((p) => p.url && URL.revokeObjectURL(p.url)), []);

  function validate(f: Field): string {
    switch (f) {
      case "name":
        return v.name.trim() ? "" : copy.errors.nameRequired;
      case "phone": {
        const d = digits(v.phone);
        if (!d) return copy.errors.phoneRequired;
        if (d.length < 10 || d.length > 11) return copy.errors.phoneInvalid;
        return "";
      }
      case "year": {
        const y = v.year.trim();
        if (!y) return "";
        const n = Number(y);
        return /^\d{4}$/.test(y) && n >= 1900 && n <= new Date().getFullYear() + 2 ? "" : copy.errors.yearInvalid;
      }
    }
  }
  const err = (f: Field) => (touched[f] ? validate(f) : "");
  const fieldsFor = (s: number): Field[] => (full ? STEP_FIELDS[s] : ["name", "phone"]);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((prev) => ({ ...prev, [k]: e.target.value }));
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  /** Marks fields touched; returns the invalid ones and focuses the first. */
  function check(fields: Field[]): Field[] {
    setTouched((t) => ({ ...t, ...Object.fromEntries(fields.map((f) => [f, true])) }));
    const bad = fields.filter((f) => validate(f));
    if (bad.length) document.getElementById(id(bad[0]))?.focus();
    return bad;
  }

  function next() {
    setSummary([]);
    if (!check(fieldsFor(step)).length) setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }

  const countMsg = (n: number): Msg => ({ text: fill(copy.extra.photoCount, { count: n, max: MAX_PHOTOS }), confirmed: true });
  const plain = (text: string): Msg => ({ text, confirmed: true });

  async function addFiles(list: FileList | null) {
    if (!list || !list.length) return;
    const room = MAX_PHOTOS - photos.length - processing;
    const all = Array.from(list);
    const files = all.filter(isPhoto);
    const msgs: Msg[] = [];
    if (files.length < all.length) msgs.push(plain(copy.errors.photoType));
    if (room <= 0) {
      setPhotoMsg([plain(copy.errors.tooManyPhotos)]);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    const take = files.slice(0, room);
    if (files.length > room) msgs.push(plain(copy.errors.tooManyPhotos));
    setProcessing((n) => n + take.length);
    const added: Photo[] = [];
    let used = photos.reduce((sum, p) => sum + p.blob.size, 0);
    for (const file of take) {
      // Each photo gets an equal share of what is left, so later photos still fit.
      const slotsLeft = Math.max(1, MAX_PHOTOS - photos.length - added.length);
      const remaining = MAX_TOTAL_BYTES - used;
      try {
        const blob = await downscaleToFit(file, remaining / slotsLeft);
        if (blob.size > remaining) {
          msgs.push(copy.extra.totalTooLarge);
          continue;
        }
        used += blob.size;
        added.push({ id: crypto.randomUUID(), name: file.name, blob, url: URL.createObjectURL(blob) });
      } catch {
        // No raw-file fallback: a file the browser cannot open is rejected with a plain next step.
        msgs.push(copy.extra.cannotRead);
      }
    }
    setProcessing((n) => n - take.length);
    setPhotos((p) => {
      const nextList = [...p, ...added].slice(0, MAX_PHOTOS);
      setPhotoMsg([countMsg(nextList.length), ...msgs]);
      return nextList;
    });
    if (fileRef.current) fileRef.current.value = "";
  }

  function removePhoto(pid: string) {
    setPhotos((p) => {
      const gone = p.find((x) => x.id === pid);
      if (gone?.url) URL.revokeObjectURL(gone.url);
      const nextList = p.filter((x) => x.id !== pid);
      setPhotoMsg([countMsg(nextList.length)]);
      return nextList;
    });
    // Keep focus in the photo area (the file input inside the "Add photos" button).
    requestAnimationFrame(() => fileRef.current?.focus());
  }

  function smsBody() {
    const vehicle = [v.year, v.make, v.model].filter(Boolean).join(" ");
    const lines = [
      v.name && `${S.contact.nameLabel}: ${v.name}`,
      v.phone && `${S.contact.phoneLabel}: ${v.phone}`,
      vehicle && `${S.vehicle.label}: ${vehicle}`,
      v.damage.length ? `${S.photos.damageLabel} ${v.damage.join(", ")}` : "",
      v.what && v.what,
      service && service,
    ].filter(Boolean);
    return `${business.smsHref}?&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    const all: Field[] = full ? STEP_FIELDS.flat() : ["name", "phone"];
    setTouched(Object.fromEntries(all.map((f) => [f, true])));
    const bad = all.filter((f) => validate(f));
    if (bad.length) {
      if (full) {
        const s = STEP_FIELDS.findIndex((fs) => fs.includes(bad[0]));
        if (s !== step) {
          setStep(s);
          return;
        }
      }
      setSummary(bad);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setSummary([]);
    if (processing > 0) {
      setPhotoMsg([plain(copy.extra.photosStillPreparing)]);
      return;
    }

    const fd = new FormData();
    fd.append("variant", variant);
    if (service) fd.append("service", service);
    fd.append("name", v.name.trim());
    fd.append("phone", v.phone.trim());
    fd.append("what", v.what.trim());
    if (full) {
      v.damage.forEach((d) => fd.append("damage", d));
      fd.append("year", v.year.trim());
      fd.append("make", v.make.trim());
      fd.append("model", v.model.trim());
      fd.append("insurance", v.insurance);
      fd.append("insurer", v.insurer.trim());
      fd.append("contact", v.contact);
    }
    photos.forEach((p, i) => fd.append("photos", p.blob, `photo-${i + 1}.jpg`));
    fd.append(HONEYPOT, honeypotRef.current?.value ?? "");
    fd.append("elapsed", String(Date.now() - mountedAt.current));

    setState("sending");
    try {
      const res = await fetch(action, { method: "POST", body: fd, headers: { accept: "application/json" } });
      const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (res.ok && json?.ok) {
        try {
          sessionStorage.setItem("estimate-first-name", v.name.trim().split(/\s+/)[0] ?? "");
        } catch {}
        router.push("/free-estimate/thanks");
        return;
      }
      throw new Error(String(res.status));
    } catch {
      setState("failed");
    }
  }

  // ---------- rendering helpers ----------
  const describedBy = (f: string, hint?: boolean, error?: string) =>
    [hint ? id(`${f}-hint`) : "", error ? id(`${f}-err`) : ""].filter(Boolean).join(" ") || undefined;
  const errorText = (f: Field) =>
    err(f) ? (
      <p id={id(`${f}-err`)} className="field-error">
        <AlertIcon className="mt-0.5 h-4 w-4 flex-none" />
        <span>{err(f)}</span>
      </p>
    ) : null;
  const show = (s: number) => !full || !js || step === s;

  const textInput = (
    f: Field | "make" | "model" | "insurer",
    label: string,
    opts: { type?: string; inputMode?: "tel" | "numeric"; autoComplete?: string; required?: boolean; hint?: string; maxLength?: number } = {},
  ) => {
    const isField = f === "name" || f === "phone" || f === "year";
    const e = isField ? err(f as Field) : "";
    return (
      <div>
        <label htmlFor={id(f)} className="field-label">
          {label}
        </label>
        {opts.hint ? (
          <p id={id(`${f}-hint`)} className="field-hint mt-1">
            {opts.hint}
          </p>
        ) : null}
        <input
          id={id(f)}
          name={f}
          type={opts.type ?? "text"}
          inputMode={opts.inputMode}
          autoComplete={opts.autoComplete ?? "off"}
          required={opts.required}
          maxLength={opts.maxLength}
          aria-invalid={!!e || undefined}
          aria-describedby={describedBy(f, !!opts.hint, e)}
          className="field mt-2"
          value={v[f]}
          onChange={set(f)}
          onBlur={isField ? blur(f as Field) : undefined}
        />
        {isField ? errorText(f as Field) : null}
      </div>
    );
  };

  const chips = (name: string, options: { value: string; label: string }[], type: "radio" | "checkbox", legend: string) => (
    <fieldset>
      <legend className="field-label">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const checked =
            type === "checkbox" ? v.damage.includes(o.value) : (v[name as "insurance" | "contact"] as string) === o.value;
          return (
            <label key={o.value} className="chip">
              <input
                type={type}
                name={name}
                value={o.value}
                checked={checked}
                onChange={(e) =>
                  setV((p) =>
                    type === "checkbox"
                      ? { ...p, damage: e.target.checked ? [...p.damage, o.value] : p.damage.filter((x) => x !== o.value) }
                      : { ...p, [name]: o.value },
                  )
                }
              />
              <span aria-hidden className="chip-mark">
                ✓
              </span>
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  const nameAndPhone = (
    <div className="grid gap-5 sm:grid-cols-2">
      {textInput("name", S.contact.nameLabel, { autoComplete: "name", required: true, maxLength: 120 })}
      {textInput("phone", S.contact.phoneLabel, {
        type: "tel",
        inputMode: "tel",
        autoComplete: "tel",
        required: true,
        hint: S.contact.phoneHelp,
        maxLength: 40,
      })}
    </div>
  );

  const whatField = (
    <div>
      <label htmlFor={id("what")} className="field-label">
        {S.photos.whatHappenedLabel}
      </label>
      <p id={id("what-hint")} className="field-hint mt-1">
        {S.photos.whatHappenedHelp}
      </p>
      <textarea
        id={id("what")}
        name="what"
        rows={3}
        maxLength={2000}
        aria-describedby={id("what-hint")}
        className="field mt-2 resize-y"
        value={v.what}
        onChange={set("what")}
      />
    </div>
  );

  const photoField = (
    <div>
      <p id={id("photos-label")} className="field-label">
        {S.photos.photosLabel}
      </p>
      <p id={id("photos-hint")} className="field-hint mt-1">
        {S.photos.photosHelp}
      </p>
      {photos.length > 0 || processing > 0 ? (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5" aria-labelledby={id("photos-label")}>
          {photos.map((p, i) => (
            <li key={p.id} className="relative aspect-square border-2 border-ink bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={`${S.photos.photosLabel} ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(p.id)}
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center bg-ink text-white"
              >
                <CloseIcon className="h-4 w-4" />
                <span className="sr-only">
                  {S.photos.removePhoto} {i + 1}
                </span>
              </button>
            </li>
          ))}
          {Array.from({ length: processing }).map((_, i) => (
            <li
              key={`p${i}`}
              className="flex aspect-square items-center justify-center border-2 border-dashed border-ink bg-paper p-1 text-center text-[13px] text-steel"
            >
              {copy.extra.photoPreparing}
            </li>
          ))}
        </ul>
      ) : null}
      {js ? (
        <label
          className={`btn btn-md btn-ghost mt-3 w-full has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink sm:w-auto ${
            photos.length >= MAX_PHOTOS ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <CameraIcon />
          <span>{S.photos.addPhotos}</span>
          <input
            ref={fileRef}
            type="file"
            name="photos"
            accept="image/*"
            multiple
            disabled={photos.length >= MAX_PHOTOS}
            aria-labelledby={id("photos-label")}
            aria-describedby={id("photos-hint")}
            className="sr-only"
            onChange={(e) => addFiles(e.target.files)}
          />
        </label>
      ) : (
        <input
          type="file"
          name="photos"
          accept="image/*"
          multiple
          aria-labelledby={id("photos-label")}
          aria-describedby={id("photos-hint")}
          className="mt-3 block text-[15px]"
        />
      )}
      <p aria-live="polite" className="field-hint mt-2 min-h-[1.25rem]">
        {photoMsg.map((m, i) => (
          <span key={i}>
            {i ? " " : ""}
            <LineText line={m} />
          </span>
        ))}
      </p>
    </div>
  );

  const failurePanel =
    state === "failed" ? (
      <div ref={failRef} tabIndex={-1} role="alert" className="border-[3px] border-danger bg-danger-pale p-5">
        <p className="flex items-start gap-2 font-semibold text-danger">
          <AlertIcon className="mt-1 h-5 w-5 flex-none" />
          <span>
            {copy.errors.sendFailed.text}
            <Confirm confirmed={copy.errors.sendFailed.confirmed} />
          </span>
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a href={smsBody()} className="btn btn-md btn-ink">
            <TextIcon />
            <span>{copy.extra.fallbackText.text}</span>
            <ConfirmDot confirmed={copy.extra.fallbackText.confirmed} />
          </a>
          <a href={business.phoneHref} aria-label={`${copy.extra.fallbackCall} ${business.phoneDisplay}`} className="btn btn-md btn-ghost">
            <PhoneIcon />
            <span>{copy.extra.fallbackCall}</span>
          </a>
        </div>
      </div>
    ) : null;

  // Only list fields that are still invalid, so the summary clears as the user fixes them.
  const liveSummary = summary.filter((f) => validate(f));
  const errorSummary =
    liveSummary.length > 0 ? (
      <div ref={summaryRef} tabIndex={-1} role="alert" className="border-[3px] border-danger bg-danger-pale p-4">
        <p className="font-bold text-danger">{copy.errors.summary}</p>
        <ul className="mt-2 list-disc pl-5">
          {liveSummary.map((f) => (
            <li key={f}>
              <a href={`#${id(f)}`} className="underline underline-offset-4">
                {FIELD_LABELS[f]}: {validate(f)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const submitBlock = (
    <div className="grid gap-3">
      <p className={`font-semibold ${needsOwner(copy.replyTime.text) ? "review-only" : ""}`}>
        {copy.replyTime.text}
        <Confirm confirmed={copy.replyTime.confirmed} />
      </p>
      <button type="submit" disabled={state === "sending"} className="btn btn-lg btn-cyan w-full sm:w-auto">
        {state === "sending" ? copy.sending : copy.submit.text}
        <ConfirmDot confirmed={copy.submit.confirmed} />
      </button>
      <p className="text-[15px] text-steel">{copy.noObligation}</p>
      <p className="text-[15px] text-steel">
        {copy.privacy.text}{" "}
        <Link href={privacyLink.href} className="font-semibold text-ink underline underline-offset-4">
          {privacyLink.label}
        </Link>
      </p>
      <p aria-live="polite" className="sr-only">
        {state === "sending" ? copy.sending : ""}
      </p>
    </div>
  );

  const honeypot = (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <input ref={honeypotRef} type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" aria-hidden defaultValue="" />
    </div>
  );

  const stepHeading = (s: number) => (
    <h3 ref={step === s ? stepHeadingRef : undefined} tabIndex={-1} className="text-xl sm:text-2xl">
      <span className="block font-mono text-[14px] font-medium uppercase text-cyan-text">
        {fill(copy.progress, { current: s + 1, total: STEP_LABELS.length })}
      </span>
      {STEP_LABELS[s]}
    </h3>
  );

  return (
    <form
      action={action}
      method="post"
      encType="multipart/form-data"
      noValidate={js}
      onSubmit={submit}
      className="relative grid gap-6"
    >
      {honeypot}
      <input type="hidden" name="variant" value={variant} />
      {service ? <input type="hidden" name="service" value={service} /> : null}

      {full && js ? (
        <ol className="grid grid-cols-3 gap-2">
          {STEP_LABELS.map((label, i) => (
            <li key={label} aria-current={i === step ? "step" : undefined} className="text-[14px] font-semibold">
              <span aria-hidden className={`block h-2 ${i <= step ? "bg-ink" : "bg-line"}`} />
              <span className={`mt-2 block leading-tight ${i === step ? "text-ink" : "text-steel"}`}>{label}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {failurePanel}
      {errorSummary}

      {full ? (
        <>
          {show(0) ? (
            <div className="grid gap-6">
              {stepHeading(0)}
              {photoField}
              {chips(
                "damage",
                S.photos.damageChips.map((c) => ({ value: c, label: c })),
                "checkbox",
                S.photos.damageLabel,
              )}
              {whatField}
            </div>
          ) : null}

          {show(1) ? (
            <div className="grid gap-6">
              {stepHeading(1)}
              <div className="grid gap-5 sm:grid-cols-[7rem_1fr_1fr]">
                {textInput("year", S.vehicle.yearLabel, { inputMode: "numeric", maxLength: 4 })}
                {textInput("make", S.vehicle.makeLabel, { maxLength: 60 })}
                {textInput("model", S.vehicle.modelLabel, { maxLength: 60 })}
              </div>
              {chips("insurance", S.vehicle.insuranceOptions, "radio", S.vehicle.insuranceLabel)}
              {v.insurance === "yes" || !js ? textInput("insurer", S.vehicle.insurerLabel, { hint: S.vehicle.insurerHelp, maxLength: 120 }) : null}
            </div>
          ) : null}

          {show(2) ? (
            <div className="grid gap-6">
              {stepHeading(2)}
              {nameAndPhone}
              {chips("contact", S.contact.preferenceOptions, "radio", S.contact.preferenceLabel)}
            </div>
          ) : null}

          {js ? (
            <div className="flex flex-col-reverse gap-3 border-t-2 border-line pt-6 sm:flex-row sm:items-start sm:justify-between">
              {step > 0 ? (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-md btn-ghost">
                  {copy.back}
                </button>
              ) : (
                <span />
              )}
              {step < STEP_LABELS.length - 1 ? (
                <button type="button" onClick={next} className="btn btn-lg btn-ink w-full sm:w-auto">
                  {copy.next}
                </button>
              ) : (
                submitBlock
              )}
            </div>
          ) : (
            submitBlock
          )}
        </>
      ) : (
        <>
          {nameAndPhone}
          {whatField}
          {photoField}
          {submitBlock}
        </>
      )}
    </form>
  );
}
