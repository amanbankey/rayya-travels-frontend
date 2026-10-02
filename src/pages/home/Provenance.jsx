import { Landmark, Plane } from "lucide-react";
import { provenance } from "../../data/homeData";
import Reveal from "../../components/Reveal";

const icons = { Plane, Landmark };

const Provenance = () => (
  <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
    <div className="grid gap-5 lg:grid-cols-2">
      <Reveal>
        <div className="relative h-80 overflow-hidden rounded-2xl bg-soft sm:h-[420px] lg:h-full lg:min-h-[460px]">
          <img src={provenance.image} alt={provenance.imageTitle} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
          {/* <div className="absolute bottom-0 p-5 sm:p-6">
            <span className="rounded-full bg-paper/20 px-2.5 py-1 text-[7px] font-medium uppercase tracking-[0.2em] text-paper backdrop-blur">
              {provenance.doctrine}
            </span>
            <h3 className="mt-3  text-2xl font-medium text-paper">{provenance.imageTitle}</h3>
            <p className="mt-2 max-w-sm text-[11px] leading-relaxed text-paper/80">{provenance.imageText}</p>
          </div> */}
        </div>
      </Reveal>

      <div className="flex flex-col gap-5">
        <Reveal delay={100}>
          <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-muted">{provenance.eyebrow}</p>
            <h2 className="mt-3  text-3xl font-medium leading-tight text-ink sm:text-4xl">{provenance.title}</h2>
            <p className="mt-4 text-xs leading-relaxed text-muted sm:text-sm">{provenance.text}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {provenance.cards.map((card, index) => {
            const Icon = icons[card.icon];
            return (
              <Reveal key={card.title} delay={200 + index * 100}>
                <div className="h-full rounded-2xl border border-line bg-soft/70 p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink">
                    <Icon size={14} />
                  </span>
                  <h4 className="mt-4 text-xs font-medium text-ink">{card.title}</h4>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted">{card.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Provenance;