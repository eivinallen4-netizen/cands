// Copy for every page that is not the home page or a service page.
//
// Structure: one export per page, each with `seo` and `h1`, then the sections of that page's
// template (uxui-report 4.4) in page order:
//   servicesHub (/services), insurance (/insurance-claims), afterAccident
//   (/what-to-do-after-an-accident), ourWork (/our-work), about (/about), faq (/faq),
//   freeEstimate (/free-estimate) with `thanks` (/free-estimate/thanks), contact (/contact),
//   privacy (/privacy), notFound (404).
// Facts (phone, address, hours, photos) come from content/site.ts. Shared types: content/types.ts.
// `confirmed: false` = the owner (or, for legal text, a lawyer) has not confirmed it yet.

import { work } from "./site";
import type { Button, Faq, Img, Item, Line, Link, Section, Seo } from "./types";

// ------------------------------------------------------------------ /services
export const servicesHub: {
  seo: Seo;
  h1: string;
  intro: Line;
  listHeading: string;
  choose: { heading: string; lead: string; items: (Item & { link: Link })[] };
  cta: { heading: Line; body: Line; primary: Button; secondary: Button };
} = {
  seo: {
    title: "Auto Body Repair Services in Las Vegas, NV | C&S Collision",
    description:
      "Collision repair, auto paint, dent repair, bumper repair and frame straightening at C&S Collision, 2878 Marco St, Las Vegas. Call (725) 293-3544.",
  },
  h1: "Auto Body Repair Services in Las Vegas, NV",
  intro: {
    text: "C&S Collision is an auto body shop at 2878 Marco St, Las Vegas, with body work and paint under one roof. Find your type of damage below, or send us photos and we will tell you what it needs.",
    confirmed: false,
  },
  listHeading: "Our Services",
  choose: {
    heading: "Not Sure Which Repair You Need?",
    lead: "Start with what you can see. Many repairs use more than one service, and we plan them in one estimate.",
    items: [
      {
        title: "You were in an accident",
        body: "Start with collision repair. It covers the body work, parts and paint after a crash.",
        confirmed: false,
        link: { href: "/collision-repair", label: "Collision repair in Las Vegas" },
      },
      {
        title: "Only the paint is damaged",
        body: "Scratches, chips and faded paint are auto paint work.",
        confirmed: false,
        link: { href: "/auto-paint", label: "Auto paint and color matching" },
      },
      {
        title: "The panel is pushed in",
        body: "Dings, dents and creases are dent repair, with or without new paint.",
        confirmed: false,
        link: { href: "/dent-repair", label: "Dent repair" },
      },
      {
        title: "The bumper is cracked, scuffed or loose",
        body: "Bumper covers are repaired or replaced, then painted to match.",
        confirmed: false,
        link: { href: "/bumper-repair", label: "Bumper repair" },
      },
      {
        title: "Doors do not close or the car pulls",
        body: "These can be signs of frame damage after a hard hit.",
        confirmed: false,
        link: { href: "/frame-straightening", label: "Frame straightening" },
      },
    ],
  },
  cta: {
    heading: { text: "Get a Free Estimate", confirmed: false },
    body: {
      text: "Send photos of the damage and we will tell you which repair it needs. The final price is confirmed in person.",
      confirmed: false,
    },
    primary: { label: "Get a Free Estimate", href: "/free-estimate", confirmed: false },
    secondary: { label: "Call Us Now", href: "tel", confirmed: true },
  },
};

