import { ArrowRight } from "lucide-react";
import { businessCards } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const BusinessCrew = () => (
  <section className="bg-ivory px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
    <div className="mx-auto grid max-w-[1200px] items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
      <Reveal>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Business & Shipping Operations</p>
          <h2 className="mt-4  text-4xl leading-[1.25] text-ink sm:text-5xl">
            Reliable Travel Coordination for Businesses & Crew
          </h2>
          <p className="mt-5 max-w-[470px] text-base leading-relaxed text-ink/80">
            RAAYA TOUR & TRAVEL provides professional crew travel booking services for shipping companies with quick
            coordination, efficient ticket management, and dependable support. Our team understands the urgency and
            accuracy required in crew movement and works to ensure timely travel arrangements worldwide.
          </p>
           <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-dark px-7 py-4 text-xs font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-ink hover:shadow-lg"
          >
            Talk to Our Travel Team <ArrowRight size={14} />
          </a>
        </div>
      </Reveal>

      <div className="grid items-start gap-5 sm:grid-cols-2">
        {businessCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.title} delay={150 + index * 120}>
              <article className="rounded-sm bg-oat p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-8 hover:ring-1 hover:ring-darkBlue">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-white text-brown shadow-sm">
                  <Icon size={22} />
                </span>
                <h3 className="mt-8  text-2xl font-medium text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{card.text}</p>
                <ul className="mt-10 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <li key={tag} className="rounded-sm bg-white px-3 py-1.5 text-[13px] font-medium text-ink/80">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default BusinessCrew;