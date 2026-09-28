import { ChevronDown, ListFilter } from "lucide-react";
import { sortOptions } from "../../data/flightData";

const ResultsHeader = ({ passageCount, sortBy, onSortChange, onOpenFilters }) => (
  <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-card sm:p-6 xl:flex-row xl:items-center xl:justify-between">
    <div>
      <h1 className="font-serif text-2xl font-medium text-ink sm:text-[28px]">Mumbai (BOM) to Dubai (DXB)</h1>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <span className="rounded bg-badge px-2.5 py-1 text-xs font-medium uppercase text-badgetext">
          {passageCount} Passages Available
        </span>
        <span className="flex items-center gap-1.5 text-sm text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brown" /> Live Verified Inventory
        </span>
      </div>
    </div>

    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {sortOptions.map((option) => {
          const Icon = option.icon;
          const active = sortBy === option.key;

          return (
            <button
              key={option.key}
              onClick={() => onSortChange(option.key)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-[13px] font-medium uppercase tracking-wide transition-colors ${
                active ? "bg-dark text-white" : "bg-tier text-muted hover:text-ink"
              }`}
            >
              <Icon size={15} /> {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <label className="flex flex-1 items-center gap-2 rounded-lg bg-tier px-4 py-2.5 text-sm md:flex-none">
          <span className="text-muted">Sort:</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full appearance-none bg-transparent pr-5 font-medium text-ink outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none -ml-6 shrink-0 text-ink" />
        </label>

        <button
          onClick={onOpenFilters}
          className="flex items-center gap-2 rounded-lg bg-dark px-4 py-2.5 text-[13px] font-medium uppercase tracking-wide text-white lg:hidden"
        >
          <ListFilter size={15} /> Filters
        </button>
      </div>
    </div>
  </div>
);

export default ResultsHeader;