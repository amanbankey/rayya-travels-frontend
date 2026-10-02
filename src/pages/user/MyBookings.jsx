import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Inbox, Plane, Users } from "lucide-react";
import Reveal from "../../components/Reveal";

const bookings = [
  { id: "BK-20841", pnr: "X7QK2L", airline: "IndiGo", code: "6E", from: { city: "Bhopal", code: "BHO", time: "06:10" }, to: { city: "Dubai", code: "DXB", time: "09:05" }, date: "12 Oct 2026", duration: "3h 55m", pax: 2, amount: 48200, status: "Upcoming" },
  { id: "BK-20517", pnr: "M3ZP9D", airline: "Air India", code: "AI", from: { city: "Delhi", code: "DEL", time: "14:30" }, to: { city: "London", code: "LHR", time: "19:15" }, date: "02 Sep 2026", duration: "9h 15m", pax: 1, amount: 61350, status: "Completed" },
  { id: "BK-19980", pnr: "T5NB1R", airline: "Vistara", code: "UK", from: { city: "Mumbai", code: "BOM", time: "22:45" }, to: { city: "Singapore", code: "SIN", time: "06:50" }, date: "18 Jul 2026", duration: "5h 35m", pax: 3, amount: 74900, status: "Completed" },
  { id: "BK-19402", pnr: "H8WC4A", airline: "Akasa Air", code: "QP", from: { city: "Bhopal", code: "BHO", time: "11:20" }, to: { city: "Bengaluru", code: "BLR", time: "13:35" }, date: "05 Jun 2026", duration: "2h 15m", pax: 1, amount: 6480, status: "Cancelled" },
];

const filters = ["All", "Upcoming", "Completed", "Cancelled"];
const statusStyle = {
  Upcoming: "bg-ember-50 text-ember-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-600",
};
const accent = { Upcoming: "from-ember-400 to-ember-600", Completed: "from-emerald-400 to-emerald-600", Cancelled: "from-red-300 to-red-500" };

const MyBookings = () => {
  const [filter, setFilter] = useState("All");
  const list = bookings.filter((b) => filter === "All" || b.status === filter);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className=" text-2xl font-medium text-navy">My Bookings</h2>
          <p className="text-sm text-navy-400">All your flight tickets in one place.</p>
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
          <h3 className="mt-4  text-xl font-medium text-navy">No bookings found</h3>
          <p className="mt-1 max-w-xs text-sm text-navy-400">Book your next journey and it will show up here.</p>
          <Link to="/flights" className="mt-5 rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-navy-800">Search Flights</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((b, i) => (
            <Reveal key={b.id} delay={i * 60}>
              <article className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-14px_rgba(11,22,40,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(11,22,40,0.30)]">
                <span className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${accent[b.status]}`} />
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-navy-100 px-6 py-4 sm:px-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ember-50  text-sm font-semibold text-ember-700">{b.code}</span>
                    <div>
                      <p className="font-medium text-navy">{b.airline}</p>
                      <p className="text-xs text-navy-400">Booking {b.id} • PNR <span className="font-semibold text-ember-600">{b.pnr}</span></p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[b.status]}`}>{b.status}</span>
                </div>

                <div className="grid items-center gap-5 px-6 py-5 sm:px-7 md:grid-cols-[1fr_auto]">
                  <div className="flex items-center gap-4 sm:gap-8">
                    <div>
                      <p className=" text-3xl font-medium text-navy">{b.from.time}</p>
                      <p className="mt-1 text-base font-semibold text-ember-600">{b.from.code}</p>
                      <p className="text-xs text-navy-400">{b.from.city}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center">
                      <p className="text-xs text-navy-400">{b.duration}</p>
                      <div className="my-1.5 flex w-full items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
                        <span className="h-px flex-1 border-t border-dashed border-ember-300/70" />
                        <Plane size={16} className="mx-2 rotate-90 text-ember-600 transition-transform duration-500 group-hover:translate-x-1" />
                        <span className="h-px flex-1 border-t border-dashed border-ember-300/70" />
                        <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
                      </div>
                      <p className="text-xs text-navy-400">{b.date}</p>
                    </div>
                    <div className="text-right">
                      <p className=" text-3xl font-medium text-navy">{b.to.time}</p>
                      <p className="mt-1 text-base font-semibold text-ember-600">{b.to.code}</p>
                      <p className="text-xs text-navy-400">{b.to.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 border-t border-dashed border-navy-100 pt-4 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <div className="md:text-right">
                      <p className="flex items-center gap-1 text-xs text-navy-400 md:justify-end"><Users size={12} /> {b.pax} Traveller{b.pax > 1 && "s"}</p>
                      <p className=" text-2xl font-medium text-navy">₹{b.amount.toLocaleString("en-IN")}</p>
                    </div>
                    {b.status !== "Cancelled" && (
                      <button className="flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-ember-600">
                        <Download size={13} /> E-Ticket
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;