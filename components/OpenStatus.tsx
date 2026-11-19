"use client";

import { useEffect, useState } from "react";
import { business } from "@/content/site";
import { chrome } from "@/content/nav";

const t = chrome.openStatus;

// Works out "Open now" from the shop's hours in Las Vegas time.
function status() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = (Number(get("hour")) % 24) + Number(get("minute")) / 60;
  const today = business.hours[day];
  if (today && hour >= today.open && hour < today.close) {
    return { open: true, text: t.open };
  }
  if (today && hour < today.open) return { open: false, text: t.opensToday };
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (business.hours[d]) {
      return { open: false, text: i === 1 ? t.closedOpensTomorrow : t.closedOpensOn.replace("{day}", names[d]) };
    }
  }
  return { open: false, text: t.closed };
}

export default function OpenStatus() {
  const [s, setS] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    const tick = () => setS(status());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={`h-2.5 w-2.5 flex-none rounded-full border border-current ${s?.open ? "bg-[#3ddc84]" : "bg-transparent"}`}
      />
      {s ? s.text : t.fallback}
    </span>
  );
}
