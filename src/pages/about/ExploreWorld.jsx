import { ArrowRight, PlaneLanding } from "lucide-react";
import { aboutImages } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const ExploreWorld = () => (
  <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-dark sm:min-h-[460px]">
    <img src={aboutImages.cta} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/70 to-dark/90" />

    <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 text-center sm:px-8">
      <Reveal>
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-peach">Begin Your Voyage</p>

        <h2 className="mx-auto mt-4 max-w-[760px]  text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
          Let's Explore the World Together
        </h2>

        <p className="mx-auto mt-5 max-w-[620px] text-base leading-relaxed text-white/85">
          Whether you are planning a relaxing holiday, a corporate trip, a group tour, or international travel, RAAYA
          TOUR & TRAVEL is ready to help make your journey comfortable, memorable, and worry-free.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="/flights"
            className="flex w-full items-center justify-center gap-2.5 rounded-sm bg-brown px-7 py-4 text-xs font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-[#8b6538] hover:shadow-lg sm:w-auto"
          >
            Plan My Journey <PlaneLanding size={15} />
          </a>
           <a
            href="#contact"
            className="flex w-full items-center justify-center gap-2.5 rounded-sm bg-white/15 px-7 py-4 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/25 sm:w-auto"
          >
            Contact Us <ArrowRight size={15} />
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ExploreWorld;