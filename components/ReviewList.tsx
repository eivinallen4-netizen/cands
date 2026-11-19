import { ReviewStars } from "./Stars";

type Review = { name: string; stars: number; text: string; note: string; when?: string };

/** Real Google reviews as simple cards. Snap-scrolls horizontally on phones when there are more than 3. */
export default function ReviewList({ reviews }: { reviews: Review[] }) {
  const scroller = reviews.length > 3;
  return (
    <ul
      className={
        scroller
          ? "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
          : "grid gap-4 md:grid-cols-2"
      }
    >
      {reviews.map((r) => (
        <li
          key={r.name}
          className={`flex flex-col border-[3px] border-ink bg-white p-6 ${scroller ? "w-[85%] flex-none snap-start md:w-auto" : ""}`}
        >
          <ReviewStars stars={r.stars} />
          {r.text ? (
            <blockquote className="mt-4 text-xl font-medium leading-snug">
              <p>&ldquo;{r.text}&rdquo;</p>
            </blockquote>
          ) : null}
          <p className="mt-auto pt-5 font-display font-extrabold">{r.name}</p>
          <p className="text-[15px] text-steel">
            {r.when ? `${r.when} · ` : ""}
            {r.note}
          </p>
        </li>
      ))}
    </ul>
  );
}
