import Image from "next/image";
import Link from "next/link";
import { about as copy } from "@/content/pages";
import { home } from "@/content/home";
import { business, reviews, work } from "@/content/site";
import { primaryNav } from "@/content/nav";
import { pageMetadata, abs, businessId } from "@/lib/seo";
import { Confirm, LineText } from "@/components/ReviewMode";
import PageIntro from "@/components/PageIntro";
import Checklist from "@/components/Checklist";
import ReviewList from "@/components/ReviewList";
import Stars from "@/components/Stars";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { ArrowIcon } from "@/components/Icons";

export const metadata = pageMetadata({ absoluteTitle: copy.seo.title, description: copy.seo.description, path: "/about" });

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const crumb = primaryNav.find((n) => n.href === "/about")!;

// Pattern: story beside the real shop photo, then a facts ledger (dl), values checklist, reviews.
export default function About() {
  return (
    <>
      <PageIntro
        crumbs={[crumb]}
        h1={copy.h1}
        lead={copy.story.map((p) => (
          <p key={p} className="mt-3 first:mt-0">
            {p}
          </p>
        ))}
        aside={
          <figure className="relative aspect-[4/3] border-[3px] border-ink bg-paper">
            <Image src={work.shop.src} alt={work.shop.alt} fill preload sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </figure>
        }
      >
        {copy.links.map((l) => (
          <Link key={l.href} href={l.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-cyan-text underline underline-offset-4">
            {l.label} <ArrowIcon className="h-4 w-4" />
          </Link>
        ))}
      </PageIntro>

      {/* Owner block: placeholders until the owner supplies them. Shown in review mode only. */}
      <section className="review-only bg-tape/30 py-8">
        <div className={wrap}>
          <p className="font-bold">
            {copy.owner.name.text}
            <Confirm confirmed={copy.owner.name.confirmed} />
          </p>
          <p>
            {copy.owner.story.text}
            <Confirm confirmed={copy.owner.story.confirmed} />
          </p>
          <p>
            {copy.owner.photo.text}
            <Confirm confirmed={copy.owner.photo.confirmed} />
          </p>
        </div>
      </section>

      <section aria-labelledby="facts-title" className="py-14 md:py-24">
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <h2 id="facts-title" className="text-[28px] uppercase sm:text-[44px]">
              {copy.facts.heading}
            </h2>
            <dl className="mt-8 border-t-[3px] border-ink">
              {copy.facts.rows.map((r) => (
                <div key={r.label} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[15px] font-medium uppercase text-steel">{r.label}</dt>
                  <dd className="font-semibold">
                    {r.label === "Phone" ? (
                      <a href={business.phoneHref} className="inline-flex min-h-11 items-center underline underline-offset-4">
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                    <Confirm confirmed={r.confirmed} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-[28px] uppercase sm:text-[44px]">{copy.values.heading}</h2>
            <Checklist className="mt-8" items={copy.values.items.map((l) => ({ text: l.text, confirmed: l.confirmed }))} />
          </div>
        </div>
      </section>

      <section aria-labelledby="reviews-title" className="bg-paper py-14 md:py-24">
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
        </div>
      </section>

      <CtaBand heading={<LineText line={copy.cta.heading} />} buttons={[copy.cta.primary, copy.cta.secondary]} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: copy.h1,
          url: abs("/about"),
          description: copy.seo.description,
          about: { "@id": businessId },
        }}
      />
    </>
  );
}
