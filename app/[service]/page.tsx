import Image from "next/image";
import { notFound } from "next/navigation";
import { servicePages, serviceTemplate } from "@/content/services";
import { home } from "@/content/home";
import { insurance as insuranceCopy } from "@/content/pages";
import { chrome } from "@/content/nav";
import type { ServiceSlug } from "@/content/types";
import { pageMetadata, abs, businessId } from "@/lib/seo";
import { areas } from "@/content/site";
import { Confirm, LineText } from "@/components/ReviewMode";
import { CButton } from "@/components/Button";
import PageIntro from "@/components/PageIntro";
import SectionHeader from "@/components/SectionHeader";
import DamageCheck from "@/components/DamageCheck";
import ProcessTimeline from "@/components/ProcessTimeline";
import FaqList from "@/components/FaqList";
import EstimateForm from "@/components/EstimateForm";
import PhotoTips from "@/components/PhotoTips";
import ServiceIndex from "@/components/ServiceIndex";
import JsonLd from "@/components/JsonLd";

// Uxui template B. One template, five statically generated pages; any other slug 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ service: s.slug }));
}

const find = (slug: string) => servicePages.find((s) => s.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const page = find((await params).service);
  if (!page) return {};
  return pageMetadata({ absoluteTitle: page.seo.title, description: page.seo.description, path: `/${page.slug}` });
}

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const section = "py-14 md:py-24";

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const page = find((await params).service);
  if (!page) notFound();
  const path = `/${page.slug}`;
  const related = page.related.map((slug: ServiceSlug) => servicePages.find((s) => s.slug === slug)!).filter(Boolean);

  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/services", label: chrome.servicesLabel },
          { href: path, label: page.name },
        ]}
        h1={
          <>
            {page.h1}
            <Confirm confirmed={page.confirmed} />
          </>
        }
        lead={page.intro}
        aside={
          <div className="relative aspect-[3/2] border-[3px] border-ink bg-paper">
            <Image src={page.image.src} alt={page.image.alt} fill preload sizes="(min-width:1180px) 480px, (min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        }
      >
        <CButton b={home.hero.primary} href="#estimate" size="lg" shadow />
        <CButton b={home.hero.secondary[0]} variant="ghost" size="lg" />
      </PageIntro>

      {/* Damage self-check: tapping a type fills "What happened?" in the form below */}
      <section aria-labelledby="damage-title" className={section}>
        <div className={wrap}>
          <SectionHeader id="damage-title" title={page.damage.heading} lead={page.damage.lead} />
          <div className="mt-10">
            <DamageCheck items={page.damage.items} />
          </div>
        </div>
      </section>

      {/* Steps (vertical) + extra sections */}
      <section aria-labelledby="steps-title" className={`${section} bg-paper`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <h2 id="steps-title" className="text-[28px] uppercase sm:text-[44px]">
              {page.steps.heading}
            </h2>
            <div className="mt-10">
              <ProcessTimeline steps={page.steps.items} orientation="vertical" />
            </div>
          </div>
          {page.sections.length ? (
            <div className="grid content-start gap-10">
              {page.sections.map((s) => (
                <div key={s.heading} className="border-t-[3px] border-ink pt-6">
                  <h2 className="text-2xl uppercase sm:text-3xl">
                    {s.heading}
                    <Confirm confirmed={s.confirmed} />
                  </h2>
                  {s.body.map((p) => (
                    <p key={p} className="mt-3 max-w-[62ch] text-steel">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Price: receipt of factors, then insurance vs paying yourself */}
      <section aria-labelledby="price-title" className={section}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
          <div>
            <h2 id="price-title" className="text-[28px] uppercase sm:text-[44px]">
              {page.price.heading}
              <Confirm confirmed={page.price.confirmed} />
            </h2>
            <p className="lead mt-5 max-w-[60ch] text-lg">{page.price.lead}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: insuranceCopy.payment.insurance.title, body: page.price.insurance },
                { title: insuranceCopy.payment.selfPay.title, body: page.price.selfPay },
              ].map((c) => (
                <div key={c.title} className="border-t-[3px] border-ink pt-4">
                  <h3 className="text-xl">{c.title}</h3>
                  <p className="mt-2 text-steel">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <dl className="border-[3px] border-dashed border-ink bg-paper p-5 font-mono text-[15px] sm:p-8">
            {page.price.factors.map((f, i) => (
              <div key={f.label} className={`grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6 ${i ? "border-t border-dashed border-steel" : ""}`}>
                <dt className="font-medium uppercase">{f.label}</dt>
                <dd className="font-body text-[16px] text-steel">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className={`${section} bg-paper`}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
          <h2 id="faq-title" className="text-[28px] uppercase sm:text-[44px]">
            {home.faq.heading}
          </h2>
          <FaqList faqs={page.faqs} />
        </div>
      </section>

      {/* Compact estimate form with this service preselected */}
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
                </>
              }
            />
            <PhotoTips />
          </div>
          <div className="border-[3px] border-ink bg-white p-5 sm:p-10">
            <EstimateForm variant="compact" service={page.name} />
          </div>
        </div>
      </section>

      {/* Related services */}
      <section aria-labelledby="related-title" className={`${section} border-t-[3px] border-ink`}>
        <div className={wrap}>
          <h2 id="related-title" className="text-[28px] uppercase sm:text-[44px]">
            {serviceTemplate.relatedHeading}
          </h2>
          <div className="mt-8">
            <ServiceIndex items={related.map((s) => ({ name: s.name, body: s.card, href: `/${s.slug}` as const, confirmed: s.confirmed }))} />
          </div>
        </div>
      </section>

      {/* Service schema only once the owner confirms the service. */}
      {page.confirmed ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.name,
            serviceType: page.name,
            description: page.intro,
            url: abs(path),
            provider: { "@id": businessId },
            areaServed: areas.map((a) => ({ "@type": "Place", name: `${a}, NV` })),
          }}
        />
      ) : null}
    </>
  );
}
