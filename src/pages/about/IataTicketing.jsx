import { BadgeCheck, Check } from "lucide-react";
import { aboutImages, iataPoints } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const IataTicketing = () => (
  <section className="bg-ivory px-4 py-16 sm:px-8 lg:px-20 lg:py-24">
    <div className="mx-auto grid max-w-[1300px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <Reveal>
        <img
          src={aboutImages.iata}
          alt="Raaya aircraft at sunset"
          className="h-[260px] w-full rounded-md object-cover shadow-xl sm:h-[360px] lg:h-[385px]"
        />
      </Reveal>

      <Reveal delay={150}>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Travel Expertise</span>
            <span className="hidden h-px w-10 bg-sand/60 sm:block" />
            <span className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-xs font-medium text-ink">
              <BadgeCheck size={14} className="text-brown" /> IATA Approved Ticketing
            </span>
          </div>

          <h2 className="mt-5 font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">IATA Approved Ticketing</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/80">
            RAAYA TOUR & TRAVEL PVT. LTD. provides professional domestic and international flight booking services with
            trusted industry standards.
          </p>

          <ul className="mt-6 space-y-3">
            {iataPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-peach text-brown">
                  <Check size={14} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);

export default IataTicketing;