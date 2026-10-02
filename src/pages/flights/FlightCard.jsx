import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Info } from "lucide-react";
import { fareTiers } from "../../data/flightData";
import {Plane} from "lucide-react"
import Reveal from "../../components/Reveal";
import FareTiers from "./FareTiers";
import RouteLegs from "./RouteLegs";
import FlightSpecs from "./FlightSpecs";

const badgeStyles = {
  accent: "bg-badge text-badgetext",
  muted: "bg-tier text-ink",
};

const Endpoint = ({ time, airport, align }) => (
  <div className={align === "right" ? "text-right" : "text-left"}>
    <p className=" text-3xl font-medium leading-none text-ink sm:text-[34px]">{time}</p>
    <p className="mt-1.5 text-base font-semibold text-brown">{airport.code}</p>
    <p className="text-xs text-muted sm:text-[13px]">{airport.terminal}</p>
  </div>
);

const FlightCard = ({ flight, onSelect }) => {
  const [expanded, setExpanded] = useState(flight.startOpen);
  const [tier, setTier] = useState("flex");

  const BadgeIcon = flight.badge.icon;
  const { details } = flight;
  const ToggleIcon = details.icon === "Info" ? Info : expanded ? ChevronUp : ChevronDown;

  const renderDetails = () => {
    if (details.type === "legs") return <RouteLegs legs={flight.legs} />;
    if (details.type === "specs") return <FlightSpecs flight={flight} />;
    // return <FareTiers tiers={fareTiers} selected={tier} onSelect={setTier} />;
  };

  return (
    <Reveal>
      <article className="overflow-hidden rounded-2xl bg-white shadow-card">
        <div className="flex w-full flex-col md:flex-row">
            {/* Left: ticket section */}
            <div className="min-w-0 flex-1 p-4 sm:p-5 lg:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full  text-sm font-semibold ${flight.avatar}`}>
                    {flight.code}
                  </span>
                  <div>
                    <p className="flex flex-wrap items-baseline gap-x-3 text-lg font-medium text-ink">
                      {flight.airline}
                      {/* <span className="text-[13px] font-medium tracking-[0.15em] text-muted">{flight.flightNo}</span> */}
                    </p>
                    <p className="text-sm text-muted">
                      {/* {flight.aircraft} ·  */}
                      {/* {flight.note} */}
                    </p>
                  </div>
                </div>
                {/* <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] ${badgeStyles[flight.badge.style]}`}
                >
                  <BadgeIcon size={13} /> {flight.badge.label}
                </span> */}
              </div>

              <div className="grid grid-cols-2 items-center gap-y-5 py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-x-6">
                <Endpoint time={flight.departTime} airport={flight.from} align="left" />

                <div className="order-last col-span-2 text-center sm:order-none sm:col-span-1">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">{flight.duration}</p>
                  <div className="my-3 flex items-center">
                    <span className="h-px flex-1 bg-line" />
                    {flight.layover ? (
                      <span className="mx-2 flex items-center gap-1.5 rounded-full bg-tier px-2.5 py-1 text-[11px] font-medium text-ink">
                        <span className="h-1.5 w-1.5 rounded-full bg-brown" /> {flight.layover}
                      </span>
                    ) : (
                      <span className="mx-2 flex h-7 w-7 items-center justify-center rounded-full bg-tier">
                        <Plane size={14} className="rotate-45 text-brown" />
                      </span>
                    )}
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  {/* <p className="text-[11px] text-muted">{flight.routeNote}</p> */}
                </div>

                <Endpoint time={flight.arriveTime} airport={flight.to} align="right" />
              </div>

             <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4">
                {flight.amenities.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-2 text-[13px] text-ink/70">
                    <Icon size={15} className="text-brown" /> {label}
                    </li>
                ))}
                </ul>
            </div>

            {/* Ticket perforation: horizontal on mobile, vertical on md+ */}
            <div className="relative h-0 shrink-0 border-t-2 border-dashed border-line md:h-auto md:w-0 md:border-t-0 md:border-l-2">
              <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-page" />
              <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-page md:-left-3 md:bottom-[-12px] md:right-auto md:top-auto" />
            </div>

            {/* Right: fare card */}
            <div className="w-full shrink-0 bg-panel md:w-64 lg:w-72">
            <form
              onSubmit={(event) => onSelect(event, flight, tier)}
              className="flex h-full flex-col justify-center p-5 text-left sm:p-6"
            >
              <h3 className="mt-1  text-2xl font-medium text-ink">{flight.fare.title}</h3>
              <p className="mt-1 text-[13px] text-muted">{flight.fare.text}</p>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-darkBlue py-3.5 text-base font-medium text-white transition-colors "
              >
                Select Passage <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className={`mt-3 flex w-full items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-[0.05em] text-ink/80 transition-colors hover:text-ink ${
                  details.variant === "filled" ? "rounded-lg bg-tier py-3" : "py-1"
                }`}
              >
                {expanded ? details.open : details.closed} <ToggleIcon size={14} />
              </button>
            </form>
        </div>
         

          {/* <div className="relative hidden border-l border-dashed border-black lg:block">
            <span className="absolute -top-3 left-0 h-6 w-6 -translate-x-1/2 rounded-full bg-page" />
            <span className="absolute bottom-6 left-0 h-6 w-6 -translate-x-1/2 rounded-full bg-panel" />
          </div> */}
        </div>

        {expanded && renderDetails()}
      </article>
    </Reveal>
  );
};

export default FlightCard;