// ------------------------------------------------------------------ /insurance-claims
export const insurance: {
  seo: Seo;
  h1: string;
  intro: Line;
  lastReviewed: string;
  timeline: { heading: string; lead: Line; steps: (Item & { link?: Link })[] };
  rightToChoose: {
    heading: string;
    body: string[];
    source: { label: string; url: string };
    note: string;
    confirmed: boolean;
  };
  bring: {
    heading: string;
    /** Added by the builder: column labels for the two lists. */
    requiredLabel: string;
    helpfulLabel: string;
    required: Line[];
    helpful: Line[];
  };
  payment: {
    heading: string;
    insurance: { title: string; points: Line[] };
    selfPay: { title: string; points: Line[] };
  };
  repairs: { heading: string; links: Link[] };
  faqs: { heading: string; items: Faq[]; link: Link };
  cta: { heading: string; primary: Button; secondary: Button };
} = {
  seo: {
    title: "Insurance Claim Body Shop in Las Vegas, NV | C&S Collision",
    description:
      "Filing an auto insurance claim in Las Vegas? Learn how repairs work and your right to choose your own body shop. C&S Collision, (725) 293-3544.",
  },
  h1: "Auto Body Insurance Claims in Las Vegas, NV",
  intro: {
    text: "C&S Collision works with your insurance company to repair your vehicle after an accident. In Nevada, you can choose the licensed body shop that does the repair.",
    confirmed: false,
  },
  lastReviewed: "Last reviewed November 18, 2026",
  timeline: {
    heading: "How a Claim Repair Works",
    lead: { text: "Most insurance repairs follow these steps. We help you with each one.", confirmed: false },
    steps: [
      {
        title: "Report the claim",
        body: "Call your insurance company or use its app. Write down your claim number.",
        confirmed: true,
      },
      {
        title: "Tell your insurer you chose C&S Collision",
        body: "You choose the licensed body shop. Give your insurer our name and phone number.",
        confirmed: false,
      },
      {
        title: "Get the estimate",
        body: "We inspect the vehicle and write the repair estimate. Your insurer may also send an adjuster.",
        confirmed: false,
        link: { href: "/free-estimate", label: "Get an estimate for your claim" },
      },
      {
        title: "Approval",
        body: "Your insurer approves the repair. If we find hidden damage, we send it to them for approval before we fix it.",
        confirmed: false,
      },
      {
        title: "Repair",
        body: "We repair and paint your vehicle and keep you updated.",
        confirmed: false,
      },
      {
        title: "Pickup",
        body: "You pay your deductible, if you have one, and pick up your vehicle.",
        confirmed: false,
      },
    ],
  },
  rightToChoose: {
    heading: "You Choose the Body Shop",
    body: [
      "Under Nevada law, you may have your vehicle repaired at the licensed body shop of your choice. Your insurer must tell you about this right when you first contact it about a claim for vehicle damage.",
      "Your insurer may not require you to use one licensed body shop over another. The law also does not require your insurer to pay more than the reasonable rate your policy sets for repairs.",
    ],
    source: {
      label: "Nevada Revised Statutes, NRS 690B.016",
      url: "https://www.leg.state.nv.us/nrs/nrs-690b.html",
    },
    note: "This is general information, not legal advice. Check your policy or ask your insurer about your claim.",
    confirmed: false,
  },
  bring: {
    heading: "What to Bring",
    requiredLabel: "Required",
    helpfulLabel: "Helpful",
    required: [
      { text: "Your driver's license", confirmed: false },
      { text: "Your vehicle and its keys", confirmed: false },
      { text: "Your insurance company's name and your claim number", confirmed: false },
    ],
    helpful: [
      { text: "Photos from the accident scene", confirmed: false },
      { text: "The other driver's name, insurance and policy number", confirmed: false },
      { text: "The police report number, if there is one", confirmed: false },
      { text: "Any estimate your insurer already gave you", confirmed: false },
      { text: "The adjuster's name and phone number", confirmed: false },
    ],
  },
  payment: {
    heading: "Insurance or Paying Yourself?",
    insurance: {
      title: "Using insurance",
      points: [
        { text: "Your insurer pays for the approved repair, minus your deductible", confirmed: false },
        { text: "If the other driver was at fault, their insurance may pay instead", confirmed: false },
        { text: "We work with your insurer on the estimate and any hidden damage", confirmed: false },
      ],
    },
    selfPay: {
      title: "Paying yourself",
      points: [
        { text: "Can make sense when the repair costs close to your deductible", confirmed: false },
        { text: "You get the same free estimate", confirmed: false },
        { text: "You approve the price before any work starts", confirmed: false },
      ],
    },
  },
  repairs: {
    heading: "What Gets Repaired",
    links: [
      { href: "/collision-repair", label: "Collision repair" },
      { href: "/auto-paint", label: "Auto paint" },
      { href: "/dent-repair", label: "Dent repair" },
      { href: "/bumper-repair", label: "Bumper repair" },
      { href: "/frame-straightening", label: "Frame straightening" },
    ],
  },
  faqs: {
    heading: "Insurance Questions",
    items: [
      {
        q: "Can I choose my own body shop in Nevada?",
        a: "Yes. Nevada law (NRS 690B.016) says you may have repairs made at the licensed body shop of your choice, and your insurer must tell you about this right when you first contact it about the claim.",
        confirmed: false,
      },
      {
        q: "Do I have to use the shop my insurer recommends?",
        a: "No. Under NRS 690B.016, your insurer may not require you to use one licensed body shop over another. You can still use their shop if you want to.",
        confirmed: false,
      },
      {
        q: "Do you work with my insurance company?",
        a: "Yes. We work with most major insurance companies. Call us with your insurer's name and we will tell you how we can help.",
        confirmed: false,
      },
      {
        q: "Do I have to pay a deductible?",
        a: "It depends on your policy and on who was at fault. If you file on your own policy, you usually pay your deductible when you pick up the vehicle.",
        confirmed: false,
      },
      {
        q: "Who decides between OEM and aftermarket parts?",
        a: "Your policy sets what your insurer pays for, and the shop recommends the parts for a correct repair. OEM parts are made by your vehicle's manufacturer, while aftermarket parts are made by other companies.",
        confirmed: false,
      },
      {
        q: "Do you help with rental cars?",
        a: "Yes. We help you set up a rental through your insurance while your vehicle is in the shop.",
        confirmed: false,
      },
      {
        q: "Can I get an estimate if I am not filing a claim?",
        a: "Yes. You get the same free estimate, and you approve the price before any work starts.",
        confirmed: false,
        link: { href: "/free-estimate", label: "Get an estimate" },
      },
    ],
    link: { href: "/faq", label: "More questions" },
  },
  cta: {
    heading: "Get an Estimate for Your Claim",
    primary: { label: "Get a Free Estimate", href: "/free-estimate", confirmed: false },
    secondary: { label: "Call Us Now", href: "tel", confirmed: true },
  },
};

