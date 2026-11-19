import Link from "next/link";
import type { Item, Link as ContentLink } from "@/content/types";
import { Confirm } from "./ReviewMode";

type Step = Item & { link?: ContentLink };

/**
 * Numbered timeline.
 * - "auto": vertical on phones, horizontal from lg (for ink grounds, `.on-dark`).
 * - "vertical": always vertical, for light grounds (insurance claim steps, service steps).
 */
export default function ProcessTimeline({
  steps,
  orientation = "auto",
}: {
  steps: Step[];
  orientation?: "auto" | "vertical";
}) {
  const auto = orientation === "auto";
  return (
    <ol
      className={`relative grid gap-10 ${auto ? "lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] lg:gap-6" : ""}`}
      style={auto ? ({ "--cols": steps.length } as React.CSSProperties) : undefined}
    >
      <span
        aria-hidden
        className={`absolute left-[19px] top-2 h-[calc(100%-1rem)] w-[3px] ${auto ? "bg-white/20 lg:left-0 lg:top-[19px] lg:h-[3px] lg:w-full" : "bg-line"}`}
      />
      {steps.map((s, i) => (
        <li key={s.title} className={`relative pl-16 ${auto ? "lg:pl-0 lg:pt-16" : ""}`}>
          <span
            aria-hidden
            className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-cyan font-display text-lg font-black text-ink"
          >
            {i + 1}
          </span>
          <h3 className="text-xl sm:text-2xl">
            {s.title}
            {s.confirmed === false ? <Confirm confirmed={false} /> : null}
          </h3>
          <p className={`lead mt-3 ${auto ? "max-w-[40ch]" : "max-w-[60ch]"}`}>{s.body}</p>
          {s.link ? (
            <Link href={s.link.href} className="mt-1 inline-flex min-h-11 items-center font-semibold text-cyan-text underline underline-offset-4">
              {s.link.label}
            </Link>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
