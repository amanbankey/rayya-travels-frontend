import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import FlightSkeleton from "./FlightSkeleton";
import ZeroResult from "./ZeroResult";

const DiagnosticStates = ({ onReset }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="border-t border-line pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Diagnostic Visual States</p>
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="flex items-center gap-2 text-left text-xs font-medium uppercase text-brown transition-colors hover:text-ink"
        >
          Toggle Skeleton & Zero-Result Guidance <SlidersHorizontal size={15} className="shrink-0" />
        </button>
      </div>

      {visible && (
        <div className="mt-6 space-y-6">
          <FlightSkeleton />
          <ZeroResult onReset={onReset} />
        </div>
      )}
    </div>
  );
};

export default DiagnosticStates;