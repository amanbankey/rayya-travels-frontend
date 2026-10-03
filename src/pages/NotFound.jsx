import { ArrowRight, Home, Landmark, Mail, Plane, Stamp } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

const quickLinks = [
  { name: "Flights", text: "Search and book flights", path: "/flights", icon: Plane },
  { name: "Visa", text: "Visa assistance for Indian travellers", path: "/visa", icon: Landmark },
  { name: "Packages", text: "Holiday packages across India and abroad", path: "/packages", icon: Stamp },
  { name: "Contact", text: "Talk to our travel experts", path: "/contact", icon: Mail },
];

const NotFound = () => (
  <main className="bg-darkBlue50">
    <section className="relative overflow-hidden bg-darkBlue">
      {/* Dotted flight path */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-40 w-full -translate-y-1/2 text-white/10 md:block"
        viewBox="0 0 1200 160"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 120 C 250 20, 450 160, 700 80 S 1050 20, 1200 70" stroke="currentColor" strokeWidth="2" strokeDasharray="6 10" />
      </svg>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-8 sm:py-24 lg:py-28">
        <Reveal>
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-aviationBrown text-white shadow-lg shadow-aviationBrown/30">
            <Plane size={24} className="-rotate-45" />
          </span>

          <p className="mt-6  text-[88px] font-medium leading-none text-white sm:text-[130px] lg:text-[160px]">
            4<span className="text-aviationBrown">0</span>4
          </p>

          <h1 className="mt-4  text-2xl font-medium text-white sm:text-4xl">
            This flight has gone off-route
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            The page you are looking for may have moved, been renamed or never existed. Let us get you back on track
            and help you plan your next journey.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-aviationBrown px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:text-darkBlue"
            >
              <Home size={16} /> Back to Home
            </Link>
            <Link
              to="/flights"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Search Flights <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
      <Reveal>
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-aviationBrown">
          Popular destinations on our site
        </p>
        <h2 className="mt-2 text-center  text-2xl font-medium text-darkBlue sm:text-3xl">
          Where would you like to go?
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map(({ name, text, path, icon: Icon }, index) => (
          <Reveal key={name} delay={index * 80}>
            <Link
              to={path}
              className="group flex h-full flex-col rounded-2xl border border-darkBlue/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-aviationBrown/40 hover:shadow-xl hover:shadow-darkBlue/10"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-darkBlue text-white transition-colors duration-300 group-hover:bg-aviationBrown">
                <Icon size={17} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-darkBlue">{name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-darkBlue/65">{text}</p>
              <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-aviationBrown">
                Explore <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  </main>
);

export default NotFound;
