"use client";

import { useEffect } from "react";

// Shows the yellow "Confirm with owner" tags in dev, or on any build at ?review=1.
// A ?review=1 view also gets a noindex robots tag so review URLs never get indexed.
export default function ReviewMode() {
  useEffect(() => {
    const review = new URLSearchParams(window.location.search).get("review") === "1";
    if (process.env.NODE_ENV !== "production" || review) {
      document.documentElement.setAttribute("data-review", "");
    }
    if (review && !document.querySelector('meta[name="robots"][data-review]')) {
      const m = document.createElement("meta");
      m.name = "robots";
      m.content = "noindex";
      m.setAttribute("data-review", "");
      document.head.appendChild(m);
    }
  }, []);
  return null;
}

export function Confirm({ confirmed }: { confirmed: boolean }) {
  if (confirmed) return null;
  return <span className="confirm-tag">Confirm with owner</span>;
}

/**
 * Compact review flag for tight spots (header button, sticky bar, button labels): a yellow dot in
 * the top-right corner of the nearest positioned parent. Hidden for the public, like the tag.
 */
export function ConfirmDot({ confirmed }: { confirmed: boolean }) {
  if (confirmed) return null;
  return (
    <span className="confirm-dot" title="Confirm with owner">
      <span className="sr-only">Confirm with owner</span>
    </span>
  );
}

/** A content Line: its text plus the review tag when unconfirmed. */
export function LineText({ line }: { line: { text: string; confirmed: boolean } }) {
  return (
    <>
      {line.text}
      <Confirm confirmed={line.confirmed} />
    </>
  );
}
