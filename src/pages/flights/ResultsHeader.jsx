import { useState } from "react";
import { ArrowUpRight, Compass, Navigation, Plane } from "lucide-react";
import Reveal from "../../components/Reveal";

const airlinePartners = [
  {
    name: "Qantas",
    tagline: "Long-haul excellence across every continent",
    aircraftImage: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Air India",
    tagline: "A new era of Indian aviation, elevated",
    aircraftImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Etihad Airways",
    tagline: "Exceptional journeys from Abu Dhabi",
    aircraftImage: "https://images.unsplash.com/photo-1540339832862-474c8ba0d0d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Air India Express",
    tagline: "Seamless regional travel, redefined",
    aircraftImage: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=800&q=80",
  },
];


const AirlineCard = ({ partner }) => (
  <article className="group relative h-[300px] w-[280px] shrink-0 overflow-visible sm:w-[300px] ">
    <div className="relative h-full overflow-hidden rounded-[28px] bg-gradient-to-br from-darkBlue to-darkBlue/80 shadow-[0_20px_60px_rgba(30,34,41,0.18)] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_70px_rgba(30,34,41,0.28)]">
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

      <div className="relative flex h-full flex-col justify-between p-6">
        <div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
            <Plane size={15} />
          </span>
          <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-white transition-colors duration-500 group-hover:text-brown">
            {partner.name}
          </h3>
          <p className="mt-2 max-w-[170px] text-[13px] leading-relaxed text-white/65">{partner.tagline}</p>
        </div>

      </div>

      <span className="absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full bg-brown opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>

    <div className="animate-aircraft-float absolute -right-6 -top-6 h-36 w-36 transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:rotate-1 sm:h-40 sm:w-40">
      <img
        src={partner.aircraftImage}
        alt={`${partner.name} aircraft`}
        loading="lazy"
        className="h-full w-full rounded-[22px] object-cover shadow-[0_16px_40px_rgba(30,34,41,0.25)]"
      />
    </div>
  </article>
);

const ResultsHeader = () => {
   const [isPaused, setIsPaused] = useState(false);
  const marqueeCards = [...airlinePartners, ...airlinePartners]
    
  return  (
 <div className="w-full  lightGray"> 
    <section className="relative overflow-hidden bg-lightGray px-4 py-16 sm:px-8 lg:px-10 lg:py-24 xl:px-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(161,59,0,0.08), transparent 30%), radial-gradient(circle at 90% 80%, rgba(30,34,41,0.08), transparent 35%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl ">
        <Reveal>
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-brown">
            <Navigation size={13} /> Aviation Partners
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-darkBlue sm:text-4xl lg:text-5xl">
            Experience Flying with Our Airline Partners
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-darkBlue/65">
            Travel with a carefully selected network of world-class carriers, connecting exceptional destinations with
            effortless comfort.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-14">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="no-scrollbar overflow-x-auto pb-6 pt-10 "
          >
            <div
              className={`flex w-max gap-16 ${isPaused ? "animate-marquee animate-marquee-paused" : "animate-marquee"}`}
            >
              {marqueeCards.map((partner, index) => (
                <AirlineCard key={`${partner.name}-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
) ;

}

export default ResultsHeader;