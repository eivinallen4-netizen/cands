import Image from "next/image";
import Link from "next/link";
import { insurance as copy } from "@/content/pages";
import { primaryNav } from "@/content/nav";
import { pageMetadata, abs, businessId } from "@/lib/seo";
import { Confirm, LineText } from "@/components/ReviewMode";
import PageIntro from "@/components/PageIntro";
import ProcessTimeline from "@/components/ProcessTimeline";
import Checklist from "@/components/Checklist";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import RuleLabel from "@/components/RuleLabel";
import JsonLd from "@/components/JsonLd";
import { ArrowIcon } from "@/components/Icons";

export const metadata = pageMetadata({ absoluteTitle: copy.seo.title, description: copy.seo.description, path: "/insurance-claims" });

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const crumb = primaryNav.find((n) => n.href === "/insurance-claims")!;

// Pattern: timeline + legal callout + two document lists + side-by-side comparison.
export default function InsuranceClaims() {
  return (
    <>
      <PageIntro
        crumbs={[crumb]}
        h1={copy.h1}
        lead={<LineText line={copy.intro} />}
        meta={copy.lastReviewed}
        aside={
          <div className="relative aspect-[3/2] border-[3px] border-ink bg-paper">
            {/* Generated atmosphere image: decorative, not C&S work. */}
            <Image src="/images/insurance.jpg" alt="" fill preload sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        }
      />

      <section aria-labelledby="timeline-title" className="py-14 md:py-24">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16`}>
          <div>
            <h2 id="timeline-title" className="text-[28px] uppercase sm:text-[44px]">
              {copy.timeline.heading}
            </h2>
            <p className="lead mt-5 max-w-[60ch] text-lg">
              <LineText line={copy.timeline.lead} />
            </p>
            <div className="mt-10">
              <ProcessTimeline steps={copy.timeline.steps} orientation="vertical" />
            </div>
          </div>

          {/* "You choose the shop" callout */}
          <aside aria-labelledby="choose-title" className="on-cyan self-start border-[3px] border-ink bg-cyan p-6 sm:p-8 lg:sticky lg:top-32">
            <h2 id="choose-title" className="text-2xl uppercase sm:text-3xl">
              {copy.rightToChoose.heading}
              <Confirm confirmed={copy.rightToChoose.confirmed} />
            </h2>
            {copy.rightToChoose.body.map((p) => (
              <p key={p} className="mt-4 font-medium">
                {p}
              </p>
            ))}
            <a
              href={copy.rightToChoose.source.url}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex min-h-11 items-center font-bold underline underline-offset-4"
            >
              {copy.rightToChoose.source.label}
            </a>
            <p className="mt-3 border-t-2 border-ink pt-3 text-[15px]">{copy.rightToChoose.note}</p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="bring-title" className="bg-paper py-14 md:py-24">
        <div className={wrap}>
          <h2 id="bring-title" className="text-[28px] uppercase sm:text-[44px]">
            {copy.bring.heading}
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <RuleLabel as="h3">{copy.bring.requiredLabel}</RuleLabel>
              <Checklist className="mt-4" items={copy.bring.required.map((l) => ({ text: l.text, confirmed: l.confirmed }))} />
            </div>
            <div>
              <RuleLabel as="h3">{copy.bring.helpfulLabel}</RuleLabel>
              <Checklist className="mt-4" items={copy.bring.helpful.map((l) => ({ text: l.text, confirmed: l.confirmed }))} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pay-title" className="py-14 md:py-24">
        <div className={wrap}>
          <h2 id="pay-title" className="text-[28px] uppercase sm:text-[44px]">
            {copy.payment.heading}
          </h2>
          <div className="mt-10 grid gap-px border-[3px] border-ink bg-ink md:grid-cols-2">
            {[copy.payment.insurance, copy.payment.selfPay].map((col, i) => (
              <div key={col.title} className={i === 0 ? "on-dark bg-ink p-6 text-white sm:p-8" : "bg-white p-6 sm:p-8"}>
                <h3 className="text-2xl uppercase">{col.title}</h3>
                <Checklist className="mt-5" items={col.points.map((l) => ({ text: l.text, confirmed: l.confirmed }))} />
              </div>
            ))}
          </div>
          <h2 className="mt-14 text-2xl uppercase sm:text-3xl">{copy.repairs.heading}</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {copy.repairs.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="btn btn-md btn-ghost">
                  <span>{l.label}</span>
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="bg-paper py-14 md:py-24">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
          <div>
            <h2 id="faq-title" className="text-[28px] uppercase sm:text-[44px]">
              {copy.faqs.heading}
            </h2>
            <Link href={copy.faqs.link.href} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-cyan-text underline underline-offset-4">
              {copy.faqs.link.label} <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
          <FaqList faqs={copy.faqs.items} />
        </div>
      </section>

      <CtaBand heading={copy.cta.heading} buttons={[copy.cta.primary, copy.cta.secondary]} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: copy.h1,
          url: abs("/insurance-claims"),
          description: copy.seo.description,
          about: { "@id": businessId },
        }}
      />
    </>
  );
}
