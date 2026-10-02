

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Calendar, Clock, Landmark, MapPin, Plane, ShieldCheck, Sparkles, Stamp, Users } from "lucide-react";
import { submitForm } from "../../services/api";
import { heroImage } from "../../data/homeData";
import { FiCalendar, FiRepeat, FiUsers } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { DateField, SelectField, PassengerField, defaultPassengers, todayISO, classOptions } from "../../components/search/SearchFields";
const tabs = [
  { key: "flight", label: "Flight", icon: Plane, path: "/flights" },
  { key: "visa" , label: "Visa", icon: Landmark, path: "/visa" },
  { key: "Packages", label: "Packages", icon: Stamp, path: "/packages" },
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

/* ---------- Flight search fields ---------- */
const flightTripTypes = ["One way", "Round-trip", "Multi-City"];
const flightClassTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const fsLabelClass =
  "mb-0.5 flex items-center gap-1 text-[11px] font-semibold text-darkBlue/70";
const fsInputClass =
  "w-full bg-transparent text-sm font-bold text-darkBlue outline-none placeholder:font-normal placeholder:text-darkBlue/40";
const fsCellClass =
  "relative rounded-xl border border-dustyRose bg-white px-4 py-2.5 transition-colors duration-300 hover:bg-cream/60 focus-within:border-darkBlue";


const SwapButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-[-20px] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-brown bg-brown shadow transition-all duration-300 hover:rotate-180 hover:border-darkBlue hover:bg-darkBlue lg:flex"
  >
    <FiRepeat className="text-white" size={14} />
  </button>
);

const FlightSearchFields = () => {
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
  const today = todayISO();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeparture = (value) => {
    setForm((prev) => ({
      ...prev,
      departure: value,
      returnDate: prev.returnDate && prev.returnDate < value ? "" : prev.returnDate,
    }));
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
      {/* <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-dustyRose/40 p-1">
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

      <div className="space-y-2">
        {/* Main search row */}
        <div
          className={`grid grid-cols-1 gap-2 sm:grid-cols-2 ${
            isRoundTrip
              ? "lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto]"
              : "lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]"
          }`}
        >
          <div className={fsCellClass}>
            <p className={fsLabelClass}>From</p>
            <input
              type="text"
              value={form.from}
              onChange={(e) => handleChange("from", e.target.value)}
              placeholder="City or airport"
              className={fsInputClass}
            />
            <SwapButton onClick={handleSwap} />
          </div>

          <div className={fsCellClass}>
            <p className={fsLabelClass}>To</p>
            <input
              type="text"
              value={form.to}
              onChange={(e) => handleChange("to", e.target.value)}
              placeholder="City or airport"
              className={fsInputClass}
            />
          </div>

          <DateField
            label="Departure"
 months={isRoundTrip ? 2 : 1}
            value={form.departure}
            min={today}
            rangeFrom={isRoundTrip ? form.departure : ""}
            rangeTo={isRoundTrip ? form.returnDate : ""}
            onChange={handleDeparture}
            cellClass={fsCellClass}
            labelClass={fsLabelClass}
          />

          {isRoundTrip && (
            <DateField
              label="Return"
months={2}
              value={form.returnDate}
              min={form.departure || today}
              rangeFrom={form.departure}
              rangeTo={form.returnDate}
              onChange={(v) => handleChange("returnDate", v)}
              align="right"
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

          <button
            type="button"
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-xl bg-darkBlue px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-blue hover:shadow-xl sm:col-span-2 lg:col-span-1"
          >
            Search Flight
            <TbPlaneDeparture size={17} className="text-brown" />
          </button>
        </div>

        {/* Extra cities (Multi-City) */}
        {/* {tripType === "Multi-City" &&
          form.cities.map((city, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
            >
              <div className={fsCellClass}>
                <p className={fsLabelClass}>From</p>
                <input
                  type="text"
                  value={city.from}
                  onChange={(e) => handleCityChange(index, "from", e.target.value)}
                  placeholder="City or airport"
                  className={fsInputClass}
                />
                <SwapButton onClick={() => handleCitySwap(index)} />
              </div>

              <div className={fsCellClass}>
                <p className={fsLabelClass}>To</p>
                <input
                  type="text"
                  value={city.to}
                  onChange={(e) => handleCityChange(index, "to", e.target.value)}
                  placeholder="City or airport"
                  className={fsInputClass}
                />
              </div>

              <FlightDateField
                label="Departure"
                value={city.departure}
                min={index > 0 ? form.cities[index - 1].departure || today : form.departure || today}
                onChange={(v) => handleCityChange(index, "departure", v)}
                align="right"
              />

              <button
                type="button"
                onClick={() => handleRemoveCity(index)}
                className="flex items-center justify-center rounded-xl bg-dustyRose/40 px-4 text-darkBlue transition-all duration-300 hover:bg-darkBlue hover:text-white sm:col-span-2 lg:col-span-1"
                title="Remove city"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))} */}
      </div>

      {/* {tripType === "Multi-City" && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleAddCity}
            className="flex items-center gap-2 rounded-full bg-dustyRose/40 px-6 py-3 text-sm font-bold text-darkBlue transition-all duration-300 hover:bg-dustyRose"
          >
            <Plus size={17} />
            Add City
          </button>
        </div>
      )} */}
    </div>
  );
};

const Hero = () => {
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
      await submitForm("/search", values);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full bg-darkBlue relative">
     <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent_15%,black_90%)]"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream" /> */}
    <section id="home" className="max-w-6xl mx-auto px-4 pb-10 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16 bg-darkBlue/10 ">

      <div className="relative">
    
        <h1 className="mt-5 max-w-xl  text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          The Art of <span className="block italic text-dustyRose">Considered Journeying</span> 
        </h1>
     
    <form
      onSubmit={handleSubmit}
      className="
        group/form relative z-30 mt-7 rounded-2xl
        border border-lightBrown/20 bg-darkBlue50 p-3 shadow-sm
        transition-all duration-700 ease-out
        hover:-translate-y-1 hover:border-lightBrown/40
        hover:shadow-[0_20px_60px_rgba(162,59,0,0.12)]
        sm:p-4 lg:mt-8
        animate-[fadeUp_0.8s_ease-out]
      "
    >
      {/* glow blobs stay clipped inside the card so the calendar popup can overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div
          className="
            absolute -right-24 -top-24 h-48 w-48
            rounded-full  blur-3xl
            transition-all duration-1000
            group-hover/form:scale-150 group-hover/form:bg-lightBrown/15
          "
        />

        <div
          className="
            absolute -bottom-24 -left-24 h-48 w-48
            rounded-full bg-darkBlue25 blur-3xl
            transition-all duration-1000
            group-hover/form:scale-150
          "
        />
      </div>

      <div
        className="
          relative flex flex-col gap-3 border-b border-lightBrown/20 pb-3
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div className="flex flex-wrap gap-1.5">
          {tabs.map(({ key, label, icon: Icon, path }) => (
            <button
              type="button"
              key={key}
              onClick={() => {
                setValues({ ...values, tab: key });
                navigate(path);
              }}
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

              <span className="relative z-10" > {label}</span>

             
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

      <FlightSearchFields  />
    </form>

      </div>
    </section>
    </div>
  );
};

export default Hero;