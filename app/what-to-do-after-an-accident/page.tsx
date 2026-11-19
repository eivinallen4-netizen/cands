import Image from "next/image";
import Link from "next/link";
import { afterAccident as copy } from "@/content/pages";
import { business } from "@/content/site";
import { footerNav } from "@/content/nav";
import { pageMetadata } from "@/lib/seo";
import { Confirm, LineText } from "@/components/ReviewMode";
import PageIntro from "@/components/PageIntro";
import PrintButton from "@/components/PrintButton";
import CtaBand from "@/components/CtaBand";
import { ArrowIcon } from "@/components/Icons";

export const metadata = pageMetadata({
  absoluteTitle: copy.seo.title,
  description: copy.seo.description,
  path: "/what-to-do-after-an-accident",
});

/** Links the source's label (e.g. "Nevada DMV") where it appears in a checklist point. */
function withSourceLink(text: string, source: { label: string; url: string }) {
  const i = text.indexOf(source.label);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <a href={source.url} target="_blank" rel="noopener" className="font-semibold text-cyan-text underline underline-offset-4">
        {source.label}
      </a>
      {text.slice(i + source.label.length)}
    </>
  );
}

const crumb = footerNav.company.find((n) => n.href === "/what-to-do-after-an-accident")!;

// Pattern: a printable numbered checklist (print styles in globals.css hide the site chrome).
export default function AfterAccident() {
  return (
    <>
      <PageIntro
        crumbs={[crumb]}
        h1={copy.h1}
        lead={copy.intro}
        aside={
          <div className="relative aspect-[3/2] border-[3px] border-ink bg-paper print:hidden">
            {/* Generated atmosphere image: decorative, not C&S work. */}
            <Image src="/images/after-accident.jpg" alt="" fill preload sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        }
      >
        <PrintButton label={copy.printLabel} />
      </PageIntro>

      <section aria-label={copy.h1} className="py-14 md:py-24 print:py-4">
        <div className="mx-auto w-full max-w-[860px] px-5 sm:px-8">
          {/* Print only: who gave you this checklist, since the header and footer are not printed. */}
          <p className="mb-4 hidden border-b-2 border-ink pb-2 font-bold print:block">
            {business.name} · {business.street}, {business.city}, {business.state} {business.zip} · {business.phoneDisplay}
          </p>
          <ol className="grid gap-6 print:gap-3">
            {copy.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 border-[3px] border-ink p-5 break-inside-avoid sm:grid-cols-[4rem_1fr] sm:p-7 print:border-2 print:p-3">
                <span aria-hidden className="flex h-12 w-12 items-center justify-center bg-cyan font-display text-2xl font-black text-ink sm:h-14 sm:w-14 print:border-2 print:border-ink print:bg-white">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-2xl sm:text-[28px]">
                    {s.title}
                    <Confirm confirmed={s.confirmed} />
                  </h2>
                  <p className="mt-2 max-w-[62ch] text-steel print:text-ink">{s.body}</p>
                  <ul className="mt-4 grid gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span aria-hidden className="mt-1 h-5 w-5 flex-none border-2 border-ink" />
                        <span>{s.source ? withSourceLink(p, s.source) : p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t-2 border-line pt-4 text-[15px] text-steel print:text-ink">{copy.disclaimer}</p>
        </div>
      </section>

      <CtaBand heading={<LineText line={copy.cta.heading} />} body={<LineText line={copy.cta.body} />} buttons={[copy.cta.primary, copy.cta.secondary]}>
        <Link href={copy.cta.link.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-white underline underline-offset-4">
          {copy.cta.link.label} <ArrowIcon className="h-4 w-4" />
        </Link>
      </CtaBand>
    </>
  );
}
