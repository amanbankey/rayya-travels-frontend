import { ArrowUpRight } from "lucide-react";
import { essays } from "../../data/homeData";
import SectionHeader from "./SectionHeader";
import Reveal from "../../components/Reveal";

const Dispatches = () => (
  <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
    <Reveal>
      <SectionHeader
        eyebrow=""
        title="Dispatches & Essays"
        text="Musings on architectural romance, slow regional cuisines, and the cultural philosophy of restorative wanderlust."
      >
        {/* <a href="#essays" className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.18em] text-muted hover:text-ink">
          Read all essays <ArrowUpRight size={11} />
        </a> */}
      </SectionHeader>
    </Reveal>

    <div id="essays" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {essays.map((essay, index) => (
        <Reveal key={essay.id} delay={index * 120}>
          <article className="group cursor-pointer">
            <div className="h-48 overflow-hidden rounded-xl bg-soft">
              <img
                src={essay.image}
                alt={essay.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* <p className="mt-4 text-[8px] font-medium uppercase tracking-[0.2em] text-muted">
              {essay.category} • {essay.read}
            </p> */}
            <h3 className="mt-2 font-serif text-lg font-medium text-ink transition-colors group-hover:text-sand">{essay.title}</h3>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">{essay.text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Dispatches;