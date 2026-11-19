import Link from "next/link";
import { abs } from "@/lib/seo";
import JsonLd from "./JsonLd";
import { chrome } from "@/content/nav";

type Crumb = { href: string; label: string };

/** Visible breadcrumbs for inner pages, with matching BreadcrumbList JSON-LD. Home is added automatically. */
export default function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const all = [{ href: "/", label: chrome.homeLabel }, ...items];
  return (
    <>
      <nav aria-label={chrome.breadcrumb} className="text-[15px] print:hidden">
        <ol className="flex flex-wrap items-center gap-x-2">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-semibold">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.href}
                      className={`inline-flex min-h-11 min-w-11 items-center underline underline-offset-4 ${dark ? "text-white/85" : "text-steel"}`}
                    >
                      {c.label}
                    </Link>
                    <span aria-hidden className={dark ? "text-white/60" : "text-steel"}>
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: abs(c.href),
          })),
        }}
      />
    </>
  );
}
