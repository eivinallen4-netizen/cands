import type { ReactNode } from "react";
import { chrome } from "@/content/nav";

export function StarGlyphs({ n = 5, className = "h-4 w-4" }: { n?: number; className?: string }) {
  return (
    <span className="inline-flex flex-none gap-0.5" aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        // Yellow fill with an ink outline so the star reads against white.
        <svg key={i} viewBox="0 0 20 20" className={className}>
          <path
            d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6L10 15.1 4.7 18l1.1-6L1.4 7.8l6-.8z"
            fill="#f5b301"
            stroke="#0b0d0f"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

/**
 * The Google rating line. The text always comes from content and always carries the review
 * count ("5.0 on Google from 2 reviews"). Normal text size: never the largest type on a page.
 */
export default function Stars({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <StarGlyphs />
      <span>{children}</span>
    </span>
  );
}

/** Stars for a single review card. Has its own accessible label; shows no rating number. */
export function ReviewStars({ stars }: { stars: number }) {
  return (
    <span role="img" aria-label={chrome.reviewStars.replace("{n}", String(stars))} className="inline-flex">
      <StarGlyphs n={stars} />
    </span>
  );
}