// ------------------------------------------------------------------ /what-to-do-after-an-accident
export const afterAccident: {
  seo: Seo;
  h1: string;
  intro: string;
  disclaimer: string;
  printLabel: string;
  /** `source` (added by the builder): an official page linked wherever its label appears in the points. */
  steps: (Item & { points: string[]; source?: { label: string; url: string } })[];
  cta: { heading: Line; body: Line; primary: Button; secondary: Button; link: Link };
} = {
  seo: {
    title: "What to Do After a Car Accident in Nevada | C&S Collision",
    description:
      "A step-by-step checklist for what to do after a car accident in Nevada: safety, information, photos, police report, insurance and choosing a body shop.",
  },
  h1: "What to Do After a Car Accident",
  intro:
    "A crash is stressful, and it is easy to forget a step. Use this checklist at the scene and in the days after. Print it and keep it in your glove box.",
  disclaimer:
    "This is general guidance for drivers in Nevada, not legal advice. If anyone is hurt or you have legal questions, talk to the police, your insurer or a lawyer.",
  printLabel: "Print this checklist",
  steps: [
    {
      title: "Get to safety",
      body: "Check yourself and your passengers for injuries first. If anyone is hurt, call 911.",
      confirmed: true,
      points: [
        "Turn on your hazard lights",
        "If the car can move and no one is hurt, move it out of traffic",
        "If it cannot move, stay buckled in or stand well away from traffic",
      ],
    },
    {
      title: "Stop and exchange information",
      body: "Nevada law requires drivers in a crash to stop and exchange information. Stay calm and do not argue about who was at fault.",
      confirmed: false,
      points: [
        "Names and phone numbers of all drivers",
        "Driver's license and license plate numbers",
        "Insurance company and policy numbers",
        "Make, model and color of each vehicle",
        "Names and phone numbers of any witnesses",
      ],
    },
    {
      title: "Take photos",
      body: "Photos help your insurance claim and your repair estimate. Take more than you think you need.",
      confirmed: true,
      points: [
        "All vehicles from all four corners",
        "Close-ups of every damaged area",
        "The other vehicle's license plate",
        "The road, traffic signs and skid marks",
      ],
    },
    {
      title: "Call the police or file a report",
      body: "Call the police if anyone is hurt, a driver leaves or there is a dispute. If police did not investigate and the crash caused injury, death or damage of $750 or more, you must file a Report of Traffic Crash (SR-1) with the Nevada DMV within 10 days.",
      confirmed: false,
      points: [
        "Ask the officer for the report number",
        "Get the SR-1 form from the Nevada DMV",
      ],
      source: { label: "Nevada DMV", url: "https://dmv.nv.gov/" },
    },
    {
      title: "Call your insurance company",
      body: "Report the accident as soon as you can. Write down your claim number and the adjuster's name.",
      confirmed: true,
      points: [
        "Give the facts, not guesses",
        "Ask what your policy covers, including a rental car",
        "Ask about your deductible",
      ],
    },
    {
      title: "Choose your body shop",
      body: "In Nevada, you may have repairs done at the licensed body shop of your choice (NRS 690B.016). Your insurer may suggest a shop, but it may not require you to use one licensed shop over another.",
      confirmed: false,
      points: [
        "Tell your insurer the shop you chose",
        "Send the shop your photos for an estimate",
        "Approve the repair plan before work starts",
      ],
    },
  ],
  cta: {
    heading: { text: "Get a Free Estimate", confirmed: false },
    body: {
      text: "Text us the photos you took at the scene and we will reply with a preliminary estimate. The final price is confirmed when we see your vehicle in person.",
      confirmed: false,
    },
    primary: { label: "Get a Free Estimate", href: "/free-estimate", confirmed: false },
    secondary: { label: "Call Us Now", href: "tel", confirmed: true },
    link: { href: "/insurance-claims", label: "How insurance claims work" },
  },
};

// ------------------------------------------------------------------ /our-work
export const ourWork: {
  seo: Seo;
  h1: string;
  intro: string;
  projects: {
    title: string;
    caption: string;
    images: (Img & { label: string })[];
    link?: Link;
    confirmed: boolean;
  }[];
  sendYours: { heading: string; body: Line; primary: Button; secondary: Button };
  /** Added by the builder: labels for the full-screen photo viewer. */
  viewer: { open: string; close: string; previous: string; next: string };
} = {
  seo: {
    title: "Before & After Auto Body Work | C&S Collision Las Vegas",
    description:
      "Real before and after photos from C&S Collision, 2878 Marco St, Las Vegas. See the work, then call (725) 293-3544.",
  },
  h1: "Before & After: Our Auto Body Work",
  intro:
    "These are real vehicles and the real shop, photographed by C&S Collision. We add new jobs here as we finish them.",
  projects: [
    {
      title: "Chevrolet Nova",
      caption: "This white Chevrolet Nova arrived rusty, on a trailer. It left with fresh white paint and a black hood.",
      images: [
        { ...work.before, label: "Before" },
        { ...work.after, label: "After" },
      ],
      link: { href: "/auto-paint", label: "Auto paint" },
      confirmed: true,
    },
    {
      title: "Mercedes at the shop",
      caption: "A black Mercedes outside the C&S Collision shop.",
      images: [{ ...work.extra, label: "At the shop" }],
      confirmed: true,
    },
    {
      title: "The shop",
      caption: "Our shop at 2878 Marco St, Las Vegas. You are welcome to stop by, Monday to Friday, 8 AM to 5 PM.",
      images: [{ ...work.shop, label: "2878 Marco St" }],
      link: { href: "/contact", label: "Visit the shop" },
      confirmed: true,
    },
  ],
  sendYours: {
    heading: "Send Us Photos of Yours",
    body: {
      text: "Text us a few photos of your vehicle and tell us what happened. We reply with a free preliminary estimate.",
      confirmed: false,
    },
    primary: { label: "Text us photos", href: "sms", confirmed: false },
    secondary: { label: "Get a Free Estimate", href: "/free-estimate", confirmed: false },
  },
  viewer: { open: "View larger photo", close: "Close", previous: "Previous photo", next: "Next photo" },
};

