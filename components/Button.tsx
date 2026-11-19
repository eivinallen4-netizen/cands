import Link from "next/link";
import type { ReactNode } from "react";
import type { Button as ContentButton } from "@/content/types";
import { resolveHref } from "@/lib/links";
import { ConfirmDot } from "./ReviewMode";
import { PhoneIcon, PinIcon, TextIcon } from "./Icons";

type Variant = "cyan" | "ink" | "ghost";
type Size = "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  /** Hard offset shadow. Use on at most one button per screen. */
  shadow?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & {
  href: string;
  external?: boolean;
  "aria-label"?: string;
  onClick?: () => void;
};
type AsButton = Common & {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-describedby"?: string;
};

export function btnClass({ variant = "cyan", size = "md", shadow = false, className = "" }: Partial<Common>) {
  return `btn btn-${size} btn-${variant}${shadow ? " btn-shadow" : ""} ${className}`.trim();
}

/**
 * A button straight from content (`{ label, href, confirmed }`). Maps tel / sms / maps to real links,
 * adds the matching icon and a review dot (corner) when unconfirmed, so tags never crowd a button.
 */
export function CButton({
  b,
  href,
  ...rest
}: {
  b: ContentButton;
  /** Override the target (e.g. "#estimate" when the form is on the same page). */
  href?: string;
} & Omit<Common, "children" | "icon">) {
  const icon =
    b.href === "tel" ? <PhoneIcon /> : b.href === "sms" ? <TextIcon /> : b.href === "maps" ? <PinIcon /> : undefined;
  return (
    <Button {...rest} href={href ?? resolveHref(b.href)} external={b.href === "maps"} icon={icon}>
      {b.label}
      <ConfirmDot confirmed={b.confirmed} />
    </Button>
  );
}

/** One button for every action. Internal routes use next/link; tel:, sms: and external URLs use <a>. */
export default function Button(props: AsLink | AsButton) {
  const cls = btnClass(props);
  const inner = (
    <>
      {props.icon}
      <span>{props.children}</span>
    </>
  );
  if (props.href !== undefined) {
    const { href, external } = props;
    const isNative = /^(tel:|sms:|mailto:|https?:)/.test(href);
    if (isNative) {
      return (
        <a
          href={href}
          className={cls}
          aria-label={props["aria-label"]}
          onClick={props.onClick}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={props["aria-label"]} onClick={props.onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? "button"}
      className={cls}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-describedby={props["aria-describedby"]}
    >
      {inner}
    </button>
  );
}
