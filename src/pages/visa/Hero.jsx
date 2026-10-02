import { useEffect, useRef, useState } from "react";
import { ArrowRight, Briefcase, Calendar, CheckCircle2, MapPin, Plane, ShieldCheck, Users, Zap } from "lucide-react";
import { submitForm } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiRepeat, FiSearch, FiUsers } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import TravelerDetails from "./TravelerDetail";
import { DateField, SelectField, PassengerField, SwapButton, defaultPassengers, todayISO, classOptions, searchLabelClass, searchInputClass, searchCellClass, searchButtonClass } from "../../components/search/SearchFields";


const visaTypes = [
  { key: "tourist", label: "Tourist Visa", icon: Plane },
  { key: "business", label: "Business & Delegation", icon: Briefcase },
  { key: "expedited", label: "Expedited / Express", icon: Zap },
];

const initialValues = {
  visaType: "tourist",
  destination: "Dubai, United Arab Emirates",
  entryCategory: "30-Day Single Entry eVisa",
  travelFrom: "2026-11-15",
  travelTo: "2026-11-30",
  travellers: "2 Travellers",
  passport: "Indian Passport",
};

const fieldClass = "mt-1 w-full bg-transparent text-[15px] font-medium text-ink outline-none";
const labelClass = "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-brown";

/* ---------- Flight search fields ---------- */
const flightTripTypes = ["One way"];
const flightClassTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const fsLabelClass = searchLabelClass;
const fsInputClass = searchInputClass;
const fsCellClass = searchCellClass;

const FlightSearchFields = ({show, setShow}) => {
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

  const isRoundTrip = tripType === "Round Trip";
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
    setShow(true)
  };

  return (
    <div
      className="relative z-30 rounded-2xl border border-lightBrown/20 bg-darkBlue50 p-3 text-left shadow-sm sm:p-4"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch();
        }
      }}
    >
      {/* Trip type (radio style pills)
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {flightTripTypes.map((type) => {
          const active = tripType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(type)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                active ? "bg-darkBlue text-white" : "bg-oat text-darkBlue/70 hover:text-darkBlue"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  active ? "border-white" : "border-darkBlue/40"
                }`}
              >
                {active && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
              {type}
            </button>
          );
        })}
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
            label="Depart"
 months={isRoundTrip ? 2 : 1}
            value={form.departure}
            min={today}
            rangeFrom={isRoundTrip ? form.departure : ""}
            rangeTo={isRoundTrip ? form.returnDate : ""}
            onChange={handleDeparture}
            placeholder="Add date"
            cellClass={fsCellClass}
            labelClass={fsLabelClass}
            valueClass="text-sm"
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
              placeholder="Add date"
              cellClass={fsCellClass}
              labelClass={fsLabelClass}
              valueClass="text-sm"
            />
          )}

          <PassengerField
            label="Person"
            icon={FiUsers}
            value={form.passengers}
            onChange={(v) => handleChange("passengers", v)}
            cellClass={fsCellClass}
            labelClass={fsLabelClass}
            valueClass="text-sm"
          />

          <SelectField
            label="Class Type"
            value={form.classType}
            options={classOptions}
            onChange={(v) => handleChange("classType", v)}
            align="right"
            cellClass={fsCellClass}
            labelClass={fsLabelClass}
            valueClass="text-sm"
          />

          <button
            type="button"
            onClick={handleSearch}
            className={searchButtonClass}
          >
            <FiSearch size={17} className="text-aviationBrown" />
            Search
          </button>
        </div>

      </div>

     
    </div>
  );
};

const VisaHero = ({setShow, show}) => {
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
      await submitForm("/visa/check-requirements", values);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="relative bg-  pt-16 sm:pb-16 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-darkBlue via-darkBlue/95 to-darkBlue" />

      <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-8 ">
      
        <h1 className="mt-6  text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
          Your Visa Journey <span className="italic text-peach">Starts Here</span>
        </h1>

        <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/80">
          Fast, verified visa processing and document support for seamless global entry. Curated for international
          itineraries with zero friction.
        </p>

      </div>

      <div className="relative mx-auto  max-w-[1150px] px-4 sm:mt-16 sm:px-8">
        <FlightSearchFields  setShow={setShow} show={show} />
      </div>


    


    </section>
  );
};

export default VisaHero;