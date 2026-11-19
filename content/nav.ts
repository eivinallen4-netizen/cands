// Navigation data (owned by the front-end builder). Every href is a typed Route from content/types.ts.
import type { Route, ServiceSlug } from "./types";

/** `confirmed: false` = the label makes a claim the owner has not confirmed (shows a review flag). */
export type NavItem = { href: Route; label: string; confirmed?: boolean };

export const servicePages: (NavItem & { slug: ServiceSlug })[] = [
  { slug: "collision-repair", href: "/collision-repair", label: "Collision repair" },
  { slug: "auto-paint", href: "/auto-paint", label: "Auto paint" },
  { slug: "dent-repair", href: "/dent-repair", label: "Dent repair" },
  { slug: "bumper-repair", href: "/bumper-repair", label: "Bumper repair" },
  { slug: "frame-straightening", href: "/frame-straightening", label: "Frame straightening" },
];

export const allServices: NavItem = { href: "/services", label: "All services" };

/** Desktop header and mobile menu, after the Services dropdown. Max 6 items including Services. */
export const primaryNav: NavItem[] = [
  { href: "/insurance-claims", label: "Insurance claims" },
  { href: "/our-work", label: "Our work" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const estimateLink: NavItem = { href: "/free-estimate", label: "Free estimate", confirmed: false };

export const footerNav = {
  services: [...servicePages.map(({ href, label }) => ({ href, label })), allServices] as NavItem[],
  company: [
    { href: "/insurance-claims", label: "Insurance claims" },
    { href: "/what-to-do-after-an-accident", label: "What to do after an accident" },
    { href: "/our-work", label: "Our work" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/free-estimate", label: "Free estimate", confirmed: false },
    { href: "/contact", label: "Contact" },
  ] as NavItem[],
  legal: [{ href: "/privacy", label: "Privacy policy" }] as NavItem[],
};

/**
 * Maps the service names used in content/site.ts `services` to their page.
 * "Paint scratch repair" has no page of its own; it is covered by /auto-paint.
 */
export const serviceHrefByName: Record<string, Route> = {
  "Collision repair": "/collision-repair",
  "Dent repair": "/dent-repair",
  "Auto paint & color matching": "/auto-paint",
  "Bumper repair": "/bumper-repair",
  "Frame straightening": "/frame-straightening",
  "Paint scratch repair": "/auto-paint",
};

/** Indexable routes for app/sitemap.ts. /free-estimate/thanks is deliberately left out (noindex). */
export const sitemapRoutes: { href: Route; priority: number }[] = [
  { href: "/", priority: 1 },
  { href: "/services", priority: 0.8 },
  ...servicePages.map((s) => ({ href: s.href, priority: 0.8 })),
  { href: "/insurance-claims", priority: 0.8 },
  { href: "/what-to-do-after-an-accident", priority: 0.6 },
  { href: "/our-work", priority: 0.6 },
  { href: "/about", priority: 0.6 },
  { href: "/faq", priority: 0.6 },
  { href: "/free-estimate", priority: 0.9 },
  { href: "/contact", priority: 0.7 },
  { href: "/privacy", priority: 0.2 },
];

/** True when `pathname` is the page `href` points to. */
export function isCurrent(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || (href !== "/" && pathname === `${href}/`);
}

/**
 * Words used by the site chrome (header, menu, footer, sticky bar, open status).
 * Owned by the front-end builder; plain wording, no claims.
 */
export const chrome = {
  skipLink: "Skip to content",
  menu: "Menu",
  closeMenu: "Close menu",
  servicesLabel: "Services",
  homeLabel: "Home",
  callIconLabel: "Call (725) 293-3544",
  footer: { services: "Services", company: "Company", visit: "Visit", directions: "Get Directions", textPhotos: { text: "Text us photos", confirmed: false } },
  stickyBar: { call: "Call", text: { text: "Text photos", confirmed: false }, directions: "Directions", estimate: "Estimate" },
  openStatus: {
    open: "Open now · closes 5 PM",
    opensToday: "Opens today at 8 AM",
    closedOpensTomorrow: "Closed · opens tomorrow at 8 AM",
    closedOpensOn: "Closed · opens {day} at 8 AM",
    closed: "Closed",
    fallback: "Mon–Fri · 8 AM – 5 PM",
  },
  reviewStars: "Rated {n} out of 5",
  breadcrumb: "Breadcrumb",
};
