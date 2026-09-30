import { Anchor, ArrowUpRight, Car, ChevronRight, Compass, Crown, Droplets, Palette, Plane, Waves, Wine } from "lucide-react";
import { trunks } from "../../data/homeData";
import SectionHeader from "./SectionHeader";
import Reveal from "../../components/Reveal";

const icons = { Anchor, Plane, Crown, Droplets, Car, Palette, Waves, Compass, Wine };

const TravelTrunks = () => (
  <section className="mx-auto max-w-7xl bg-soft/60 px-4 py-12 sm:px-8 lg:px-12">
    <Reveal>
      <SectionHeader
        eyebrow=""
        title="Curated Travel Trunks"
        text="Complete turnkey itineraries engineered with private logistics, master storytellers, and unlisted sanctuaries."
      >
        {/* <a href="#trunks" className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.18em] text-muted hover:text-ink">
          Explore all 24 folios <ArrowUpRight size={11} />
        </a> */}
      </SectionHeader>
    </Reveal>

    <div id="trunks" className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {trunks.map((item, index) => (
        <Reveal key={item.id} delay={index * 120}>
          <article className="group h-full overflow-hidden rounded-2xl border border-line bg-paper">
            <div className="relative h-48 overflow-hidden bg-soft sm:h-52">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
               
              
            </div>

            <div className="p-5">
              <h3 className="mt-2 font-serif text-xl font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{item.text}</p>

              {/* <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4">
                {item.features.map(({ icon, label }) => {
                  const Icon = icons[icon];
                  return (
                    <li key={label} className="flex items-center gap-1.5 text-[9px] font-medium text-muted">
                      <Icon size={12} className="text-sand" /> {label}
                    </li>
                  );
                })}
              </ul> */}

              
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default TravelTrunks;