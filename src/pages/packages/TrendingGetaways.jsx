import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { alsoTrending, trendingDestinations } from "../../data/packagesData";
import Reveal from "../../components/Reveal";

const TrendingGetaways = () => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    trackRef.current.scrollBy({ left: direction * trackRef.current.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="bg-ivory px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1300px]">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Curated Destinations</p>
              <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Trending Getaways</h2>
              <p className="mt-2 text-sm text-ink/70">Where discerning travelers are booking right now.</p>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => scroll(-1)}
                aria-label="Previous"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-oat"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Next"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-dark text-white transition-colors hover:bg-ink"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </Reveal>

        <div ref={trackRef} className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {trendingDestinations.map((place, index) => (
            <Reveal
              key={place.id}
              delay={index * 100}
              className="w-[75%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-15px)]"
            >
              <article className="group relative h-72 overflow-hidden rounded-xl bg-mist shadow-sm sm:h-80">
                <img
                  src={place.image}
                  alt={place.city}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-peach">{place.country}</p>
                  <h3 className="mt-1 font-serif text-2xl font-medium text-white">{place.city}</h3>
                  <p className="mt-1 text-xs text-white/75">{place.text}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2 text-[11px] font-medium">
                    <span className="text-white/70">{place.count}</span>
                    <span className="flex items-center gap-1 uppercase tracking-[0.1em] text-peach">
                      Explore <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-ink/60">Also Trending:</span>
            {alsoTrending.map((item) => (
              <span key={item} className="rounded-full bg-oat px-3 py-1.5 text-xs font-medium text-ink/80">
                {item}
              </span>
            ))}
          </div>
          <a
            href="#packages"
            className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.1em] text-brown hover:text-ink"
          >
            View all 40+ destinations <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrendingGetaways;