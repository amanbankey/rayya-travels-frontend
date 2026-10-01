import React from "react";
import {
  FiGrid, FiUsers, FiGlobe, FiHelpCircle, FiSettings, FiX, FiCreditCard, FiPackage,
} from "react-icons/fi";
import { MdSupportAgent, MdOutlineConfirmationNumber, MdOutlineLocalAirport } from "react-icons/md";
import { TbPlaneDeparture } from "react-icons/tb";
import { BsWallet2 } from "react-icons/bs";
import Logo from "../../assets/image/rayyalogo.png";

const groups = [
  { title: "OPERATIONS", items: [
    { label: "Users", icon: FiUsers },
    { label: "Agents", icon: MdSupportAgent },
    { label: "Applied Visas", icon: FiCreditCard },
    { label: "Applied Tickets", icon: MdOutlineConfirmationNumber },
    { label: "Applied Packages", icon: FiPackage },
  ]},
  { title: "MASTER DATA", items: [
    { label: "Airports", icon: MdOutlineLocalAirport },
    { label: "Countries", icon: FiGlobe },
    { label: "Airlines", icon: TbPlaneDeparture },
  ]},
  { title: "FINANCE", items: [{ label: "Wallet History", icon: BsWallet2 }] },
  { title: "SYSTEM", items: [
    { label: "Support", icon: FiHelpCircle },
    { label: "Settings", icon: FiSettings },
  ]},
];

const Sidebar = ({ activeItem, onNavigate, sidebarOpen, setSidebarOpen }) => {
  const go = (label) => { onNavigate(label); setSidebarOpen(false); };

  const Item = ({ label, icon: Icon }) => {
    const active = activeItem === label;
    return (
      <button
        onClick={() => go(label)}
        className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl text-[13px] font-medium mb-0.5 transition-all ${
          active
            ? "bg-gradient-to-r from-ember-600 to-ember-400 text-white shadow-lg shadow-ember-500/30"
            : "text-navy-100 hover:bg-white/5 hover:text-white"
        }`}
      >
        <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-white/25 text-white" : "bg-white/10 text-ember-300"}`}>
          <Icon size={14} />
        </span>
        {label}
      </button>
    );
  };

  return (
    <>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-30 lg:hidden" />}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen p-3 w-[270px] flex-shrink-0 font-sans transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="h-full flex flex-col rounded-[26px] overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 border-t-4 border-ember-500 shadow-2xl">
          <div className="p-3 relative">
            <div className="bg-white rounded-2xl py-2 flex items-center justify-center shadow-lg">
              <img src={Logo} alt="Rayya Tour & Travel" className="h-12 w-auto object-contain" />
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-5 right-5 text-navy-700 bg-navy-100 rounded-full p-1">
              <FiX size={13} />
            </button>
          </div>
          <nav className="flex-1 px-2.5 pb-3 overflow-y-auto no-scrollbar">
            <Item label="Dashboard" icon={FiGrid} />
            {groups.map((g) => (
              <div key={g.title}>
                <p className="flex items-center gap-2 px-2 text-[9px] font-semibold tracking-[0.25em] text-navy-300 mt-3 mb-1.5">
                  <span className="w-3 h-px bg-ember-500" /> {g.title}
                </p>
                {g.items.map((it) => <Item key={it.label} {...it} />)}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;