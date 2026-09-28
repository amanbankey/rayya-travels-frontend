// import { ArrowUpRight, Calendar, Clock, Landmark, MapPin, Plane, ShieldCheck, Sparkles, Stamp, Users } from "lucide-react";
// import useForm from "../../../hooks/useForm";
// import { heroImage } from "../../../data/homeData";

// const tabs = [
//   { key: "flight", label: "Flight", icon: Plane },
//   { key: "sanctuary", label: "Sanctuary", icon: Landmark },
//   { key: "visa", label: "Diplomatic Visa", icon: Stamp },
// ];

// const perks = [
//   { icon: Clock, label: "Restorative Pacing" },
//   { icon: ShieldCheck, label: "Absolute Discretion" },
//   { icon: Sparkles, label: "Signature Departures" },
// ];

// const specializations = ["Private Aviation Charters", "UNESCO Heritage Access", "Diplomatic Pass Clearance"];

// const initialValues = {
//   tab: "flight",
//   route: "Zürich (ZRH) → Florence (FLR)",
//   departDate: "2025-10-14",
//   returnDate: "2025-10-24",
//   party: "2 Connoisseurs • Master Suite",
//   cabin: "First Suite / Citation Jet",
// };

// const fieldClass = "w-full bg-transparent text-xs font-medium text-ink outline-none sm:text-[13px]";
// const labelClass = "text-[8px] font-medium uppercase tracking-[0.2em] text-muted";

// const Hero = () => {
//   const { values, status, handleChange, setValue, handleSubmit } = useForm(initialValues, "/search");

//   return (
//     <section id="home" className="relative overflow-hidden px-4 pb-10 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
//       <img
//         src={heroImage}
//         alt=""
//         className="absolute inset-0 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent_15%,black_90%)]"
//       />
//       <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream" />

//       <div className="relative">
//         <p className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.25em] text-muted">
//           <span className="h-1 w-1 rounded-full bg-ink" /> Bespoke Atelier Volume MMXXV
//         </p>

//         <h1 className="mt-5 max-w-xl font-serif text-4xl font-medium leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
//           The Art of <span className="block italic text-ink/80">Considered</span> Journeying
//         </h1>

//         <p className="mt-5 max-w-md font-serif text-sm leading-relaxed text-muted sm:text-base">
//           Curated departures, private sanctuaries, and architectural voyages crafted exclusively for the discerning
//           epicurean.
//         </p>

//         <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
//           {perks.map(({ icon: Icon, label }) => (
//             <li key={label} className="flex items-center gap-1.5 text-[8px] font-medium uppercase tracking-[0.2em] text-sand">
//               <Icon size={11} /> {label}
//             </li>
//           ))}
//         </ul>

//         <form onSubmit={handleSubmit} className="mt-10 rounded-2xl border border-line bg-paper p-3 shadow-sm sm:p-4 lg:mt-14">
//           <div className="flex flex-col gap-3 border-b border-line pb-3 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex flex-wrap gap-1.5">
//               {tabs.map(({ key, label, icon: Icon }) => (
//                 <button
//                   type="button"
//                   key={key}
//                   onClick={() => setValue("tab", key)}
//                   className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] transition-colors ${
//                     values.tab === key ? "bg-soft text-ink" : "text-muted hover:text-ink"
//                   }`}
//                 >
//                   <Icon size={11} /> {label}
//                 </button>
//               ))}
//             </div>
//             <p className="flex items-center gap-1.5 text-[9px] font-medium text-muted">
//               <Sparkles size={11} /> Private Aviation & Heritage Estates Concierge
//             </p>
//           </div>

//           <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.3fr_1fr_1fr_auto]">
//             <label className="rounded-xl border border-line p-3">
//               <span className={labelClass}>Route / Departure</span>
//               <span className="mt-1.5 flex items-center gap-2">
//                 <MapPin size={13} className="shrink-0 text-sand" />
//                 <input name="route" value={values.route} onChange={handleChange} className={fieldClass} />
//               </span>
//             </label>

//             <div className="rounded-xl border border-line p-3">
//               <span className={labelClass}>Harvest Season / Dates</span>
//               <span className="mt-1.5 flex items-center gap-2">
//                 <Calendar size={13} className="shrink-0 text-sand" />
//                 <input type="date" name="departDate" value={values.departDate} onChange={handleChange} className={fieldClass} />
//                 <input type="date" name="returnDate" value={values.returnDate} onChange={handleChange} className={fieldClass} />
//               </span>
//             </div>

//             <label className="rounded-xl border border-line p-3">
//               <span className={labelClass}>Party / Suites</span>
//               <span className="mt-1.5 flex items-center gap-2">
//                 <Users size={13} className="shrink-0 text-sand" />
//                 <select name="party" value={values.party} onChange={handleChange} className={fieldClass}>
//                   <option>1 Connoisseur • Solo Suite</option>
//                   <option>2 Connoisseurs • Master Suite</option>
//                   <option>4 Connoisseurs • Private Villa</option>
//                 </select>
//               </span>
//             </label>

//             <label className="rounded-xl border border-line p-3">
//               <span className={labelClass}>Cabin Manifest</span>
//               <select name="cabin" value={values.cabin} onChange={handleChange} className={`${fieldClass} mt-1.5`}>
//                 <option>First Suite / Citation Jet</option>
//                 <option>Business Suite / Light Jet</option>
//                 <option>Heavy Jet / Global 7500</option>
//               </select>
//             </label>