// ------------------------------------------------------------------ /about
export const about: {
  seo: Seo;
  h1: string;
  story: string[];
  owner: { name: Line; story: Line; photo: Line };
  facts: { heading: string; rows: { label: string; value: string; confirmed: boolean }[] };
  values: { heading: string; items: Line[] };
  links: Link[];
  cta: { heading: Line; primary: Button; secondary: Button };
} = {
  seo: {
    title: "About C&S Collision | Las Vegas Auto Body Shop Since 2022",
    description:
      "C&S Collision LLC is a Nevada licensed auto body shop serving Las Vegas and Henderson since 2022. Meet the shop at 2878 Marco St.",
  },
  h1: "About C&S Collision",
  story: [
    "C&S Collision LLC is a Nevada licensed auto body shop at 2878 Marco St, Las Vegas. We have served drivers in Las Vegas, Henderson and Sunrise Manor since 2022.",
    "We are a local shop, open Monday to Friday from 8 AM to 5 PM. You are welcome to stop by, meet us and see the shop before you decide.",
  ],
  owner: {
    name: { text: "[Owner name]", confirmed: false },
    story: { text: "[Two or three sentences from the owner: who runs the shop, and why they started it.]", confirmed: false },
    photo: { text: "[Photo of the owner or team in the shop]", confirmed: false },
  },
  facts: {
    heading: "C&S Collision at a Glance",
    rows: [
      { label: "Founded", value: "2022", confirmed: true },
      { label: "License", value: "Nevada licensed body shop", confirmed: true },
      { label: "Address", value: "2878 Marco St, Las Vegas, NV 89115", confirmed: true },
      { label: "Hours", value: "Monday to Friday, 8 AM to 5 PM. Closed Saturday and Sunday.", confirmed: true },
      { label: "Areas served", value: "Las Vegas, Henderson, Sunrise Manor", confirmed: true },
      { label: "Phone", value: "(725) 293-3544", confirmed: true },
      { label: "Google rating", value: "5.0 from 2 reviews", confirmed: true },
      { label: "Languages", value: "English and Spanish", confirmed: false },
    ],
  },
  values: {
    heading: "How We Work",
    items: [
      { text: "You get the estimate in plain terms before any work starts", confirmed: false },
      { text: "No work starts until you approve it", confirmed: false },
      { text: "We call you before doing any extra work", confirmed: false },
      { text: "We repair to manufacturer standards", confirmed: false },
      { text: "We work with your insurance or with you directly", confirmed: false },
      { text: "Our workmanship is guaranteed in writing", confirmed: false },
    ],
  },
  links: [
    { href: "/our-work", label: "See our work" },
    { href: "/contact", label: "Visit the shop" },
    { href: "/insurance-claims", label: "Insurance claims" },
  ],
  cta: {
    heading: { text: "Get a Free Estimate", confirmed: false },
    primary: { label: "Get a Free Estimate", href: "/free-estimate", confirmed: false },
    secondary: { label: "Call Us Now", href: "tel", confirmed: true },
  },
};

