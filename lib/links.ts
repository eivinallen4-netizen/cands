import { business } from "@/content/site";
import type { Href } from "@/content/types";

/** Maps a content Href ("tel" | "sms" | "maps" | Route) to a real URL. */
export function resolveHref(href: Href): string {
  if (href === "tel") return business.phoneHref;
  if (href === "sms") return business.smsHref;
  if (href === "maps") return business.mapsUrl;
  return href;
}

/** True while a line still holds a [bracket] the owner has to fill in. Such lines stay out of the public page. */
export function needsOwner(text: string) {
  return /\[[^\]]+\]/.test(text);
}

/** Replaces {key} tokens in a content string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in values ? String(values[k]) : m));
}
