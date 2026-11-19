import Link from "next/link";
import type { Faq } from "@/content/types";
import { Confirm } from "./ReviewMode";

/** Native details/summary accordion; the question is a heading inside the summary. */
export default function FaqList({ faqs, headingLevel = 3 }: { faqs: Faq[]; headingLevel?: 3 | 4 }) {
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <div className="border-t-[3px] border-ink">
      {faqs.map((f) => (
        <details key={f.q} className="group border-b border-line bg-white">
          <summary className="flex min-h-16 items-center justify-between gap-6 px-5 py-4">
            <H className="font-display text-lg font-bold leading-snug tracking-normal">
              {f.q}
              {f.confirmed === false ? <Confirm confirmed={false} /> : null}
            </H>
            <span
              aria-hidden
              className="faq-plus flex h-8 w-8 flex-none items-center justify-center bg-ink text-xl leading-none text-white transition-transform"
            >
              +
            </span>
          </summary>
          <div className="px-5 pb-6">
            <p className="max-w-[65ch] text-steel">{f.a}</p>
            {f.link ? (
              <Link
                href={f.link.href}
                className="mt-1 inline-flex min-h-11 items-center font-semibold text-cyan-text underline underline-offset-4"
              >
                {f.link.label}
              </Link>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
