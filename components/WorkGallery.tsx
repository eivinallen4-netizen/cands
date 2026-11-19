"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Img, Link as ContentLink } from "@/content/types";
import { ArrowIcon, CloseIcon } from "./Icons";

type Shot = Img & { label: string };
type Project = { title: string; caption: string; images: Shot[]; link?: ContentLink; confirmed: boolean };
type Labels = { open: string; close: string; previous: string; next: string };

/**
 * Real projects only. Each photo opens a full-screen viewer: Escape closes, Left/Right step
 * through every photo on the page, Tab stays inside, focus returns to the photo that opened it.
 */
export default function WorkGallery({ projects, labels }: { projects: Project[]; labels: Labels }) {
  const all = projects.flatMap((p) => p.images.map((img) => ({ ...img, project: p.title })));
  const [open, setOpen] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + all.length) % all.length)), [all.length]);

  useEffect(() => {
    if (open === null) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowRight") return step(1);
      if (e.key === "ArrowLeft") return step(-1);
      if (e.key === "Tab" && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button"));
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  let index = -1;
  const current = open === null ? null : all[open];

  return (
    <>
      <div className="grid gap-14">
        {projects.map((p, pi) => (
          <article key={p.title} aria-labelledby={`proj-${pi}`} className="grid gap-5">
            <ul className={`grid gap-4 ${p.images.length > 1 ? "md:grid-cols-2" : "md:max-w-[50%]"}`}>
              {p.images.map((img) => {
                index += 1;
                const i = index;
                return (
                  <li key={img.src}>
                    <button
                      type="button"
                      onClick={(e) => {
                        openerRef.current = e.currentTarget;
                        setOpen(i);
                      }}
                      className="group relative block aspect-[4/3] w-full overflow-hidden border-[3px] border-ink bg-ink"
                    >
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width:1180px) 580px, (min-width:768px) 50vw, 100vw" className="object-cover transition-opacity group-hover:opacity-90" />
                      <span
                        aria-hidden
                        className={`absolute left-0 top-0 px-4 py-2 font-display text-[15px] font-black uppercase ${
                          img.label === "After" ? "bg-cyan text-ink" : "bg-ink text-white"
                        }`}
                      >
                        {img.label}
                      </span>
                      <span className="sr-only">
                        {labels.open}: {img.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div>
              <h2 id={`proj-${pi}`} className="text-[28px] uppercase sm:text-4xl">
                {p.title}
              </h2>
              <p className="lead mt-2 max-w-[62ch] text-lg">{p.caption}</p>
              {p.link ? (
                <Link href={p.link.href} className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-cyan-text underline underline-offset-4">
                  {p.link.label} <ArrowIcon className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {current &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.project}: ${current.label}`}
            className="on-dark fixed inset-0 z-[80] flex flex-col bg-ink text-white"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="font-display font-extrabold">
                {current.project} · {current.label}
              </p>
              <button type="button" data-autofocus onClick={close} className="flex h-11 w-11 items-center justify-center border-2 border-white">
                <CloseIcon />
                <span className="sr-only">{labels.close}</span>
              </button>
            </div>
            <div
              className="relative flex-1 touch-pan-y"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              }}
            >
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
              <button type="button" onClick={() => step(-1)} className="btn btn-md btn-ghost">
                <ArrowIcon className="h-5 w-5 rotate-180" />
                <span className="max-sm:sr-only">{labels.previous}</span>
              </button>
              <p className="text-[15px] text-white/80">
                {(open ?? 0) + 1} / {all.length}
              </p>
              <button type="button" onClick={() => step(1)} className="btn btn-md btn-ghost">
                <span className="max-sm:sr-only">{labels.next}</span>
                <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
