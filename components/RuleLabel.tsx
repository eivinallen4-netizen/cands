import type { ReactNode } from "react";

/** The logo's italic label between two rules. Renders as an eyebrow <p>, or as a heading when it is the section's only heading. */
export default function RuleLabel({
  as: Tag = "p",
  id,
  className = "",
  children,
}: {
  as?: "p" | "h2" | "h3" | "span";
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={`rule-label ${className}`}>
      {children}
    </Tag>
  );
}
