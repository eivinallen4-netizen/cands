import type { ReactNode } from "react";
import { Confirm } from "./ReviewMode";
import { CheckIcon } from "./Icons";

export type ChecklistItem = { title?: ReactNode; body?: ReactNode; text?: ReactNode; confirmed?: boolean };

/** Ruled checklist. Works on white, paper, cyan (`.on-cyan`) and ink (`.on-dark`) grounds. */
export default function Checklist({ items, className = "" }: { items: ChecklistItem[]; className?: string }) {
  return (
    <ul className={`border-t-[3px] border-current ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 border-b-2 border-current/20 py-4">
          <CheckIcon className="mt-1 h-5 w-5 flex-none" />
          <div>
            {it.title ? (
              <p className="font-display text-lg font-extrabold leading-snug">
                {it.title}
                {it.confirmed === false ? <Confirm confirmed={false} /> : null}
              </p>
            ) : null}
            {it.body ? <p className="lead mt-1 max-w-[60ch]">{it.body}</p> : null}
            {it.text ? (
              <p className="font-medium">
                {it.text}
                {it.confirmed === false && !it.title ? <Confirm confirmed={false} /> : null}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
