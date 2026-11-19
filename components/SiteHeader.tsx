"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { business } from "@/content/site";
import { servicePages, allServices, primaryNav, estimateLink, isCurrent, chrome } from "@/content/nav";
import Wordmark from "./Wordmark";
import { ConfirmDot } from "./ReviewMode";
import MobileMenu from "./MobileMenu";
import { ChevronIcon, PhoneIcon } from "./Icons";

/**
 * Services dropdown as a WAI-ARIA disclosure (not role="menu"): a button with aria-expanded /
 * aria-controls, Tab moves through the links, Escape closes and returns focus to the button,
 * focus leaving the nav or a click outside closes it. ArrowDown on the button opens it and
 * focuses the first link; arrows move between links.
 */
function ServicesDropdown({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLLIElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const items = [...servicePages, allServices];
  const inSection = items.some((s) => isCurrent(pathname, s.href));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const links = () => Array.from(wrapRef.current?.querySelectorAll<HTMLAnchorElement>(`#${CSS.escape(panelId)} a`) ?? []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
      return;
    }
    const list = links();
    const idx = list.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        requestAnimationFrame(() => links()[0]?.focus());
      } else list[Math.min(idx + 1, list.length - 1)]?.focus();
    } else if (e.key === "ArrowUp" && open) {
      e.preventDefault();
      if (idx <= 0) btnRef.current?.focus();
      else list[idx - 1]?.focus();
    } else if (e.key === "Home" && idx >= 0) {
      e.preventDefault();
      list[0]?.focus();
    } else if (e.key === "End" && idx >= 0) {
      e.preventDefault();
      list[list.length - 1]?.focus();
    }
  }

  return (
    <li
      ref={wrapRef}
      className="relative"
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`flex min-h-11 items-center gap-1.5 px-2 uppercase hover:text-cyan-text ${
          inSection ? "border-b-[3px] border-cyan" : "border-b-[3px] border-transparent"
        }`}
      >
        {chrome.servicesLabel}
        <ChevronIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <ul
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-50 mt-2 w-72 border-[3px] border-ink bg-white py-2 normal-case tracking-normal"
      >
        {items.map((s) => {
          const cur = isCurrent(pathname, s.href);
          return (
            <li key={s.href}>
              <Link
                href={s.href}
                aria-current={cur ? "page" : undefined}
                className={`flex min-h-11 items-center px-4 font-display text-[15px] font-bold hover:bg-paper ${
                  s.href === allServices.href ? "mt-1 border-t border-line pt-1" : ""
                } ${cur ? "bg-cyan-pale" : ""}`}
              >
                {s.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-white print:hidden">
      <a
        href="#main"
        className="sr-only-focusable absolute left-2 top-2 z-[60] bg-ink px-4 py-3 font-display font-bold text-white"
      >
        {chrome.skipLink}
      </a>
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[88px]">
        <Wordmark eager />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0 whitespace-nowrap font-display text-[13px] font-extrabold uppercase tracking-wide xl:text-[14px]">
            <ServicesDropdown pathname={pathname} />
            {primaryNav.map((l) => {
              const cur = isCurrent(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={cur ? "page" : undefined}
                    className={`flex min-h-11 items-center border-b-[3px] px-2 hover:text-cyan-text ${
                      cur ? "border-cyan" : "border-transparent"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={business.phoneHref}
            className="hidden min-h-11 items-center whitespace-nowrap font-display text-lg font-black tracking-tight xl:flex"
          >
            {business.phoneDisplay}
          </a>
          <Link
            href={estimateLink.href}
            aria-current={isCurrent(pathname, estimateLink.href) ? "page" : undefined}
            className="btn btn-md btn-cyan hidden whitespace-nowrap px-4 text-[14px] sm:inline-flex"
          >
            {estimateLink.label}
            <ConfirmDot confirmed={estimateLink.confirmed ?? true} />
          </Link>
          <a
            href={business.phoneHref}
            aria-label={chrome.callIconLabel}
            className="flex h-11 w-11 flex-none items-center justify-center bg-ink text-white xl:hidden"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
