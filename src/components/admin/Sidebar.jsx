import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiCreditCard,
  FiGlobe,
  FiHelpCircle,
  FiSettings,
  FiLogOut,
  FiX,
  FiPackage,
} from "react-icons/fi";
import {
  MdSupportAgent,
  MdOutlineConfirmationNumber,
  MdOutlineLocalAirport,
} from "react-icons/md";
import { TbPlaneDeparture } from "react-icons/tb";
import { BsWallet2 } from "react-icons/bs";
import logo from "../../assets/image/rayyalogo.png";

const groups = [
  {
    title: "Operations",
    items: [
      { label: "Users", icon: FiUsers },
      { label: "Agents", icon: MdSupportAgent },
      { label: "Applied Visas", icon: FiCreditCard },
      { label: "Applied Tickets", icon: MdOutlineConfirmationNumber },
      { label: "Applied Packages", icon: FiPackage },
    ],
  },
  {
    title: "Master Data",
    items: [
      { label: "Airports", icon: MdOutlineLocalAirport },
      { label: "Countries", icon: FiGlobe },
      { label: "Airlines", icon: TbPlaneDeparture },
    ],
  },
  {
    title: "Finance",
    items: [{ label: "Wallet History", icon: BsWallet2 }],
  },
  {
    title: "System",
    items: [
      { label: "Support", icon: FiHelpCircle },
      { label: "Settings", icon: FiSettings },
    ],
  },
];

const Tile = ({ icon: Icon, active }) => (
  <span
    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[14px] transition-colors ${
      active
        ? "bg-white/25 text-white"
        : "bg-white/10 text-[#FFB27A] group-hover:bg-white/20"
    }`}
  >
    <Icon />
  </span>
);

const SectionTitle = ({ children }) => (
  <p className="mb-1 flex items-center gap-2 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8FA6BD]">
    <span className="h-px w-3 bg-[#AE4000]" />
    {children}
  </p>
);

const Sidebar = ({
  activeItem,
  onNavigate,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();

  const go = (label) => {
    onNavigate(label);
    setSidebarOpen && setSidebarOpen(false);
  };

  const rowCls = (active) =>
    `group relative flex w-full items-center gap-2.5 rounded-xl px-2 py-1.5 text-left text-[13px] font-medium transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-[#AE4000] to-[#E0620F] text-white shadow-lg shadow-[#AE4000]/40"
        : "text-[#DCE6F0] hover:bg-white/10 hover:text-white"
    }`;

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#0B1724]/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-[272px] shrink-0 p-2.5 transition-transform duration-300 ease-in-out lg:sticky ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[26px] bg-gradient-to-b from-[#0B1724] via-[#102030] to-[#16304A] shadow-[0_25px_60px_-20px_rgba(11,23,36,0.9)]">
          
          <div className="pointer-events-none absolute -right-14 top-28 h-44 w-44 rounded-full bg-[#AE4000]/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#E0620F]/15 blur-3xl" />

          <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#AE4000] via-[#E0620F] to-[#AE4000]" />

          <div className="relative shrink-0 px-3.5 pb-2 pt-3">
            <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-1.5 shadow-inner">
              <img
                src={logo}
                alt="Raaya Tour & Travel"
                className="h-12 w-auto object-contain"
              />

              <button
                onClick={() =>
                  setSidebarOpen && setSidebarOpen(false)
                }
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#102030] text-white lg:hidden"
              >
                <FiX />
              </button>
            </div>

            
          </div>

          <nav className="no-scrollbar relative min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 pb-2 pt-1">
            
            <button
              onClick={() => go("Dashboard")}
              className={rowCls(activeItem === "Dashboard")}
            >
              <Tile
                icon={FiGrid}
                active={activeItem === "Dashboard"}
              />
              Dashboard
            </button>

            {groups.map((group) => (
              <div key={group.title}>
                <SectionTitle>{group.title}</SectionTitle>

                <div className="space-y-0.5">
                  {group.items.map(({ label, icon }) => (
                    <button
                      key={label}
                      onClick={() => go(label)}
                      className={rowCls(activeItem === label)}
                    >
                      <Tile
                        icon={icon}
                        active={activeItem === label}
                      />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/*<div className="relative m-2.5 mt-1 flex shrink-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-2.5 backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#E0620F] to-[#AE4000] font-serif font-semibold text-white">
              A
            </span>

            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold text-white">
                Admin
              </p>

              <p className="truncate text-[11px] text-[#B9C8D8]">
                admin@raaya.com
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              title="Back to website"
              aria-label="Sign out"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#DCE6F0] transition-colors hover:bg-[#AE4000] hover:text-white"
            >
              <FiLogOut />
            </button>
          </div>*/}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;