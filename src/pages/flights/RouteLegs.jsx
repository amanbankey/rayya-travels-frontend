const RouteLegs = ({ legs }) => (
  <div className="bg-tier p-5 sm:p-6">
    <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">Route Legs</p>
    <ol className="mt-4 space-y-3">
      {legs.map((leg) => (
        <li key={leg.title} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-3">
          <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
            <span className="h-2 w-2 rounded-full bg-brown" /> {leg.title}
          </span>
          <span className="text-sm text-muted">{leg.detail}</span>
        </li>
      ))}
    </ol>
  </div>
);

export default RouteLegs;