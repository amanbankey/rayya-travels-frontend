import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiSearch, FiCalendar, FiBell, FiMenu, FiUsers, FiTrendingUp,
  FiCreditCard, FiUserPlus, FiLogOut, FiPackage, FiUser, FiMapPin,
} from "react-icons/fi";
import { MdOutlineConfirmationNumber, MdSupportAgent } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import api from "../../api/axios";
import Sidebar from "../../components/admin/Sidebar";
import AgentDirectory from "./AgentDirectory";
import GlobalVisaCatalog from "./GlobalVisaCatalog";
import CustomerList from "./CustomerList";
import AirportDirectory from "./AirportDirectory";
import CountriesDirectory from "./GlobalCountries";
import AirlineDirectory from "./Airline";
import SupportHelpdeskQueue from "./Support";
import PlatformIntegrationSettings from "./PlatformIntegrationSettings";
import { TransactionHistoryPage } from "./TransactionHistory";
import { TicketOperationsPage } from "./TicketOperation";
import AppliedVisas from "./AppliedVisas";

// Sample data (no backend API yet for tickets / wallet / daily chart)
const ticketStats = [
  { value: 142, label: "ISSUED / CONFIRMED", box: "bg-emerald-50", text: "text-emerald-700", bar: "bg-emerald-500", w: "75%" },
  { value: 28, label: "IN REVIEW", box: "bg-ember-50", text: "text-ember-600", bar: "bg-ember-500", w: "35%" },
  { value: 18, label: "SERIES PNR", box: "bg-navy-50", text: "text-navy-700", bar: "bg-navy-600", w: "25%" },
  { value: 12, label: "CANCELLATION", box: "bg-red-50", text: "text-red-600", bar: "bg-red-500", w: "18%" },
  { value: 4, label: "OFFLINE", box: "bg-orange-50", text: "text-ember-700", bar: "bg-ember-600", w: "8%" },
];

const chartData = [
  { day: "Mon", visa: 20, tickets: 10 }, { day: "Tue", visa: 28, tickets: 12 },
  { day: "Wed", visa: 40, tickets: 14 }, { day: "Thu", visa: 30, tickets: 20 },
  { day: "Fri", visa: 55, tickets: 24 }, { day: "Sat", visa: 62, tickets: 30 },
  { day: "Sun", visa: 75, tickets: 34 },
];

// Applied Packages page (sample data until a packages API exists)
const pkgSeed = [
  { id: "PKG-1001", customer: "Rahul Mehta", pkg: "Dubai Delight 5N/6D", date: "2026-11-12", pax: 4, amount: 148000, status: "Pending" },
  { id: "PKG-1002", customer: "Priya Nair", pkg: "Bali Honeymoon 6N/7D", date: "2026-12-03", pax: 2, amount: 112000, status: "Confirmed" },
  { id: "PKG-1003", customer: "John Doe", pkg: "Singapore Family 4N/5D", date: "2026-10-28", pax: 5, amount: 187500, status: "In Process" },
];
const pkgTone = { Pending: "bg-yellow-50 text-yellow-700", "In Process": "bg-navy-50 text-navy-700", Confirmed: "bg-emerald-50 text-emerald-700", Cancelled: "bg-red-50 text-red-600" };

