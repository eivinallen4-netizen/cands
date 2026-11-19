import { freeEstimate } from "@/content/pages";

// Photo how-to beside the upload. Copy from freeEstimate.form.photoTips.
type Tip = { title: string; body: string };

/** Icons keyed by the tip's intent: daylight, wide shot, close-up (order-independent). */
function TipIcon({ title }: { title: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.25, "aria-hidden": true as const };
  const t = title.toLowerCase();
  if (t.includes("daylight") || t.includes("light"))
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" {...common}>
        <circle cx="24" cy="24" r="8" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4" className="text-cyan-text" stroke="currentColor" />
      </svg>
    );
  if (t.includes("wide") || t.includes("back"))
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" {...common}>
        <path d="M8 30h32l-3-9H11z" />
        <circle cx="15" cy="32" r="3.5" />
        <circle cx="33" cy="32" r="3.5" />
        <path d="M3 9h7M3 9v7M45 9h-7M45 9v7M3 43h7M3 43v-7M45 43h-7M45 43v-7" className="text-cyan-text" stroke="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" {...common}>
      <circle cx="21" cy="21" r="13" />
      <path d="M31 31l12 12" />
      <path d="M14 23c3-5 7-5 9-1s5 3 7-1" className="text-cyan-text" stroke="currentColor" />
    </svg>
  );
}

export default function PhotoTips({
  tips = freeEstimate.form.photoTips.tips,
  title = freeEstimate.form.photoTips.heading,
}: {
  tips?: Tip[];
  title?: string;
}) {
  return (
    <aside aria-label={title} className="border-[3px] border-ink bg-paper p-5 sm:p-6">
      <p className="font-display text-lg font-extrabold">{title}</p>
      <ul className="mt-4 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
        {tips.map((t) => (
          <li key={t.title} className="flex gap-4">
            <span className="flex-none">
              <TipIcon title={t.title} />
            </span>
            <span>
              <span className="block font-bold">{t.title}</span>
              <span className="block text-[15px] text-steel">{t.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
