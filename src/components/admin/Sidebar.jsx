import React from "react";
import {
  FiGrid, FiUsers, FiGlobe, FiHelpCircle, FiSettings, FiX, FiCreditCard, FiPackage,
} from "react-icons/fi";
import { MdSupportAgent, MdOutlineConfirmationNumber, MdOutlineLocalAirport } from "react-icons/md";
import { TbPlaneDeparture } from "react-icons/tb";
import { BsWallet2 } from "react-icons/bs";
import Logo from "../../assets/image/rayyalogo.png";

// Groups are separated by a thin line (no headings)
const groups = [
  [{ label: "Dashboard", icon: FiGrid }],
  [
    { label: "Users", icon: FiUsers },
    { label: "Agents", icon: MdSupportAgent },
    { label: "Applied Visas", icon: FiCreditCard },
    { label: "Applied Tickets", icon: MdOutlineConfirmationNumber },
    { label: "Applied Packages", icon: FiPackage },
  ],
  [
    { label: "Airports", icon: MdOutlineLocalAirport },
    { label: "Countries", icon: FiGlobe },
    { label: "Airlines", icon: TbPlaneDeparture },
  ],
  [{ label: "Wallet History", icon: BsWallet2 }],
  [
    { label: "Support", icon: FiHelpCircle },
    { label: "Settings", icon: FiSettings },
  ],
];

const Sidebar = ({ activeItem, onNavigate, sidebarOpen, setSidebarOpen }) => {
  const go = (label) => { onNavigate(label); setSidebarOpen(false); };

  const Item = ({ label, icon: Icon }) => {
    const active = activeItem === label;
    return (
      <button
        onClick={() => go(label)}
        className={`w-full flex-1 min-h-[34px] max-h-[72px] flex items-center gap-3 px-2.5 rounded-xl text-[13px] font-medium my-0.5 transition-colors ${
          active ? "bg-ember-500 text-white" : "text-navy-100 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-white/20 text-white" : "bg-white/10 text-ember-300"}`}>
          <Icon size={15} />
        </span>
        {label}
      </button>
    );
  };

  return (
    <>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-navy-950/60 z-30 lg:hidden" />}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen p-2.5 w-[250px] flex-shrink-0 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="h-full flex flex-col rounded-3xl overflow-hidden bg-navy-900 border-t-4 border-ember-500">
          <div className="p-2.5 relative">
            <div className="bg-white rounded-2xl py-1.5 flex items-center justify-center">
              <img src={Logo} alt="Rayya Tour & Travel" className="h-11 w-auto object-contain" />
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 text-navy-700 bg-navy-100 rounded-full p-1">
              <FiX size={13} />
            </button>
          </div>

          <nav className="flex-1 min-h-0 flex flex-col px-2.5 pb-2.5 overflow-y-auto no-scrollbar">
            {groups.map((items, i) => (
              <div key={i} style={{ flex: items.length }} className={`flex flex-col ${i > 0 ? "mt-1.5 pt-1.5 border-t border-white/10" : ""}`}>
                {items.map((it) => <Item key={it.label} {...it} />)}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;