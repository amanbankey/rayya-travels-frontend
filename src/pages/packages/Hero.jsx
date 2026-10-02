import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { packagesImages, searchCategories } from "../../data/packagesData";
import { submitForm } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiRepeat, FiUsers } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";
import { Plus, Trash2 } from "lucide-react";
import Reveal from "../../components/Reveal";
import { DateField, SelectField, PassengerField, SwapButton, defaultPassengers, todayISO, classOptions, searchLabelClass, searchInputClass, searchCellClass, searchButtonClass } from "../../components/search/SearchFields";

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

const fsLabelClass = searchLabelClass;
const fsInputClass = searchInputClass;
const fsCellClass = searchCellClass;

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
      className="relative z-30 rounded-2xl border border-lightBrown/20 bg-darkBlue50 p-3 text-left shadow-sm sm:p-4"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch();
        }
      }}
    >
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
            className={searchButtonClass}
          >
            Search Flight
            <TbPlaneDeparture size={17} className="text-aviationBrown" />
          </button>
        </div>

        {/* Extra cities (Multi-City) */}
        {tripType === "Multi-City" &&
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
                  onChange={(e) =>
                    handleCityChange(index, "from", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleCityChange(index, "to", e.target.value)
                  }
                  placeholder="City or airport"
                  className={fsInputClass}
                />
              </div>

              <DateField
                label="Departure"
                value={city.departure}
                min={
                  index > 0
                    ? form.cities[index - 1].departure || todayISO()
                    : form.departure || todayISO()
                }
                onChange={(v) => handleCityChange(index, "departure", v)}
                align="right"
                cellClass={fsCellClass}
                labelClass={fsLabelClass}
              />

              <button
                type="button"
                onClick={() => handleRemoveCity(index)}
                className="flex items-center justify-center rounded-xl bg-dustyRose/40 px-4 py-3 text-darkBlue transition-all duration-300 hover:bg-darkBlue hover:text-white sm:col-span-2 lg:col-span-1"
                title="Remove city"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
      </div>

      {tripType === "Multi-City" && (
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
      )}
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