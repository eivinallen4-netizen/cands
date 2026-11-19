import { faq as copy } from "@/content/pages";
import { primaryNav } from "@/content/nav";
import { LineText } from "@/components/ReviewMode";
import { pageMetadata } from "@/lib/seo";
import PageIntro from "@/components/PageIntro";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMetadata({ absoluteTitle: copy.seo.title, description: copy.seo.description, path: "/faq" });

const crumb = primaryNav.find((n) => n.href === "/faq")!;

// Pattern: jump chips + grouped accordions with an H2 per group. No FAQPage schema (no rich result since 2026).
export default function Faq() {
  return (
    <>
      <PageIntro crumbs={[crumb]} h1={copy.h1} lead={copy.intro} meta={copy.lastReviewed} />
      <nav aria-label={copy.h1} className="sticky top-[67px] z-30 border-b-[3px] border-ink bg-white lg:top-[91px]">
        <ul className="mx-auto flex w-full max-w-[1180px] gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {copy.groups.map((g) => (
            <li key={g.id} className="flex-none">
              <a href={`#${g.id}`} className="chip whitespace-nowrap hover:bg-paper">
                {g.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mx-auto grid w-full max-w-[960px] gap-14 px-5 py-14 sm:px-8 md:py-24">
        {copy.groups.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-40">
            <h2 id={`${g.id}-title`} className="text-[28px] uppercase sm:text-[44px]">
              {g.heading}
            </h2>
            <div className="mt-6">
              <FaqList faqs={g.items} />
            </div>
          </section>
        ))}
      </div>
      <CtaBand heading={copy.cta.heading} body={<LineText line={copy.cta.body} />} buttons={[copy.cta.primary, copy.cta.secondary]} />
    </>
  );
}
