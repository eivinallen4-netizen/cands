import type { Metadata } from "next";
import { notFound as copy } from "@/content/pages";
import Button, { CButton } from "@/components/Button";

export const metadata: Metadata = {
  title: { absolute: copy.seo.title },
  description: copy.seo.description,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <p className="font-mono text-[15px] font-medium text-cyan-text">404</p>
        <h1 className="mt-2 max-w-3xl text-[34px] uppercase sm:text-6xl">{copy.h1}</h1>
        <p className="lead mt-5 max-w-[60ch] text-lg">{copy.line}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {copy.links.map((l, i) => (
            <Button key={l.href} href={l.href} variant={i === 0 ? "ink" : "ghost"}>
              {l.label}
            </Button>
          ))}
          <CButton b={copy.call} variant="cyan" />
        </div>
      </div>
    </section>
  );
}
