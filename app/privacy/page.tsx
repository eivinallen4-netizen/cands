import { privacy as copy } from "@/content/pages";
import { footerNav } from "@/content/nav";
import { pageMetadata } from "@/lib/seo";
import { Confirm, LineText } from "@/components/ReviewMode";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = pageMetadata({ absoluteTitle: copy.seo.title, description: copy.seo.description, path: "/privacy" });

const crumb = footerNav.legal.find((n) => n.href === "/privacy")!;

// Pattern: plain single-column document, 65ch.
export default function Privacy() {
  return (
    <article className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-4 sm:px-8 md:pt-8">
      <Breadcrumbs items={[crumb]} />
      <h1 className="mt-4 text-[34px] uppercase sm:text-5xl">
        {copy.h1}
        <Confirm confirmed={copy.confirmed} />
      </h1>
      <p className="mt-3 font-mono text-[14px] font-medium text-steel">{copy.lastUpdated}</p>
      <p className="mt-6 max-w-[65ch] text-lg">{copy.intro}</p>
      {copy.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-2xl uppercase sm:text-3xl">
            {s.heading}
            <Confirm confirmed={s.confirmed} />
          </h2>
          {s.body.map((p) => (
            <p key={p} className="mt-3 max-w-[65ch]">
              {p}
            </p>
          ))}
          {s.heading === "How to Make a Request" ? (
            // No confirmed email yet: the placeholder shows in review mode only.
            <p className="review-only mt-3 max-w-[65ch]">
              <LineText line={copy.requestEmail} />
            </p>
          ) : null}
        </section>
      ))}
    </article>
  );
}
