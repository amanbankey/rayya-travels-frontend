import { ArrowUpRight, Bed, Briefcase, Crown, Plane, Sparkles, Utensils, Wifi } from "lucide-react";
import { flights } from "../../data/homeData";
import SectionHeader from "./SectionHeader";
import Reveal from "../../components/Reveal";

const icons = { Bed, Utensils, Briefcase, Wifi, Crown, Sparkles };

const Airport = ({ data, align }) => (
  <div className={align === "right" ? "text-right" : "text-left"}>
    <p className="font-serif text-3xl font-medium text-ink sm:text-4xl">{data.code}</p>
    <p className="mt-1 text-[11px] font-medium text-ink">{data.city}</p>
    <p className="mt-0.5 text-[9px] text-muted">{data.detail}</p>
  </div>
);

const FlightFolios = () => (
  <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
    <Reveal>
      <SectionHeader
        eyebrow="Private Aviation & Flagship Manifests"
        title="Curated Flight Boarding Folios"
        text="Tailored airborne routes designed for frictionless customs transit, lie-flat private suites, and executive apron handling."
      >
        <span className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-[9px] font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" /> Apron Transfers Included On All Departures
        </span>
      </SectionHeader>
    </Reveal>

    <div className="mt-8 space-y-5">
      {flights.map((flight, index) => (
        <Reveal key={flight.id} delay={index * 120}>
          <article className="grid overflow-hidden rounded-2xl border border-line bg-paper lg:grid-cols-[1fr_280px]">
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-badge px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.15em] text-badgetext">
                    {flight.aircraft}
                  </span>
                  <span className="text-[10px] text-muted">{flight.kind}</span>
                </div>
                <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-muted">Manifest N° {flight.manifest}</span>
              </div>

              <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
                <Airport data={flight.from} align="left" />
                <div className="text-center">
                  <p className="text-[9px] font-medium text-muted">{flight.duration}</p>
                  <div className="relative my-2 flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full border border-muted bg-paper" />
                    <span className="h-px flex-1 bg-line" />
                    <Plane size={14} className="mx-1 rotate-45 text-ink" />
                    <span className="h-px flex-1 bg-line" />
                    <span className="h-1.5 w-1.5 rounded-full border border-muted bg-paper" />
                  </div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-muted">{flight.route}</p>
                </div>
                <Airport data={flight.to} align="right" />
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-dashed border-line pt-4">
                {flight.perks.map(({ icon, label }) => {
                  const Icon = icons[icon];
                  return (
                    <li key={label} className="flex items-center gap-1.5 text-[10px] font-medium text-muted">
                      <Icon size={12} className="text-sand" /> {label}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col justify-center gap-3 border-t border-dashed border-line bg-cream/50 p-5 sm:p-6 lg:border-l lg:border-t-0">
              <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-muted">Clearance Status</p>
              <span className="w-fit rounded-full bg-badge px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.15em] text-badgetext">
                {flight.status}
              </span>
              <p className="text-[11px] leading-relaxed text-muted">{flight.note}</p>
              <button className="rounded-lg bg-dark px-4 py-3 text-[9px] font-medium uppercase tracking-[0.2em] text-paper transition-colors hover:bg-ink">
                View Schedule
              </button>
              <button className="flex items-center gap-1 text-[8px] font-medium uppercase tracking-[0.18em] text-muted hover:text-ink">
                Request bespoke departure <ArrowUpRight size={10} />
              </button>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default FlightFolios;