import { ArrowRight } from "lucide-react";
import { contactCards } from "../../data/contactData";
import Reveal from "../../components/Reveal";

const ContactCards = () => (
  <section className="relative z-10 -mt-28 px-4 sm:-mt-32 sm:px-8 lg:-mt-36 lg:px-16">
    <div className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-3 lg:gap-8">
      {contactCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Reveal key={card.label} delay={index * 120}>
            <article className="flex h-full flex-col rounded-md bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-oat text-brown">
                <Icon size={20} />
              </span>
              <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.12em] text-brown">{card.label}</p>
              <h3 className="mt-2 break-words text-xl font-medium text-ink">{card.value}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{card.text}</p>
              <a
                href={card.href}
                className="mt-8 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-brown transition-colors hover:text-ink"
              >
                {card.action} <ArrowRight size={13} />
              </a>
            </article>
          </Reveal>
        );
      })}
    </div>
  </section>
);

export default ContactCards;