const AppliedPackages = () => {
  const [rows, setRows] = useState(pkgSeed);
  const setStatus = (id, status) => setRows((p) => p.map((r) => (r.id === id ? { ...r, status } : r)));
  return (
    <div className="p-4 sm:p-6 lg:pl-2">
      {/*<p className="text-sm text-navy-400 mb-3">Operations / <span className="text-ember-600 font-semibold">Applied Packages</span></p>
     */} <div className="flex items-center gap-4 mb-6">
        <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ember-400 to-ember-600 text-white flex items-center justify-center shadow-lg shadow-ember-500/30"><FiPackage size={24} /></span>
        <div><h1 className="text-3xl font-extrabold text-navy-900 leading-tight">Applied Packages</h1><p className="text-navy-400">Review and manage tour package bookings.</p></div>
      </div>
      <div className="bg-white rounded-3xl border border-navy-100 shadow-card overflow-hidden">
        <div className="flex items-center justify-between bg-gradient-to-r from-navy-900 to-navy-800 px-6 py-5">
          <div><p className="font-bold text-white text-lg">Package Applications</p><p className="text-sm text-navy-200">Manage package booking requests</p></div>
          <span className="bg-white/10 border border-white/10 text-ember-300 text-sm font-semibold px-4 py-1.5 rounded-full">{rows.length} Records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm">
            <thead><tr className="bg-[#EEF3F7] text-[11px] font-bold tracking-widest text-navy-500 text-left">
              {["BOOKING ID", "CUSTOMER", "PACKAGE", "TRAVEL DATE", "PAX", "AMOUNT", "STATUS"].map((h) => <th key={h} className="px-6 py-4">{h}</th>)}
            </tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-navy-50">
                  <td className="px-6 py-4 font-bold text-ember-600">{r.id}</td>
                  <td className="px-6 py-4 text-navy-800">{r.customer}</td>
                  <td className="px-6 py-4 text-navy-800">{r.pkg}</td>
                  <td className="px-6 py-4 text-navy-600">{r.date}</td>
                  <td className="px-6 py-4 text-navy-800">{r.pax}</td>
                  <td className="px-6 py-4 font-bold text-navy-900">₹{r.amount.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className={`text-xs font-bold px-3 py-1.5 rounded-full outline-none ${pkgTone[r.status]}`}>
                      {Object.keys(pkgTone).map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-3xl border border-ember-100/60 shadow-card p-5 ${className}`}>{children}</div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState({ users: 0, agents: 0, visas: 0 });
  const [visa, setVisa] = useState({ inProcess: 0, pending: 0, rejected: 0, approved: 0 });

  // Admin details are saved under the "user" key by the admin login page
  let admin = null;
  try { admin = JSON.parse(localStorage.getItem("user")); } catch { /* ignore */ }

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const load = async () => {
      const [u, a, v] = await Promise.allSettled([
        api.get("/users/stats"),
        api.get("/agents"),
        api.get("/admin/visa-applications"),
      ]);
      setCounts({
        users: u.value?.data?.stats?.totalRegistered ?? 0,
        agents: a.value?.data?.count ?? 0,
        visas: v.value?.data?.stats?.total ?? 0,
      });
      if (v.value?.data?.stats) setVisa(v.value.data.stats);
    };
    load();
  }, []);

  const stats = [
    { label: "TOTAL USERS", value: counts.users, icon: FiUsers, growth: "+12%", top: "border-ember-500" },
    { label: "TOTAL AGENTS", value: counts.agents, icon: MdSupportAgent, growth: "+8%", top: "border-navy-700" },
    { label: "VISA APPLICATIONS", value: counts.visas, icon: FiCreditCard, growth: "+15%", top: "border-ember-400" },
    { label: "TOTAL TICKETS", value: 204, icon: MdOutlineConfirmationNumber, growth: "+18%", top: "border-navy-600" },
  ];

  const visaRows = [
    { dot: "bg-yellow-400", label: "In Process", value: visa.inProcess },
    { dot: "bg-ember-500", label: "Pending", value: visa.pending },
    { dot: "bg-red-500", label: "Rejected", value: visa.rejected },
    { dot: "bg-emerald-500", label: "Approved", value: visa.approved },
  ];

  const renderDashboard = () => (
    <div className="p-4 sm:p-6 lg:pl-2 space-y-5">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 px-6 sm:px-9 py-7 shadow-xl">
        <div className="absolute -right-10 -top-16 w-72 h-72 rounded-full bg-ember-500/10 blur-2xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden mt-1 text-white bg-white/10 p-2 rounded-xl">
              <FiMenu size={18} />
            </button>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.35em] text-ember-300">OPERATIONAL OVERVIEW</p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                Welcome back, {admin?.fullName?.split(" ")[0] || "Admin"}
              </h1>
              <p className="text-sm text-navy-200 mt-1.5">Here is what is happening at Rayya Tour &amp; Travel today.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300" size={15} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anything..."
                className="w-56 bg-white/10 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-navy-300 outline-none focus:border-ember-400"
              />
            </div>
            <span className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white">
              <FiCalendar size={14} className="text-ember-300" />
              {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <button className="relative w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white">
              <FiBell size={16} />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-ember-400" />
            </button>
            <button onClick={onLogout} title="Logout" className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-ember-500">
              <FiLogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map(({ label, value, icon: Icon, growth, top }) => (
          <div key={label} className={`bg-white rounded-3xl border-t-4 ${top} shadow-card p-5`}>
            <div className="flex items-center justify-between mb-5">
              <span className="w-10 h-10 rounded-full bg-ember-50 text-ember-500 flex items-center justify-center"><Icon size={17} /></span>
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                <FiTrendingUp size={10} /> {growth}
              </span>
            </div>
            <p className="text-[11px] font-semibold tracking-widest text-navy-500">{label}</p>
            <p className="font-serif text-4xl font-bold text-navy-900 mt-1">{value}</p>
          </div>
        ))}
        <div className="rounded-3xl bg-gradient-to-br from-ember-500 to-ember-800 shadow-lg shadow-ember-900/30 p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between mb-5">
            <span className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center"><BsWallet2 size={17} /></span>
            <span className="bg-white/20 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">+9%</span>
          </div>
          <p className="text-[11px] font-semibold tracking-widest text-ember-100">TOTAL WALLET</p>
          <p className="font-serif text-4xl font-bold text-white mt-1">₹2,45,680</p>
        </div>
      </div>

      {/* VISA + TICKETS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <p className="flex items-center gap-2 font-bold text-navy-900"><FiCreditCard className="text-ember-500" /> Visa Overview</p>
            <div className="flex items-center gap-3"><button onClick={() => setActiveItem("Visas List")} className="bg-ember-50 text-ember-600 text-xs font-bold px-3 py-1.5 rounded-full">Visas List</button><button onClick={() => setActiveItem("Applied Visas")} className="text-ember-600 text-xs font-bold hover:underline">View All</button></div>
          </div>
          {visaRows.map(({ dot, label, value }) => (
            <div key={label} className="flex items-center justify-between py-3 border-b border-navy-50 last:border-0">
              <span className="flex items-center gap-2.5 text-sm text-navy-600"><span className={`w-2.5 h-2.5 rounded-full ${dot}`} />{label}</span>
              <span className="font-bold text-navy-900">{value}</span>
            </div>
          ))}
        </Card>

        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="flex items-center gap-2 font-bold text-navy-900"><MdOutlineConfirmationNumber className="text-ember-500" /> Ticket Operations</p>
            <button onClick={() => setActiveItem("Applied Tickets")} className="bg-ember-50 text-ember-600 text-xs font-bold px-4 py-1.5 rounded-full">Manage</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
            {ticketStats.map(({ value, label, box, text, bar, w }) => (
              <div key={label} className={`${box} rounded-2xl p-3 flex flex-col`}>
                <p className={`font-serif text-2xl font-bold ${text}`}>{value}</p>
                <p className="text-[10px] font-semibold tracking-wide text-navy-500 mt-1 mb-3">{label}</p>
                <div className="h-1.5 bg-white/80 rounded-full mt-auto overflow-hidden">
                  <div className={`${bar} h-full rounded-full`} style={{ width: w }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* PERFORMANCE */}
      <Card>
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <p className="font-bold text-navy-900">Operational Performance</p>
          <div className="flex gap-4 text-xs text-navy-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-navy-700" />Visa</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-ember-500" />Tickets</span>
          </div>
        </div>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b829f" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="visa" stroke="#223651" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="tickets" stroke="#c9500e" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );

  const pages = {
    Users: <CustomerList />,
    Agents: <AgentDirectory />,
    "Visas List": <GlobalVisaCatalog />,
    "Applied Visas": <AppliedVisas />,
    "Applied Tickets": <TicketOperationsPage />,
    "Applied Packages": <AppliedPackages />,
    Airports: <AirportDirectory />,
    Countries: <CountriesDirectory />,
    Airlines: <AirlineDirectory />,
    "Wallet History": <TransactionHistoryPage />,
    Support: <SupportHelpdeskQueue />,
    Settings: <PlatformIntegrationSettings />,
  };

  return (
    <div className="flex bg-[#EEF3F7] min-h-screen">
      <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        admin={admin}
        onLogout={onLogout}
      />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        {activeItem !== "Dashboard" && (
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden m-3 text-navy-800 bg-white shadow-card p-2 rounded-xl">
            <FiMenu size={18} />
          </button>
        )}
        {activeItem === "Dashboard" ? renderDashboard() : pages[activeItem]}
      </main>
    </div>
  );
};

export default Dashboard;