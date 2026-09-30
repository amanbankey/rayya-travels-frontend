import React, { useState } from "react";
import { FiSearch, FiCalendar, FiChevronDown, FiBell, FiMenu, FiUsers, FiTrendingUp, FiCreditCard, FiCheckSquare, FiCheck, FiFileText, FiUserPlus, FiSettings, FiHelpCircle } from "react-icons/fi";
import { MdSpeed, MdOutlineConfirmationNumber, MdSupportAgent, MdOutlineLocalOffer } from "react-icons/md";
import { TbPlaneDeparture } from "react-icons/tb";
import { BsWallet2 } from "react-icons/bs";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import Sidebar from "../../components/admin/Sidebar";
import AgentDirectory from "./AgentDirectory";
import GlobalVisaCatalog from "./GlobalVisaCatalog";
import CustomerList from "./CustomerList";
import AirportDirectory from "./AirportDirectory";
import CountriesDirectory from "./GlobalCountries";
import AirlineDirectory from "./Airline";
import SupportHelpdeskQueue from "./Support";
import PlatformIntegrationSettings from "./PlatformIntegrationSettings";
import VisaProductSpecification from "./VisaProductSpecification";
import UpdateVisaProductRules from "./UpdateVisaProductRules";
import UpdateVisaCharges from "./UpdateVisaCharge";
import { TransactionHistoryPage } from "./TransactionHistory";
import { TicketOperationsPage } from "./TicketOperation";
import AppliedVisas from "./AppliedVisas";

const statCards = [
  { icon: FiUsers, iconBg: "bg-[#FDEBDD]", iconColor: "text-[#AE4000]", accent: "border-t-[#AE4000]", growth: "+12%", label: "TOTAL USERS", value: "23" },
  { icon: MdSpeed, iconBg: "bg-[#E3EAF2]", iconColor: "text-[#102030]", accent: "border-t-[#102030]", growth: "+8%", label: "TOTAL AGENTS", value: "53" },
  { icon: FiCreditCard, iconBg: "bg-[#FDEBDD]", iconColor: "text-[#AE4000]", accent: "border-t-[#AE4000]", growth: "+15%", label: "TOTAL VISAS", value: "153" },
  { icon: MdOutlineConfirmationNumber, iconBg: "bg-[#E3EAF2]", iconColor: "text-[#102030]", accent: "border-t-[#102030]", growth: "+18%", label: "TOTAL TICKETS", value: "204" },
];

const visaRows = [
  { dotColor: "bg-yellow-400", label: "In Process", value: 32 },
  { dotColor: "bg-ember-500", label: "Add. Doc", value: 0 },
  { dotColor: "bg-red-500", label: "Rejected", value: 0 },
  { dotColor: "bg-emerald-500", label: "Approved", value: 65 },
];

const ticketStats = [
  { value: "142", label: "ISSUED / CONFIRMED", bg: "bg-emerald-50", text: "text-emerald-600", bar: "bg-emerald-500", fill: "w-3/4" },
  { value: "28", label: "IN REVIEW", bg: "bg-ember-50", text: "text-ember-600", bar: "bg-ember-500", fill: "w-1/3" },
  { value: "18", label: "SERIES PNR", bg: "bg-navy-50", text: "text-navy-600", bar: "bg-navy-500", fill: "w-1/4" },
  { value: "12", label: "CANCELLATION", bg: "bg-red-50", text: "text-red-600", bar: "bg-red-500", fill: "w-1/5" },
  { value: "4", label: "OFFLINE", bg: "bg-ember-50", text: "text-ember-600", bar: "bg-ember-500", fill: "w-1/12" },
];

const performanceData = [
  { day: "Mon", visa: 20, tickets: 10 },
  { day: "Tue", visa: 28, tickets: 12 },
  { day: "Wed", visa: 40, tickets: 14 },
  { day: "Thu", visa: 30, tickets: 20 },
  { day: "Fri", visa: 55, tickets: 24 },
  { day: "Sat", visa: 62, tickets: 30 },
  { day: "Sun", visa: 75, tickets: 34 },
];

const performanceLegend = [
  { label: "Visa", color: "bg-navy-800" },
  { label: "Tickets", color: "bg-ember-600" },
];

const activities = [
  { icon: FiCheck, iconBg: "bg-emerald-500", id: "TK-2025-000204", time: "JUST NOW", text: "Ticket Issued Successfully" },
  { icon: FiFileText, iconBg: "bg-[#AE4000]", id: "VA-2025-000153", time: "10M AGO", text: "New Visa Application" },
  { icon: FiUserPlus, iconBg: "bg-[#102030]", id: "Rahul Sharma", time: "1H AGO", text: "New Agent Registration" },
  { icon: BsWallet2, iconBg: "bg-[#AE4000]", id: "Wallet Recharge", time: "2H AGO", text: "₹50,000 added by Amit" },
];

