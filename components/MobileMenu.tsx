"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { business } from "@/content/site";
import { servicePages, allServices, primaryNav, estimateLink, isCurrent, chrome } from "@/content/nav";
import { home } from "@/content/home";
import { about } from "@/content/pages";
import OpenStatus from "./OpenStatus";
import { ConfirmDot } from "./ReviewMode";
import { CloseIcon, MenuIcon, PinIcon, TextIcon } from "./Icons";

/**
 * Full-height menu panel below lg. Modal dialog: focus moves in on open, Tab is trapped,
 * page scroll is locked (rendered in a portal on <body> so it sits above the sticky bar), Escape (or the close button, or choosing a link) closes it and
 * focus returns to the menu button.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => btnRef.current?.focus());
  }, []);

  // Close when the route changes (a link was chosen).
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const f = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Close if the viewport grows past the breakpoint while open.
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && close(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const linkCls = (href: string) =>
    `flex min-h-14 items-center justify-between border-b border-line font-display text-lg font-extrabold ${
      isCurrent(pathname, href) ? "text-cyan-text" : ""
    }`;
  const address = `${business.street}, ${business.city}, ${business.state} ${business.zip}`;

  return (
    <div className="lg:hidden">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
        className="flex h-11 w-11 items-center justify-center border-[3px] border-ink bg-white"
      >
        <MenuIcon className="h-5 w-5" />
        <span className="sr-only">{chrome.menu}</span>
      </button>

      {open &&
        createPortal(
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={chrome.menu}
          onClick={(e) => {
            // Any link tap closes the menu, even one to the current page (no route change fires then).
            if ((e.target as HTMLElement).closest("a")) close(false);
          }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-white"
        >
          <div className="flex h-16 flex-none items-center justify-between border-b-[3px] border-ink px-5 sm:px-8">
            <span className="font-display text-lg font-black uppercase">{chrome.menu}</span>
            <button
              type="button"
              data-autofocus
              onClick={() => close()}
              className="flex h-11 w-11 items-center justify-center border-[3px] border-ink"
            >
              <CloseIcon className="h-5 w-5" />
              <span className="sr-only">{chrome.closeMenu}</span>
            </button>
          </div>

          <div className="mx-auto w-full max-w-[640px] flex-1 px-5 pb-8 sm:px-8">
            <div className="grid gap-3 py-5 sm:grid-cols-2">
              <Link href={estimateLink.href} className="btn btn-lg btn-cyan">
                {home.hero.primary.label}
                <ConfirmDot confirmed={home.hero.primary.confirmed} />
              </Link>
              <a href={business.smsHref} className="btn btn-lg btn-ink">
                <TextIcon />
                <span>{home.hero.secondary[1].label}</span>
                <ConfirmDot confirmed={home.hero.secondary[1].confirmed} />
              </a>
            </div>

            <nav aria-label="Main">
              <p className="mt-2 font-mono text-[14px] font-medium uppercase text-steel">{chrome.servicesLabel}</p>
              <ul className="mt-1">
                {[...servicePages, allServices].map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} aria-current={isCurrent(pathname, s.href) ? "page" : undefined} className={linkCls(s.href)}>
                      {s.label}
                      <span aria-hidden className="text-cyan-text">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 border-t-[3px] border-ink">
                {[{ href: "/" as const, label: chrome.homeLabel }, ...primaryNav].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={isCurrent(pathname, l.href) ? "page" : undefined} className={linkCls(l.href)}>
                      {l.label}
                      <span aria-hidden className="text-cyan-text">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 bg-paper p-5 text-[15px]">
              <a href={business.mapsUrl} target="_blank" rel="noopener" className="flex min-h-11 items-start gap-2 font-semibold underline underline-offset-4">
                <PinIcon className="mt-0.5 h-5 w-5 flex-none" />
                {address}
              </a>
              <p className="mt-3">
                <OpenStatus />
              </p>
              <p className="mt-1 text-steel">{about.facts.rows.find((r) => r.label === "Hours")?.value}</p>
              <a href={business.phoneHref} className="mt-3 inline-flex min-h-11 items-center font-display text-xl font-black">
                {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </div>
  );
}
