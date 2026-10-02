import { Phone, Wand2 } from "lucide-react";
import Reveal from "../../components/Reveal";

const CustomItineraryCta = () => (
  <section className="bg-ivory px-4 py-10 sm:px-8 lg:px-12">
    <Reveal>
      <div className="mx-auto flex max-w-[1300px] flex-col gap-6 rounded-2xl bg-dark p-6 shadow-lg sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-peach">
            <Wand2 size={14} /> Bespoke Travel Studio
          </p>
          <h2 className="mt-3  text-3xl leading-tight text-white sm:text-4xl">
            Can’t Find the Perfect Holiday Itinerary?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Our luxury travel architects design completely customized vacations matching your preferred airline,
            private villas, dietary preferences, and pacing.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#inquiry"
            className="flex items-center justify-center rounded-lg bg-brown px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#8b6538] hover:shadow-lg"
          >
            Build My Custom Itinerary
          </a>
          <a
            href="tel:+91-9028849207"
            className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <Phone size={15} className="text-peach" /> +91-9028849207
          </a>
        </div>
      </div>
    </Reveal>
  </section>
);

export default CustomItineraryCta;