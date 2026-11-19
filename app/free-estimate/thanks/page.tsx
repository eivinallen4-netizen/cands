import Link from "next/link";
import { freeEstimate } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { Confirm } from "@/components/ReviewMode";
import { CButton } from "@/components/Button";
import ThanksHeading from "@/components/ThanksHeading";
import ProcessTimeline from "@/components/ProcessTimeline";
import { ArrowIcon, CheckIcon } from "@/components/Icons";

const copy = freeEstimate.thanks;

// noindex, and left out of the sitemap.
export const metadata = pageMetadata({
  absoluteTitle: copy.seo.title,
  description: copy.seo.description,
  path: "/free-estimate/thanks",
  noindex: true,
});

export default function Thanks() {
  return (
    <section className="py-14 md:py-24">
      <div className="mx-auto w-full max-w-[860px] px-5 sm:px-8">
        <span aria-hidden className="flex h-14 w-14 items-center justify-center bg-cyan text-ink">
          <CheckIcon className="h-8 w-8" />
        </span>
        <ThanksHeading withName={copy.heading} withoutName={copy.headingNoName} />
        <p className="lead mt-5 max-w-[60ch] text-lg">
          {copy.lead.text}
          <Confirm confirmed={copy.lead.confirmed} />
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {copy.buttons.map((b, i) => (
            <CButton key={b.label} b={b} size="lg" variant={i === 0 ? "cyan" : "ink"} />
          ))}
        </div>
        <h2 className="mt-14 text-[28px] uppercase sm:text-[44px]">{copy.nextHeading}</h2>
        <div className="mt-8">
          <ProcessTimeline steps={copy.next} orientation="vertical" />
        </div>
        <Link href={copy.link.href} className="mt-10 inline-flex min-h-11 items-center gap-2 font-semibold text-cyan-text underline underline-offset-4">
          {copy.link.label} <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