const agents = [
  { rank: 1, name: "Rahul Sharma", score: 38 },
  { rank: 2, name: "Priya Patel", score: 31 },
  { rank: 3, name: "Amit Verma", score: 22 },
  { rank: 4, name: "Neha Singh", score: 18 },
  { rank: 5, name: "Sandeep Yadav", score: 15 },
];
const maxAgentScore = Math.max(...agents.map((a) => a.score));

const quickActions = [
  { icon: FiUserPlus, label: "Add User", target: "Users" },
  { icon: MdSupportAgent, label: "Add Agent", target: "Agents" },
  { icon: BsWallet2, label: "Wallet Recharge", target: "Wallet History" },
  { icon: TbPlaneDeparture, label: "Add Airline", target: "Airlines" },
  { icon: FiHelpCircle, label: "Support", target: "Support" },
  { icon: FiSettings, label: "Settings", target: "Settings" },
];

const dateRanges = ["May 13 - 19, 2025", "May 20 - 26, 2025", "May 27 - Jun 2, 2025"];

const PerformanceTooltip = ({ active }) => {
  if (!active) return null;
  return (
    <div className="bg-white border border-stone-200 rounded-xl shadow-md px-3 py-2 text-xs font-medium text-stone-700">
      Chart Data Visualization (May 13-19)
    </div>
  );
};

