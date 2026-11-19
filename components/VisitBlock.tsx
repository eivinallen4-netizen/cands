import { business, areas as siteAreas } from "@/content/site";
import { home } from "@/content/home";
import RuleLabel from "./RuleLabel";
import HoursTable from "./HoursTable";
import MapFacade from "./MapFacade";
import OpenStatus from "./OpenStatus";
import Button from "./Button";
import { PhoneIcon, PinIcon } from "./Icons";

type Props = {
  heading?: string;
  lead?: string;
  directions?: string;
  call?: string;
  areasHeading?: string;
  areas?: string[];
  areasBody?: string;
  hoursHeading?: string;
  id?: string;
  /** "h1" on /contact, where this block is the page itself. */
  as?: "h1" | "h2";
};

/** Address, hours, directions and a click-to-load map. Address first on phones, map second. Defaults: home.visit. */
export default function VisitBlock({
  heading = home.visit.heading,
  lead = home.visit.lead,
  directions = home.visit.directions,
  call = home.visit.call,
  areasHeading = home.visit.areasHeading,
  areas = home.visit.areas ?? siteAreas,
  areasBody,
  hoursHeading,
  id = "visit",
  as: H = "h2",
}: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t-[3px] border-ink print:hidden">
      <div className="grid lg:grid-cols-2">
        <div className="px-5 py-14 sm:px-12 lg:py-24">
          <H id={`${id}-title`} className={`uppercase ${H === "h1" ? "text-[34px] sm:text-6xl" : "text-[28px] sm:text-[44px]"}`}>
            {heading}
          </H>
          {lead ? <p className="lead mt-4 max-w-[52ch] text-lg">{lead}</p> : null}
          <address className="mt-6 not-italic">
            <span className="block font-display text-2xl font-extrabold sm:text-3xl">{business.street}</span>
            <span className="block font-display text-lg font-bold text-steel">
              {business.city}, {business.state} {business.zip}
            </span>
          </address>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={business.mapsUrl} external variant="cyan" icon={<PinIcon />}>
              {directions}
            </Button>
            <Button href={business.phoneHref} variant="ink" icon={<PhoneIcon />}>
              {call}
            </Button>
          </div>
          {hoursHeading ? (
            <RuleLabel as={H === "h1" ? "h2" : "h3"} className="mt-10">
              {hoursHeading}
            </RuleLabel>
          ) : null}
          <p className={`${hoursHeading ? "mt-4" : "mt-8"} text-[15px]`}>
            <OpenStatus />
          </p>
          <HoursTable className="mt-3 max-w-md" />
          <RuleLabel as={H === "h1" ? "h2" : "h3"} className="mt-10">
            {areasHeading}
          </RuleLabel>
          <p className="mt-3 font-semibold">{areas.join(" · ")}</p>
          {areasBody ? <p className="lead mt-2 max-w-[52ch]">{areasBody}</p> : null}
        </div>
        <MapFacade className="min-h-[320px] lg:min-h-full" />
      </div>
    </section>
  );
}
