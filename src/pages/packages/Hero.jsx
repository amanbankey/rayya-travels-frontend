import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { packagesImages, searchCategories } from "../../data/packagesData";
import { submitForm } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiRepeat, FiUsers } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";
import { Plus, Trash2 } from "lucide-react";
import Reveal from "../../components/Reveal";
import { DateField, SelectField, PassengerField, defaultPassengers, todayISO, classOptions } from "../../components/search/SearchFields";

const initialValues = {
  category: "Holidays",
  destination: "Dubai, United Arab Emirates",
  departFrom: "2026-11-01",
  departTo: "2027-02-28",
  travellers: "2 Adults",
  rooms: "1 Room",
};

/* ---------- Flight search fields (same as flights page Hero) ---------- */
const flightTripTypes = ["One way", ];
const flightClassTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const fsLabelClass =
  "mb-1 flex items-center gap-1 text-[11px] font-semibold text-darkBlue/70";
const fsInputClass =
  "w-full bg-transparent text-sm font-bold text-darkBlue outline-none placeholder:font-normal placeholder:text-darkBlue/40";
const fsCellClass =
  "px-4 py-3.5 transition-colors duration-300 hover:bg-cream/60";


const FlightSearchFields = ({ setShowData}) => {
  const [tripType, setTripType] = useState("One way");
  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    passengers: defaultPassengers,
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
      className="relative mt-3 rounded-2xl bg-white p-4 shadow-xl sm:p-5"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch();
        }
      }}
    >
      {/* <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-dustyRose/40 p-1">
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
      </div> */}

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

            <DateField
              label="Departure"
 months={isRoundTrip ? 2 : 1}
              value={form.departure}
              min={todayISO()}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  departure: v,
                  returnDate:
                    prev.returnDate && prev.returnDate < v ? "" : prev.returnDate,
                }))
              }
              cellClass={fsCellClass}
              labelClass={fsLabelClass}
            />

            {isRoundTrip && (
              <DateField
                label="Return"
months={2}
                value={form.returnDate}
                min={form.departure || todayISO()}
                rangeFrom={form.departure}
                rangeTo={form.returnDate}
                onChange={(v) => handleChange("returnDate", v)}
                cellClass={fsCellClass}
                labelClass={fsLabelClass}
              />
            )}

            <PassengerField
              label="Passengers No."
              icon={FiUsers}
              value={form.passengers}
              onChange={(v) => handleChange("passengers", v)}
              cellClass={fsCellClass}
              labelClass={fsLabelClass}
            />

            <SelectField
              label="Class Type"
              value={form.classType}
              options={classOptions}
              onChange={(v) => handleChange("classType", v)}
              align="right"
              cellClass={fsCellClass}
              labelClass={fsLabelClass}
            />
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

                <DateField
                  label="Departure"
                  value={city.departure}
                  min={index > 0 ? form.cities[index - 1].departure : todayISO()}
                  onChange={(v) => handleCityChange(index, "departure", v)}
                  cellClass={`z-[100] ${fsCellClass}`}
                  labelClass={fsLabelClass}
                />
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
    <section className="relative bg-darkBlue pb-16 py-10">
      <div className="absolute inset-0 overflow-hidden">
        <img src={packagesImages.hero} alt="" className="h-full w-full object-cover opacity-35" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-8">
        <Reveal>

          <h1 className="mt-6  text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Explore the World. <span className="italic text-peach">Your Way.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/85">
            Discover handpicked holidays, unforgettable private expeditions, and bespoke travel packages crafted by
            Raaya Travels concierges.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-[1150px] px-4 sm:-mt-6 sm:px-8 pt-20">
        <Reveal delay={150} className="relative z-30">
          <FlightSearchFields  setShowData={setShowData}/>
        </Reveal>
      </div>
    </section>
    // <div></div>
  );
};

export default Hero;