

import { useState } from "react";
import { X } from "lucide-react";
import { dates, defaultFilters, flights } from "../data/flightData";
import { submitForm } from "../services/api";
import ResultsHeader from "./flights/ResultsHeader";
import FilterSidebar from "./flights/FilterSidebar";
import FlightCard from "./flights/FlightCard";
import ZeroResult from "./flights/ZeroResult";
import DiagnosticStates from "./flights/DiagnosticStates";
import FlightHero from "./flights/Hero"

const getSlot = (hour) => {
  if (hour < 6) return "dawn";
  if (hour < 12) return "morning";
  if (hour < 18) return "noon";
  return "evening";
};

const matchesFilters = (flight, filters) =>
  flight.cabins.includes(filters.cabin) &&
  filters.stops.includes(Math.min(flight.stops, 2)) &&
  filters.slots.includes(getSlot(flight.departHour)) &&
  filters.airlines.includes(flight.code) &&
  flight.durationMins <= filters.maxMins &&
  (!filters.cabinBag || flight.cabinBag) &&
  (!filters.checkedBag || flight.checkedBag) &&
  (!filters.flexible || flight.flexible);

const sortFlights = (list, sortBy) => {
  if (sortBy === "fastest") return [...list].sort((a, b) => a.durationMins - b.durationMins);
  if (sortBy === "direct") return [...list].sort((a, b) => a.stops - b.stops);
  if (sortBy === "value") return [...list].sort((a, b) => a.price - b.price);
  return list;
};

const Flights = () => {
  const [selectedDate, setSelectedDate] = useState("18");
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState(defaultFilters);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [notice, setNotice] = useState(null);
  const [showData, setShowData] = useState(false)

  const selectedLabel = dates.find((date) => date.id === selectedDate).label;
  const filteredFlights = isFiltered ? flights.filter((flight) => matchesFilters(flight, filters)) : flights;
  const visibleFlights = sortFlights(filteredFlights, sortBy);
  const passageCount = isFiltered ? visibleFlights.length : 128;

  const updateFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setIsFiltered(true);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setIsFiltered(false);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setFiltersOpen(false);

    try {
      await submitForm("/flights/search", { date: selectedLabel, sortBy, ...filters });
      setNotice({ type: "success", text: "Your curated filters have been applied." });
    } catch (error) {
      setNotice({ type: "error", text: "Unable to reach the server. Please try again." });
    }
  };

  const handleSelectPassage = async (event, flight, tier) => {
    event.preventDefault();

    try {
      await submitForm("/flights/select", {
        date: selectedLabel,
        airline: flight.airline,
        flightNo: flight.flightNo,
        tier,
      });
      setNotice({ type: "success", text: `${flight.airline} ${flight.flightNo} has been selected.` });
    } catch (error) {
      setNotice({ type: "error", text: "Unable to select this passage. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-lightGray">
       <FlightHero setShowData={setShowData} showData={showData}/>
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 lg:px-12 ">
       

       

        {notice && (
          <div
            className={`mt-4 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
              notice.type === "success" ? "bg-badge text-badgetext" : "bg-red-50 text-red-700"
            }`}
          >
            <span>{notice.text}</span>
            <button onClick={() => setNotice(null)} aria-label="Close message">
              <X size={16} />
            </button>
          </div>
        )}

        {showData && (<div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start xl:grid-cols-[360px_minmax(0,1fr)]">
          <FilterSidebar
            filters={filters}
            open={filtersOpen}
            onChange={updateFilter}
            onReset={resetFilters}
            onSubmit={handleSearch}
            onClose={() => setFiltersOpen(false)}
          />

          <section className="min-w-0 space-y-6">
            {visibleFlights.length === 0 ? (
              <ZeroResult onReset={resetFilters} />
            ) : (
              visibleFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} onSelect={handleSelectPassage} />
              ))
            )}
            <DiagnosticStates onReset={resetFilters} />
          </section>
        </div> )}

         <ResultsHeader
          passageCount={passageCount}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenFilters={() => setFiltersOpen(true)}
        />
      </div>
    </div>
  );
};

export default Flights;