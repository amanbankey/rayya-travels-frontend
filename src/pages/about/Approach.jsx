import { ArrowRight } from "lucide-react";
import { approachCards } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const Approach = () => (
  <section className="bg-oat px-4 py-16 sm:px-8 lg:px-20 lg:py-24">
    <div className="mx-auto max-w-[1300px]">
      <Reveal>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Our Approach</p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">Travel Designed Around You</h2>
        <p className="mt-4 max-w-[840px] text-base leading-relaxed text-ink/80 sm:text-lg">
          Every traveler has different preferences, budgets, schedules, and expectations. Our approach is to understand
          those requirements and create travel solutions that are tailored accordingly.
        </p>
      </Reveal>

      <div className="mt-10 grid items-start gap-6 md:grid-cols-3">
        {approachCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.number} delay={index * 120}>
              <article className="rounded-sm bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-serif text-4xl text-[#cdbfac]">{card.number}</span>
                  <Icon size={24} className="text-brown" />
                </div>
                <h3 className="mt-8 font-serif text-2xl font-medium text-ink">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{card.text}</p>
                <p className="mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-brown">
                  {card.link} <ArrowRight size={13} />
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Approach;