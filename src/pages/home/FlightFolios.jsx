import { ArrowUpRight, Bed, Briefcase, Crown, Plane, ShieldCheck, Sparkles, Utensils, Wifi } from "lucide-react";
import { flights } from "../../data/homeData";
import SectionHeader from "./SectionHeader";
import Reveal from "../../components/Reveal";

const icons = { Bed, Utensils, Briefcase, Wifi, Crown, Sparkles };

const Airport = ({ data, align, label }) => (
  <div className={`min-w-0 ${align === "right" ? "text-right" : "text-left"}`}>
    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-aviationBrown">{label}</p>
    <p className="mt-1 font-serif text-3xl font-semibold leading-none text-darkBlue sm:text-4xl lg:text-5xl">
      {data.code}
    </p>
    <p className="mt-2 truncate text-xs font-semibold text-darkBlue sm:text-sm">{data.city}</p>
    <p className="mt-0.5 truncate text-[11px] text-darkBlue/60">{data.detail}</p>
  </div>
);

const FlightFolios = () => (
  <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
    <Reveal>
      <SectionHeader
        eyebrow=""
        title="Curated Flight Boarding Folios"
        text="Tailored airborne routes designed for frictionless customs transit, lie-flat private suites, and executive apron handling."
      >
        
      </SectionHeader>
    </Reveal>

    <div className="mt-8 space-y-5">
      {flights.map((flight, index) => (
        <Reveal key={flight.id} delay={index * 120}>
          <article className="group flex flex-col overflow-hidden rounded-2xl border border-darkBlue/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 md:flex-row hover:ring-1 hover:ring-darkBlue">
            {/* Main boarding-pass section */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-darkBlue px-5 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-aviationBrown">
                    <Plane size={14} className="text-white" />
                  </span>
                  <span className="truncate text-sm font-semibold text-white">{flight.aircraft}</span>
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                  {flight.kind}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
                  <Airport data={flight.from} align="left" label="Departure" />

                  <div className="w-20 text-center sm:w-36 lg:w-48">
                    <p className="text-[11px] font-semibold text-darkBlue sm:text-xs">{flight.duration}</p>
                    <div className="my-2 flex items-center">
                      <span className="h-2 w-2 shrink-0 rounded-full border-2 border-aviationBrown bg-white" />
                      <span className="h-px flex-1 border-t border-dashed border-darkBlue/30" />
                      <Plane size={16} className="mx-1 shrink-0 rotate-45 text-aviationBrown" />
                      <span className="h-px flex-1 border-t border-dashed border-darkBlue/30" />
                      <span className="h-2 w-2 shrink-0 rounded-full bg-aviationBrown" />
                    </div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-darkBlue/50">
                      {flight.route}
                    </p>
                  </div>

                  <Airport data={flight.to} align="right" label="Arrival" />
                </div>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-darkBlue/10 pt-4">
                  {flight.perks.map(({ icon, label }) => {
                    const Icon = icons[icon] || Sparkles;
                    return (
                      <li
                        key={label}
                        className="flex items-center gap-2 rounded-full bg-darkBlue/5 px-3 py-1.5 text-xs font-medium text-darkBlue"
                      >
                        <Icon size={14} className="shrink-0 text-aviationBrown" />
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Perforation: horizontal on mobile, vertical on md+ */}
            <div className="h-0 shrink-0 border-t-2 border-dashed border-darkBlue/20 md:h-auto md:w-0 md:border-l-2 md:border-t-0" />

            {/* Boarding-pass stub */}
            <div className="flex w-full shrink-0 flex-col justify-between gap-4 bg-darkBlue/[0.03] p-5 sm:p-6 md:w-64 lg:w-72">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-darkBlue/50">Boarding Pass</p>
                <p className="mt-1 font-serif text-2xl font-semibold text-darkBlue">{flight.manifest}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-aviationBrown px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                  <ShieldCheck size={13} /> {flight.status}
                </span>
                <p className="mt-3 text-xs leading-relaxed text-darkBlue/70">{flight.note}</p>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-darkBlue/10 pt-4">
                <span className="text-xs font-semibold text-darkBlue">Book this route</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-darkBlue text-white transition-colors duration-300 group-hover:bg-aviationBrown">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default FlightFolios;