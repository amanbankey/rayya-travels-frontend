import { useEffect, useRef, useState } from "react";
import { ArrowRight, Briefcase, Calendar, CheckCircle2, MapPin, Plane, ShieldCheck, Users, Zap } from "lucide-react";
import { submitForm } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiRepeat, FiSearch, FiUsers } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

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
const flightTripTypes = ["One way", "Round Trip", "Multi-City"];
const flightClassTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const fsLabelClass = "mb-0.5 flex items-center gap-1 text-xs font-medium text-darkBlue/70";
const fsInputClass =
  "w-full bg-transparent text-lg font-medium text-darkBlue outline-none placeholder:text-darkBlue/30";
const fsCellClass =
  "relative rounded-2xl bg-oat px-5 py-3 transition-all duration-300 hover:bg-oat/70 focus-within:ring-2 focus-within:ring-darkBlue/30";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

const pad = (n) => String(n).padStart(2, "0");
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const todayISO = () => toISO(new Date());
const formatDate = (s) =>
  s
    ? fromISO(s).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })
    : "";

const CalendarMonth = ({ year, month, value, min, rangeFrom, rangeTo, onSelect }) => {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday first
  const total = new Date(year, month + 1, 0).getDate();
  const today = todayISO();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  return (
    <div className="w-full">
      <p className="mb-2 text-center text-sm font-semibold text-darkBlue">
        {monthNames[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-y-0.5 text-center">
        {weekDays.map((d, i) => (
          <span key={i} className="pb-1 text-[10px] font-medium text-darkBlue/50">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          if (!day) return <span key={i} />;
          const iso = `${year}-${pad(month + 1)}-${pad(day)}`;
          const disabled = min && iso < min;
          const selected = iso === value;
          const inRange = rangeFrom && rangeTo && iso > rangeFrom && iso < rangeTo;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                selected
                  ? "bg-darkBlue text-white"
                  : inRange
                    ? "bg-oat text-darkBlue"
                    : iso === today
                      ? "border border-darkBlue text-darkBlue hover:bg-oat"
                      : "text-darkBlue hover:bg-oat"
              } ${disabled ? "cursor-not-allowed opacity-30 hover:bg-transparent" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Date cell: shows the chosen date and opens a compact calendar popover on click.
const FlightDateField = ({ label, value, min, rangeFrom, rangeTo, onChange, align = "left" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const start = fromISO(value || min || todayISO());
  const [view, setView] = useState({ y: start.getFullYear(), m: start.getMonth() });

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const shift = (delta) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const next = new Date(view.y, view.m + 1, 1);

  const handleSelect = (iso) => {
    onChange(iso);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`${fsCellClass} ${open ? "ring-2 ring-darkBlue/30" : ""}`}>
      <button type="button" onClick={() => setOpen(!open)} className="block w-full text-left">
        <span className={fsLabelClass}>
          <FiCalendar size={12} />
          {label}
        </span>
        <span className={`block text-lg font-medium ${value ? "text-darkBlue" : "text-darkBlue/30"}`}>
          {value ? formatDate(value) : "Date"}
        </span>
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-2 w-[min(calc(100vw-2rem),30rem)] rounded-2xl border border-oat bg-white p-4 text-left shadow-2xl ${
            align === "right" ? "left-0 lg:left-auto lg:right-0" : "left-0"
          }`}
        >
          <div className="relative flex gap-6">
            <button
              type="button"
              onClick={() => shift(-1)}
              className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-darkBlue hover:bg-oat"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-darkBlue hover:bg-oat"
            >
              <ChevronRight size={16} />
            </button>

            <CalendarMonth
              year={view.y}
              month={view.m}
              value={value}
              min={min}
              rangeFrom={rangeFrom}
              rangeTo={rangeTo}
              onSelect={handleSelect}
            />
            <div className="hidden w-full sm:block">
              <CalendarMonth
                year={next.getFullYear()}
                month={next.getMonth()}
                value={value}
                min={min}
                rangeFrom={rangeFrom}
                rangeTo={rangeTo}
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SwapButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-[-20px] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-darkBlue shadow transition-all duration-300 hover:rotate-180 lg:flex"
  >
    <FiRepeat className="text-white" size={13} />
  </button>
);

const FlightSearchFields = () => {
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
  };

  return (
    <div
      className="relative z-30 rounded-3xl bg-white p-4 text-left shadow-2xl sm:p-6"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch();
        }
      }}
    >
      {/* Trip type (radio style pills) */}
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
      </div>

      <div className="space-y-3">
        {/* Main search row */}
        <div
          className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${
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
              placeholder="Jakarta"
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
              placeholder="Newyork"
              className={fsInputClass}
            />
          </div>

          <FlightDateField
            label="Depart"
            value={form.departure}
            min={today}
            rangeFrom={isRoundTrip ? form.departure : ""}
            rangeTo={isRoundTrip ? form.returnDate : ""}
            onChange={handleDeparture}
          />

          {isRoundTrip && (
            <FlightDateField
              label="Return"
              value={form.returnDate}
              min={form.departure || today}
              rangeFrom={form.departure}
              rangeTo={form.returnDate}
              onChange={(v) => handleChange("returnDate", v)}
              align="right"
            />
          )}

          <div className={fsCellClass}>
            <p className={fsLabelClass}>
              <FiUsers size={12} />
              Person
            </p>
            <select
              value={form.passengers}
              onChange={(e) => handleChange("passengers", Number(e.target.value))}
              className={fsInputClass}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n > 1 ? "Adults" : "Adult"}
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

          <button
            type="button"
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-2xl bg-darkBlue px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:col-span-2 lg:col-span-1"
          >
            <FiSearch size={20} />
            Search
          </button>
        </div>

        {/* Extra cities (Multi-City) */}
        {tripType === "Multi-City" &&
          form.cities.map((city, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
            >
              <div className={fsCellClass}>
                <p className={fsLabelClass}>From</p>
                <input
                  type="text"
                  value={city.from}
                  onChange={(e) => handleCityChange(index, "from", e.target.value)}
                  placeholder="Jakarta"
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
                  placeholder="Newyork"
                  className={fsInputClass}
                />
              </div>

              <FlightDateField
                label="Depart"
                value={city.departure}
                min={index > 0 ? form.cities[index - 1].departure || today : form.departure || today}
                onChange={(v) => handleCityChange(index, "departure", v)}
                align="right"
              />

              <button
                type="button"
                onClick={() => handleRemoveCity(index)}
                className="flex items-center justify-center rounded-2xl bg-oat px-5 text-darkBlue transition-all duration-300 hover:bg-darkBlue hover:text-white sm:col-span-2 lg:col-span-1"
                title="Remove city"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
      </div>

      {tripType === "Multi-City" && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleAddCity}
            className="flex items-center gap-2 rounded-full bg-oat px-6 py-3 text-sm font-medium text-darkBlue transition-all duration-300 hover:bg-darkBlue hover:text-white"
          >
            <Plus size={17} />
            Add City
          </button>
        </div>
      )}
    </div>
  );
};

const VisaHero = () => {
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
        {/* <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-peach" /> Global Immigration & Entry Desk
        </span> */}

        <h1 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
          Your Visa Journey <span className="italic text-peach">Starts Here</span>
        </h1>

        <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/80">
          Fast, verified visa processing and document support for seamless global entry. Curated for international
          itineraries with zero friction.
        </p>

      </div>

      <div className="relative mx-auto  max-w-[1150px] px-4 sm:mt-16 sm:px-8">
        <FlightSearchFields  />
      </div>
    </section>
  );
};

export default VisaHero;