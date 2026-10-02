import { SearchX } from "lucide-react";

const ZeroResult = ({ onReset }) => (
  <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-card">
    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tier text-brown">
      <SearchX size={24} />
    </span>
    <h3 className="mt-5  text-2xl font-medium text-ink">No passages match your filters</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
      Try widening the departure slot, adding more airlines, or extending the maximum duration to see more passages.
    </p>
    <button
      type="button"
      onClick={onReset}
      className="mt-6 rounded-lg bg-dark px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-ink"
    >
      Reset All Filters
    </button>
  </div>
);

export default ZeroResult;