import { ArrowRight } from "lucide-react";
import { thematicCollections } from "../../data/packagesData";
import Reveal from "../../components/Reveal";

const ThematicCollections = () => (
  <section className="bg-ivory px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
    <div className="mx-auto max-w-[1300px]">
      <Reveal>
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Thematic Collections</p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Holidays Designed Around You</h2>
          <p className="mx-auto mt-3 max-w-[520px] text-sm text-ink/70">
            Whether celebrating romance, traveling with three generations, or escaping into untamed wilderness.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {thematicCollections.map((collection, index) => {
          const Icon = collection.icon;
          return (
            <Reveal key={collection.title} delay={index * 120}>
              <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-peach text-brown">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-xl font-medium text-ink">{collection.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{collection.text}</p>

                <ul className="mt-5 flex-1 space-y-3 border-t border-line pt-4">
                  {collection.items.map((item) => (
                    <li key={item.label} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-ink/80">{item.label}</span>
                      <span className="shrink-0 font-medium text-brown">from {item.price}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#packages"
                  className="mt-5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-brown hover:text-ink"
                >
                  {collection.link} <ArrowRight size={12} />
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default ThematicCollections;