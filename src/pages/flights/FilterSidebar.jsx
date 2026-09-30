import { ListFilter, X } from "lucide-react";
import { airlineOptions, cabinOptions, policyOptions, routingOptions, slotOptions } from "../../data/flightData";

import CheckRow from "./CheckRow";

const labelClass = "text-[11px] font-medium uppercase tracking-[0.2em] text-muted";

const toggleItem = (list, item) => (list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);

const formatDuration = (mins) => `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`;

const Section = ({ title, aside, children }) => (
  <div className="border-t border-line py-5 first:border-t-0 first:pt-4">
    <div className="mb-3 flex items-center justify-between gap-3">
      <h3 className={labelClass}>{title}</h3>
      {aside}
    </div>
    {children}
  </div>
);

const FilterSidebar = ({ filters, open, onChange, onReset, onSubmit, onClose }) => {
  const percent = ((filters.maxMins - 60) / (480 - 60)) * 100;

  return (
    <form
      onSubmit={onSubmit}
      className={`${open ? "block" : "hidden"} rounded-2xl bg-white p-5 shadow-card lg:sticky lg:top-5 lg:block lg:max-h-[calc(100vh-40px)] lg:overflow-y-auto no-scrollbar`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <h2 className="flex items-center gap-2 text-lg font-medium text-ink">
          <ListFilter size={18} className="text-brown" /> Curated Filters
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
          >
            Reset All
          </button>
          <button type="button" onClick={onClose} aria-label="Close filters" className="text-ink lg:hidden">
            <X size={18} />
          </button>
        </div>
      </div>

      <Section title="Cabin Compartment">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-tier p-1.5">
          {cabinOptions.map((cabin) => (
            <button
              type="button"
              key={cabin.key}
              onClick={() => onChange("cabin", cabin.key)}
              className={`rounded-lg px-2 py-3 text-sm font-medium transition-all ${
                filters.cabin === cabin.key ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              {cabin.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Passage Routing">
        <div className="space-y-2">
          {routingOptions.map((option) => (
            <CheckRow
              key={option.value}
              checked={filters.stops.includes(option.value)}
              onToggle={() => onChange("stops", toggleItem(filters.stops, option.value))}
              className="rounded-lg bg-panel px-3 py-3"
            >
              <span className="text-[15px] font-medium text-ink">{option.label}</span>
              <span className="ml-auto rounded bg-tier px-2 py-1 text-xs text-muted">{option.count}</span>
            </CheckRow>
          ))}
        </div>
      </Section>

      <Section title="Departure Slot (BOM)">
        <div className="grid grid-cols-2 gap-2">
          {slotOptions.map((slot) => {
            const Icon = slot.icon;
            const active = filters.slots.includes(slot.key);

            return (
              <button
                type="button"
                key={slot.key}
                onClick={() => onChange("slots", toggleItem(filters.slots, slot.key))}
                className={`rounded-xl p-3 text-left transition-colors ${active ? "bg-darkBlue text-white" : "bg-panel text-ink hover:bg-tier"}`}
              >
                <Icon size={18} className={slot.iconClass} />
                <span className="mt-3 block text-sm font-medium">{slot.label}</span>
                <span className={`block text-[11px] ${active ? "text-white/60" : "text-muted"}`}>{slot.time}</span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Airlines Manifest">
        <div className="space-y-1">
          {airlineOptions.map((airline) => (
            <CheckRow
              key={airline.code}
              checked={filters.airlines.includes(airline.code)}
              onToggle={() => onChange("airlines", toggleItem(filters.airlines, airline.code))}
              className="py-2"
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${airline.avatar}`}>
                {airline.code}
              </span>
              <span className="text-[15px] text-ink">{airline.name}</span>
              <span className="ml-auto text-xs text-muted">{airline.note}</span>
            </CheckRow>
          ))}
        </div>
      </Section>

      <Section
        title="Max Duration"
        aside={<span className="text-sm font-medium text-darkBlue">Up to {formatDuration(filters.maxMins)}</span>}
      >
        <input
          type="range"
          min="60"
          max="480"
          step="15"
          value={filters.maxMins}
          onChange={(event) => onChange("maxMins", Number(event.target.value))}
          className="range-brown"
          style={{ background: `linear-gradient(to right, #7a5832 ${percent}%, #e8e1d4 ${percent}%)` }}
        />
      </Section>

      <Section title="Policy Inclusions">
        <div className="space-y-3">
          {policyOptions.map((policy) => (
            <CheckRow key={policy.key} checked={filters[policy.key]} onToggle={() => onChange(policy.key, !filters[policy.key])}>
              <span className="text-[15px] text-darkBlue">{policy.label}</span>
            </CheckRow>
          ))}
        </div>
      </Section>

      <button
        type="submit"
        className="w-full rounded-lg bg-dark py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white lg:hidden"
      >
        Show Results
      </button>
    </form>
  );
};

export default FilterSidebar;