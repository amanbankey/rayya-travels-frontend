import { useRef } from "react";
import { ChevronLeft, ChevronRight, PlaneTakeoff } from "lucide-react";

const DateStrip = ({ dates, selected, onSelect }) => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    trackRef.current.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white p-3 shadow-card sm:gap-3 sm:p-5">
      <button
        onClick={() => scroll(-1)}
        aria-label="Previous dates"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-tier text-ink transition-colors hover:bg-line sm:h-12 sm:w-12"
      >
        <ChevronLeft size={18} />
      </button>

      <div ref={trackRef} className="no-scrollbar flex flex-1 items-center gap-2.5 overflow-x-auto py-2">
        {dates.map((date) => {
          const isSelected = date.id === selected;

          if (isSelected) {
            return (
              <button
                key={date.id}
                onClick={() => onSelect(date.id)}
                className="min-w-[180px] flex-1 rounded-xl bg-darkBlue px-3 py-5 text-center text-white shadow-lg transition-transform"
              >
                <span className="flex items-center justify-center gap-1.5 text-[12px] font-medium tracking-[0.15em]">
                  <PlaneTakeoff size={15} /> {date.label}
                </span>
                <span className="mt-1 block text-lg font-medium">Depart Active</span>
                <span className="mx-auto mt-2 block max-w-[140px] text-white rounded-lg bg-brown px-3 py-2 text-[11px] font-medium uppercase leading-tight tracking-[0.12em]">
                  Selected Departure
                </span>
              </button>
            );
          }

          return (
            <button
              key={date.id}
              onClick={() => onSelect(date.id)}
              className="my-2 min-w-[140px] flex-1 rounded-lg bg-panel px-3 py-4 text-center transition-colors hover:bg-tier"
            >
              <span className="flex items-center justify-center gap-1.5 text-[12px] font-medium tracking-[0.15em] text-muted">
                {date.label}
                {date.type === "lowest" && <span className="h-1.5 w-1.5 rounded-full bg-brown" />}
              </span>
              <span className="mt-1 block text-base font-medium text-ink">Depart</span>
              <span className={`mt-1 block text-xs ${date.type === "lowest" ? "font-medium text-brown" : "text-muted"}`}>
                {date.trend}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => scroll(1)}
        aria-label="Next dates"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-tier text-ink transition-colors hover:bg-line sm:h-12 sm:w-12"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default DateStrip;