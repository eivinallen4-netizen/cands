import Image from "next/image";
import Link from "next/link";

// The client's logo exactly as supplied (cropped to the mark by the client's file; never redrawn,
// recoloured or filtered). It has a white ground, so on dark grounds it sits on a white plate.
export default function Wordmark({
  dark = false,
  eager = false,
  className = "",
}: {
  dark?: boolean;
  /** Header instance only: load immediately (it is above the fold). */
  eager?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={`inline-flex flex-none items-center ${className}`} aria-label="C&S Collision LLC, home">
      <Image
        src="/images/logo-mark.png"
        alt="C&S Collision LLC Auto Body Shop"
        width={604}
        height={215}
        loading={eager ? "eager" : "lazy"}
        className={dark ? "h-20 w-auto bg-white p-2" : "h-11 w-auto lg:h-12 xl:h-[60px]"}
      />
    </Link>
  );
}
