"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { business } from "@/content/site";
import { chrome } from "@/content/nav";
import { PhoneIcon, PinIcon, TextIcon, CameraIcon } from "./Icons";
import { ConfirmDot } from "./ReviewMode";

type Third = "directions" | "estimate";

/**
 * Phones only (< md). Call | Text photos | Directions (or Estimate), 56px each, safe-area padding.
 * Hides while a form field has focus so it never sits over the keyboard or the submit button.
 */
export default function StickyActionBar({ third = "directions" }: { third?: Third }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && !!t.closest("form") && t.matches("input:not([type=checkbox]):not([type=radio]):not([type=file]), textarea, select");
    const onIn = (e: FocusEvent) => isField(e.target) && setHidden(true);
    const onOut = (e: FocusEvent) => {
      if (isField(e.target) && !isField(e.relatedTarget)) setHidden(false);
    };
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  const cell = "flex h-14 flex-col items-center justify-center gap-0.5 font-display text-[14px] font-extrabold uppercase";
  return (
    <nav
      aria-label="Quick actions"
      className={`on-dark print:hidden fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t-[3px] border-ink bg-ink pb-[env(safe-area-inset-bottom)] transition-transform md:hidden ${
        hidden ? "translate-y-full" : ""
      }`}
    >
      <a href={business.phoneHref} className={`${cell} bg-cyan text-ink`}>
        <PhoneIcon className="h-5 w-5" />
        {chrome.stickyBar.call}
      </a>
      <a href={business.smsHref} className={`${cell} relative border-x border-white/25 text-white`}>
        <TextIcon className="h-5 w-5" />
        {chrome.stickyBar.text.text}
        <span className="absolute right-3 top-3">
          <ConfirmDot confirmed={chrome.stickyBar.text.confirmed} />
        </span>
      </a>
      {third === "directions" ? (
        <a href={business.mapsUrl} target="_blank" rel="noopener" className={`${cell} text-white`}>
          <PinIcon className="h-5 w-5" />
          {chrome.stickyBar.directions}
        </a>
      ) : (
        <Link href="/free-estimate" className={`${cell} text-white`}>
          <CameraIcon className="h-5 w-5" />
          {chrome.stickyBar.estimate}
        </Link>
      )}
    </nav>
  );
}
