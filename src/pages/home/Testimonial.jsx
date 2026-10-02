import { useEffect, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonial } from "../../data/homeData";
import Reveal from "../../components/Reveal";

const SWAP_DELAY = 250;
const AUTO_DELAY = 3000;

const Testimonial = () => {
  const count = testimonial.length;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const changeTo = (nextIndex) => {
    setVisible(false);
    setTimeout(() => {
      setIndex(nextIndex);
      setVisible(true);
    }, SWAP_DELAY);
  };

  const goPrev = () => changeTo((index - 1 + count) % count);
  const goNext = () => changeTo((index + 1) % count);

  useEffect(() => {
    if (count <= 1) return;

    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((current) => (current + 1) % count);
        setVisible(true);
      }, SWAP_DELAY);
    }, AUTO_DELAY);

    return () => clearInterval(timer);
  }, [count]);

  const item = testimonial[index];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-paper p-6 sm:p-10">
          <div
            className={`grid items-center gap-8 transition-all duration-300 ease-out md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] lg:gap-14 ${
              visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
          >
            <div className="relative mx-auto h-72 w-56 overflow-hidden rounded-xl bg-soft md:w-full">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              {/* <span className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 rounded-lg bg-paper/95 px-2 py-2 text-[8px] font-medium uppercase tracking-[0.15em] text-ink">
                <BadgeCheck size={11} /> {item.badge}
              </span> */}
            </div>

            <div>
              <Quote size={22} className="text-sand/60" />
              <blockquote className="mt-3  text-xl italic leading-relaxed text-ink sm:text-2xl lg:text-[28px] lg:leading-[1.5]">
                {item.quote}
              </blockquote>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium text-ink">{item.name}</p>
                  <p className="mt-1 text-[10px] text-muted">{item.meta}</p>
                </div>
                
              </div>
            </div>
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition-colors hover:bg-soft sm:left-5"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-sm transition-colors hover:bg-soft sm:right-5"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {testimonial.map((option, itemIndex) => (
              <button
                key={option.name}
                type="button"
                aria-label={`Show testimonial ${itemIndex + 1}`}
                onClick={() => changeTo(itemIndex)}
                className={`h-1.5 rounded-full transition-all ${
                  itemIndex === index ? "w-6 bg-badgetext" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
};

export default Testimonial;
