import { useState } from "react";
import { FiCalendar, FiRepeat, FiUsers } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";
import { Plus, Trash2 } from "lucide-react";
import { heroImage } from "../../data/homeData";

const tripTypes = ["One way", "Round-trip", "Multi-City"];
const classTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const labelClass =
  "mb-1 flex items-center gap-1 text-[11px] font-semibold text-darkBlue/70";
const inputClass =
  "w-full bg-transparent text-sm font-bold text-darkBlue outline-none placeholder:font-normal placeholder:text-darkBlue/40";
const cellClass =
  "px-4 py-3.5 transition-colors duration-300 hover:bg-cream/60";

// Native date input styled to match the theme
const DateField = ({ value, min, onChange }) => (
  <input
    type="date"
    value={value}
    min={min || undefined}
    onChange={(e) => onChange(e.target.value)}
    className={inputClass}
  />
);

const Hero = ({ onSearch }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ tripType, ...form });
  };

  return (
    <div className="relative w-full overflow-hidden bg-darkBlue">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent_15%,black_90%)]"
      />

      <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
        <h1 className="mt-5 max-w-xl mx-auto text-center font-serif text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          Discover your flight under  {" "} 
          <span className="inline italic text-brown">
            60 {" "}
          </span>seconds{" "}
        </h1>

        <div className="relative mx-auto mt-7 max-w-5xl lg:mt-8">
          <div className="rounded-3xl border border-dustyRose bg-lightGray p-5 shadow-sm sm:p-7">
            <div className="mb-6 inline-flex items-center gap-1 rounded-full bg-dustyRose/40 p-1">
              {tripTypes.map((type) => (
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

            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div className="rounded-2xl border border-dustyRose bg-white">
                  <div
                    className={`relative grid grid-cols-1 divide-y divide-dustyRose sm:grid-cols-2 sm:divide-x sm:divide-y-0 ${
                      isRoundTrip ? "lg:grid-cols-6" : "lg:grid-cols-5"
                    }`}
                  >
                    <div className={cellClass}>
                      <p className={labelClass}>From</p>
                      <input
                        type="text"
                        value={form.from}
                        onChange={(e) => handleChange("from", e.target.value)}
                        placeholder="From"
                        className={inputClass}
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

                    <div className={cellClass}>
                      <p className={labelClass}>To</p>
                      <input
                        type="text"
                        value={form.to}
                        onChange={(e) => handleChange("to", e.target.value)}
                        placeholder="To"
                        className={inputClass}
                      />
                    </div>

                    <div className={cellClass}>
                      <p className={labelClass}>
                        <FiCalendar size={11} />
                        Departure
                      </p>
                      <DateField
                        value={form.departure}
                        onChange={(v) => handleChange("departure", v)}
                      />
                    </div>

                    {isRoundTrip && (
                      <div className={cellClass}>
                        <p className={labelClass}>
                          <FiCalendar size={11} />
                          Return
                        </p>
                        <DateField
                          value={form.returnDate}
                          min={form.departure}
                          onChange={(v) => handleChange("returnDate", v)}
                        />
                      </div>
                    )}

                    <div className={cellClass}>
                      <p className={labelClass}>
                        <FiUsers size={11} />
                        Passengers No.
                      </p>
                      <select
                        value={form.passengers}
                        onChange={(e) =>
                          handleChange("passengers", Number(e.target.value))
                        }
                        className={inputClass}
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} Passenger{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={cellClass}>
                      <p className={labelClass}>Class Type</p>
                      <select
                        value={form.classType}
                        onChange={(e) =>
                          handleChange("classType", e.target.value)
                        }
                        className={inputClass}
                      >
                        {classTypes.map((c) => (
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
                        <div className={cellClass}>
                          <p className={labelClass}>From</p>
                          <input
                            type="text"
                            value={city.from}
                            onChange={(e) =>
                              handleCityChange(index, "from", e.target.value)
                            }
                            placeholder="From"
                            className={inputClass}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCitySwap(index)}
                          className="absolute left-1/4 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brown bg-brown shadow transition-all duration-300 hover:rotate-180 hover:border-darkBlue hover:bg-darkBlue lg:flex"
                        >
                          <FiRepeat className="text-white" size={14} />
                        </button>

                        <div className={cellClass}>
                          <p className={labelClass}>To</p>
                          <input
                            type="text"
                            value={city.to}
                            onChange={(e) =>
                              handleCityChange(index, "to", e.target.value)
                            }
                            placeholder="To"
                            className={inputClass}
                          />
                        </div>

                        <div className={`relative z-[100] ${cellClass}`}>
                          <p className={labelClass}>
                            <FiCalendar size={11} />
                            Departure
                          </p>
                          <DateField
                            value={city.departure}
                            min={
                              index > 0 ? form.cities[index - 1].departure : ""
                            }
                            onChange={(v) =>
                              handleCityChange(index, "departure", v)
                            }
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
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-darkBlue px-7 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-blue hover:shadow-xl"
                >
                  Search Flight
                  <TbPlaneDeparture size={17} className="text-brown" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
