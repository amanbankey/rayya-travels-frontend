const FlightSpecs = ({ flight }) => {
  const specs = [
    { label: "Aircraft", value: flight.aircraft },
    { label: "Cabin Baggage", value: `${flight.cabinKg} kg` },
    { label: "Checked Baggage", value: `${flight.checkedKg} kg` },
    { label: "Route", value: `${flight.from.code} → ${flight.to.code}` },
  ];

  return (
    <dl className="grid gap-4 bg-tier p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
      {specs.map((spec) => (
        <div key={spec.label} className="rounded-lg bg-white px-4 py-3">
          <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">{spec.label}</dt>
          <dd className="mt-1 text-sm font-medium text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default FlightSpecs;