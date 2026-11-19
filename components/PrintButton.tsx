"use client";

/** On-screen only; hidden in print. */
export default function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-md btn-ghost print:hidden">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.25} aria-hidden>
        <path d="M6 9V3h12v6M6 18H3v-8h18v8h-3M6 14h12v7H6z" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
