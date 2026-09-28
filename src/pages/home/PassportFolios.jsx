import { Building2, Globe, Landmark, ShieldCheck, Stamp } from "lucide-react";
import { folios } from "../../data/homeData";
import SectionHeader from "./SectionHeader";
import Reveal from "../../components/Reveal";

const icons = { Globe, Landmark, Building2 };

const PassportFolios = () => (
  <section className="mx-auto max-w-7xl bg-soft/60 px-4 py-12 sm:px-8 lg:px-12">
    <Reveal>
      <SectionHeader
        eyebrow="Diplomatic Services & Visa Architecture"
        title="Passport & Residency Folios"
        text="High-touch consular processing, diplomatic visa fast-tracking, and sovereign residency governance executed with complete discretion."
      >
        <span className="flex items-center gap-1.5 text-[9px] font-medium text-muted">
          <ShieldCheck size={12} /> Government Accredited Legal Attaches
        </span>
      </SectionHeader>
    </Reveal>

    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {folios.map((folio, index) => {
        const Icon = icons[folio.icon];
        return (
          <Reveal key={folio.id} delay={index * 120}>
            <article className="relative h-full rounded-2xl border border-line bg-paper p-5">
              <div className="absolute right-4 top-4 flex h-12 w-12 rotate-6 flex-col items-center justify-center rounded-md border border-dashed border-sand/60 text-sand">
                <Stamp size={16} />
                <span className="mt-0.5 text-[5px] font-medium uppercase tracking-widest">Approved</span>
              </div>

              <div className="flex items-start gap-3 pr-14">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft text-ink">
                  <Icon size={15} />
                </span>
                <div className="min-w-0">
                  <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-muted">{folio.region}</p>
                  <h3 className="mt-1 font-serif text-lg font-medium leading-snug text-ink">{folio.title}</h3>
                </div>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-muted">{folio.text}</p>

              <ul className="mt-4 grid grid-cols-3 gap-2 border-y border-line py-3">
                {folio.steps.map((step) => (
                  <li key={step} className="text-[7px] font-medium uppercase leading-snug tracking-[0.12em] text-muted">
                    {step}
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-2">
                {folio.details.map((detail) => (
                  <div key={detail.label} className="flex flex-wrap items-center justify-between gap-x-3 text-[10px]">
                    <dt className="text-muted">{detail.label}</dt>
                    <dd className="font-medium text-ink">{detail.value}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-3 text-[10px]">
                  <dt className="text-muted">Status Tag</dt>
                  <dd className="rounded-full bg-badge px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.12em] text-badgetext">
                    {folio.status}
                  </dd>
                </div>
              </dl>

              <button className="mt-5 w-full rounded-lg border border-line bg-soft py-3 text-[8px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-dark hover:text-paper">
                Check Requirements
              </button>
            </article>
          </Reveal>
        );
      })}
    </div>
  </section>
);

export default PassportFolios;