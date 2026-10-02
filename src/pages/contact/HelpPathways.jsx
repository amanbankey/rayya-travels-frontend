import { ArrowUpRight } from "lucide-react";
import { pathways } from "../../data/contactData";
import Reveal from "../../components/Reveal";

const HelpPathways = ({ onSelect }) => (
  <section className="bg-oat px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-[1200px]">
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Inquiry Pathways</p>
            <h2 className="mt-3  text-3xl text-ink sm:text-4xl lg:text-5xl">What Can We Help You With?</h2>
          </div>
          <p className="max-w-[420px] text-sm leading-relaxed text-ink/75">
            Select any capability below to pre-populate our concierge inquiry desk and initiate your personalized
            itinerary.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pathways.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.value} delay={(index % 3) * 100}>
              <button
                type="button"
                onClick={() => onSelect(item.value)}
                className="group flex h-full w-full flex-col rounded-md bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-oat text-brown">
                    <Icon size={18} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-ink/30 transition-colors group-hover:text-brown"
                  />
                </span>
                <span className="mt-5 text-lg font-medium text-ink">{item.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-ink/70">{item.text}</span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default HelpPathways;