//             <button
//               type="submit"
//               disabled={status === "loading"}
//               className="flex items-center justify-center gap-1.5 rounded-xl bg-dark px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-paper transition-all hover:bg-ink hover:shadow-lg disabled:opacity-60 sm:col-span-2 lg:col-span-1"
//             >
//               {status === "loading" ? "Searching" : "Explore"} <ArrowUpRight size={12} />
//             </button>
//           </div>

//           <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
//             <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-medium text-muted">
//               <li className="text-[8px] uppercase tracking-[0.2em]">Specialization:</li>
//               {specializations.map((item) => (
//                 <li key={item} className="border-l border-line pl-3">{item}</li>
//               ))}
//             </ul>
//             <p className="font-serif text-[11px] italic text-sand">
//               {status === "success" && "Request received."}
//               {status === "error" && "Unable to search right now."}
//               {status === "idle" && "Zero compromise on tranquility."}
//               {status === "loading" && "Preparing your manifest."}
//             </p>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import { useState } from "react";
import { ArrowUpRight, Calendar, Clock, Landmark, MapPin, Plane, ShieldCheck, Sparkles, Stamp, Users } from "lucide-react";
import { submitForm } from "../../services/api";
import { heroImage } from "../../data/homeData";

const tabs = [
  { key: "flight", label: "Flight", icon: Plane },
  { key: "sanctuary", label: "Sanctuary", icon: Landmark },
  { key: "visa", label: "Diplomatic Visa", icon: Stamp },
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

const fieldClass = "w-full bg-transparent text-xs font-medium text-ink outline-none sm:text-[13px]";
const labelClass = "text-[8px] font-medium uppercase tracking-[0.2em] text-muted";

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
    <section id="home" className="max-w-7xl mx-auto relative overflow-hidden px-4 pb-10 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent_15%,black_90%)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream" />

      <div className="relative">
        <p className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.25em] text-muted">
          <span className="h-1 w-1 rounded-full bg-ink" /> Bespoke Atelier Volume MMXXV
        </p>

        <h1 className="mt-5 max-w-xl font-serif text-4xl font-medium leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
          The Art of <span className="block italic text-ink/80">Considered</span> Journeying
        </h1>

        <p className="mt-5 max-w-md font-serif text-sm leading-relaxed text-muted sm:text-base">
          Curated departures, private sanctuaries, and architectural voyages crafted exclusively for the discerning
          epicurean.
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5 text-[8px] font-medium uppercase tracking-[0.2em] text-sand">
              <Icon size={11} /> {label}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="mt-10 rounded-2xl border border-line bg-cream p-3 shadow-sm sm:p-4 lg:mt-14">
          <div className="flex flex-col gap-3 border-b border-line pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setValues({ ...values, tab: key })}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] transition-colors ${
                    values.tab === key ? "bg-soft text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <Icon size={11} /> {label}
                </button>
              ))}
            </div>
            <p className="flex items-center gap-1.5 text-[9px] font-medium text-muted">
              <Sparkles size={11} /> Private Aviation & Heritage Estates Concierge
            </p>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.3fr_1fr_1fr_auto]">
            <label className="rounded-xl border border-line p-3">
              <span className={labelClass}>Route / Departure</span>
              <span className="mt-1.5 flex items-center gap-2">
                <MapPin size={13} className="shrink-0 text-sand" />
                <input name="route" value={values.route} onChange={handleChange} className={fieldClass} />
              </span>
            </label>

            <div className="rounded-xl border border-line p-3">
              <span className={labelClass}>Harvest Season / Dates</span>
              <span className="mt-1.5 flex items-center gap-2">
                <Calendar size={13} className="shrink-0 text-sand" />
                <input type="date" name="departDate" value={values.departDate} onChange={handleChange} className={fieldClass} />
                <input type="date" name="returnDate" value={values.returnDate} onChange={handleChange} className={fieldClass} />
              </span>
            </div>

            <label className="rounded-xl border border-line p-3">
              <span className={labelClass}>Party / Suites</span>
              <span className="mt-1.5 flex items-center gap-2">
                <Users size={13} className="shrink-0 text-sand" />
                <select name="party" value={values.party} onChange={handleChange} className={fieldClass}>
                  <option>1 Connoisseur • Solo Suite</option>
                  <option>2 Connoisseurs • Master Suite</option>
                  <option>4 Connoisseurs • Private Villa</option>
                </select>
              </span>
            </label>

            <label className="rounded-xl border border-line p-3">
              <span className={labelClass}>Cabin Manifest</span>
              <select name="cabin" value={values.cabin} onChange={handleChange} className={`${fieldClass} mt-1.5`}>
                <option>First Suite / Citation Jet</option>
                <option>Business Suite / Light Jet</option>
                <option>Heavy Jet / Global 7500</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-dark px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-paper transition-all hover:bg-ink hover:shadow-lg disabled:opacity-60 sm:col-span-2 lg:col-span-1"
            >
              {status === "loading" ? "Searching" : "Explore"} <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-medium text-muted">
              <li className="text-[8px] uppercase tracking-[0.2em]">Specialization:</li>
              {specializations.map((item) => (
                <li key={item} className="border-l border-line pl-3">{item}</li>
              ))}
            </ul>
            <p className="font-serif text-[11px] italic text-sand">
              {status === "success" && "Request received."}
              {status === "error" && "Unable to search right now."}
              {status === "idle" && "Zero compromise on tranquility."}
              {status === "loading" && "Preparing your manifest."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;