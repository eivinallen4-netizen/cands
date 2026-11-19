import Link from "next/link";
import { servicesHub as copy } from "@/content/pages";
import { servicePages } from "@/content/services";
import { chrome } from "@/content/nav";
import { pageMetadata } from "@/lib/seo";
import { Confirm, LineText } from "@/components/ReviewMode";
import PageIntro from "@/components/PageIntro";
import ServiceIndex from "@/components/ServiceIndex";
import CtaBand from "@/components/CtaBand";
import { ArrowIcon } from "@/components/Icons";

export const metadata = pageMetadata({ absoluteTitle: copy.seo.title, description: copy.seo.description, path: "/services" });

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";

// Pattern: directory with photos, then an "if this, then that" decision table.
export default function ServicesHub() {
  return (
    <>
      <PageIntro crumbs={[{ href: "/services", label: chrome.servicesLabel }]} h1={copy.h1} lead={<LineText line={copy.intro} />} />

      <section aria-labelledby="list-title" className="py-14 md:py-24">
        <div className={wrap}>
          <h2 id="list-title" className="text-[28px] uppercase sm:text-[44px]">
            {copy.listHeading}
          </h2>
          <div className="mt-8">
            <ServiceIndex
              items={servicePages.map((s) => ({
                name: s.name,
                body: s.card,
                href: `/${s.slug}` as const,
                confirmed: s.confirmed,
                image: s.image,
              }))}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="choose-title" className="bg-paper py-14 md:py-24">
        <div className={wrap}>
          <h2 id="choose-title" className="text-[28px] uppercase sm:text-[44px]">
            {copy.choose.heading}
          </h2>
          <p className="lead mt-5 max-w-[60ch] text-lg">{copy.choose.lead}</p>
          <dl className="mt-10 border-t-[3px] border-ink">
            {copy.choose.items.map((it) => (
              <div key={it.title} className="grid gap-2 border-b border-line py-5 md:grid-cols-[1fr_auto_1.3fr] md:items-center md:gap-8">
                <dt className="font-display text-xl font-extrabold">
                  {it.title}
                  <Confirm confirmed={it.confirmed} />
                </dt>
                <ArrowIcon className="hidden h-6 w-6 text-cyan-text md:block" />
                <dd>
                  <p className="text-steel">{it.body}</p>
                  <Link href={it.link.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-cyan-text underline underline-offset-4">
                    {it.link.label}
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand heading={<LineText line={copy.cta.heading} />} body={<LineText line={copy.cta.body} />} buttons={[copy.cta.primary, copy.cta.secondary]} />
    </>
  );
}
