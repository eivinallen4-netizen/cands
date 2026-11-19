import Link from "next/link";
import { contact as copy } from "@/content/pages";
import { business } from "@/content/site";
import { primaryNav } from "@/content/nav";
import { pageMetadata, abs, businessId } from "@/lib/seo";
import { ConfirmDot } from "@/components/ReviewMode";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import VisitBlock from "@/components/VisitBlock";
import JsonLd from "@/components/JsonLd";
import { ArrowIcon, PhoneIcon, TextIcon } from "@/components/Icons";

export const metadata = pageMetadata({ absoluteTitle: copy.seo.title, description: copy.seo.description, path: "/contact" });

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const crumb = primaryNav.find((n) => n.href === "/contact")!;

// Pattern: NAP first, big tap targets, then hours + map + areas, then onward links.
export default function Contact() {
  return (
    <>
      <section className="pb-10 pt-4 md:pb-14 md:pt-8">
        <div className={wrap}>
          <Breadcrumbs items={[crumb]} />
          <h1 className="mt-4 text-[34px] uppercase sm:text-6xl">{copy.h1}</h1>
          <p className="lead mt-5 max-w-[62ch] text-lg md:text-xl">{copy.lead}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:max-w-2xl">
            <Button href={business.phoneHref} size="lg" icon={<PhoneIcon />}>
              {copy.callLabel} · {business.phoneDisplay}
            </Button>
            <Button href={business.smsHref} variant="ink" size="lg" icon={<TextIcon />}>
              {copy.textLabel.text}
              <ConfirmDot confirmed={copy.textLabel.confirmed} />
            </Button>
          </div>
        </div>
      </section>

      <VisitBlock
        id="contact-visit"
        heading={copy.hoursHeading}
        lead=""
        directions={copy.directionsLabel}
        call={copy.callLabel}
        areasHeading={copy.areas.heading}
        areas={copy.areas.list}
        areasBody={copy.areas.body}
      />

      <section aria-labelledby="notsure-title" className="bg-paper py-14 md:py-20">
        <div className={wrap}>
          <h2 id="notsure-title" className="text-[28px] uppercase sm:text-[44px]">
            {copy.notSure.heading}
          </h2>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {copy.notSure.links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <Link href={l.href} className="flex min-h-14 items-center justify-between gap-4 font-display text-lg font-extrabold hover:text-cyan-text">
                  {l.label}
                  <ArrowIcon className="h-5 w-5 text-cyan-text" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: copy.h1,
          url: abs("/contact"),
          description: copy.seo.description,
          about: { "@id": businessId },
        }}
      />
    </>
  );
}
