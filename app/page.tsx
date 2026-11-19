import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { business, reviews, work } from "@/content/site";
import { home } from "@/content/home";
import { servicePages } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { needsOwner } from "@/lib/links";
import { novaPair } from "@/lib/work";
import { Confirm, LineText } from "@/components/ReviewMode";
import Button, { CButton } from "@/components/Button";
import RuleLabel from "@/components/RuleLabel";
import SectionHeader from "@/components/SectionHeader";
import TrustStrip from "@/components/TrustStrip";
import Stars from "@/components/Stars";
import ServiceIndex from "@/components/ServiceIndex";
import BeforeAfter from "@/components/BeforeAfter";
import ProcessTimeline from "@/components/ProcessTimeline";
import Checklist from "@/components/Checklist";
import ReviewList from "@/components/ReviewList";
import FaqList from "@/components/FaqList";
import EstimateForm from "@/components/EstimateForm";
import PhotoTips from "@/components/PhotoTips";
import VisitBlock from "@/components/VisitBlock";
import { ArrowIcon } from "@/components/Icons";

export const metadata = pageMetadata({
  absoluteTitle: home.seo.title,
  description: home.seo.description,
  path: "/",
});

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const section = "py-14 md:py-28";

// The generated spray-booth shot is atmosphere only (decorative, never captioned as C&S work).
const heroSrc = fs.existsSync(path.join(process.cwd(), "public/images/hero-booth.jpg"))
  ? "/images/hero-booth.jpg"
  : "/images/hero.png";

const textLink = "inline-flex min-h-11 items-center gap-2 font-semibold text-cyan-text underline underline-offset-4";

// The rating already sits in the hero proof line directly above, so the facts row skips it.
const trustRow = home.trust.filter((t) => !t.text.includes(business.rating));
const verified = home.why.points.filter((p) => p.confirmed);
const promises = home.why.points.filter((p) => !p.confirmed);

