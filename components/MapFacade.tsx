"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { business, work } from "@/content/site";
import { contact } from "@/content/pages";
import { PinIcon } from "./Icons";

/**
 * Click-to-load map. Shows a static image (the real shop front) until the visitor taps
 * "Load map", so the Google Maps iframe and its scripts never load on page view.
 */
export default function MapFacade({
  image = work.shop,
  className = "",
}: {
  image?: { src: string; alt: string };
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  // Keyboard and screen-reader users land on the map they asked for.
  useEffect(() => {
    if (loaded) frameRef.current?.focus();
  }, [loaded]);
  return (
    <div className={`relative min-h-[300px] overflow-hidden bg-paper ${className}`}>
      {loaded ? (
        <iframe
          ref={frameRef}
          tabIndex={0}
          title={contact.map.title}
          src={business.mapsEmbed}
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <div className="on-dark absolute inset-x-0 bottom-0 flex flex-wrap gap-3 bg-ink/85 p-4">
            <button type="button" onClick={() => setLoaded(true)} className="btn btn-md btn-cyan">
              <PinIcon className="h-5 w-5" />
              <span>{contact.map.load}</span>
            </button>
            <a href={business.mapsUrl} target="_blank" rel="noopener" className="btn btn-md btn-ghost text-white">
              {contact.map.open}
            </a>
          </div>
        </>
      )}
    </div>
  );
}
