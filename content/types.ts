// Shared types for every copy file in content/.
//
// Structure:
// - Route: the only internal URLs the site has. Every `href` in content/ uses one of these,
//   so a typo in a link fails the type check.
// - Href: a Route, or one of three action keys the builder maps to real links:
//     "tel"  -> business.phoneHref    "sms" -> business.smsHref    "maps" -> business.mapsUrl
// - `confirmed: false` on any object means the owner has NOT confirmed that claim yet.
//   The builder shows a "Confirm with owner" tag on it in review mode.
//   `confirmed: true` means it rests only on confirmed facts (name, address, phone, hours,
//   since 2022, Nevada licensed, 5.0 on Google from 2 reviews, the two reviews, the real photos,
//   the Instagram, areas Las Vegas / Henderson / Sunrise Manor).

export type Route =
  | "/"
  | "/services"
  | "/collision-repair"
  | "/auto-paint"
  | "/dent-repair"
  | "/bumper-repair"
  | "/frame-straightening"
  | "/insurance-claims"
  | "/what-to-do-after-an-accident"
  | "/our-work"
  | "/about"
  | "/faq"
  | "/free-estimate"
  | "/free-estimate/thanks"
  | "/contact"
  | "/privacy";

export type Href = Route | "tel" | "sms" | "maps";

export type ServiceSlug =
  | "collision-repair"
  | "auto-paint"
  | "dent-repair"
  | "bumper-repair"
  | "frame-straightening";

/** <title> and meta description for one page. */
export type Seo = { title: string; description: string };

/** A text link with descriptive anchor text. */
export type Link = { href: Route; label: string };

/** A visible button. */
export type Button = { label: string; href: Href; confirmed: boolean };

/** A line of copy that may carry an unconfirmed claim. */
export type Line = { text: string; confirmed: boolean };

/** A titled block: list item, step, damage type, point. */
export type Item = { title: string; body: string; confirmed: boolean };

/** One question and answer. The first sentence of `a` answers `q`. */
export type Faq = { q: string; a: string; confirmed: boolean; link?: Link };

/** An image with alt text. */
export type Img = { src: string; alt: string };

/** An extra H2 block on a page: heading plus 2-3 sentence paragraphs. */
export type Section = { heading: string; body: string[]; confirmed: boolean };

/** One line on a "what affects the price" receipt. No prices. */
export type PriceFactor = { label: string; note: string };

export type ServicePage = {
  slug: ServiceSlug;
  name: string;
  confirmed: boolean;
  seo: Seo;
  h1: string;
  /** Two sentences. Also used as the Service schema description. */
  intro: string;
  /** One line for directory rows on the home page and /services. */
  card: string;
  image: Img;
  damage: { heading: string; lead: string; items: Item[] };
  steps: { heading: string; items: Item[] };
  sections: Section[];
  price: {
    heading: string;
    lead: string;
    factors: PriceFactor[];
    insurance: string;
    selfPay: string;
    confirmed: boolean;
  };
  faqs: Faq[];
  related: ServiceSlug[];
};
