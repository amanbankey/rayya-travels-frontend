import { trustCards } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const WhyTrust = () => (
  <section className="bg-oat px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-[1200px]">
      <Reveal>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Our Distinction</p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">Why Travelers Trust RAAYA</h2>
      </Reveal>

      <div className="mt-10 grid items-start gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {trustCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.tag} delay={index * 100}>
              <article className="flex flex-col rounded-sm bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brown">{card.tag}</p>
                <h3 className="mt-5 text-xl font-medium leading-snug text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{card.text}</p>
                <Icon size={18} className="mt-4 self-end text-[#cdbfac]" />
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyTrust;