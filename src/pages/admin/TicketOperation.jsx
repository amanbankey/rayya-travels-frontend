import { MdOutlineConfirmationNumber as PageIcon } from "react-icons/md";

import React,{ useState } from "react";
import {
  X,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Grid3x3,
  Plus,
  Download,
  Filter,
  Eye,
  Pencil,
  FileText,
  Image as ImageIcon,
  CreditCard,
  Ticket,
  BedDouble,
  Save,
  Edit2,
  Plane,
  Wallet,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";



import { StatusBadge } from "../../components/admin/StatusBadge";
//const ticketTabs = ["Applied Tickets", "Series Tickets", "Cancel / Withdraw", "Offline Inventory"];
 
const tickets = [
  { initials: "RT", name: "Rayya Travels", sub: "B2B Agent • ID: AG-8842", route: "DXB ⇄ LHR", ref: "RYA1147739", airline: "EK-007", fare: "AED 2,450", extra: "Paid via Wallet", status: "Ticketed" },
  { initials: "JD", name: "John Doe", sub: "Retail • PAX: 2", route: "JFK ⇄ CDG", ref: "JFX992811", airline: "AF-023", fare: "$1,120", extra: "Auth Pending", status: "Processing", action: "Review" },
  { initials: "GT", name: "Global Tours", sub: "B2B Agent • ID: AG-1102", route: "SIN ⇄ SYD", ref: "SXD441029", airline: "SQ-221", fare: "SGD 3,890", extra: "Payment Failed", status: "Action Req.", action: "Resolve" },
  { initials: "AS", name: "Alice Smith", sub: "Retail • PAX: 1", route: "LHR ⇄ JFK", ref: "LJK882910", airline: "BA-112", fare: "GBP 850", extra: "Paid via CC", status: "Ticketed" },
  { initials: "RJ", name: "Rajesh Kumar", sub: "Retail • PAX: 3", route: "DEL ⇄ BOM", ref: "DBM449102", airline: "6E-455", fare: "INR 15,200", extra: "Paid via UPI", status: "Ticketed" },
];

const StatCard = ({ label, value, valueClass = "text-navy-900", dark = false }) => (
  <div
    className={`rounded-3xl p-5 border ${
      dark ? "bg-navy-900 border-transparent" : "bg-white border-navy-100"
    }`}
  >
    <p className={`text-[11px] font-semibold tracking-[0.18em] mb-2 ${dark ? "text-navy-300" : "text-navy-500"}`}>
      {label}
    </p>
    <p className={`text-3xl font-extrabold leading-none ${dark ? "text-white" : valueClass}`}>{value}</p>
  </div>
);

const Breadcrumb = ({ items, badge }) => (
  <div className="flex items-center gap-2 text-sm">
    {items.map((item, idx) => (
      <React.Fragment key={item}>
        {idx > 0 && <ChevronRight size={13} className="text-navy-300" />}
        <span className={idx === items.length - 1 ? "text-navy-900 font-semibold" : "text-navy-400"}>{item}</span>
      </React.Fragment>
    ))}
    {badge && (
      <span className="ml-2 bg-navy-50 text-navy-500 text-xs font-semibold px-2 py-0.5 rounded-full">{badge}</span>
    )}
  </div>
);
export const TicketOperationsPage = () => {
  const [activeTab, setActiveTab] = useState("Applied Tickets");
  const [selected, setSelected] = useState([]);
 
  const toggleSelect = (ref) => {
    setSelected((prev) => (prev.includes(ref) ? prev.filter((r) => r !== ref) : [...prev, ref]));
  };
 
  return (
    <div className="overflow-y-auto w-full bg-[#EEF3F7]">
      {/*<div className="flex items-center justify-between px-6 py-4 bg-white border-b border-navy-100">
        <div className="flex items-center gap-2 border border-navy-100 rounded-xl px-3 py-2 w-64">
          <Search size={14} className="text-navy-400" />
          <input placeholder="Search PNR, Ticket..." className="text-sm outline-none flex-1" />
        </div>
        <Breadcrumb items={["Operations", "Ticket Management", "Operations Hub"]} />
      </div>*/}
 
      <div className="px-4 sm:px-6 py-6">
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-2xl bg-ember-500 text-white flex items-center justify-center flex-shrink-0">
              <PageIcon size={24} />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold text-navy-900 leading-tight">Ticket Operations</h1>
              <p className="text-navy-400 mt-0.5">Real-time inventory and fulfillment command center.</p>
            </div>
          </div>
          {/*<button className="flex items-center gap-2 bg-ember-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
            <Plus size={15} /> Issue Offline Ticket
          </button>*/}
        </div>
 
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-5">
          <StatCard label="TOTAL TICKETS" value="138" />
          <StatCard label="PROCESSING" value="14" valueClass="text-ember-600" />
          <StatCard label="PENDING ACTION" value="9" valueClass="text-red-500" />
          <StatCard label="CANCELLATION Q" value="3" />
          <StatCard label="OFFLINE SEATS" value="3" />
        </div>
 
        {/*<div className="flex items-center justify-between border-b border-navy-100 mb-4">
          <div className="flex items-center gap-1">
            {ticketTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab ? "border-ember-500 text-ember-600" : "border-transparent text-navy-500 hover:text-navy-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-navy-400 pb-2">
            <button className="hover:text-navy-600">
              <Filter size={16} />
            </button>
            <button className="hover:text-navy-600">
              <Download size={16} />
            </button>
          </div>
        </div>*/}
 
        {activeTab === "Applied Tickets" ? (
          <div className="bg-white border border-navy-100 rounded-3xl overflow-hidden overflow-x-auto">
            <table className="sm:w-full w-[1000px] text-sm">
              <thead className="bg-navy-900">
                <tr className="text-left text-[11px] font-bold tracking-widest text-white">
                  <th className="px-6 py-4 w-10">
                    <input type="checkbox" className="rounded border-navy-100 accent-ember-500" />
                  </th>
                  <th className="px-6 py-4">PASSENGER / AGENT</th>
                  <th className="px-6 py-4">ROUTE &amp; BOOKING</th>
                  <th className="px-6 py-4">FARE</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4">ACTION</th>
                </tr>
              </thead>
              <tbody >
                {tickets.map((t) => (
                  <tr key={t.ref} className="border-t border-navy-50 hover:bg-[#f7f9fb] transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(t.ref)}
                        onChange={() => toggleSelect(t.ref)}
                        className="rounded border-navy-100 accent-ember-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 hidden rounded-xl bg-navy-900 text-ember-300 sm:flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {t.initials}
                        </div>
                        <div>
                          <p className="font-bold text-navy-900 text-sm leading-tight">{t.name}</p>
                          <p className="text-xs text-navy-400 mt-0.5">{t.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="flex items-center gap-2 text-navy-900 font-semibold">
                        {t.route.split("⇄")[0].trim()} <Plane size={13} className="text-ember-500 rotate-90" /> {t.route.split("⇄")[1].trim()}
                      </p>
                      <p className="text-xs font-semibold text-ember-600 mt-0.5">
                        {t.ref} <span className="text-navy-400 font-normal ml-1">{t.airline}</span>
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-navy-900">{t.fare}</p>
                      <p className="text-xs text-navy-400">{t.extra}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-6 py-4">
                      {t.action ? (
                        <button
                          className={`text-xs font-bold px-4 py-1.5 rounded-full transition-colors ${
                            t.action === "Review"
                              ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          {t.action}
                        </button>
                      ) : (
                        <span className="text-navy-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white border border-navy-100 rounded-3xl p-10 text-center text-sm text-navy-400">
            No data yet for {activeTab}.
          </div>
        )}
      </div>
    </div>
  );
};