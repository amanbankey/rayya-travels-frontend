

import { useState } from "react";
import { ArrowUpRight, Calendar, Clock, Landmark, MapPin, Plane, ShieldCheck, Sparkles, Stamp, Users } from "lucide-react";
import { submitForm } from "../../services/api";
import { heroImage } from "../../data/homeData";

const tabs = [
  { key: "flight", label: "Flight", icon: Plane },
  { key: "visa" , label: "Visa", icon: Landmark },
  { key: "Packages", label: "Packages", icon: Stamp },
];

const perks = [
  { icon: Clock, label: "Restorative Pacing" },
  { icon: ShieldCheck, label: "Absolute Discretion" },
  { icon: Sparkles, label: "Signature Departures" },
];

const specializations = ["Private Aviation Charters", "UNESCO Heritage Access", "Diplomatic Pass Clearance"];

const initialValues = {
  tab: "flight",
  route: "Zürich (ZRH) → Florence (FLR)",
  departDate: "2025-10-14",
  returnDate: "2025-10-24",
  party: "2 Connoisseurs • Master Suite",
  cabin: "First Suite / Citation Jet",
};

const fieldClass = "w-full bg-transparent text-xs font-medium text-darkBlue outline-none sm:text-[13px]";
const labelClass = "text-[8px] font-medium uppercase tracking-[0.2em] text-darkBlue/60";

