import { Podcast } from "lucide-react";
import { visionTags } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const emphasis = "font-medium text-ink";

const VisionMission = () => (
  <section className="bg-ivory px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
    <div className="mx-auto grid max-w-[1300px] items-stretch gap-6 lg:grid-cols-2">
      <Reveal className="h-full">
        <article className="flex h-full flex-col rounded-md bg-oat p-7 shadow-sm sm:p-10 lg:p-12">
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brown">
            <span className="h-2.5 w-2.5 rounded-full bg-brown" /> Our Vision
          </p>
          <h3 className="mt-5  text-2xl leading-snug text-ink sm:text-3xl">
            Making Flight Travel Seamless & Value-Driven
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            To become a <span className={emphasis}>trusted</span>, <span className={emphasis}>customer-focused</span> flight
            booking partner that delivers <span className={emphasis}>seamless</span>,{" "}
            <span className={emphasis}>memorable</span>, and <span className={emphasis}>value-driven</span> journeys
            across India and around the world.
          </p>
          <ul className="mt-auto flex flex-wrap gap-2.5 pt-10">
            {visionTags.map((tag) => (
              <li key={tag} className="rounded-sm bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-brown">
                {tag}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>

      <Reveal delay={150} className="h-full">
        <article className="flex h-full flex-col rounded-md bg-mist p-7 shadow-sm sm:p-10 lg:p-12">
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brown">
            <span className="h-2.5 w-2.5 rounded-full bg-brown" /> Our Mission
          </p>
          <h3 className="mt-5  text-2xl leading-snug text-ink sm:text-3xl">Flight Support Built Around You</h3>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            To provide reliable flight booking, personalized itineraries, and transparent pricing that ensures peace of
            mind for every leisure, business, and maritime traveller we serve.
          </p>
          <div className="mt-auto flex pt-10 items-center justify-between gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink">Guaranteed Dedication</p>
            <Podcast size={18} className="text-brown" />
          </div>
        </article>
      </Reveal>
    </div>
  </section>
);

export default VisionMission;