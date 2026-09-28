import { destinations } from "../../data/aboutData";
import Reveal from "../../components/Reveal";

const GlobalHorizons = () => (
  <section className="bg-oat px-4 py-16 sm:px-8 lg:px-20 lg:py-24">
    <div className="mx-auto max-w-[1300px]">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Global Horizons</p>
            <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">From India to the World</h2>
          </div>
          <p className="text-base text-ink/75">Explore destinations and travel experiences with RAAYA.</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((place, index) => (
          <Reveal key={place.id} delay={(index % 4) * 100} className={place.wide ? "sm:col-span-2" : ""}>
            <article className="group h-full overflow-hidden rounded-sm bg-white shadow-sm">
              <div className="h-52 overflow-hidden bg-mist sm:h-56 lg:h-52">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brown">{place.category}</p>
                <h3 className="mt-2 font-serif text-2xl font-medium text-ink">{place.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{place.text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default GlobalHorizons;