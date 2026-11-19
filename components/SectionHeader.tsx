import type { ReactNode } from "react";
import RuleLabel from "./RuleLabel";

/**
 * Eyebrow label + H2 (+ optional lead).
 * - left: stacked
 * - split: heading left, lead right (desktop)
 * - centered: CTA bands only
 */
export default function SectionHeader({
  label,
  title,
  lead,
  id,
  variant = "left",
  as: Tag = "h2",
  className = "",
}: {
  label?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** id for the heading, so the section can use aria-labelledby. */
  id?: string;
  variant?: "left" | "split" | "centered";
  as?: "h1" | "h2";
  className?: string;
}) {
  const heading = (
    <Tag
      id={id}
      className={`${label ? "mt-4" : ""} uppercase ${
        Tag === "h1" ? "text-[34px] sm:text-6xl lg:text-[68px]" : "text-[28px] sm:text-[44px]"
      }`}
    >
      {title}
    </Tag>
  );
  if (variant === "split") {
    return (
      <div className={`grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 ${className}`}>
        <div>
          {label ? <RuleLabel>{label}</RuleLabel> : null}
          {heading}
        </div>
        {lead ? <div className="lead max-w-[60ch] text-lg">{lead}</div> : null}
      </div>
    );
  }
  return (
    <div className={`${variant === "centered" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {label ? <RuleLabel>{label}</RuleLabel> : null}
      {heading}
      {lead ? <div className={`mt-5 max-w-[60ch] text-lg ${variant === "centered" ? "mx-auto" : ""} lead`}>{lead}</div> : null}
    </div>
  );
}
