const FlightSkeleton = () => (
  <div className="animate-pulse rounded-2xl bg-white p-6 shadow-card">
    <div className="flex items-center gap-3 border-b border-line pb-4">
      <div className="h-11 w-11 rounded-full bg-tier" />
      <div className="space-y-2">
        <div className="h-4 w-40 rounded bg-tier" />
        <div className="h-3 w-56 rounded bg-tier" />
      </div>
    </div>
    <div className="flex items-center justify-between py-6">
      <div className="h-10 w-24 rounded bg-tier" />
      <div className="h-1 w-1/3 rounded bg-tier" />
      <div className="h-10 w-24 rounded bg-tier" />
    </div>
    <div className="h-4 w-2/3 rounded bg-tier" />
  </div>
);

export default FlightSkeleton;