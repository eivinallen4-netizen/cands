import { business } from "@/content/site";
import type { Line } from "@/content/types";
import OpenStatus from "./OpenStatus";
import Stars from "./Stars";
import { Confirm } from "./ReviewMode";
import { PinIcon } from "./Icons";

/** Open status + address (to directions) + the proof line (rating with count). At the foot of the hero, on ink. */
export default function TrustStrip({ proof }: { proof: Line }) {
  const address = `${business.street}, ${business.city}, ${business.state} ${business.zip}`;
  return (
    <div className="on-dark border-t border-white/20 bg-ink/80 text-white">
      <ul className="mx-auto flex w-full max-w-[1180px] flex-col gap-x-10 px-5 py-2 text-[15px] text-white/85 sm:px-8 lg:flex-row lg:items-center lg:py-3">
        <li className="flex min-h-11 items-center">
          <OpenStatus />
        </li>
        <li>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline"
          >
            <PinIcon className="h-4 w-4 flex-none" />
            {address}
          </a>
        </li>
        <li className="flex min-h-11 items-center">
          <Stars>
            {proof.text}
            <Confirm confirmed={proof.confirmed} />
          </Stars>
        </li>
      </ul>
    </div>
  );
}