export default function Home() {
  const { hero } = home;
  return (
    <>
      {/* 1. HERO */}
      <section aria-labelledby="hero-title" className="on-dark relative isolate overflow-hidden bg-ink text-white">
        <Image
          src={heroSrc}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-[72%_center] opacity-60 md:opacity-100"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/10 max-md:bg-ink/55" />
        <div className={`${wrap} pb-8 pt-6 md:pb-24 md:pt-24`}>
          <div className="max-w-[660px]">
            <RuleLabel className="rise">{hero.eyebrow}</RuleLabel>
            <h1
              id="hero-title"
              className="rise mt-4 text-[34px] uppercase leading-[1.02] sm:text-6xl md:mt-6 lg:text-[68px]"
              style={{ animationDelay: "60ms" }}
            >
              {hero.h1}
              <span className="text-cyan">{hero.h1Accent}</span>
              <Confirm confirmed={hero.h1Confirmed} />
            </h1>
            <p className="rise lead mt-4 max-w-[52ch] text-lg md:mt-6 md:text-xl" style={{ animationDelay: "120ms" }}>
              {hero.subhead.text}
              <Confirm confirmed={hero.subhead.confirmed} />
            </p>
            <div className="rise mt-6 grid gap-3 sm:flex sm:flex-wrap md:mt-8" style={{ animationDelay: "180ms" }}>
              {/* Straight to the one-step form further down this page, not the longer /free-estimate page. */}
              <CButton b={hero.primary} href="#estimate" size="lg" shadow className="w-full sm:w-auto" />
              <div className="grid grid-cols-2 gap-3 sm:flex">
                {hero.secondary.map((b) => (
                  <CButton key={b.label} b={b} variant="ghost" className="px-3 sm:whitespace-nowrap" />
                ))}
              </div>
            </div>
            <p className={`mt-4 text-[15px] font-semibold text-white/85 ${needsOwner(hero.replyTime.text) ? "review-only" : ""}`}>
              {hero.replyTime.text}
              <Confirm confirmed={hero.replyTime.confirmed} />
            </p>
          </div>
        </div>
        <TrustStrip proof={hero.proof} />
      </section>

      {/* 2. RULED FACTS ROW */}
      <section aria-label={hero.eyebrow} className="border-b-[3px] border-ink">
        <ul className={`${wrap} flex flex-col divide-y divide-line py-2 md:flex-row md:divide-x md:divide-y-0 md:py-0`}>
          {trustRow.map((t) => (
            <li key={t.text} className="flex items-center py-3 text-[16px] font-semibold md:flex-1 md:justify-center md:px-4 md:py-5 md:text-center">
              {t.text}
              <Confirm confirmed={t.confirmed} />
            </li>
          ))}
        </ul>
      </section>

      {/* 3. OBJECTION STRIP */}
      <section aria-labelledby="answers-title" className={`${section} bg-paper`}>
        <div className={wrap}>
          <SectionHeader id="answers-title" title={home.objections.heading} />
          <ul className="mt-10 grid gap-px border-[3px] border-ink bg-ink md:grid-cols-3">
            {home.objections.items.map((o) => (
              <li key={o.q} className="flex flex-col bg-white p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl">
                  {o.q}
                  <Confirm confirmed={o.confirmed} />
                </h3>
                <p className="mt-3 max-w-[60ch] text-steel">{o.a}</p>
                {o.draft ? (
                  <p className="review-only mt-3 max-w-[60ch] border-l-4 border-ink pl-3 text-steel">
                    Proposed: {o.draft}
                    <Confirm confirmed={false} />
                  </p>
                ) : null}
                <Link href={o.link.href} className={`${textLink} mt-auto pt-3`}>
                  {o.link.label} <ArrowIcon className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. BEFORE & AFTER (real Nova pair) */}
      <section aria-labelledby="work-title" className={section}>
        <div className={wrap}>
          <SectionHeader id="work-title" variant="split" title={home.beforeAfter.heading} lead={home.beforeAfter.lead} />
          <div className="mt-10">
            <BeforeAfter before={novaPair.before} after={novaPair.after} />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CButton b={home.beforeAfter.button} href="#estimate" variant="ink" />
            <Link href={home.beforeAfter.link.href} className={textLink}>
              {home.beforeAfter.link.label} <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SERVICES DIRECTORY */}
      <section aria-labelledby="services-title" className={`${section} border-t-[3px] border-ink`}>
        <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader id="services-title" title={home.services.heading} lead={<LineText line={home.services.lead} />} />
            <Button href={home.services.link.href} variant="ink" className="mt-8" icon={<ArrowIcon />}>
              {home.services.link.label}
            </Button>
          </div>
          <ServiceIndex
            items={servicePages.map((s) => ({ name: s.name, body: s.card, href: `/${s.slug}` as const, confirmed: s.confirmed }))}
          />
        </div>
      </section>

      {/* 6. WHY CHOOSE: confirmed facts on ink beside the real shop, promises as a checklist */}
      <section aria-labelledby="why-title" className={`${section} bg-paper`}>
        <div className={wrap}>
          <SectionHeader id="why-title" title={home.why.heading} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="on-dark grid content-start gap-8 bg-ink p-7 text-white sm:p-10">
              {verified.map((f) => (
                <div key={f.title}>
                  <h3 className="text-2xl sm:text-[28px]">{f.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-white/80">{f.body}</p>
                </div>
              ))}
              <div className="relative aspect-[4/3] border-[3px] border-white">
                <Image src={work.shop.src} alt={work.shop.alt} fill sizes="(min-width:1024px) 520px, 100vw" className="object-cover" />
              </div>
            </div>
            <Checklist items={promises.map((t) => ({ title: t.title, body: t.body, confirmed: t.confirmed }))} />
          </div>
        </div>
      </section>

      {/* 7. REPAIR PROCESS */}
      <section aria-labelledby="process-title" className={`on-dark ${section} bg-ink text-white`}>
        <div className={wrap}>
          <SectionHeader id="process-title" title={home.process.heading} lead={home.process.lead} />
          <div className="mt-12">
            <ProcessTimeline steps={home.process.steps} />
          </div>
        </div>
      </section>

      {/* 8. INSURANCE BAND (cyan) */}
      <section aria-labelledby="insurance-title" className="on-cyan bg-cyan py-14 text-ink md:py-24">
        <div className={`${wrap} grid gap-10 md:grid-cols-2 md:gap-16`}>
          <div>
            <h2 id="insurance-title" className="text-[28px] uppercase sm:text-[44px]">
              {home.insurance.heading}
              <Confirm confirmed={home.insurance.confirmed} />
            </h2>
            <p className="mt-5 text-lg font-medium">{home.insurance.body}</p>
            <Button href={home.insurance.link.href} variant="ink" className="mt-8" icon={<ArrowIcon />}>
              {home.insurance.link.label}
            </Button>
          </div>
          <Checklist items={home.insurance.points.map((p) => ({ text: p.text, confirmed: p.confirmed }))} />
        </div>
      </section>

      {/* 9. REVIEWS */}
      <section aria-labelledby="reviews-title" className={section}>
        <div className={wrap}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="reviews-title" className="text-[28px] uppercase sm:text-[44px]">
                {home.reviews.heading}
              </h2>
              <p className="mt-4">
                <Stars>{home.reviews.lead}</Stars>
              </p>
            </div>
            <Button href={business.mapsUrl} external variant="ink">
              {home.reviews.googleButton}
            </Button>
          </div>
          <div className="mt-10">
            <ReviewList reviews={reviews} />
          </div>
          <a href={business.mapsUrl} target="_blank" rel="noopener" className={`${textLink} mt-6`}>
            {home.reviews.leaveReview}
          </a>
        </div>
      </section>

      {/* 10. FAQ */}
      <section aria-labelledby="faq-title" className={`${section} bg-paper`}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
          <div>
            <SectionHeader id="faq-title" title={home.faq.heading} lead={home.faq.lead} />
            <Button href={home.faq.link.href} variant="ghost" className="mt-8" icon={<ArrowIcon />}>
              {home.faq.link.label}
            </Button>
          </div>
          <FaqList faqs={home.faq.items} />
        </div>
      </section>

      {/* 11. COMPACT ESTIMATE FORM + PHOTO TIPS */}
      <section id="estimate" aria-labelledby="estimate-title" className={section}>
        <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
          <div className="grid content-start gap-8">
            <SectionHeader
              id="estimate-title"
              title={<LineText line={home.estimate.heading} />}
              lead={
                <>
                  {home.estimate.lead.text}
                  <Confirm confirmed={home.estimate.lead.confirmed} />
                  {/* home.estimate.honesty is not repeated here: the form's noObligation line under the
                      button already carries the same sentence word for word. */}
                </>
              }
            />
            <PhotoTips />
          </div>
          <div className="border-[3px] border-ink bg-white p-5 sm:p-10 lg:shadow-[10px_10px_0_var(--color-ink)]">
            <EstimateForm variant="compact" privacyLink={home.estimate.privacy} />
          </div>
        </div>
      </section>

      {/* 12. VISIT */}
      <VisitBlock />
    </>
  );
}
