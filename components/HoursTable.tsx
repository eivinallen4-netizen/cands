import { hoursTable } from "@/content/site";

/** Hours as a definition list. `dark` for ink grounds. */
export default function HoursTable({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <dl className={`border-t-[3px] ${dark ? "border-white" : "border-ink"} ${className}`}>
      {hoursTable.map((h) => (
        <div
          key={h.day}
          className={`flex justify-between gap-4 border-b py-3 font-mono text-[15px] ${dark ? "border-white/20" : "border-line"}`}
        >
          <dt>{h.day}</dt>
          <dd className={h.hours === "Closed" ? (dark ? "text-white/70" : "text-steel") : "font-medium"}>{h.hours}</dd>
        </div>
      ))}
    </dl>
  );
}
