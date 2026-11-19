import Image from "next/image";
import type { Img } from "@/content/types";

type Shot = Img & { label: string; caption?: string };

/**
 * One real before/after pair, same 4:3 frame, labelled on the image, caption under each.
 * Stacked on phones, side by side from md. Real photos only.
 */
export default function BeforeAfter({ before, after }: { before: Shot; after: Shot }) {
  const tiles = [
    { shot: before, tag: "bg-ink text-white" },
    { shot: after, tag: "bg-cyan text-ink" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tiles.map(({ shot, tag }) => (
        <figure key={shot.label}>
          <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-ink bg-ink">
            <Image src={shot.src} alt={shot.alt} fill sizes="(min-width:1180px) 580px, (min-width:768px) 50vw, 100vw" className="object-cover" />
            <span aria-hidden className={`absolute left-0 top-0 px-4 py-2 font-display text-[15px] font-black uppercase ${tag}`}>
              {shot.label}
            </span>
          </div>
          {shot.caption ? <figcaption className="mt-2 text-[15px] text-steel">{shot.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}