const Hero = () => {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await submitForm("/search", values);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full bg-darkBlue relative overflow-hidden">
     <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent_15%,black_90%)]"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream" /> */}
    <section id="home" className="max-w-7xl mx-auto overflow-hidden px-4 pb-10 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16 bg-darkBlue ">

      <div className="relative">
        {/* <p className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.25em] text-dustyRose">
          <span className="h-1 w-1 rounded-full bg-brown" /> Bespoke Atelier Volume MMXXV
        </p> */}

        <h1 className="mt-5 max-w-xl font-serif text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          The Art of <span className="block italic text-dustyRose">Considered Journeying</span> 
        </h1>

        {/* <p className="mt-5 max-w-md font-serif text-sm leading-relaxed text-white/70 sm:text-base">
          Curated departures, private sanctuaries, and architectural voyages crafted exclusively for the discerning
          epicurean.
        </p> */}

        {/* <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5 text-[8px] font-medium uppercase tracking-[0.2em] text-dustyRose">
              <Icon size={11} /> {label}
            </li>
          ))}
        </ul> */}


     
    <form
      onSubmit={handleSubmit}
      className="
        group/form relative mt-7 overflow-hidden rounded-2xl
        border border-lightBrown/20 bg-cream p-3 shadow-sm
        transition-all duration-700 ease-out
        hover:-translate-y-1 hover:border-lightBrown/40
        hover:shadow-[0_20px_60px_rgba(162,59,0,0.12)]
        sm:p-4 lg:mt-8
        animate-[fadeUp_0.8s_ease-out]
      "
    >
      {/* Premium animated background glow */}
      <div
        className="
          pointer-events-none absolute -right-24 -top-24 h-48 w-48
          rounded-full  blur-3xl
          transition-all duration-1000
          group-hover/form:scale-150 group-hover/form:bg-lightBrown/15
        "
      />

      <div
        className="
          pointer-events-none absolute -bottom-24 -left-24 h-48 w-48
          rounded-full bg-darkBlue/5 blur-3xl
          transition-all duration-1000
          group-hover/form:scale-150
        "
      />

      {/* TOP TABS */}
      <div
        className="
          relative flex flex-col gap-3 border-b border-lightBrown/20 pb-3
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div className="flex flex-wrap gap-1.5">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              type="button"
              key={key}
              onClick={() => setValues({ ...values, tab: key })}
              className={`
                group/tab relative flex items-center gap-1.5
                overflow-hidden rounded-full px-3 py-1.5
                text-[9px] font-medium uppercase tracking-[0.15em]
                transition-all duration-300 ease-out
                ${
                  values.tab === key
                    ? "bg-darkBlue text-white shadow-md shadow-darkBlue/20"
                    : "text-darkBlue/60 hover:-translate-y-0.5 hover:bg-lightBrown/10 hover:text-darkBlue"
                }
              `}
            >
              {/* Active / hover shine */}
              <span
                className={`
                  absolute inset-0 -translate-x-full
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transition-transform duration-700
                  group-hover/tab:translate-x-full
                `}
              />

              <Icon
                size={11}
                className={`
                  relative z-10 transition-all duration-300
                  ${
                    values.tab === key
                      ? "scale-110"
                      : "group-hover/tab:scale-110 group-hover/tab:rotate-[-8deg]"
                  }
                `}
              />

              <span className="relative z-10">{label}</span>

              {/* Active dot */}
              {values.tab === key && (
                <span
                  className="
                    relative z-10 ml-0.5 h-1 w-1 rounded-full
                    bg-lightBrown
                    shadow-[0_0_8px_rgba(226,99,37,0.8)]
                    animate-pulse
                  "
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH FIELDS */}
      <div
        className="
          relative mt-3 grid gap-3
          sm:grid-cols-2
          lg:grid-cols-[1.3fr_1.3fr_1fr_1fr_auto]
        "
      >
        {/* ROUTE */}
        <label
          className="
            group/field relative cursor-text rounded-xl
            border border-lightBrown/20 bg-white/10 p-3
            transition-all duration-500 ease-out
            hover:-translate-y-1
            hover:border-lightBrown/50
            hover:bg-white/20
            hover:shadow-[0_10px_30px_rgba(162,59,0,0.10)]
            focus-within:-translate-y-1
            focus-within:border-lightBrown
            focus-within:bg-white/30
            focus-within:shadow-[0_10px_30px_rgba(162,59,0,0.14)]
          "
        >
          {/* animated left line */}
          <span
            className="
              absolute left-0 top-3 h-0 w-[2px] rounded-full
              bg-lightBrown
              transition-all duration-500
              group-focus-within/field:h-[calc(100%-24px)]
            "
          />

          <span
            className={`
              ${labelClass}
              transition-all duration-300
              group-focus-within/field:text-lightBrown
            `}
          >
            Route / Departure
          </span>

          <span className="mt-1.5 flex items-center gap-2">
            <MapPin
              size={13}
              className="
                shrink-0 text-lightBrown
                transition-all duration-300
                group-focus-within/field:scale-125
                group-focus-within/field:rotate-6
              "
            />

            <input
              name="route"
              value={values.route}
              onChange={handleChange}
              className={`
                ${fieldClass}
                transition-all duration-300
                placeholder:text-darkBlue/30
              `}
            />
          </span>
        </label>

        {/* DATES */}
        <div
          className="
            group/field relative rounded-xl border
            border-lightBrown/20 bg-white/10 p-3
            transition-all duration-500 ease-out
            hover:-translate-y-1
            hover:border-lightBrown/50
            hover:bg-white/20
            hover:shadow-[0_10px_30px_rgba(162,59,0,0.10)]
            focus-within:-translate-y-1
            focus-within:border-lightBrown
            focus-within:bg-white/30
            focus-within:shadow-[0_10px_30px_rgba(162,59,0,0.14)]
          "
        >
          <span
            className={`
              ${labelClass}
              transition-colors duration-300
              group-focus-within/field:text-lightBrown
            `}
          >
            Harvest Season / Dates
          </span>

          <span className="mt-1.5 flex items-center gap-2">
            <Calendar
              size={13}
              className="
                shrink-0 text-lightBrown
                transition-all duration-300
                group-focus-within/field:scale-125
                group-focus-within/field:-rotate-6
              "
            />

            <input
              type="date"
              name="departDate"
              value={values.departDate}
              onChange={handleChange}
              className={`
                ${fieldClass}
                transition-all duration-300
                focus:text-lightBrown
              `}
            />

            <span className="h-px w-2 shrink-0 bg-lightBrown/40" />

            <input
              type="date"
              name="returnDate"
              value={values.returnDate}
              onChange={handleChange}
              className={`
                ${fieldClass}
                transition-all duration-300
                focus:text-lightBrown
              `}
            />
          </span>
        </div>

        {/* PARTY */}
        <label
          className="
            group/field relative cursor-pointer rounded-xl
            border border-lightBrown/20 bg-white/10 p-3
            transition-all duration-500 ease-out
            hover:-translate-y-1
            hover:border-lightBrown/50
            hover:bg-white/20
            hover:shadow-[0_10px_30px_rgba(162,59,0,0.10)]
            focus-within:-translate-y-1
            focus-within:border-lightBrown
            focus-within:bg-white/30
          "
        >
          <span
            className={`
              ${labelClass}
              transition-colors duration-300
              group-focus-within/field:text-lightBrown
            `}
          >
            Party / Suites
          </span>

          <span className="mt-1.5 flex items-center gap-2">
            <Users
              size={13}
              className="
                shrink-0 text-lightBrown
                transition-all duration-300
                group-focus-within/field:scale-125
              "
            />

            <select
              name="party"
              value={values.party}
              onChange={handleChange}
              className={`
                ${fieldClass}
                cursor-pointer transition-all duration-300
              `}
            >
              <option>1 Connoisseur • Solo Suite</option>
              <option>2 Connoisseurs • Master Suite</option>
              <option>4 Connoisseurs • Private Villa</option>
            </select>
          </span>
        </label>

        {/* CABIN */}
        <label
          className="
            group/field relative cursor-pointer rounded-xl
            border border-lightBrown/20 bg-white/10 p-3
            transition-all duration-500 ease-out
            hover:-translate-y-1
            hover:border-lightBrown/50
            hover:bg-white/20
            hover:shadow-[0_10px_30px_rgba(162,59,0,0.10)]
            focus-within:-translate-y-1
            focus-within:border-lightBrown
            focus-within:bg-white/30
          "
        >
          <span
            className={`
              ${labelClass}
              transition-colors duration-300
              group-focus-within/field:text-lightBrown
            `}
          >
            Cabin Manifest
          </span>

          <select
            name="cabin"
            value={values.cabin}
            onChange={handleChange}
            className={`
              ${fieldClass}
              mt-1.5 cursor-pointer transition-all duration-300
            `}
          >
            <option>First Suite / Citation Jet</option>
            <option>Business Suite / Light Jet</option>
            <option>Heavy Jet / Global 7500</option>
          </select>
        </label>

        {/* EXPLORE BUTTON */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="
            group/button relative flex items-center justify-center
            gap-1.5 overflow-hidden rounded-xl
            bg-darkBlue px-6 py-4
            text-[10px] font-medium uppercase tracking-[0.2em]
            text-white
            shadow-[0_8px_25px_rgba(30,34,41,0.18)]
            transition-all duration-500 ease-out
            hover:-translate-y-1
            hover:bg-lightBrown
            hover:shadow-[0_15px_35px_rgba(162,59,0,0.25)]
            active:translate-y-0
            disabled:cursor-not-allowed disabled:opacity-60
            sm:col-span-2 lg:col-span-1
          "
        >
          {/* Shine animation */}
          <span
            className="
              absolute inset-y-0 -left-full w-1/2
              skew-x-[-20deg]
              bg-gradient-to-r
              from-transparent via-white/30 to-transparent
              transition-all duration-700
              group-hover/button:left-[130%]
            "
          />

          {/* Glow */}
          <span
            className="
              absolute inset-0 rounded-xl
              opacity-0
              shadow-[inset_0_0_25px_rgba(226,99,37,0.45)]
              transition-opacity duration-500
              group-hover/button:opacity-100
            "
          />

          <span className="relative z-10">
            {status === "loading" ? "Searching" : "Explore"}
          </span>

          <ArrowUpRight
            size={12}
            className="
              relative z-10
              transition-all duration-300
              group-hover/button:translate-x-1
              group-hover/button:-translate-y-1
            "
          />
        </button>
      </div>

      {/* BOTTOM ACCENT */}
      {/* <div className="relative mt-3 flex justify-end">
        <div
          className="
            flex items-center gap-2
            text-[8px] uppercase tracking-[0.2em]
            text-darkBlue/40
          "
        >
          <span
            className="
              h-1 w-1 rounded-full bg-lightBrown
              shadow-[0_0_7px_rgba(226,99,37,0.7)]
              animate-pulse
            "
          />

          Curated private journeys
        </div>
      </div> */}
    </form>

      </div>
    </section>
    </div>
  );
};

export default Hero;