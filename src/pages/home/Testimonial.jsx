import { BadgeCheck, Quote } from "lucide-react";
import { testimonial } from "../../data/homeData";
import Reveal from "../../components/Reveal";

const Testimonial = () => (
  <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-12">
    <Reveal>
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-paper p-6 sm:p-10 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] lg:gap-14">
        <div className="relative mx-auto h-72 w-56 overflow-hidden rounded-xl bg-soft md:w-full">
          <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
          <span className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 rounded-lg bg-paper/95 px-2 py-2 text-[8px] font-medium uppercase tracking-[0.15em] text-ink">
            <BadgeCheck size={11} /> {testimonial.badge}
          </span>
        </div>

        <div>
          <Quote size={22} className="text-sand/60" />
          <blockquote className="mt-3 font-serif text-xl italic leading-relaxed text-ink sm:text-2xl lg:text-[28px] lg:leading-[1.5]">
            {testimonial.quote}
          </blockquote>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-ink">{testimonial.name}</p>
              <p className="mt-1 text-[10px] text-muted">{testimonial.meta}</p>
            </div>
            <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-muted">
              Journey Status:{" "}
              <span className="ml-1 rounded-full bg-badge px-2 py-1 text-badgetext">{testimonial.status}</span>
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

export default Testimonial;