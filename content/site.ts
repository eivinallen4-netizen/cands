// Shared facts and the home page's original copy blocks.
//
// Structure: `business` (name, phone, address, hours), `hoursTable`, `areas`, the real photos
// (`work`) and the two Google `reviews`: the confirmed facts every page reads. (Legacy copy
// exports that nothing imported were removed in round C.) Newer page copy lives in content/home.ts,
// content/services.ts and content/pages.ts, with shared types in content/types.ts.
//
// `confirmed: true`  = taken from the C&S Google Business Profile or its photos.
// `confirmed: false` = standard collision-shop claim the owner has NOT confirmed yet.
//                      It shows a "Confirm with owner" tag in dev and at ?review=1.
//                      Flip to true once the owner confirms, or delete the line.

export const business = {
  name: "C&S Collision LLC",
  tagline: "Auto Body Shop",
  phoneDisplay: "(725) 293-3544",
  phoneHref: "tel:+17252933544",
  smsHref: "sms:+17252933544",
  street: "2878 Marco St",
  city: "Las Vegas",
  state: "NV",
  zip: "89115",
  since: 2022,
  rating: "5.0",
  reviewCount: 2,
  instagram: "https://www.instagram.com/candscollisionllc/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=C%26S+COLLISION+LLC+2878+Marco+St+Las+Vegas+NV+89115",
  mapsEmbed:
    "https://www.google.com/maps?q=C%26S+COLLISION+LLC+2878+Marco+St+Las+Vegas+NV+89115&output=embed",
  // 0 = Sunday. null = closed.
  hours: [
    null,
    { open: 8, close: 17 },
    { open: 8, close: 17 },
    { open: 8, close: 17 },
    { open: 8, close: 17 },
    { open: 8, close: 17 },
    null,
  ] as ({ open: number; close: number } | null)[],
};

export const hoursTable = [
  { day: "Monday", hours: "8:00 AM – 5:00 PM" },
  { day: "Tuesday", hours: "8:00 AM – 5:00 PM" },
  { day: "Wednesday", hours: "8:00 AM – 5:00 PM" },
  { day: "Thursday", hours: "8:00 AM – 5:00 PM" },
  { day: "Friday", hours: "8:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

// Real photos the owner posted on the C&S Google Business Profile.
export const work = {
  before: { src: "/images/nova-before.jpg", alt: "Rusty white Chevrolet Nova arriving on a trailer" },
  after: { src: "/images/nova-after.jpg", alt: "The same Nova finished, with fresh white paint and a black hood" },
  extra: { src: "/images/job-mercedes.jpg", alt: "Black Mercedes outside the C&S Collision shop" },
  shop: { src: "/images/shop-front.jpg", alt: "C&S Collision LLC building at 2878 Marco St with the shop sign" },
};

export const reviews = [
  {
    name: "Hector Podio",
    stars: 5,
    text: "I'm super happy with the work they did for me.",
    note: "Translated from Spanish by Google",
    when: "Google review",
  },
  {
    name: "Jay V",
    stars: 5,
    text: "",
    note: "Local Guide · 5-star rating, no written review",
    when: "Google review",
  },
];

export const areas = ["Las Vegas", "Henderson", "Sunrise Manor"];
