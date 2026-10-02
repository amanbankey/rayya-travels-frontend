import { aboutImages, whoStats } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const WhoWeAre = () => (
  <section className="bg-ivory px-4 py-16 sm:px-8 lg:px-20 lg:py-28">
    <div className="mx-auto grid max-w-[1300px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        <div className="relative lg:pb-8">
          <img
            src={aboutImages.who}
            alt="Traveler relaxing under stone arches"
            className="h-[300px] w-full rounded-lg object-cover shadow-xl sm:h-[400px] lg:h-[490px]"
          />
          <div className="mt-4 rounded-md bg-white p-5 shadow-xl md:absolute md:bottom-0 md:right-4 md:mt-0 md:w-[270px] lg:-right-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brown">Corporate Credo</p>
            <h3 className="mt-1  text-xl font-medium text-ink sm:text-2xl">Seamless. Timeless.</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/75">
              Dedicated travel desk supporting discerning individual & commercial voyagers.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div>
         

          <h2 className="mt-5  text-3xl leading-[1.25] text-ink sm:text-4xl lg:text-5xl">
            Creating Hassle-Free Travel Experiences
          </h2>

          <p className="mt-5 text-base leading-relaxed text-ink/80">
            RAAYA TOUR & TRAVEL PVT. LTD. is a professionally managed tour and travel company dedicated to delivering
            reliable and personalized travel solutions across India and worldwide.
          </p>
          <p className="mt-3 text-base leading-relaxed text-ink/80">
            We understand that every traveler has unique requirements, which is why we focus on creating customized
            travel plans that combine comfort, convenience, and affordability.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {whoStats.map((stat) => (
              <div key={stat.title} className="rounded-sm bg-oat px-5 py-5">
                <p className=" text-3xl font-medium text-brown">{stat.title}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-ink">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default WhoWeAre;