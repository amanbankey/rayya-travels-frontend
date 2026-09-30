import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { packagesImages, searchCategories } from "../../data/packagesData";
import { submitForm } from "../../services/api";
import Reveal from "../../components/Reveal";

const initialValues = {
  category: "Holidays",
  destination: "Dubai, United Arab Emirates",
  departFrom: "2026-11-01",
  departTo: "2027-02-28",
  travellers: "2 Adults",
  rooms: "1 Room",
};

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
      await submitForm("/packages/search", values);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    // <section className="relative overflow-hidden bg-darkBlue pb-56 pt-16 sm:pb-64 sm:pt-20 lg:pb-72">
    //   <img src={packagesImages.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
    //   {/* <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/70 to-dark" /> */}

    //   <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-8">
    //     <Reveal>
    //       {/* <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white">
    //         <span className="h-1.5 w-1.5 rounded-full bg-peach" /> Curated Global Holidays
    //       </span> */}

    //       <h1 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
    //         Explore the World. <span className="italic text-peach">Your Way.</span>
    //       </h1>

    //       <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/85">
    //         Discover handpicked holidays, unforgettable private expeditions, and bespoke travel packages crafted by
    //         Raaya Travels concierges.
    //       </p>
    //     </Reveal>
    //   </div>

    //   <div className="relative mx-auto -mt-4 max-w-[1150px] px-4 sm:-mt-6 sm:px-8">
    //     <Reveal delay={150}>
    //       <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 shadow-2xl sm:p-6">
    //         <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
    //           {searchCategories.map((category) => (
    //             <button
    //               type="button"
    //               key={category}
    //               onClick={() => setValues({ ...values, category })}
    //               className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
    //                 values.category === category ? "bg-darkBlue text-white" : "bg-oat text-darkBlue hover:bg-mist"
    //               }`}
    //             >
    //               {category}
    //             </button>
    //           ))}
    //         </div>

    //         <div className="mt-4 grid gap-3 rounded-xl bg-oat p-3 lg:grid-cols-[1.3fr_1.3fr_1fr_auto]">
    //           <label className="rounded-lg bg-white px-4 py-3">
    //             <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-darkBlue">
    //               <MapPin size={13} /> Destination
    //             </span>
    //             <input
    //               name="destination"
    //               value={values.destination}
    //               onChange={handleChange}
    //               className="mt-1 w-full bg-transparent text-[15px] font-medium text-darkBlue outline-none"
    //             />
    //           </label>

    //           <label className="rounded-lg bg-white px-4 py-3">
    //             <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-darkBlue">
    //               <Calendar size={13} /> Departure Window
    //             </span>
    //             <span className="mt-1 flex items-center gap-2">
    //               <input
    //                 type="date"
    //                 name="departFrom"
    //                 value={values.departFrom}
    //                 onChange={handleChange}
    //                 className="w-full bg-transparent text-[15px] font-medium text-darkBlue outline-none"
    //               />
    //               <input
    //                 type="date"
    //                 name="departTo"
    //                 value={values.departTo}
    //                 onChange={handleChange}
    //                 className="w-full bg-transparent text-[15px] font-medium text-darkBlue outline-none"
    //               />
    //             </span>
    //             {/* <span className="mt-0.5 block text-xs text-darkBlue">Flexible dates active</span> */}
    //           </label>

    //           <label className="rounded-lg bg-white px-4 py-3">
    //             <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-darkBlue">
    //               <Users size={13} /> Travellers & Rooms
    //             </span>
    //             <span className="mt-1 flex items-center gap-2">
    //               <select
    //                 name="travellers"
    //                 value={values.travellers}
    //                 onChange={handleChange}
    //                 className="w-full bg-transparent text-[15px] font-medium text-darkBlue outline-none"
    //               >
    //                 <option>1 Adult</option>
    //                 <option>2 Adults</option>
    //                 <option>4 Adults</option>
    //               </select>
    //               <select
    //                 name="rooms"
    //                 value={values.rooms}
    //                 onChange={handleChange}
    //                 className="w-full bg-transparent text-[15px] font-medium text-darkBlue outline-none"
    //               >
    //                 <option>1 Room</option>
    //                 <option>2 Rooms</option>
    //                 <option>3 Rooms</option>
    //               </select>
    //             </span>
    //             {/* <span className="mt-0.5 block text-xs text-darkBlue">Couples / Solo</span> */}
    //           </label>

    //           <button
    //             type="submit"
    //             disabled={status === "loading"}
    //             className="flex items-center justify-center gap-2 rounded-lg bg-darkBlue px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#8b6538] hover:shadow-lg disabled:opacity-60 lg:px-8"
    //           >
    //             {status === "loading" ? "Searching" : "Search"} <ArrowRight size={15} />
    //           </button>
    //         </div>

    //         {/* <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-xs text-ink/70 sm:flex-row sm:items-center sm:justify-between">
    //           <p>
    //             Default Budget Bracket: <span className="font-medium text-ink">₹50,000 – ₹1,50,000 / person</span>
    //           </p>
    //           <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
    //             <span className="flex items-center gap-1.5">
    //               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Instant Confirmation
    //             </span>
    //             <span className="flex items-center gap-1.5">
    //               <span className="h-1.5 w-1.5 rounded-full bg-brown" /> 100% Custom Tailored
    //             </span>
    //           </p>
    //         </div> */}

    //         {status === "success" && (
    //           <p className="mt-3 rounded-lg bg-badge px-4 py-2.5 text-center text-sm font-medium text-badgetext">
    //             Search saved. Our concierge desk will follow up with matching packages.
    //           </p>
    //         )}
    //       </form>
    //     </Reveal>
    //   </div>
    // </section>
    <div></div>
  );
};

export default Hero;