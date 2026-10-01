import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { packagesImages, searchCategories } from "../../data/packagesData";
import { submitForm } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiRepeat, FiUsers } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";
import { Plus, Trash2 } from "lucide-react";
import Reveal from "../../components/Reveal";

const initialValues = {
  category: "Holidays",
  destination: "Dubai, United Arab Emirates",
  departFrom: "2026-11-01",
  departTo: "2027-02-28",
  travellers: "2 Adults",
  rooms: "1 Room",
};

/* ---------- Flight search fields (same as flights page Hero) ---------- */
const flightTripTypes = ["One way", "Round-trip", "Multi-City"];
const flightClassTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const fsLabelClass =
  "mb-1 flex items-center gap-1 text-[11px] font-semibold text-darkBlue/70";
const fsInputClass =
  "w-full bg-transparent text-sm font-bold text-darkBlue outline-none placeholder:font-normal placeholder:text-darkBlue/40";
const fsCellClass =
  "px-4 py-3.5 transition-colors duration-300 hover:bg-cream/60";

const FlightDateField = ({ value, min, onChange }) => (
  <input
    type="date"
    value={value}
    min={min || undefined}
    onChange={(e) => onChange(e.target.value)}
    className={fsInputClass}
  />
);

const FlightSearchFields = ({ setShowData}) => {
  const [tripType, setTripType] = useState("One way");
  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    passengers: 1,
    classType: "ECONOMY",
    cities: [],
  });

  const isRoundTrip = tripType === "Round-trip";

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCityChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      cities: prev.cities.map((city, i) =>
        i === index ? { ...city, [field]: value } : city,
      ),
    }));
  };

  const handleCitySwap = (index) => {
    setForm((prev) => ({
      ...prev,
      cities: prev.cities.map((city, i) =>
        i === index ? { ...city, from: city.to, to: city.from } : city,
      ),
    }));
  };

  const handleAddCity = () => {
    setForm((prev) => ({
      ...prev,
      cities: [
        ...prev.cities,
        {
          from: prev.cities.length
            ? prev.cities[prev.cities.length - 1].to
            : prev.to,
          to: "",
          departure: "",
        },
      ],
    }));
  };

  const handleRemoveCity = (index) => {
    setForm((prev) => ({
      ...prev,
      cities: prev.cities.filter((_, i) => i !== index),
    }));
  };

  const handleSwap = () => {
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const handleSearch = () => {
    // if (onSearch) onSearch({ tripType, ...form });
    setShowData(true)
    
  };

  return (
    <div
      className="relative mt-3"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch();
        }
      }}
    >
      <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-dustyRose/40 p-1">
        {flightTripTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              tripType === type
                ? "bg-darkBlue text-white shadow"
                : "text-darkBlue/60 hover:text-darkBlue"
            }`}
          >
            {type === "One way" ? <TbPlaneDeparture size={14} /> : null}
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-dustyRose bg-white">
          <div
            className={`relative grid grid-cols-1 divide-y divide-dustyRose sm:grid-cols-2 sm:divide-x sm:divide-y-0 ${
              isRoundTrip ? "lg:grid-cols-6" : "lg:grid-cols-5"
            }`}
          >
            <div className={fsCellClass}>
              <p className={fsLabelClass}>From</p>
              <input
                type="text"
                value={form.from}
                onChange={(e) => handleChange("from", e.target.value)}
                placeholder="From"
                className={fsInputClass}
              />
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="absolute top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-brown bg-brown shadow transition-all duration-300 hover:rotate-180 hover:border-darkBlue hover:bg-darkBlue lg:flex"
              style={{
                left: `calc(${100 / (isRoundTrip ? 6 : 5)}% - 16px)`,
              }}
            >
              <FiRepeat className="text-white" size={14} />
            </button>

            <div className={fsCellClass}>
              <p className={fsLabelClass}>To</p>
              <input
                type="text"
                value={form.to}
                onChange={(e) => handleChange("to", e.target.value)}
                placeholder="To"
                className={fsInputClass}
              />
            </div>

            <div className={fsCellClass}>
              <p className={fsLabelClass}>
                <FiCalendar size={11} />
                Departure
              </p>
              <FlightDateField
                value={form.departure}
                onChange={(v) => handleChange("departure", v)}
              />
            </div>

            {isRoundTrip && (
              <div className={fsCellClass}>
                <p className={fsLabelClass}>
                  <FiCalendar size={11} />
                  Return
                </p>
                <FlightDateField
                  value={form.returnDate}
                  min={form.departure}
                  onChange={(v) => handleChange("returnDate", v)}
                />
              </div>
            )}

            <div className={fsCellClass}>
              <p className={fsLabelClass}>
                <FiUsers size={11} />
                Passengers No.
              </p>
              <select
                value={form.passengers}
                onChange={(e) =>
                  handleChange("passengers", Number(e.target.value))
                }
                className={fsInputClass}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} Passenger{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className={fsCellClass}>
              <p className={fsLabelClass}>Class Type</p>
              <select
                value={form.classType}
                onChange={(e) => handleChange("classType", e.target.value)}
                className={fsInputClass}
              >
                {flightClassTypes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {tripType === "Multi-City" &&
          form.cities.map((city, index) => (
            <div
              key={index}
              className="relative z-30 overflow-visible rounded-2xl border border-dustyRose bg-white"
            >
              <div className="relative z-30 grid grid-cols-1 divide-y divide-dustyRose overflow-visible sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                <div className={fsCellClass}>
                  <p className={fsLabelClass}>From</p>
                  <input
                    type="text"
                    value={city.from}
                    onChange={(e) =>
                      handleCityChange(index, "from", e.target.value)
                    }
                    placeholder="From"
                    className={fsInputClass}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleCitySwap(index)}
                  className="absolute left-1/4 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brown bg-brown shadow transition-all duration-300 hover:rotate-180 hover:border-darkBlue hover:bg-darkBlue lg:flex"
                >
                  <FiRepeat className="text-white" size={14} />
                </button>

                <div className={fsCellClass}>
                  <p className={fsLabelClass}>To</p>
                  <input
                    type="text"
                    value={city.to}
                    onChange={(e) =>
                      handleCityChange(index, "to", e.target.value)
                    }
                    placeholder="To"
                    className={fsInputClass}
                  />
                </div>

                <div className={`relative z-[100] ${fsCellClass}`}>
                  <p className={fsLabelClass}>
                    <FiCalendar size={11} />
                    Departure
                  </p>
                  <FlightDateField
                    value={city.departure}
                    min={index > 0 ? form.cities[index - 1].departure : ""}
                    onChange={(v) => handleCityChange(index, "departure", v)}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveCity(index)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-dustyRose/40 text-darkBlue transition-all duration-300 hover:bg-darkBlue hover:text-white"
                title="Remove city"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        {tripType === "Multi-City" && (
          <button
            type="button"
            onClick={handleAddCity}
            className="flex items-center gap-2 rounded-full bg-dustyRose/40 px-6 py-3 text-sm font-bold text-darkBlue transition-all duration-300 hover:bg-dustyRose"
          >
            <Plus size={17} />
            Add City
          </button>
        )}

        <button
          type="button"

          onClick={handleSearch}
          className="flex items-center gap-2 rounded-full bg-darkBlue px-7 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-blue hover:shadow-xl"
        >
          Search Flight
          <TbPlaneDeparture size={17} className="text-brown" />
        </button>
      </div>
    </div>
  );
};

const Hero = ({setShowData, showData}) => {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
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
    <section className="relative overflow-hidden bg-darkBlue pb-16 py-10">
      <img src={packagesImages.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/70 to-dark" /> */}

      <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-8">
        <Reveal>
          {/* <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-peach" /> Curated Global Holidays
          </span> */}

          <h1 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Explore the World. <span className="italic text-peach">Your Way.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/85">
            Discover handpicked holidays, unforgettable private expeditions, and bespoke travel packages crafted by
            Raaya Travels concierges.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-[1150px] px-4 sm:-mt-6 sm:px-8 pt-20">
        <Reveal delay={150}>
          <FlightSearchFields  setShowData={setShowData}/>
        </Reveal>
      </div>
    </section>
    // <div></div>
  );
};

export default Hero;