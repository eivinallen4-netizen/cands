import { freeEstimate as copy } from "@/content/pages";
import { estimateLink } from "@/content/nav";
import { pageMetadata } from "@/lib/seo";
import { resolveHref } from "@/lib/links";
import { Confirm } from "@/components/ReviewMode";
import PageIntro from "@/components/PageIntro";
import EstimateForm from "@/components/EstimateForm";
import PhotoTips from "@/components/PhotoTips";
import VisitBlock from "@/components/VisitBlock";
import { CameraIcon, PhoneIcon, TextIcon } from "@/components/Icons";

export const metadata = pageMetadata({ absoluteTitle: copy.seo.title, description: copy.seo.description, path: "/free-estimate" });

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";

// Pattern: form-first. The one-step form beside the photo tips, then the call / text alternatives.
export default function FreeEstimate() {
  return (
    <>
      <PageIntro
        crumbs={[estimateLink]}
        h1={copy.h1}
        lead={
          <>
            {copy.lead.text}
            <Confirm confirmed={copy.lead.confirmed} />
          </>
        }
      />

      <section id="estimate-form" aria-labelledby="form-title" className="scroll-mt-24 bg-paper py-10 md:py-20">
        <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14`}>
          <div className="border-[3px] border-ink bg-white p-5 sm:p-10">
            <h2 id="form-title" className="mb-6 text-[28px] uppercase sm:text-4xl">
              {copy.form.heading}
            </h2>
            <EstimateForm variant="compact" />
          </div>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <PhotoTips />
          </div>
        </div>
      </section>

      <section aria-labelledby="ways-title" className="border-t-[3px] border-ink py-12 md:py-16">
        <div className={wrap}>
          <h2 id="ways-title" className="text-2xl uppercase sm:text-3xl">
            {copy.ways.heading}
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {copy.ways.options.map((o, i) => {
              // "Use the form" points at this page: jump to the form instead.
              const href = o.href === "/free-estimate" ? "#estimate-form" : resolveHref(o.href);
              const Icon = o.href === "tel" ? PhoneIcon : o.href === "sms" ? TextIcon : CameraIcon;
              return (
                <li key={o.label}>
                  <a
                    href={href}
                    className={`flex h-full min-h-24 items-start gap-4 border-[3px] border-ink p-5 transition-colors ${
                      i === 0 ? "bg-cyan hover:bg-[#33bcda]" : "bg-white hover:bg-paper"
                    }`}
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center bg-ink text-white">
                      <Icon />
                    </span>
                    <span>
                      <span className="block font-display text-lg font-extrabold uppercase">
                        {o.label}
                        <Confirm confirmed={o.confirmed} />
                      </span>
                      <span className="mt-1 block text-[15px]">{o.body}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <VisitBlock />
    </>
  );
}