const Dashboard = ({ setSidebarOpen: setOpenProp, sidebarOpen: openProp }) => {
  const [openLocal, setOpenLocal] = useState(false);
  const sidebarOpen = openProp ?? openLocal;
  const setSidebarOpen = setOpenProp ?? setOpenLocal;
  const [search, setSearch] = useState("");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);
  const [activeItem, setActiveItem] = useState("Dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen bg-page font-sans">
      <button
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
        className="fixed left-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#102030] text-white shadow-lg lg:hidden"
      >
        <FiMenu size={20} />
      </button>
         {sidebarOpen && (
        <div
          className="fixed inset-0 bg-navy-900 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

       
       <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

   {activeItem === "Dashboard" && ( <main className="flex-1 min-w-0 overflow-y-auto bg-page p-4 pt-16 sm:p-6 lg:pt-6">
      <div className="relative mb-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B1724] via-[#102030] to-[#1D3A57] p-6 text-white shadow-[0_22px_50px_-24px_rgba(16,32,48,0.8)] sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[#E0620F]/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#AE4000]/30 blur-3xl" />
        <TbPlaneDeparture className="pointer-events-none absolute -bottom-6 right-8 hidden text-white/[0.07] md:block" size={190} />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFB27A]">Operational Overview</p>
            <h1 className="mt-1 font-serif text-3xl font-semibold sm:text-4xl">Welcome back, Admin</h1>
            <p className="mt-1 text-sm text-[#C9D6E3]">Here is what is happening at Raaya Tour &amp; Travel today.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative min-w-[220px] flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9FB3C8]" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anything..."
                className="w-full rounded-full border border-white/15 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#9FB3C8] backdrop-blur focus:border-[#FFB27A] focus:outline-none focus:ring-2 focus:ring-[#E0620F]/40"
              />
            </form>

            <div className="relative">
              <button
                onClick={() => setDateRangeOpen(!dateRangeOpen)}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20"
              >
                <FiCalendar size={15} className="text-[#FFB27A]" />
                {selectedRange}
                <FiChevronDown size={14} className="text-[#9FB3C8]" />
              </button>
              {dateRangeOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-2xl border border-stone-200 bg-white py-1 shadow-xl">
                  {dateRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setSelectedRange(range);
                        setDateRangeOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-navy-800 hover:bg-[#FDF1E8]"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur transition-colors hover:bg-white/20">
              <FiBell size={17} />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#E0620F] ring-2 ring-[#102030]" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
        {statCards.map(({ icon: Icon, iconBg, iconColor, accent, growth, label, value }) => (
          <div key={label} className={`group rounded-3xl border border-t-4 border-stone-200 ${accent} bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(174,64,0,0.45)]`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center`}>
                <Icon className={`${iconColor} text-base`} />
              </div>
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                <FiTrendingUp size={10} />
                {growth}
              </span>
            </div>
            <p className="text-[11px] font-bold tracking-wide text-stone-500 mb-1">{label}</p>
            <p className="font-serif text-3xl font-semibold text-[#102030]">{value}</p>
          </div>
        ))}

        <div className="rounded-3xl bg-gradient-to-br from-[#AE4000] to-[#7A2C00] p-5 shadow-lg shadow-[#AE4000]/30 xl:col-span-1 sm:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <BsWallet2 className="text-white text-base" />
            </div>
            <span className="flex items-center gap-1 bg-white/20 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              <FiTrendingUp size={10} />
              +9%
            </span>
          </div>
          <p className="text-[11px] font-bold tracking-wide text-white/80 mb-1">TOTAL WALLET</p>
          <p className="font-serif text-3xl font-semibold text-white">₹2,45,680</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
              <FiCreditCard className="text-[#102030] text-base" />
              Visa Overview
            </p>
            <button onClick={() => setActiveItem("Applied Visas")} className="text-[#AE4000] text-xs font-semibold hover:underline">View All</button>
          </div>
          <div>
            {visaRows.map(({ dotColor, label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  <span className="text-sm text-stone-600">{label}</span>
                </div>
                <span className="text-sm font-bold text-navy-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
              <MdOutlineConfirmationNumber className="text-[#AE4000] text-base" />
              Ticket Operations
            </p>
            <button onClick={() => setActiveItem("Applied Tickets")} className="bg-[#FDEBDD] text-[#AE4000] hover:bg-[#AE4000] hover:text-white transition-colors text-xs font-semibold px-3 py-1.5 rounded-xl">Manage</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {ticketStats.map(({ value, label, bg, text, bar, fill }) => (
              <div key={label} className={`${bg} rounded-2xl p-3 flex flex-col`}>
                <p className={`text-xl font-bold ${text} mb-1`}>{value}</p>
                <p className="text-[10px] font-semibold tracking-wide text-stone-500 mb-3">{label}</p>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden mt-auto">
                  <div className={`${bar} ${fill} h-full rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-sm font-bold text-navy-900">Operational Performance</p>
            <div className="flex items-center gap-3">
              {performanceLegend.map(({ label, color }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-stone-500">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip content={<PerformanceTooltip />} />
                <Line type="monotone" dataKey="visa" stroke="#102030" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="tickets" stroke="#E0620F" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <p className="text-sm font-bold text-navy-900 mb-4">Recent Activities</p>
          <div className="relative">
            {activities.map(({ icon: Icon, iconBg, id, time, text }, i) => (
              <div key={id + i} className="relative flex gap-3 pb-5 last:pb-0">
                {i !== activities.length - 1 && (
                  <span className="absolute left-3.5 top-8 bottom-0 w-px bg-stone-200" />
                )}
                <div className={`relative z-10 w-7 h-7 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="text-white text-xs" />
                </div>
                <div className="bg-stone-50 border border-stone-100 rounded-2xl px-3 py-2 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-navy-800">{id}</span>
                    <span className="text-[10px] font-medium text-stone-400">{time}</span>
                  </div>
                  <p className="text-xs text-stone-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <p className="text-sm font-bold text-navy-900 mb-4">Top Agents</p>
          <div className="flex flex-col gap-4">
            {agents.map(({ rank, name, score }) => (
              <div key={rank} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FDEBDD] text-[#AE4000] text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-800 truncate mb-1">{name}</p>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#102030] to-[#AE4000] rounded-full"
                      style={{ width: `${(score / maxAgentScore) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-navy-900 flex-shrink-0">{score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <p className="text-sm font-bold text-navy-900 mb-4">Quick Actions</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ icon: Icon, label, target }) => (
              <button
                key={label}
                onClick={() => setActiveItem(target)}
                className="group flex flex-col items-center justify-center gap-2 border border-stone-200 rounded-2xl py-4 transition-all hover:-translate-y-0.5 hover:border-[#AE4000] hover:bg-[#FDF1E8]"
              >
                <Icon className="text-[#AE4000] text-lg" />
                <span className="text-xs font-semibold text-[#102030]">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main > )}

    {activeItem === "Agents" && (
        <AgentDirectory />
    )}
    {activeItem === "Visas List" && (
        <GlobalVisaCatalog />
    )}
    {activeItem === "Users" && (
  <CustomerList />
)}
{activeItem === "Airports" && (
  <AirportDirectory />
)}
{activeItem === "Countries" && (
  <CountriesDirectory />
)}
{activeItem === "Airlines" && (
  <AirlineDirectory />
)}
{activeItem === "Support" && (
  <SupportHelpdeskQueue />
)}
{activeItem === "Settings" && (
  <PlatformIntegrationSettings />
)}
{activeItem === "Wallet History" && (
  <TransactionHistoryPage />
)}

{["Applied Tickets", "Cancel Tickets", "Offline Tickets"].includes(activeItem) && (
  <TicketOperationsPage />
)}
    {/* <VisaProductSpecification/> */}
    {/* <UpdateVisaProductRules/> */}
    {/* <UpdateVisaCharges /> */}
   {activeItem === "Applied Visas" && (
  <AppliedVisas />
)}
     {/* <OTBApplicationDetailsModal /> */}
    {/* <TransactionHistoryPage /> */}
    
    </div>
  );
};

export default Dashboard;