// ------------------------------------------------------------------ /faq
export const faq: {
  seo: Seo;
  h1: string;
  intro: string;
  lastReviewed: string;
  groups: { id: string; heading: string; items: Faq[] }[];
  cta: { heading: string; body: Line; primary: Button; secondary: Button };
} = {
  seo: {
    title: "Auto Body & Collision Repair FAQ | C&S Collision Las Vegas",
    description:
      "Answers to common auto body questions: hours, insurance, estimates, repair time and OEM vs aftermarket parts. C&S Collision, Las Vegas.",
  },
  h1: "Auto Body & Collision Repair FAQ",
  intro: "Short answers to the questions drivers ask us most. Each answer links to a page with more detail.",
  lastReviewed: "Last reviewed November 18, 2026",
  groups: [
    {
      id: "estimates",
      heading: "Estimates",
      items: [
        {
          q: "Do you offer free estimates?",
          a: "Yes. Estimates are free, by photo or at the shop. The final price is confirmed when we see the vehicle in person.",
          confirmed: false,
          link: { href: "/free-estimate", label: "Get an estimate" },
        },
        {
          q: "How do I get an estimate?",
          a: "Call us, stop by the shop or text us photos of the damage. You can also use the estimate form on this site.",
          confirmed: false,
          link: { href: "/free-estimate", label: "Get an estimate" },
        },
        {
          q: "What should I bring or send for an estimate?",
          a: "Send a wide photo of the vehicle, close-ups of the damage and your vehicle's year, make and model. If you are filing a claim, include your insurer's name and claim number.",
          confirmed: false,
        },
        {
          q: "Can I get a second opinion on another shop's estimate?",
          a: "Yes. Bring us the estimate and we will look at the damage and tell you what we see, with no obligation.",
          confirmed: false,
        },
        {
          q: "Can I get an estimate if I am not filing a claim?",
          a: "Yes. You get the same estimate whether you use insurance or pay yourself.",
          confirmed: false,
        },
        {
          q: "What happens if hidden damage is found?",
          a: "We call you before we do any extra work. If you are using insurance, we send the added damage to your insurer for approval first.",
          confirmed: false,
          link: { href: "/collision-repair", label: "Collision repair" },
        },
      ],
    },
    {
      id: "insurance",
      heading: "Insurance",
      items: [
        {
          q: "Can I choose my own body shop in Nevada?",
          a: "Yes. Nevada law (NRS 690B.016) says you may have repairs made at the licensed body shop of your choice, and your insurer must tell you about this right when you first contact it.",
          confirmed: false,
          link: { href: "/insurance-claims", label: "Insurance claims" },
        },
        {
          q: "Do I have to use the shop my insurer recommends?",
          a: "No. Under NRS 690B.016, your insurer may not require you to use one licensed body shop over another.",
          confirmed: false,
        },
        {
          q: "Do you work with my insurance company?",
          a: "Yes. We work with most major insurance companies.",
          confirmed: false,
        },
        {
          q: "What happens after I file a claim?",
          a: "You choose a shop, the shop writes the estimate, your insurer approves it, and the repair starts. You pay any deductible at pickup.",
          confirmed: false,
          link: { href: "/insurance-claims", label: "How a claim repair works" },
        },
        {
          q: "Will insurance cover my repair, and do I pay a deductible?",
          a: "If your policy covers the damage, insurance usually pays for the approved repair minus your deductible. If the other driver was at fault, their insurance may pay instead.",
          confirmed: false,
        },
        {
          q: "Is my car a total loss?",
          a: "Your insurer decides that by comparing the repair cost to the value of the car. We write the repair estimate they use to decide.",
          confirmed: false,
        },
      ],
    },
    {
      id: "repairs",
      heading: "Repairs",
      items: [
        {
          q: "What can you repair?",
          a: "We repair collision damage, dents, bumpers, paint and scratches, and bent frames. Send us photos if you are not sure.",
          confirmed: false,
          link: { href: "/services", label: "All auto body services" },
        },
        {
          q: "Can you match my car's paint color?",
          a: "Yes. We use your paint code, test the color against your car and blend it into the panels next to the repair.",
          confirmed: false,
          link: { href: "/auto-paint", label: "Auto paint and color matching" },
        },
        {
          q: "Can a scratch be fixed without repainting the whole panel?",
          a: "Often, yes. Light scratches in the clear coat can be polished out, while deeper scratches need paint on that area.",
          confirmed: false,
          link: { href: "/auto-paint", label: "Paint scratch repair" },
        },
        {
          q: "Can my dent be fixed without repainting?",
          a: "Often, yes, if the paint is not cracked and the back of the panel can be reached. Dents with damaged paint need body work and paint.",
          confirmed: false,
          link: { href: "/dent-repair", label: "Dent repair" },
        },
        {
          q: "Can a cracked bumper be repaired, or does it need replacing?",
          a: "Small cracks can often be repaired and refinished. Large tears or broken mounting tabs usually need a new bumper cover.",
          confirmed: false,
          link: { href: "/bumper-repair", label: "Bumper repair" },
        },
        {
          q: "How do I know if my car has frame damage?",
          a: "Signs include doors that do not close right, a car that pulls to one side and uneven tire wear. A measurement in the shop is the only sure way to know.",
          confirmed: false,
          link: { href: "/frame-straightening", label: "Frame straightening" },
        },
      ],
    },
    {
      id: "timing",
      heading: "Timing",
      items: [
        {
          q: "How long does collision repair take?",
          a: "It depends on the damage, the parts and how fast your insurance approves the repair. We give you an expected time with your estimate and tell you if it changes.",
          confirmed: false,
          link: { href: "/collision-repair", label: "Collision repair" },
        },
        {
          q: "How long does bumper repair take?",
          a: "It depends on whether the bumper is repaired or replaced and whether parts are in stock. We give you an expected time with your estimate.",
          confirmed: false,
        },
        {
          q: "Are you open on Saturdays?",
          a: "No. We are open Monday through Friday, 8 AM to 5 PM, and closed Saturday and Sunday.",
          confirmed: true,
        },
        {
          q: "Where are you, and what areas do you serve?",
          a: "Our shop is at 2878 Marco St, Las Vegas, NV 89115. We serve Las Vegas, Henderson and Sunrise Manor.",
          confirmed: true,
          link: { href: "/contact", label: "Visit the shop" },
        },
        {
          q: "Is a car with frame damage safe to drive after it is repaired?",
          a: "Yes, when the frame is straightened back to manufacturer specifications and measured again after the repair. We check how it drives before you pick it up.",
          confirmed: false,
        },
        {
          q: "How long does new paint last, and how do I care for it?",
          a: "A proper refinish is made to last like factory paint. Hand wash it for the first few weeks and skip wax until we say it is ready.",
          confirmed: false,
        },
      ],
    },
    {
      id: "payment-other",
      heading: "Payment & Other",
      items: [
        {
          q: "How much will my repair cost?",
          a: "It depends on the damage, the parts and the paint work needed. We give you an estimate first, and you approve the price before any work starts.",
          confirmed: false,
          link: { href: "/free-estimate", label: "Get an estimate" },
        },
        {
          q: "What is the difference between OEM and aftermarket parts?",
          a: "OEM parts are made by your vehicle's manufacturer, and aftermarket parts are made by other companies. Your policy sets what your insurer pays for, and we tell you which parts we recommend.",
          confirmed: false,
          link: { href: "/insurance-claims", label: "Insurance claims" },
        },
        {
          q: "Is the repair work guaranteed?",
          a: "Yes. Our workmanship is guaranteed in writing for as long as you own your vehicle.",
          confirmed: false,
        },
        {
          q: "Do you help with rental cars?",
          a: "Yes. We help you set up a rental through your insurance while your vehicle is in the shop.",
          confirmed: false,
        },
        {
          q: "Do you speak Spanish?",
          a: "Yes. Se habla español.",
          confirmed: false,
        },
        {
          q: "Are you a licensed auto body shop in Nevada?",
          a: "Yes. C&S Collision LLC is a Nevada licensed body shop and has served Las Vegas since 2022.",
          confirmed: true,
          link: { href: "/about", label: "About C&S Collision" },
        },
      ],
    },
  ],
  cta: {
    heading: "Still Have a Question?",
    body: { text: "Call or text us, Monday to Friday, 8 AM to 5 PM.", confirmed: false },
    primary: { label: "Call Us Now", href: "tel", confirmed: true },
    secondary: { label: "Get a Free Estimate", href: "/free-estimate", confirmed: false },
  },
};

