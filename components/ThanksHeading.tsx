"use client";

import { useEffect, useState } from "react";
import { fill } from "@/lib/links";

/** "Got it, {name}." with the first name the form stored in sessionStorage, or the no-name line. */
export default function ThanksHeading({ withName, withoutName }: { withName: string; withoutName: string }) {
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    try {
      setName(sessionStorage.getItem("estimate-first-name"));
    } catch {}
  }, []);
  return (
    <h1 className="mt-4 max-w-3xl text-[34px] uppercase sm:text-6xl">
      {name ? fill(withName, { name }) : withoutName}
    </h1>
  );
}
