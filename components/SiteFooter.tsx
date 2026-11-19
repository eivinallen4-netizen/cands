import Link from "next/link";
import { business } from "@/content/site";
import { footerNav, chrome } from "@/content/nav";
import { home } from "@/content/home";
import { about } from "@/content/pages";
import Wordmark from "./Wordmark";
import { PinIcon } from "./Icons";
import { Confirm } from "./ReviewMode";

const linkCls = "inline-flex min-h-11 min-w-11 items-center text-white/85 hover:text-white hover:underline underline-offset-4";

/** 4 columns: about | services | company | visit. NAP worded identically on every page. */
export default function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-white/80 print:hidden">
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Wordmark dark />
          <p className="mt-5 max-w-xs text-[15px]">
            {home.trust
              .filter((t) => t.confirmed && !t.text.includes(business.rating))
              .map((t) => t.text)
              .join(" · ")}
          </p>
        </div>

        <nav aria-labelledby="ft-services">
          <p id="ft-services" className="font-display font-extrabold uppercase text-white">
            {chrome.footer.services}
          </p>
          <ul className="mt-2">
            {footerNav.services.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="ft-company">
          <p id="ft-company" className="font-display font-extrabold uppercase text-white">
            {chrome.footer.company}
          </p>
          <ul className="mt-2">
            {footerNav.company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                  <Confirm confirmed={l.confirmed ?? true} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-[15px]">
          <p className="font-display font-extrabold uppercase text-white">{chrome.footer.visit}</p>
          <address className="mt-3 not-italic">
            {business.name}
            <br />
            {business.street}
            <br />
            {business.city}, {business.state} {business.zip}
          </address>
          <a href={business.mapsUrl} target="_blank" rel="noopener" className={`${linkCls} gap-2 font-semibold`}>
            <PinIcon className="h-4 w-4" /> {chrome.footer.directions}
          </a>
          <ul>
            <li>
              <a href={business.phoneHref} className={`${linkCls} font-display text-lg font-black text-white`}>
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={business.smsHref} className={linkCls}>
                {chrome.footer.textPhotos.text}
                <Confirm confirmed={chrome.footer.textPhotos.confirmed} />
              </a>
            </li>
          </ul>
          <p className="mt-2 max-w-[28ch]">{about.facts.rows.find((r) => r.label === "Hours")?.value}</p>
          <a href={business.instagram} target="_blank" rel="noopener" className={linkCls}>
            Instagram @candscollisionllc
          </a>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-x-6 px-5 py-4 text-[14px] text-white/70 sm:px-8">
          <p>
            © {new Date().getFullYear()} {business.name}
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