// ------------------------------------------------------------------ /free-estimate and /free-estimate/thanks
export const freeEstimate: {
  seo: Seo;
  h1: string;
  lead: Line;
  ways: { heading: string; options: (Button & { body: string })[] };
  form: {
    heading: string;
    progress: string; // "{current}" and "{total}" are replaced by the builder
    next: string;
    back: string;
    steps: {
      photos: {
        label: string;
        photosLabel: string;
        photosHelp: string;
        addPhotos: string;
        removePhoto: string;
        damageLabel: string;
        damageChips: string[];
        whatHappenedLabel: string;
        whatHappenedHelp: string;
      };
      vehicle: {
        label: string;
        yearLabel: string;
        makeLabel: string;
        modelLabel: string;
        insuranceLabel: string;
        insuranceOptions: { value: "yes" | "no" | "not-sure"; label: string }[];
        insurerLabel: string;
        insurerHelp: string;
      };
      contact: {
        label: string;
        nameLabel: string;
        phoneLabel: string;
        phoneHelp: string;
        preferenceLabel: string;
        preferenceOptions: { value: "text" | "call"; label: string }[];
      };
    };
    photoTips: { heading: string; tips: { title: string; body: string }[] };
    submit: Line;
    /** Reply-time promise above the send button. While it holds a [bracket] it shows in review mode only. */
    replyTime: Line;
    sending: string;
    noObligation: string;
    privacy: { text: string; link: Link };
    errors: {
      summary: string;
      tooManyPhotos: string;
      photoType: string;
      photoTooLarge: string;
      nameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
      yearInvalid: string;
      sendFailed: Line;
    };
    /** Added by the builder: words the form needs that were not in the copy. */
    extra: {
      fallbackText: Line;
      fallbackCall: string;
      photoCount: string; // "{count}" and "{max}" are replaced by the builder
      photoPreparing: string;
      photoNoPreview: string;
      photosStillPreparing: string;
      /** Shown when the browser cannot open a photo (e.g. some HEIC files). */
      cannotRead: Line;
      /** Shown when a photo would push the upload past the size limit. */
      totalTooLarge: Line;
    };
  };
  thanks: {
    seo: Seo;
    heading: string; // "{name}" is replaced with the first name when known
    /** Added by the builder: heading when the first name is not known. */
    headingNoName: string;
    lead: Line;
    nextHeading: string;
    next: Item[];
    buttons: Button[];
    link: Link;
  };
} = {
  seo: {
    title: "Auto Body Estimate in Las Vegas, NV | C&S Collision",
    description:
      "Get a repair estimate from C&S Collision, 2878 Marco St, Las Vegas. Send photos, call (725) 293-3544 or stop by, Mon to Fri, 8 to 5.",
  },
  h1: "Get an Auto Body Estimate in Las Vegas",
  lead: {
    text: "Send us photos of the damage for a free preliminary estimate. It takes about a minute from your phone.",
    confirmed: false,
  },
  ways: {
    heading: "Three Ways to Get Your Estimate",
    options: [
      { label: "Call Us Now", href: "tel", confirmed: true, body: "Talk to us Monday to Friday, 8 AM to 5 PM." },
      { label: "Text us photos", href: "sms", confirmed: false, body: "Send photos and a short note about what happened." },
      { label: "Use the form", href: "/free-estimate", confirmed: true, body: "Add photos and your details in the short form above." },
    ],
  },
  form: {
    heading: "Estimate Request",
    progress: "Step {current} of {total}",
    next: "Next",
    back: "Back",
    steps: {
      photos: {
        label: "Photos and what happened",
        photosLabel: "Photos of the damage",
        photosHelp: "Add up to 10 photos from your camera or gallery.",
        addPhotos: "Add photos",
        removePhoto: "Remove photo",
        damageLabel: "Where is the damage?",
        damageChips: ["Front end", "Rear end", "Bumper", "Door or side", "Dent", "Scratches or paint", "Other"],
        whatHappenedLabel: "What happened? (optional)",
        whatHappenedHelp: "A sentence or two is enough.",
      },
      vehicle: {
        label: "Your vehicle",
        yearLabel: "Year",
        makeLabel: "Make",
        modelLabel: "Model",
        insuranceLabel: "Are you going through insurance?",
        insuranceOptions: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ],
        insurerLabel: "Insurance company (optional)",
        insurerHelp: "Add your claim number too, if you have one.",
      },
      contact: {
        label: "How to reach you",
        nameLabel: "Your name",
        phoneLabel: "Mobile phone",
        phoneHelp: "We only use it to reply about your estimate.",
        preferenceLabel: "Should we text or call?",
        preferenceOptions: [
          { value: "text", label: "Text me" },
          { value: "call", label: "Call me" },
        ],
      },
    },
    photoTips: {
      heading: "Photo Tips",
      tips: [
        { title: "Use daylight", body: "Shoot outside or in good light, without a flash glare on the paint." },
        { title: "Step back for one wide shot", body: "Show the whole side of the vehicle so we can see where the damage is." },
        { title: "Then get close", body: "Take close-ups of each damaged area, straight on and from an angle." },
      ],
    },
    submit: { text: "Send for My Free Estimate", confirmed: false },
    replyTime: { text: "We reply with a preliminary estimate within [X business hours].", confirmed: false },
    sending: "Sending your photos",
    noObligation: "No obligation. The final price is confirmed when we see your vehicle in person.",
    privacy: { text: "We use your details only to reply about your estimate.", link: { href: "/privacy", label: "Privacy policy" } },
    errors: {
      summary: "Please check the fields marked below.",
      tooManyPhotos: "You can add up to 10 photos. Remove one to add another.",
      photoType: "That file is not a photo. Please add a JPG, PNG or HEIC image.",
      photoTooLarge: "That photo is too large to send. Try a different one or text it to us.",
      nameRequired: "Enter your name so we know who to ask for.",
      phoneRequired: "Enter a mobile number so we can reply.",
      phoneInvalid: "Enter a 10-digit phone number, like (725) 293-3544.",
      yearInvalid: "Enter the year as four digits, like 2018.",
      sendFailed: {
        text: "We could not send your request. Your details are still here. Please try again, or call or text us at (725) 293-3544.",
        confirmed: false,
      },
    },
    extra: {
      fallbackText: { text: "Text us instead", confirmed: false },
      fallbackCall: "Call us",
      photoCount: "{count} of {max} photos added.",
      photoPreparing: "Preparing photo",
      photoNoPreview: "No preview",
      photosStillPreparing: "Your photos are still loading. Send again in a moment.",
      cannotRead: { text: "We could not open that photo. Please text it to us instead.", confirmed: false },
      totalTooLarge: {
        text: "That photo would make the upload too large to send. Text it to us instead.",
        confirmed: false,
      },
    },
  },
  thanks: {
    seo: {
      title: "Estimate Request Received | C&S Collision",
      description: "Your estimate request reached C&S Collision in Las Vegas. Here is what happens next.",
    },
    heading: "Got it, {name}. Your request is in.",
    headingNoName: "Got it. Your request is in.",
    lead: {
      text: "We will reply by your choice of text or call, the same business day if you sent it during our hours.",
      confirmed: false,
    },
    nextHeading: "What Happens Next",
    next: [
      { title: "We look at your photos", body: "We review the damage and the details you sent.", confirmed: true },
      { title: "We contact you", body: "We text or call with a preliminary estimate and any questions.", confirmed: false },
      { title: "We confirm the price in person", body: "Bring the vehicle in so we can inspect it and confirm the final price.", confirmed: false },
    ],
    buttons: [
      { label: "Text more photos", href: "sms", confirmed: false },
      { label: "Call Us Now", href: "tel", confirmed: true },
    ],
    link: { href: "/what-to-do-after-an-accident", label: "What to do after a car accident" },
  },
};

