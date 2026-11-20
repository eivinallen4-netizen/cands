// Home page copy ("/"), in the order the sections appear on the page.
//
// Structure: one exported object `home`. Each key is one section, top to bottom:
// seo, hero, trust, objections, services, beforeAfter, why, process, insurance, reviews,
// faq, estimate, visit, closing. Facts like the phone number and hours come from
// content/site.ts (`business`, `hoursTable`, `areas`, `reviews`, `work`) so they live in one place.
// `confirmed: false` = the owner has not confirmed that claim (shows a review tag).

import type { Button, Faq, Item, Line, Link, Seo } from "./types";

export const home: {
  seo: Seo;
  hero: {
    eyebrow: string;
    h1: string;
    /** Tail of the H1, shown in cyan. */
    h1Accent: string;
    /** false while the H1 rests on a claim the owner has not confirmed (the written guarantee). */
    h1Confirmed: boolean;
    subhead: Line;
    /** Reply-time promise under the buttons. While it holds a [bracket] it shows in review mode only. */
    replyTime: Line;
    primary: Button;
    secondary: Button[];
    proof: Line;
  };
  trust: Line[];
  objections: {
    heading: string;
    /** `draft` = a proposed answer that needs the owner's numbers. It shows in review mode only.
     *  Once the numbers are in, move it into `a` and delete `draft`. */
    items: { q: string; a: string; draft?: string; confirmed: boolean; link: Link }[];
  };
  services: { heading: string; lead: Line; link: Link };
  beforeAfter: {
    heading: string;
    lead: string;
    captions: { before: string; after: string; extra: string };
    link: Link;
    button: Button;
  };
  why: { heading: string; points: Item[] };
  process: { heading: string; lead: string; steps: Item[] };
  insurance: { heading: string; body: string; points: Line[]; link: Link; confirmed: boolean };
  reviews: { heading: string; lead: string; googleButton: string; leaveReview: string };
  faq: { heading: string; lead: string; items: Faq[]; link: Link };
  estimate: { heading: Line; lead: Line; honesty: string; privacy: Link };
  visit: { heading: string; lead: string; areasHeading: string; areas: string[]; directions: string; call: string };
  closing: { heading: string; primary: Button; secondary: Button };
} = {
  seo: {
    title: "Las Vegas Auto Body Shop & Collision Repair | C&S Collision",
    description:
      "C&S Collision LLC is a Nevada licensed auto body shop at 2878 Marco St, Las Vegas, serving the area since 2022. Call (725) 293-3544. Mon to Fri, 8 to 5.",
  },

  hero: {
    eyebrow: "Auto body shop at 2878 Marco St, Las Vegas",
    h1: "Your Car Back to Pre-Accident Condition,",
    h1Accent: " Guaranteed in Writing",
    h1Confirmed: false,
    subhead: {
      text: "Text us photos of the damage and we reply with a free estimate. We work with most major insurance companies, so your claim is one less thing to handle.",
      confirmed: false,
    },
    replyTime: {
      text: "Text us photos. We reply with a preliminary estimate within [X business hours].",
      confirmed: false,
    },
    primary: { label: "Get a Free Estimate", href: "/free-estimate", confirmed: false },
    secondary: [
      { label: "Call Us Now", href: "tel", confirmed: true },
      { label: "Text us photos", href: "sms", confirmed: false },
    ],
    proof: { text: "5.0 on Google from 2 reviews · Mon to Fri, 8 AM to 5 PM · Nevada licensed", confirmed: true },
  },

  trust: [
    { text: "Nevada licensed body shop", confirmed: true },
    { text: "Serving Las Vegas since 2022", confirmed: true },
    { text: "5.0 on Google from 2 reviews", confirmed: true },
    { text: "Free estimates", confirmed: false },
    { text: "We work with most insurance companies", confirmed: false },
  ],

  objections: {
    heading: "Insurance, Cost and Repair Time",
    items: [
      {
        q: "Do you work with my insurance?",
        a: "Yes. We work with most major insurance companies, and in Nevada you choose the licensed body shop that fixes your car.",
        confirmed: false,
        link: { href: "/insurance-claims", label: "How insurance claims work" },
      },
      {
        q: "How much will it cost?",
        a: "The estimate is free and you approve the price before any work starts. The final price is confirmed when we see the vehicle in person.",
        confirmed: false,
        link: { href: "/free-estimate", label: "Get an estimate" },
      },
      {
        q: "How long does a typical repair take?",
        a: "It depends on the damage, the parts and your insurance approval. We give you an expected time with your estimate.",
        draft: "Most bumper and panel repairs take [X to Y days]. You get your date in writing with the estimate.",
        confirmed: false,
        link: { href: "/faq", label: "All auto body questions" },
      },
    ],
  },

  services: {
    heading: "Collision Repair & Auto Body Services",
    lead: {
      text: "Body work and paint under one roof at our Las Vegas auto body shop. Pick the damage that looks like yours.",
      confirmed: false,
    },
    link: { href: "/services", label: "See all auto body services" },
  },

  beforeAfter: {
    heading: "Before and After",
    lead: "Real vehicles from our shop, photographed by us. This Chevrolet Nova came in on a trailer.",
    captions: {
      before: "Before: the Nova arriving on a trailer",
      after: "After: fresh white paint and a black hood",
      extra: "A Mercedes at the shop",
    },
    link: { href: "/our-work", label: "See before and after photos" },
    button: { label: "Get a Free Estimate", href: "/free-estimate", confirmed: false },
  },

  why: {
    heading: "Why Choose C&S Collision",
    points: [
      {
        title: "Local since 2022",
        body: "A Las Vegas body shop serving Las Vegas, Henderson and Sunrise Manor since 2022.",
        confirmed: true,
      },
      {
        title: "Nevada licensed body shop",
        body: "A licensed Nevada auto body shop at 2878 Marco St. You are welcome to stop by and see the shop.",
        confirmed: true,
      },
      {
        title: "Rated 5.0 on Google",
        body: "Rated 5.0 on Google from 2 reviews. You can read both on our Google profile.",
        confirmed: true,
      },
      {
        title: "Estimate before you authorize the work",
        body: "You get a free estimate in plain terms. No work starts until you approve it.",
        confirmed: false,
      },
      {
        title: "We work with your insurance",
        body: "We work with most major insurance companies, from the first estimate to pickup.",
        confirmed: false,
      },
      {
        title: "Workmanship guaranteed",
        body: "Our workmanship is guaranteed in writing for as long as you own your vehicle.",
        confirmed: false,
      },
    ],
  },

  process: {
    heading: "Our Repair Process",
    lead: "You know what happens at each step, from the first photo to the keys back in your hand.",
    steps: [
      {
        title: "Free estimate",
        body: "Text us photos or stop by the shop. We look at the damage and give you a preliminary estimate.",
        confirmed: false,
      },
      {
        title: "Repair plan",
        body: "We inspect the vehicle in person and confirm the price. No work starts until you approve it.",
        confirmed: false,
      },
      {
        title: "Body repair, paint and refinish",
        body: "We repair the damage to manufacturer standards and match the paint to the rest of your vehicle.",
        confirmed: false,
      },
      {
        title: "Quality check",
        body: "We check the fit, the finish and the paint match before we call you.",
        confirmed: false,
      },
      {
        title: "Vehicle ready",
        body: "You pick up a vehicle restored to pre-accident condition and get back on the road.",
        confirmed: false,
      },
    ],
  },

  insurance: {
    heading: "Insurance Claims",
    body: "We work with insurance companies so your claim repair is as easy as possible. In Nevada, the law lets you choose the licensed body shop that repairs your vehicle.",
    points: [
      { text: "We work with most major insurance companies", confirmed: false },
      { text: "We help you through each step of your claim", confirmed: false },
      { text: "You choose the licensed body shop, not your insurer (NRS 690B.016)", confirmed: false },
      { text: "Not going through insurance? You get the same free estimate", confirmed: false },
    ],
    link: { href: "/insurance-claims", label: "Working with your insurance claim" },
    confirmed: false,
  },

  reviews: {
    heading: "What Our Customers Say",
    lead: "5.0 on Google from 2 reviews.",
    googleButton: "Read all Google reviews",
    leaveReview: "Had your vehicle fixed with us? Leave us a Google review.",
  },

  faq: {
    heading: "Frequently Asked Questions",
    lead: "Have another question? Call us at (725) 293-3544, Monday to Friday, 8 AM to 5 PM.",
    items: [
      {
        q: "Where is C&S Collision and what are your hours?",
        a: "We are at 2878 Marco St, Las Vegas, NV 89115. We are open Monday through Friday, 8 AM to 5 PM, and closed Saturday and Sunday.",
        confirmed: true,
        link: { href: "/contact", label: "Visit the shop" },
      },
      {
        q: "Are you a licensed auto body shop in Nevada?",
        a: "Yes. C&S Collision LLC is a Nevada licensed body shop and has served Las Vegas since 2022.",
        confirmed: true,
      },
      {
        q: "Do you offer free estimates?",
        a: "Yes. Text us photos or stop by the shop for a free preliminary estimate. The final price is confirmed when we see the vehicle in person.",
        confirmed: false,
        link: { href: "/free-estimate", label: "Get an estimate" },
      },
      {
        q: "Do you work with my insurance?",
        a: "Yes. We work with most major insurance companies. In Nevada, you can choose the licensed body shop that repairs your vehicle.",
        confirmed: false,
        link: { href: "/insurance-claims", label: "How insurance claims work" },
      },
      {
        q: "How long does collision repair take?",
        a: "It depends on the damage, the parts and how fast your insurance approves the repair. We give you an expected time with your estimate and tell you if it changes.",
        confirmed: false,
      },
      {
        q: "Is the repair work guaranteed?",
        a: "Yes. Our workmanship is guaranteed in writing for as long as you own your vehicle.",
        confirmed: false,
      },
      {
        q: "What areas do you serve?",
        a: "We serve Las Vegas, Henderson and Sunrise Manor. Our shop is at 2878 Marco St in Las Vegas.",
        confirmed: true,
      },
    ],
    link: { href: "/faq", label: "All auto body questions" },
  },

  estimate: {
    heading: { text: "Get a Free Estimate", confirmed: false },
    lead: {
      text: "Tell us about your vehicle and send a few photos of the damage. We reply with a free preliminary estimate.",
      confirmed: false,
    },
    honesty: "The final price is confirmed when we see your vehicle in person.",
    privacy: { href: "/privacy", label: "How we use your information" },
  },

  visit: {
    heading: "Visit the Shop",
    lead: "Stop by our body shop at 2878 Marco St, Las Vegas, Monday to Friday, 8 AM to 5 PM.",
    areasHeading: "Areas We Serve",
    areas: ["Las Vegas", "Henderson", "Sunrise Manor"],
    directions: "Get Directions",
    call: "Call Us Now",
  },

  closing: {
    heading: "Ready to Get Your Vehicle Back on the Road?",
    primary: { label: "Get a Free Estimate", href: "/free-estimate", confirmed: false },
    secondary: { label: "Call Us Now", href: "tel", confirmed: true },
  },
};
