import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

/** Inner-page top: breadcrumbs, H1, lead, optional actions and meta line. */
export default function PageIntro({
  crumbs,
  h1,
  lead,
  meta,
  children,
  aside,
}: {
  crumbs: { href: string; label: string }[];
  h1: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  /** Right column on desktop (image). */
  aside?: ReactNode;
}) {
  return (
    <section className="border-b-[3px] border-ink pb-12 pt-4 md:pb-20 md:pt-8">
      <div className={`mx-auto grid w-full max-w-[1180px] gap-8 px-5 sm:px-8 ${aside ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14" : ""}`}>
        <div>
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 max-w-4xl text-[34px] uppercase sm:text-6xl lg:text-[64px]">{h1}</h1>
          {lead ? <div className="lead mt-5 max-w-[62ch] text-lg md:text-xl">{lead}</div> : null}
          {meta ? <p className="mt-4 font-mono text-[14px] font-medium text-steel">{meta}</p> : null}
          {children ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div> : null}
        </div>
        {aside}
      </div>
    </section>
  );
}