// ------------------------------------------------------------------ /contact
export const contact: {
  seo: Seo;
  h1: string;
  lead: string;
  callLabel: string;
  textLabel: Line;
  directionsLabel: string;
  hoursHeading: string;
  areas: { heading: string; list: string[]; body: string };
  notSure: { heading: string; links: Link[] };
  /** Added by the builder: click-to-load map labels (used site-wide by the map facade). */
  map: { load: string; open: string; title: string };
} = {
  seo: {
    title: "Contact C&S Collision | Auto Body Shop in Las Vegas, NV",
    description:
      "C&S Collision, 2878 Marco St, Las Vegas, NV 89115. Call (725) 293-3544. Open Mon to Fri, 8 to 5, closed weekends. Get directions or an estimate.",
  },
  h1: "Contact C&S Collision",
  lead: "Call us at (725) 293-3544 or stop by the shop at 2878 Marco St, Las Vegas, NV 89115. We are open Monday to Friday, 8 AM to 5 PM.",
  callLabel: "Call Us Now",
  textLabel: { text: "Text us photos", confirmed: false },
  directionsLabel: "Get Directions",
  hoursHeading: "Business Hours",
  areas: {
    heading: "Areas We Serve",
    list: ["Las Vegas", "Henderson", "Sunrise Manor"],
    body: "Our shop is in Las Vegas and serves drivers across Las Vegas, Henderson and Sunrise Manor.",
  },
  notSure: {
    heading: "Not Sure What You Need?",
    links: [
      { href: "/services", label: "Our services" },
      { href: "/insurance-claims", label: "Insurance claims" },
      { href: "/what-to-do-after-an-accident", label: "What to do after a car accident" },
      { href: "/faq", label: "All auto body questions" },
      { href: "/free-estimate", label: "Get an estimate" },
    ],
  },
  map: { load: "Load map", open: "Open in Google Maps", title: "Map to C&S Collision, 2878 Marco St, Las Vegas" },
};

