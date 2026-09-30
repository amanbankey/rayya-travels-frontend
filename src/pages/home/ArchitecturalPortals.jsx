import { useRef } from "react";
import { ArrowUpRight, Bookmark, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { portals } from "../../data/homeData";
import SectionHeader from "./SectionHeader";
import Reveal from "../../components/Reveal";

const tagStyles = {
  dark: "bg-dark text-paper",
  light: "bg-paper text-ink",
  badge: "bg-badge text-badgetext",
};

const ArchitecturalPortals = () => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const track = trackRef.current;
    track.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12">
      <Reveal>
        <SectionHeader
          eyebrow=""
          title="Architectural Portals"
          text="Rare global enclaves where topography, antiquity, and exquisite restorative design converge."
        >
          {/* <div className="flex items-center gap-3">
            <span className="hidden text-[8px] font-medium uppercase tracking-[0.2em] text-muted sm:block">
              Status: <span className="rounded-full bg-badge px-2 py-1 text-badgetext">Curated Itinerary</span>
            </span>
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:bg-dark hover:text-paper"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:bg-dark hover:text-paper"
            >
              <ChevronRight size={14} />
            </button>
          </div> */}
        </SectionHeader>
      </Reveal>

      <div ref={trackRef} className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {portals.map((item, index) => (
          <Reveal key={item.id} delay={index * 100} className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[calc(25%-12px)]">
            <article className="group h-full overflow-hidden rounded-t-[140px] rounded-b-2xl border border-line bg-paper">
              <div className="relative h-64 overflow-hidden bg-soft">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
               
                
              </div>

              <div className="p-4">
                {/* <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-muted">{item.location}</p> */}
                <h3 className="mt-1 font-serif text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">{item.text}</p>
                
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ArchitecturalPortals;