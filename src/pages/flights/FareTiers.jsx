const tagStyles = {
  accent: "bg-badge text-badgetext",
  muted: "bg-tier text-muted",
};

const FareTiers = ({ tiers, selected, onSelect }) => (
  <div className="bg-tier p-5 sm:p-6">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">Select Cabin Privilege Tier</p>
      <p className="text-sm text-muted">Instant seat allocation and baggage verification</p>
    </div>

    <div className="mt-6 grid gap-5 md:grid-cols-3">
      {tiers.map((tier) => {
        const active = selected === tier.key;

        return (
          <div
            key={tier.key}
            className={`relative flex flex-col rounded-xl border-2 bg-white p-5 transition-colors ${
              active ? "border-brown" : "border-transparent"
            }`}
          >
            {tier.mostSelected && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brown px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                Most Selected
              </span>
            )}

            <div className="flex items-start justify-between gap-2">
              <h4 className="text-lg font-medium text-ink">{tier.name}</h4>
              <span className={`shrink-0 rounded px-2 py-1 text-[10px] font-medium uppercase ${tagStyles[tier.tagStyle]}`}>
                {tier.tag}
              </span>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-muted">{tier.text}</p>

            <ul className="mt-4 flex-1 space-y-2.5">
              {tier.perks.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-ink">
                  <Icon size={15} className="shrink-0" /> {label}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onSelect(tier.key)}
              className={`mt-5 w-full rounded-lg py-3.5 text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                active ? "glow-btn bg-darkBlue text-white" : "bg-tier text-ink hover:bg-line"
              }`}
            >
              {tier.button}
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

export default FareTiers;