// ------------------------------------------------------------------ /privacy
export const privacy: {
  seo: Seo;
  h1: string;
  lastUpdated: string;
  intro: string;
  sections: Section[];
  /** Added by the builder: email for privacy requests. Placeholder until the owner supplies one (review mode only). */
  requestEmail: Line;
  confirmed: boolean;
} = {
  seo: {
    title: "Privacy Policy | C&S Collision",
    description: "How C&S Collision LLC collects and uses the details you send through our estimate form.",
  },
  h1: "Privacy Policy",
  lastUpdated: "Last updated November 18, 2026",
  intro:
    "This policy explains what C&S Collision LLC collects through this website and how we use it. In short, we use your details only to reply about your estimate.",
  confirmed: false,
  requestEmail: { text: "Email: [owner to supply an address for privacy requests]", confirmed: false },
  sections: [
    {
      heading: "What We Collect",
      body: [
        "When you ask for an estimate, we collect what you enter: your name, mobile phone number, vehicle year, make and model, whether you are using insurance, your insurer's name if you give it, a note about what happened, the photos you upload and whether you prefer a text or a call.",
        "The company that hosts this website may also record basic technical data, such as your IP address and browser type, to keep the site running and secure.",
      ],
      confirmed: false,
    },
    {
      heading: "How We Use It",
      body: [
        "We use your details only to look at your vehicle's damage and reply to you about your estimate and repair. We do not use them for advertising.",
      ],
      confirmed: false,
    },
    {
      heading: "Text Messages and Calls",
      body: [
        "If you give us your phone number, we may text or call you about your estimate and your repair. We do not send marketing texts. Tell us to stop at any time and we will.",
      ],
      confirmed: false,
    },
    {
      heading: "Who We Share It With",
      body: [
        "We do not sell or rent your information. We share it only with the services that deliver the form to us and host this website, and with your insurance company if you ask us to work on your claim.",
        "We may also share information if the law requires it.",
      ],
      confirmed: false,
    },
    {
      heading: "Third-Party Services",
      body: [
        "This website does not use advertising or analytics tools. Its fonts and images are served from this website itself.",
        "The map on our pages loads from Google Maps only if you tap \"Load map\". Google then receives your IP address and browser details under Google's own privacy policy. Links to Google Maps, our Google reviews and Instagram take you to those sites, which have their own policies.",
        "When you send the estimate form, your details and photos pass through the service that delivers the form to us.",
      ],
      confirmed: false,
    },
    {
      heading: "How Long We Keep It",
      body: [
        "We keep your details and photos only as long as we need them for your estimate, your repair and our business records. After that we delete them.",
      ],
      confirmed: false,
    },
    {
      heading: "Your Choices",
      body: [
        "You can ask us what information we have about you, ask us to correct it or ask us to delete it. Call us at (725) 293-3544 or visit the shop.",
      ],
      confirmed: false,
    },
    {
      heading: "How to Make a Request",
      body: [
        "Call us at (725) 293-3544, Monday to Friday, 8 AM to 5 PM, or ask in person at the shop at 2878 Marco St, Las Vegas. Tell us what you want us to look up, correct or delete.",
      ],
      confirmed: false,
    },
    {
      heading: "Children",
      body: ["This website is not meant for children under 13, and we do not knowingly collect their information."],
      confirmed: false,
    },
    {
      heading: "Changes to This Policy",
      body: ["If we change this policy, we will update it on this page and change the date at the top."],
      confirmed: false,
    },
    {
      heading: "Contact Us",
      body: ["C&S Collision LLC, 2878 Marco St, Las Vegas, NV 89115. Phone (725) 293-3544."],
      confirmed: true,
    },
  ],
};

// ------------------------------------------------------------------ 404
export const notFound: {
  seo: Seo;
  h1: string;
  line: string;
  links: Link[];
  call: Button;
} = {
  seo: {
    title: "Page Not Found | C&S Collision",
    description: "This page does not exist. Go to the C&S Collision home page or call (725) 293-3544.",
  },
  h1: "Page Not Found",
  line: "We could not find that page. It may have moved. Try one of these instead.",
  links: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Our services" },
    { href: "/free-estimate", label: "Get an estimate" },
    { href: "/contact", label: "Contact us" },
  ],
  call: { label: "Call Us Now", href: "tel", confirmed: true },
};
