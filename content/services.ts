// Service page copy: one object per service page, rendered by one shared template.
//
// Structure: `servicePages` is an array of ServicePage (see content/types.ts), in menu order.
// Each page has: seo, h1, intro (2 sentences, also the Service schema description), card (one
// line for directory rows), image (generic workshop photo made by the asset maker, NOT a C&S job),
// damage (types the visitor recognises), steps (what we do), sections (extra H2 blocks),
// price (what affects the price, no numbers), faqs and related (slugs).
// Every service is `confirmed: false` until the owner confirms C&S offers it.
// `getService(slug)` returns one page.

import type { ServicePage, ServiceSlug } from "./types";

export const servicePages: ServicePage[] = [
  // ---------------------------------------------------------------- collision repair
  {
    slug: "collision-repair",
    name: "Collision Repair",
    confirmed: false,
    seo: {
      title: "Collision Repair in Las Vegas, NV | C&S Collision",
      description:
        "Collision repair at C&S Collision, 2878 Marco St, Las Vegas. From fender benders to major accident damage. Call (725) 293-3544, Mon to Fri 8 to 5.",
    },
    h1: "Collision Repair in Las Vegas, NV",
    intro:
      "C&S Collision repairs accident damage at our auto body shop at 2878 Marco St, Las Vegas, from minor fender benders to major collisions. We restore your vehicle to pre-accident condition and work with your insurance or with you directly.",
    card: "Accident damage repaired, from fender benders to major collisions.",
    image: {
      src: "/images/services/collision-repair.jpg",
      alt: "Damaged front corner of a grey sedan in a body shop repair bay",
    },
    damage: {
      heading: "Types of Collision Damage We Repair",
      lead: "Most accident damage falls into one of these. Pick the one that looks like yours and send us a photo.",
      items: [
        { title: "Front-end damage", body: "A pushed-in bumper, hood or grille after hitting another car or an object.", confirmed: false },
        { title: "Rear-end damage", body: "A crushed bumper, trunk or tailgate after someone hit you from behind.", confirmed: false },
        { title: "Side and door damage", body: "Dented doors, a scraped side or a bent mirror from a side impact or a parking lot.", confirmed: false },
        { title: "Fender damage", body: "A bent, creased or torn fender, often with a gap at the hood or door.", confirmed: false },
        { title: "Broken lights", body: "Cracked headlights or taillights and the panels around them.", confirmed: false },
        { title: "Structural damage", body: "Doors that no longer close right or a car that pulls to one side after a hard hit.", confirmed: false },
      ],
    },
    steps: {
      heading: "Our Collision Repair Process",
      items: [
        { title: "Estimate", body: "Text us photos or stop by. We look at the damage and give you a preliminary estimate.", confirmed: false },
        { title: "Inspection and repair plan", body: "We inspect the vehicle in person, look for hidden damage and confirm the price with you or your insurer.", confirmed: false },
        { title: "Body repair", body: "We repair or replace damaged panels and straighten what is bent, to manufacturer standards.", confirmed: false },
        { title: "Paint and refinish", body: "We match the paint to the rest of your vehicle and refinish the repaired areas.", confirmed: false },
        { title: "Quality check and pickup", body: "We check fit, finish and lights, then call you to pick up your vehicle.", confirmed: false },
      ],
    },
    sections: [
      {
        heading: "Fender Repair",
        body: [
          "A dented or bent fender can often be repaired and refinished instead of replaced. If the metal is torn or the mounting points are bent, we replace the fender and paint it to match.",
          "We also check the gaps at the hood, door and bumper so the panels line up again.",
        ],
        confirmed: false,
      },
      {
        heading: "What Collision Repair Can Include",
        body: [
          "Many collision repairs need more than one kind of work. A rear-end hit can mean bumper repair, dent repair and new paint on the same vehicle.",
          "We plan all of it in one estimate, so you know the full job before any work starts.",
        ],
        confirmed: false,
      },
      {
        heading: "What If Hidden Damage Is Found?",
        body: [
          "We call you before we do any extra work. Damage behind a bumper or panel often shows up only once the part is removed.",
          "If you are using insurance, we send the added damage to your insurer for approval first.",
        ],
        confirmed: false,
      },
    ],
    price: {
      heading: "How Much Does Collision Repair Cost?",
      lead: "The price depends on what is damaged and how the repair is paid for. Your estimate lists every part and step before you approve anything.",
      factors: [
        { label: "Size of the damage", note: "One panel costs less than several panels or structural work." },
        { label: "Parts", note: "New, aftermarket or repaired parts, and whether they are in stock." },
        { label: "Paint", note: "How many panels need paint and how much blending the color needs." },
        { label: "Hidden damage", note: "Damage found behind panels once the vehicle is opened up." },
        { label: "Vehicle", note: "Make, model, and features like sensors in the bumper." },
      ],
      insurance: "If your insurance covers the claim, it pays for the approved repair and you pay your deductible.",
      selfPay: "If you pay yourself, you get the same estimate and approve the price before we start.",
      confirmed: false,
    },
    faqs: [
      {
        q: "What counts as collision repair?",
        a: "Collision repair is any repair of damage from an accident, from a small dent to a bent frame. It covers body work, parts, paint and the checks after the repair.",
        confirmed: false,
      },
      {
        q: "How long does collision repair take?",
        a: "It depends on the damage, the parts and how fast your insurance approves the repair. We give you an expected time with your estimate and tell you if it changes.",
        confirmed: false,
      },
      {
        q: "Do I have to use the body shop my insurance recommends?",
        a: "No. Nevada law (NRS 690B.016) lets you have repairs done at the licensed body shop of your choice, and your insurer may not require you to use one licensed shop over another.",
        confirmed: false,
        link: { href: "/insurance-claims", label: "How insurance claims work" },
      },
      {
        q: "Can I drive my car after an accident?",
        a: "Only if it is safe. Do not drive if lights are broken, a wheel is bent, fluid is leaking or warning lights are on.",
        confirmed: false,
        link: { href: "/what-to-do-after-an-accident", label: "What to do after a car accident" },
      },
      {
        q: "Is the repair work guaranteed?",
        a: "Yes. Our workmanship is guaranteed in writing for as long as you own your vehicle.",
        confirmed: false,
      },
    ],
    related: ["bumper-repair", "dent-repair", "auto-paint", "frame-straightening"],
  },

  // ---------------------------------------------------------------- auto paint
  {
    slug: "auto-paint",
    name: "Auto Paint & Color Matching",
    confirmed: false,
    seo: {
      title: "Auto Paint & Color Matching in Las Vegas, NV | C&S Collision",
      description:
        "Car painting and color matching at C&S Collision in Las Vegas. Scratch and scrape repair, blended so the finish matches. Call (725) 293-3544.",
    },
    h1: "Auto Paint & Car Painting in Las Vegas, NV",
    intro:
      "C&S Collision is a car paint shop in Las Vegas for car painting, scratch repair and matching your factory color. We blend new paint into the panels around it so the repair is hard to see.",
    card: "Car painting, color matching and scratch repair.",
    image: {
      src: "/images/services/auto-paint.jpg",
      alt: "Paint color chips held against a car panel to compare the shade",
    },
    damage: {
      heading: "Paint Damage We Repair",
      lead: "Paint damage is not always deep. Pick the one that looks like yours.",
      items: [
        { title: "Scratches and scrapes", body: "Lines from keys, branches, carts or a tight parking spot.", confirmed: false },
        { title: "Chips", body: "Small spots where stones or debris knocked off the paint.", confirmed: false },
        { title: "Faded or peeling clear coat", body: "Dull, chalky or flaking paint, common on cars parked in the Las Vegas sun.", confirmed: false },
        { title: "Paint after body work", body: "New paint on panels we repaired after a collision or dent.", confirmed: false },
        { title: "Mismatched panels", body: "A panel that was painted before and does not match the rest of the car.", confirmed: false },
      ],
    },
    steps: {
      heading: "How We Paint Your Car",
      items: [
        { title: "Find the color", body: "We use your vehicle's paint code and test the shade against your car.", confirmed: false },
        { title: "Prepare the surface", body: "We sand, fill and prime the area so the new paint has a smooth base.", confirmed: false },
        { title: "Paint and blend", body: "We apply the color and blend it into the panels next to it so the shade matches.", confirmed: false },
        { title: "Clear coat and finish", body: "We apply clear coat, then polish it to match the gloss of the rest of the car.", confirmed: false },
      ],
    },
    sections: [
      {
        heading: "Color Matching",
        body: [
          "We start with your paint code, then compare the mixed color to your actual car. Sun and age change paint, so the code alone is not always an exact match.",
          "We blend the new paint into the panels around the repair. This keeps the color even when you look at the car from different angles.",
        ],
        confirmed: false,
      },
      {
        heading: "Paint Scratch Repair",
        body: [
          "A light scratch in the clear coat can often be polished out without new paint. A scratch you can catch with a fingernail usually needs touch-up or a repaint of that area.",
          "Send us a close-up photo and we will tell you which one it needs.",
        ],
        confirmed: false,
      },
      {
        heading: "When Body Work Comes First",
        body: [
          "If the panel is dented, we repair the dent before we paint. Paint over a dent still shows the dent.",
        ],
        confirmed: false,
      },
    ],
    price: {
      heading: "How Much Does It Cost to Paint a Car?",
      lead: "The cost to paint a car depends on how much of it needs paint and how much prep the surface needs. Your estimate lists the panels and the work before you approve anything.",
      factors: [
        { label: "How much area", note: "One scratch, one panel, or the whole car." },
        { label: "Prep work", note: "Dents, rust or old peeling paint add sanding and filling time." },
        { label: "Color", note: "Metallic, pearl and three-stage colors take more steps to match." },
        { label: "Blending", note: "How many panels next to the repair need blending for an even color." },
        { label: "Parts removed", note: "Trim, handles and lights taken off for a clean paint edge." },
      ],
      insurance: "If the paint damage came from an accident covered by your policy, your insurance usually pays for the repair minus your deductible.",
      selfPay: "Small scratches and faded paint are often paid directly. You get the same estimate either way.",
      confirmed: false,
    },
    faqs: [
      {
        q: "How much does it cost to paint a car?",
        a: "It depends on how much of the car needs paint, how much prep the surface needs and the type of color. Send us photos for an estimate, and we confirm the price when we see the car in person.",
        confirmed: false,
        link: { href: "/free-estimate", label: "Get an estimate" },
      },
      {
        q: "Can you match my car's paint color?",
        a: "Yes. We use your paint code, test the color against your car and blend it into the panels around the repair.",
        confirmed: false,
      },
      {
        q: "Can a scratch be fixed without repainting the whole panel?",
        a: "Often, yes. Light scratches in the clear coat can be polished out, while deeper scratches need paint on that area.",
        confirmed: false,
      },
      {
        q: "How do I care for new paint?",
        a: "Wash it by hand with mild soap for the first few weeks and skip wax until we say it is ready. We give you care instructions when you pick up your car.",
        confirmed: false,
      },
      {
        q: "Does a dent need to be fixed before painting?",
        a: "Yes. Paint over a dent still shows the dent, so we repair the panel first.",
        confirmed: false,
        link: { href: "/dent-repair", label: "Dent repair before paint" },
      },
    ],
    related: ["dent-repair", "collision-repair", "bumper-repair"],
  },

  // ---------------------------------------------------------------- dent repair
  {
    slug: "dent-repair",
    name: "Dent Repair",
    confirmed: false,
    seo: {
      title: "Auto Dent Repair in Las Vegas, NV | C&S Collision",
      description:
        "Dent and crease repair at C&S Collision, Las Vegas. See the shop at 2878 Marco St or call (725) 293-3544 for an estimate.",
    },
    h1: "Auto Dent Repair in Las Vegas, NV",
    intro:
      "C&S Collision repairs dings, dents and creased panels at our auto body shop in Las Vegas. Some dents can be pushed out without new paint, and others need body work and paint to look right again.",
    card: "Dings, dents and creased panels, with or without paint.",
    image: {
      src: "/images/services/dent-repair.jpg",
      alt: "Reflection board showing the outline of a dent in a car door",
    },
    damage: {
      heading: "Types of Dents We Repair",
      lead: "Where the dent is and whether the paint cracked decide how it gets fixed.",
      items: [
        { title: "Door dings", body: "Small round dents from car doors and carts in parking lots.", confirmed: false },
        { title: "Creases", body: "A long line pressed into a door or fender.", confirmed: false },
        { title: "Large dents", body: "A wide pushed-in area from a pole, post or another car.", confirmed: false },
        { title: "Dents with cracked paint", body: "Dents where the paint is chipped, cracked or scraped.", confirmed: false },
        { title: "Dents on body lines or edges", body: "Dents on a sharp body line or the edge of a panel, which are harder to reach.", confirmed: false },
      ],
    },
    steps: {
      heading: "How We Repair Dents",
      items: [
        { title: "Look at the dent", body: "We check its size, where it is and whether the paint is damaged.", confirmed: false },
        { title: "Choose the method", body: "We tell you if it can be fixed without paint or needs body work and paint.", confirmed: false },
        { title: "Repair the panel", body: "We push or pull the metal back into shape, or fill and smooth it.", confirmed: false },
        { title: "Paint if needed", body: "If the paint was damaged, we refinish and blend it to match.", confirmed: false },
      ],
    },
    sections: [
      {
        heading: "Paintless Dent Repair",
        body: [
          "Paintless dent repair pushes the metal back into shape from behind the panel, so your factory paint stays. It works best on small to medium dents where the paint is not cracked.",
          "It is usually faster than body work and paint because there is nothing to refinish.",
        ],
        confirmed: false,
      },
      {
        heading: "When a Dent Needs Body Work and Paint",
        body: [
          "A dent needs body work and paint when the paint is cracked or chipped, the metal is stretched, or the dent is on a sharp edge we cannot reach from behind. We repair the panel, then paint and blend it to match.",
        ],
        confirmed: false,
      },
    ],
    price: {
      heading: "How Much Does Dent Repair Cost?",
      lead: "The cost depends on the size of the dent, where it is and whether the paint is damaged. We tell you the method and the price before we start.",
      factors: [
        { label: "Size and depth", note: "A small ding takes less time than a wide or deep dent." },
        { label: "Location", note: "Dents on body lines, edges or roof rails are harder to reach." },
        { label: "Paint damage", note: "Cracked or chipped paint means paint work is added." },
        { label: "Number of dents", note: "Several dents on one panel are often repaired together." },
      ],
      insurance: "Dents from an accident may be covered by your policy, minus your deductible.",
      selfPay: "Many small dents are paid directly. You get the same estimate either way.",
      confirmed: false,
    },
    faqs: [
      {
        q: "Can my dent be fixed without repainting?",
        a: "Often, yes, if the paint is not cracked and we can reach the back of the panel. That is paintless dent repair. Dents with damaged paint need body work and paint.",
        confirmed: false,
      },
      {
        q: "How much does dent repair cost?",
        a: "It depends on the size of the dent, where it is and whether the paint is damaged. Send us a photo and we will tell you the method and a preliminary price.",
        confirmed: false,
        link: { href: "/free-estimate", label: "Get an estimate" },
      },
      {
        q: "Is a small dent worth repairing?",
        a: "Usually, yes, if the paint is cracked, because bare metal can rust. A small dent with intact paint is cosmetic, so it is your call.",
        confirmed: false,
      },
      {
        q: "Will the repaired panel need new paint?",
        a: "Only if the paint was damaged. When it is, we refinish and blend it so the color matches.",
        confirmed: false,
        link: { href: "/auto-paint", label: "Repainting a repaired panel" },
      },
    ],
    related: ["auto-paint", "collision-repair", "bumper-repair"],
  },

  // ---------------------------------------------------------------- bumper repair
  {
    slug: "bumper-repair",
    name: "Bumper Repair",
    confirmed: false,
    seo: {
      title: "Bumper Repair in Las Vegas, NV | C&S Collision",
      description:
        "Cracked, scuffed or loose bumper? C&S Collision repairs or replaces bumpers in Las Vegas. Call (725) 293-3544 or stop by, Mon to Fri 8 to 5.",
    },
    h1: "Bumper Repair in Las Vegas, NV",
    intro:
      "C&S Collision repairs or replaces cracked, scuffed and loose bumpers at our auto body shop in Las Vegas. We tell you which one your bumper needs and paint it to match the rest of your vehicle.",
    card: "Cracked, scuffed or loose bumpers repaired or replaced.",
    image: {
      src: "/images/services/bumper-repair.jpg",
      alt: "Cracked rear bumper cover removed from a car and set on a workshop stand",
    },
    damage: {
      heading: "Types of Bumper Damage We Repair",
      lead: "Most bumper damage is one of these. Pick the one that looks like yours.",
      items: [
        { title: "Scuffs and scrapes", body: "Paint rubbed off from a pole, curb or parking garage wall.", confirmed: false },
        { title: "Cracks and splits", body: "A crack or tear in the plastic bumper cover.", confirmed: false },
        { title: "Dents and push-ins", body: "A bumper pushed in or bent out of shape.", confirmed: false },
        { title: "Loose or hanging bumper", body: "Broken clips or tabs, so the bumper sags or has a gap.", confirmed: false },
        { title: "Sensor area damage", body: "Damage near parking sensors or cameras in the bumper.", confirmed: false },
      ],
    },
    steps: {
      heading: "Our Bumper Repair Process",
      items: [
        { title: "Inspect", body: "We remove the cover if needed and check the brackets and the reinforcement behind it.", confirmed: false },
        { title: "Repair or replace", body: "We repair cracks and dents in the cover, or replace it if it cannot be repaired well.", confirmed: false },
        { title: "Paint to match", body: "We paint the bumper and blend it to match the panels next to it.", confirmed: false },
        { title: "Refit and check", body: "We refit the bumper, line up the gaps and check that lights and sensors work.", confirmed: false },
      ],
    },
    sections: [
      {
        heading: "Repair or Replace?",
        body: [
          "Many scuffs, small cracks and dents in a plastic bumper cover can be repaired and refinished. Large tears, missing pieces and broken mounting tabs usually mean a new cover.",
          "We show you what we found and why, so you can decide before we start.",
        ],
        confirmed: false,
      },
      {
        heading: "Will It Match the Rest of My Car?",
        body: [
          "Yes. We match the bumper to your paint code and blend it with the panels next to it, so the color looks even.",
        ],
        confirmed: false,
      },
    ],
    price: {
      heading: "How Much Does Bumper Repair Cost?",
      lead: "Bumper repair cost depends on whether the cover can be repaired or must be replaced, and on what is behind it. Your estimate shows each part and step before you approve.",
      factors: [
        { label: "Repair or replace", note: "Repairing the cover usually costs less than a new one." },
        { label: "Damage behind the cover", note: "Bent brackets or a damaged reinforcement add parts." },
        { label: "Paint", note: "Bumper paint plus blending into the panels next to it." },
        { label: "Sensors and cameras", note: "Parking sensors may need to be moved, replaced or checked." },
        { label: "Vehicle", note: "Make and model change the price of the bumper and its parts." },
      ],
      insurance: "If the bumper was damaged in a covered accident, your insurance usually pays for the repair minus your deductible.",
      selfPay: "For a small scuff or crack, paying yourself can make sense compared with your deductible. We give you the same estimate either way.",
      confirmed: false,
    },
    faqs: [
      {
        q: "Can a cracked bumper be repaired, or does it need replacing?",
        a: "Small cracks can often be repaired and refinished. Large tears, missing pieces or broken mounting tabs usually need a new bumper cover.",
        confirmed: false,
      },
      {
        q: "Will insurance cover bumper repair?",
        a: "Usually, yes, if the damage came from an accident your policy covers, minus your deductible. For small damage, compare the repair estimate with your deductible first.",
        confirmed: false,
        link: { href: "/insurance-claims", label: "Will insurance cover it" },
      },
      {
        q: "How long does bumper repair take?",
        a: "It depends on whether the bumper is repaired or replaced and whether parts are in stock. We give you an expected time with your estimate.",
        confirmed: false,
      },
      {
        q: "Can I drive with a damaged bumper?",
        a: "Often, if it is firmly attached and the lights work. Do not drive if it is hanging, loose or touching a tire.",
        confirmed: false,
      },
      {
        q: "Does the whole bumper need painting for one damaged area?",
        a: "Usually, yes, because a bumper is one piece and partial paint can show an edge. We blend it so it matches the panels next to it.",
        confirmed: false,
        link: { href: "/auto-paint", label: "Paint matching" },
      },
    ],
    related: ["collision-repair", "auto-paint", "dent-repair"],
  },

  // ---------------------------------------------------------------- frame straightening (kept short: no measurable demand)
  {
    slug: "frame-straightening",
    name: "Frame Straightening",
    confirmed: false,
    seo: {
      title: "Frame Straightening in Las Vegas, NV | C&S Collision",
      description:
        "Structural and frame damage measured and straightened at C&S Collision in Las Vegas. Call (725) 293-3544 to talk through your repair.",
    },
    h1: "Frame Straightening & Structural Repair in Las Vegas, NV",
    intro:
      "C&S Collision measures and straightens frame and structural damage after a hard collision. We bring the frame back to manufacturer specifications so the vehicle drives straight and the panels fit.",
    card: "Bent frames measured and straightened to manufacturer specifications.",
    image: {
      src: "/images/services/frame-straightening.jpg",
      alt: "Measuring arms attached under a car body on a frame straightening bench",
    },
    damage: {
      heading: "Signs of Frame Damage",
      lead: "Frame damage is not always easy to see. Look for these after a hard hit.",
      items: [
        { title: "Doors or trunk do not close right", body: "Gaps that are wider on one side, or doors that stick.", confirmed: false },
        { title: "Car pulls to one side", body: "The steering wheel sits off center or the car drifts.", confirmed: false },
        { title: "Uneven tire wear", body: "One tire wears faster than the others after the accident.", confirmed: false },
        { title: "Creases under the car", body: "Bent or kinked metal under the vehicle or in the trunk floor.", confirmed: false },
      ],
    },
    steps: {
      heading: "How We Straighten a Frame",
      items: [
        { title: "Measure", body: "We measure the frame and compare it to the manufacturer specifications.", confirmed: false },
        { title: "Straighten", body: "We secure the vehicle and pull the bent areas back into position.", confirmed: false },
        { title: "Measure again", body: "We check the measurements again until they match the specifications.", confirmed: false },
        { title: "Finish the repair", body: "We repair the body panels and paint, then check the fit and how the car drives.", confirmed: false },
      ],
    },
    sections: [],
    price: {
      heading: "What Affects the Cost of Frame Repair?",
      lead: "Frame repair cost depends on how far the frame is bent and what else was damaged. We measure first, then give you the estimate.",
      factors: [
        { label: "How much is bent", note: "One corner costs less than damage across the frame." },
        { label: "Parts", note: "Some bent sections are replaced instead of straightened." },
        { label: "Other damage", note: "Panels, suspension and paint usually need work too." },
      ],
      insurance: "Frame damage from a covered accident is usually paid by your insurance, minus your deductible.",
      selfPay: "If you pay yourself, you get the same estimate and approve it before we start.",
      confirmed: false,
    },
    faqs: [
      {
        q: "How do I know if my car has frame damage?",
        a: "Signs include doors or a trunk that no longer close right, a car that pulls to one side and uneven tire wear. A measurement in the shop is the only sure way to know.",
        confirmed: false,
      },
      {
        q: "Is a car with frame damage safe to drive after it is repaired?",
        a: "Yes, when the frame is straightened back to manufacturer specifications and measured again after the repair. We check the measurements and how the car drives before you pick it up.",
        confirmed: false,
      },
      {
        q: "Will frame damage make my car a total loss?",
        a: "Not always. Your insurer decides by comparing the repair cost to the value of the car.",
        confirmed: false,
        link: { href: "/insurance-claims", label: "Insurance claims" },
      },
      {
        q: "Will insurance cover frame repair?",
        a: "Usually, yes, if the damage came from an accident your policy covers, minus your deductible.",
        confirmed: false,
        link: { href: "/insurance-claims", label: "How insurance claims work" },
      },
    ],
    related: ["collision-repair", "bumper-repair", "auto-paint"],
  },
];

/** Added by the builder: words the service template needs that are not per-service. */
export const serviceTemplate = {
  relatedHeading: "Related Services",
};

export function getService(slug: ServiceSlug): ServicePage {
  const page = servicePages.find((s) => s.slug === slug);
  if (page === undefined) throw new Error(`Unknown service slug: ${slug}`);
  return page;
}
