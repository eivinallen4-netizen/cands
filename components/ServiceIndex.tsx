import Image from "next/image";
import Link from "next/link";
import type { Img, Route } from "@/content/types";
import { Confirm } from "./ReviewMode";
import { ArrowIcon } from "./Icons";

export type ServiceRow = { name: string; body: string; href: Route; confirmed?: boolean; image?: Img };

/** Numbered directory of services. Each whole row is a link to its page. Optional 3:2 thumbnail (hub page). */
export default function ServiceIndex({ items, headingLevel = 3 }: { items: ServiceRow[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ol className="border-t-[3px] border-ink">
      {items.map((s, i) => (
        <li key={s.href + s.name} className="border-b border-line">
          <Link
            href={s.href}
            className={`group grid items-start gap-x-3 gap-y-4 py-6 transition-colors hover:bg-paper sm:px-3 ${
              s.image
                ? "grid-cols-[2.75rem_1fr_auto] sm:grid-cols-[4rem_1fr_220px_auto]"
                : "grid-cols-[2.75rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto]"
            }`}
          >
            <span aria-hidden className="pt-1 font-mono text-[15px] font-medium text-cyan-text">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <H className="text-xl sm:text-2xl">
                {s.name}
                {s.confirmed === false ? <Confirm confirmed={false} /> : null}
              </H>
              <p className="mt-2 max-w-[60ch] text-steel">{s.body}</p>
            </div>
            {s.image ? (
              <div className="relative col-start-2 row-start-2 aspect-[3/2] w-full border-2 border-ink sm:col-start-3 sm:row-start-1">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width:640px) 220px, 80vw" className="object-cover" />
              </div>
            ) : null}
            <span
              aria-hidden
              className={`col-start-3 row-start-1 mt-1 flex h-10 w-10 items-center justify-center border-2 border-ink transition-colors group-hover:bg-ink group-hover:text-white ${
                s.image ? "sm:col-start-4" : "sm:col-start-3"
              }`}
            >
              <ArrowIcon className="h-5 w-5" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
