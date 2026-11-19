import type { ReactNode } from "react";
import type { Button as ContentButton } from "@/content/types";
import { CButton } from "./Button";

/** Closing ink band: H2 (+ body) + content buttons. One per page at most. Not used on Home. */
export default function CtaBand({
  heading,
  body,
  buttons,
  children,
}: {
  heading: ReactNode;
  body?: ReactNode;
  buttons: ContentButton[];
  children?: ReactNode;
}) {
  return (
    <section className="on-dark bg-ink py-14 text-white md:py-24 print:hidden">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-[28px] uppercase sm:text-[44px]">{heading}</h2>
          {body ? <p className="lead mt-4 text-lg">{body}</p> : null}
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          {buttons.map((b, i) => (
            <CButton key={b.label} b={b} size="lg" variant={i === 0 ? "cyan" : "ghost"} />
          ))}
        </div>
      </div>
    </section>
  );
}
