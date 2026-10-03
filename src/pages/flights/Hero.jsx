import { useState } from "react";
import { FiCalendar, FiRepeat, FiUsers } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";
import { Plus, Trash2 } from "lucide-react";
import { heroImage } from "../../data/homeData";
import { DateField, SelectField, PassengerField, SwapButton, defaultPassengers, todayISO, classOptions, searchLabelClass, searchInputClass, searchCellClass, searchButtonClass } from "../../components/search/SearchFields";

const tripTypes = ["One way", "Round-trip", "Multi-City"];
const classTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const labelClass = searchLabelClass;
const inputClass = searchInputClass;
const cellClass = searchCellClass;
const valueClass = "text-sm";

const Hero = ({ onSearch, setShowData, showData}) => {
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

  const handleDeparture = (value) => {
    setForm((prev) => ({
      ...prev,
      departure: value,
      returnDate:
        prev.returnDate && prev.returnDate < value ? "" : prev.returnDate,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ tripType, ...form });
  };

//   const showData = (e) => {
//     set
//   }

  return (
    <div className="relative w-full bg-darkBlue">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent_15%,black_90%)]"
        />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-14 lg:px-12 lg:pb-16 lg:pt-16">
        <h1 className="mx-auto max-w-xl text-center  text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          Discover your flight under  {" "} 
          <span className="inline italic text-brown">
            60 {" "}
          </span>seconds{" "}
        </h1>

        <div className="relative mx-auto mt-8 max-w-[1100px] lg:mt-10">
          <form
            onSubmit={handleSubmit}
            className="relative z-30 rounded-2xl border border-lightBrown/20 bg-darkBlue50 p-3 shadow-sm sm:p-4"
          >
            <div className="flex flex-col gap-3 border-b border-lightBrown/20 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {tripTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTripType(type)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
                      tripType === type
                        ? "glow-btn bg-darkBlue text-white shadow-md shadow-darkBlue/20"
                        : "text-darkBlue/60 hover:bg-lightBrown/10 hover:text-darkBlue"
                    }`}
                  >
                    {type === "One way" ? <TbPlaneDeparture size={16} /> : null}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {/* Main search row */}
              <div
                className={`grid grid-cols-1 gap-2 sm:grid-cols-2 ${
                  isRoundTrip
                    ? "lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto]"
                    : "lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]"
                }`}
              >
                <div className={cellClass}>
                  <p className={labelClass}>From</p>
                  <input
                    type="text"
                    value={form.from}
                    onChange={(e) => handleChange("from", e.target.value)}
                    placeholder="City or airport"
                    className={inputClass}
                  />
                  <SwapButton onClick={handleSwap} />
                </div>

                <div className={cellClass}>
                  <p className={labelClass}>To</p>
                  <input
                    type="text"
                    value={form.to}
                    onChange={(e) => handleChange("to", e.target.value)}
                    placeholder="City or airport"
                    className={inputClass}
                  />
                </div>

                <DateField
                  label="Departure"
                  months={isRoundTrip ? 2 : 1}
                  value={form.departure}
                  min={todayISO()}
                  rangeFrom={isRoundTrip ? form.departure : ""}
                  rangeTo={isRoundTrip ? form.returnDate : ""}
                  onChange={handleDeparture}
                  cellClass={cellClass}
                  labelClass={labelClass}
                  valueClass={valueClass}
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
                    cellClass={cellClass}
                    labelClass={labelClass}
                    valueClass={valueClass}
                  />
                )}

                <PassengerField
                  label="Passengers No."
                  icon={FiUsers}
                  value={form.passengers}
                  onChange={(v) => handleChange("passengers", v)}
                  cellClass={cellClass}
                  labelClass={labelClass}
                  valueClass={valueClass}
                />

                <SelectField
                  label="Class Type"
                  value={form.classType}
                  options={classOptions}
                  onChange={(v) => handleChange("classType", v)}
                  align="right"
                  cellClass={cellClass}
                  labelClass={labelClass}
                  valueClass={valueClass}
                />

                <button
                  onClick={() => setShowData(true)}
                  type="submit"
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
                    <div className={cellClass}>
                      <p className={labelClass}>From</p>
                      <input
                        type="text"
                        value={city.from}
                        onChange={(e) =>
                          handleCityChange(index, "from", e.target.value)
                        }
                        placeholder="City or airport"
                        className={inputClass}
                      />
                      <SwapButton onClick={() => handleCitySwap(index)} />
                    </div>

                    <div className={cellClass}>
                      <p className={labelClass}>To</p>
                      <input
                        type="text"
                        value={city.to}
                        onChange={(e) =>
                          handleCityChange(index, "to", e.target.value)
                        }
                        placeholder="City or airport"
                        className={inputClass}
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
                      onChange={(v) =>
                        handleCityChange(index, "departure", v)
                      }
                      align="right"
                      cellClass={cellClass}
                      labelClass={labelClass}
                      valueClass={valueClass}
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
          </form>
        </div>
      </section>



    </div>
  );
};

export default Hero;
