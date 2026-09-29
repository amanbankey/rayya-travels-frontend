import { useState } from "react";
import { Check, Clock, Heart, Luggage } from "lucide-react";

const badgeStyles = {
  star: "bg-dark text-white",
  gold: "bg-brown text-white",
  muted: "bg-white/90 text-ink",
};

const PackageCard = ({ pkg, viewMode }) => {
  const [saved, setSaved] = useState(false);

  return (
    <article
      className={`overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        viewMode === "list" ? "sm:flex" : ""
      }`}
    >
      <div className={`relative h-52 overflow-hidden bg-mist ${viewMode === "list" ? "sm:h-auto sm:w-64 sm:shrink-0" : ""}`}>
        <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" />
        <span
          className={`absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${badgeStyles[pkg.badge.style]}`}
        >
          {pkg.badge.style === "star" && "★"} {pkg.badge.label}
        </span>
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          aria-label="Save package"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink"
        >
          <Heart size={15} className={saved ? "fill-red-500 text-red-500" : ""} />
        </button>
        <span className="absolute bottom-3 left-3 flex items-center gap-3 rounded-full bg-dark/80 px-3 py-1.5 text-[11px] font-medium text-white">
          <span className="flex items-center gap-1">
            <Clock size={11} /> {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <Luggage size={11} /> {pkg.included}
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-brown">{pkg.location}</p>
        <h3 className="mt-1.5 line-clamp-2 text-lg font-medium leading-snug text-ink">{pkg.title}</h3>

        <ul className="mt-3 flex-1 space-y-2">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[13px] leading-snug text-ink/75">
              <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" /> {feature}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <p className="text-xs text-ink/60">Starting from</p>
            <p className="font-serif text-2xl font-medium text-ink">₹{pkg.price.toLocaleString("en-IN")}</p>
            <p className="text-[11px] text-ink/55">per person on twin sharing</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="rounded-lg bg-oat py-3 text-sm font-medium text-ink transition-colors hover:bg-mist">
            View Details
          </button>
          <button className="rounded-lg bg-dark py-3 text-sm font-medium text-white transition-colors hover:bg-ink">
            Customize Trip
          </button>
        </div>
      </div>
    </article>
  );
};

export default PackageCard;