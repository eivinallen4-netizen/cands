"use client";

import { useState } from "react";
import type { Item } from "@/content/types";
import { Confirm } from "./ReviewMode";
import { CheckIcon } from "./Icons";

/**
 * "Is this you?" self-check. Tapping a damage type marks it and fills the page's estimate form
 * ("What happened?") with that damage type, then moves focus to the field.
 */
export default function DamageCheck({ items }: { items: Item[] }) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d) => {
        const on = picked === d.title;
        return (
          <li key={d.title}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => {
                setPicked(d.title);
                window.dispatchEvent(new CustomEvent("estimate:prefill", { detail: { text: d.title } }));
              }}
              className={`flex h-full min-h-24 w-full items-start gap-3 border-[3px] border-ink p-5 text-left transition-colors ${
                on ? "bg-ink text-white" : "bg-white hover:bg-paper"
              }`}
            >
              <span
                aria-hidden
                className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center border-2 ${on ? "border-cyan bg-cyan text-ink" : "border-ink"}`}
              >
                {on ? <CheckIcon className="h-4 w-4" /> : null}
              </span>
              <span>
                <span className="block font-display text-lg font-extrabold leading-snug">
                  {d.title}
                  {!d.confirmed ? <Confirm confirmed={false} /> : null}
                </span>
                <span className={`mt-1 block text-[15px] ${on ? "text-white/80" : "text-steel"}`}>{d.body}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
