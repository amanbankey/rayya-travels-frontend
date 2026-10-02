import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, Inbox, MapPin, Package, Users, Hotel, Plane, Utensils, Check } from "lucide-react";
import Reveal from "../../components/Reveal";

const packages = [
  { id: "PK-3012", name: "Dubai Delight", destination: "Dubai, UAE", duration: "5 Nights / 6 Days", travel: "20 Nov 2026", pax: 2, amount: 96500, paid: 96500, status: "Confirmed", includes: ["Flights", "Hotel", "Meals"] },
  { id: "PK-2987", name: "Singapore Escape", destination: "Singapore", duration: "4 Nights / 5 Days", travel: "08 Dec 2026", pax: 3, amount: 142000, paid: 50000, status: "Processing", includes: ["Hotel", "Meals"] },
  { id: "PK-2741", name: "Kashmir Paradise", destination: "Srinagar, India", duration: "6 Nights / 7 Days", travel: "14 Jun 2026", pax: 4, amount: 118400, paid: 118400, status: "Completed", includes: ["Flights", "Hotel", "Meals"] },
  { id: "PK-2518", name: "Bali Getaway", destination: "Bali, Indonesia", duration: "5 Nights / 6 Days", travel: "02 Apr 2026", pax: 2, amount: 87200, paid: 0, status: "Cancelled", includes: ["Flights", "Hotel"] },
];

const filters = ["All", "Confirmed", "Processing", "Completed", "Cancelled"];
const statusStyle = {
  Confirmed: "bg-ember-50 text-ember-700",
  Processing: "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-600",
};
const headerBg = {
  Confirmed: "from-navy-950 via-navy to-navy-700",
  Processing: "from-navy-900 via-navy-800 to-navy-600",
  Completed: "from-navy-950 via-navy to-navy-700",
  Cancelled: "from-navy-700 via-navy-600 to-navy-500",
};
const includeIcon = { Flights: Plane, Hotel: Hotel, Meals: Utensils };

const AppliedPackages = () => {
  const [filter, setFilter] = useState("All");
  const list = packages.filter((p) => filter === "All" || p.status === filter);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className=" text-2xl font-medium text-navy">Applied Packages</h2>
          <p className="text-sm text-navy-400">Holiday packages you have applied for or booked.</p>
        </div>
        <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-navy-100 bg-white p-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${filter === f ? "bg-navy text-white shadow" : "text-navy-400 hover:text-navy"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center shadow-[0_8px_30px_-14px_rgba(11,22,40,0.18)]">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-50 text-ember-400"><Inbox size={24} /></span>
          <h3 className="mt-4  text-xl font-medium text-navy">No packages found</h3>
          <p className="mt-1 max-w-xs text-sm text-navy-400">Explore our holiday packages and your applications will show up here.</p>
          <Link to="/packages" className="mt-5 rounded-full bg-gradient-to-r from-ember-600 to-ember-400 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-ember-600/25">Explore Packages</Link>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {list.map((p, i) => {
            const pct = Math.round((p.paid / p.amount) * 100);
            const cancelled = p.status === "Cancelled";
            return (
              <Reveal key={p.id} delay={i * 60}>
                <article className="group h-full overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[0_8px_30px_-14px_rgba(11,22,40,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(11,22,40,0.35)]">
                  <div className={`relative overflow-hidden bg-gradient-to-br ${headerBg[p.status]} px-6 py-5 text-white`}>
                    <span className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-ember-500/40 blur-2xl" />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ember-600 to-ember-400 shadow-lg shadow-ember-900/30"><Package size={20} /></span>
                        <div>
                          <h3 className=" text-xl font-medium">{p.name}</h3>
                          <p className="flex items-center gap-1 text-xs text-navy-200"><MapPin size={12} /> {p.destination}</p>
                        </div>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[p.status]}`}>{p.status}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="flex items-center gap-1 text-xs text-navy-400"><Clock size={12} /> Duration</p>
                        <p className="mt-0.5 text-[13px] font-medium text-navy">{p.duration}</p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1 text-xs text-navy-400"><CalendarDays size={12} /> Travel date</p>
                        <p className="mt-0.5 text-[13px] font-medium text-navy">{p.travel}</p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1 text-xs text-navy-400"><Users size={12} /> Travellers</p>
                        <p className="mt-0.5 text-[13px] font-medium text-navy">{p.pax} Person{p.pax > 1 && "s"}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.includes.map((inc) => {
                        const Icon = includeIcon[inc] || Check;
                        return (
                          <span key={inc} className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[11px] font-medium text-navy-600">
                            <Icon size={12} className="text-ember-500" /> {inc}
                          </span>
                        );
                      })}
                    </div>

                    {!cancelled && (
                      <div className="mt-5">
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="text-navy-400">Payment</span>
                          <span className="font-semibold text-navy">₹{p.paid.toLocaleString("en-IN")} <span className="font-normal text-navy-400">of ₹{p.amount.toLocaleString("en-IN")}</span></span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-navy-50">
                          <div className="h-full rounded-full bg-gradient-to-r from-ember-400 to-ember-600 transition-all duration-700" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-dashed border-navy-100 pt-4">
                      <div>
                        <p className="text-xs text-navy-400">Application {p.id}</p>
                        <p className={` text-2xl font-medium ${cancelled ? "text-navy-300 line-through" : "text-navy"}`}>₹{p.amount.toLocaleString("en-IN")}</p>
                      </div>
                      {!cancelled && (
                        <button className="rounded-full bg-gradient-to-r from-ember-600 to-ember-400 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-ember-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppliedPackages;