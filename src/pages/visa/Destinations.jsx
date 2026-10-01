import { ArrowRight, BadgeCheck, Calendar, FileText } from "lucide-react";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

const destinations = [
  {
    flag: "AE",
    country: "UAE",
    badge: "Instant Verification",
    image: img("photo-1512453979798-5ea266f8880c"),
    region: "United Arab Emirates",
    city: "Dubai",
    category: "Tourist & Express eVisa",
    window: "2–3 Working Days",
    note: "Expedited Processing Tier",
    tag: "eVisa Desk",
  },
  {
    flag: "SG",
    country: "SG",
    badge: "Verified Submission",
    image: img("photo-1525625293386-3f8f99389edd"),
    region: "Southeast Asia",
    city: "Singapore",
    category: "eVisa & Business Entry",
    window: "3–5 Working Days",
    note: "Consular Standard Service",
    tag: "Direct Auth",
  },
  {
    flag: "TH",
    country: "TH",
    badge: "Fast-Track Review",
    image: img("photo-1552465011-b4e21bf6e79a"),
    region: "Kingdom of Thailand",
    city: "Thailand",
    category: "Tourist & VoA Support",
    window: "3–4 Working Days",
    note: "Verified Document Support",
    tag: "Pre-Approval",
  },
  {
    flag: "GB",
    country: "UK",
    badge: "Appointment Concierge",
    image: img("photo-1513635269975-59663e0ac1ad"),
    region: "Great Britain",
    city: "United Kingdom",
    category: "Standard Visitor Visa",
    window: "15 Working Days",
    note: "Complete Appointment Assistance",
    tag: "VFS Desk",
  },
  {
    flag: "US",
    country: "USA",
    badge: "Bespoke Guidance",
    image: img("photo-1496442226666-8d4d0e62e6e9"),
    region: "North America",
    city: "United States",
    category: "B1/B2 Visitor Support",
    window: "Priority Appointment Booking",
    note: "Verified Document Support",
    tag: "DS-160 Curated",
  },
  {
    flag: "FR",
    country: "FR",
    badge: "Full Dossier",
    image: img("photo-1502602898657-3e91760cbb34"),
    region: "Schengen Member State",
    city: "France (Schengen)",
    category: "Short-Stay Schengen",
    window: "10–15 Days",
    note: "Full Dossier Preparation",
    tag: "TLS / VFS Slot",
  },
];

const getBadgeStyle = (index) => (index % 2 === 0 ? "bg-badge text-badgetext" : "bg-darkBlue text-white");

const Destinations = () => (
  <section className="bg-ivory px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
    <div className="mx-auto max-w-[1300px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brown">Curated Global Corridors</p> */}
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Top Visa Destinations</h2>
          <p className="mt-2 max-w-[420px] text-sm text-ink/70">
            Expedited document verification and visa processing for high-frequency global routes.
          </p>
        </div>
        {/* <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-ink/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Consular Fast-Track Active
        </p> */}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {destinations.map((dest, index) => (
          <article
            key={dest.city}
            className="overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-44 overflow-hidden bg-mist">
              <img src={dest.image} alt={dest.city} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent" />
              {/* <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-ink">
                {dest.flag} {dest.country}
              </span> */}
              {/* <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.05em] ${getBadgeStyle(index)}`}>
                {dest.badge}
              </span> */}
              <div className="absolute bottom-3 left-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/70">{dest.region}</p>
                <h3 className="font-serif text-xl font-medium text-white">{dest.city}</h3>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-ink/50">Category</p>
                  <p className="mt-1 text-sm font-medium leading-snug text-ink">{dest.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-darkBlue">Processing Window</p>
                  <p className="mt-1 text-sm font-medium leading-snug text-darkBlue">{dest.window}</p>
                </div>
              </div>

              {/* <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                <p className="flex items-center gap-1.5 text-xs text-ink/70">
                  <BadgeCheck size={14} className="shrink-0 text-emerald-600" /> {dest.note}
                </p>
                <span className="shrink-0 rounded-md bg-oat px-2.5 py-1.5 text-[10px] font-medium text-ink/70">
                  {dest.tag}
                </span>
              </div> */}

              {/* <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-oat py-3 text-sm font-medium text-ink transition-colors hover:bg-mist">
                View Requirements <ArrowRight size={14} />
              </button> */}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Destinations;