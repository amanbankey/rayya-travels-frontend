import { destinationFilters, durationFilters, hotelStandardFilters, inclusionFilters } from "../../data/packagesData";
import CheckRow from "../flights/CheckRow";

const labelClass = "text-[11px] font-medium uppercase tracking-[0.15em] text-ink/60";

const toggleItem = (list, item) => (list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

const PackageFilters = ({ filters, onChange, onApply, resultCount }) => {
  const percent = ((filters.budgetMax - 10000) / (250000 - 10000)) * 100;

  return (
    <aside className="rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-5 lg:max-h-[calc(100vh-40px)] lg:overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <h3 className="text-lg font-medium text-ink">Filters</h3>
        <button
          type="button"
          onClick={() => onChange("reset")}
          className="text-[11px] font-medium uppercase tracking-[0.1em] text-brown hover:text-ink"
        >
          Reset All
        </button>
      </div>

      <div className="border-b border-line py-5">
        <p className={labelClass}>Destinations</p>
        <div className="mt-3 space-y-2.5">
          {destinationFilters.map((dest) => (
            <CheckRow
              key={dest.key}
              checked={filters.destinations.includes(dest.key)}
              onToggle={() => onChange("destinations", toggleItem(filters.destinations, dest.key))}
            >
              <span className="text-sm text-ink">{dest.label}</span>
              <span className="ml-auto text-xs text-ink/50">{dest.count}</span>
            </CheckRow>
          ))}
        </div>
      </div>

      <div className="border-b border-line py-5">
        <p className={labelClass}>Duration</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {durationFilters.map((option) => {
            const active = filters.duration.includes(option.key);
            return (
              <button
                type="button"
                key={option.key}
                onClick={() => onChange("duration", toggleItem(filters.duration, option.key))}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-dark text-white" : "bg-oat text-ink/75 hover:bg-mist"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-b border-line py-5">
        <div className="flex items-center justify-between">
          <p className={labelClass}>Budget Per Person</p>
          <span className="text-sm font-medium text-brown">Up to {formatPrice(filters.budgetMax)}</span>
        </div>
        <input
          type="range"
          min="10000"
          max="250000"
          step="5000"
          value={filters.budgetMax}
          onChange={(event) => onChange("budgetMax", Number(event.target.value))}
          className="range-brown mt-3"
          style={{ background: `linear-gradient(to right, #7a5832 ${percent}%, #e8e1d4 ${percent}%)` }}
        />
        <div className="mt-1 flex justify-between text-xs text-ink/50">
          <span>₹10,000</span>
          <span>₹2,50,000+</span>
        </div>
      </div>

      <div className="border-b border-line py-5">
        <p className={labelClass}>Hotel Standard</p>
        <div className="mt-3 space-y-2.5">
          {hotelStandardFilters.map((option) => (
            <CheckRow
              key={option.key}
              checked={filters.hotelStandard.includes(option.key)}
              onToggle={() => onChange("hotelStandard", toggleItem(filters.hotelStandard, option.key))}
            >
              <span className="text-sm text-ink">{option.label}</span>
            </CheckRow>
          ))}
        </div>
      </div>

      <div className="py-5">
        <p className={labelClass}>Key Inclusions</p>
        <div className="mt-3 space-y-2.5">
          {inclusionFilters.map((option) => (
            <CheckRow
              key={option.key}
              checked={filters.inclusions.includes(option.key)}
              onToggle={() => onChange("inclusions", toggleItem(filters.inclusions, option.key))}
            >
              <span className="text-sm text-ink">{option.label}</span>
            </CheckRow>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onApply}
        className="w-full rounded-lg bg-dark py-3.5 text-sm font-medium text-white transition-colors hover:bg-ink"
      >
        Apply Filters ({resultCount})
      </button>
    </aside>
  );
};

export default PackageFilters;