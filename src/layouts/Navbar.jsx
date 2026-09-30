import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LogOut,
  Menu,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import Logo from "../assets/image/rayyalogo.png";

const PHONE = "+91-9028849207";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Flights", path: "/flights" },
  { name: "Visa", path: "/visa" },
  { name: "Packages", path: "/packages" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");
  const userName = user?.fullName || user?.name || user?.username || "User";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      console.error("Invalid user data");
      setUser(null);
    }
  }, []);

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMobileOpen(false);

    navigate("/");
    toast.success("Logout successfully");
  };

  const desktopLinkClass = ({ isActive }) =>
    `relative whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
      isActive
        ? "bg-[#102030] text-white shadow-md shadow-[#102030]/25"
        : "text-[#102030] hover:bg-[#FDF1E8] hover:text-[#AE4000]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg border-l-4 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
      isActive
        ? "border-[#AE4000] bg-[#FDF1E8] text-[#AE4000]"
        : "border-transparent text-[#102030] hover:bg-[#F3F6FA]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_4px_20px_-10px_rgba(16,32,48,0.25)]">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#102030] via-[#AE4000] to-[#102030]" />

      <nav className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-8 lg:px-12">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Raaya Tour & Travel"
            className="h-12 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop navigation */}
        <ul className="hidden items-center justify-center gap-1 xl:flex xl:gap-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={desktopLinkClass}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3 xl:col-start-auto">
          {/* Desktop contact */}
          <a
            href={`tel:${PHONE}`}
            className="hidden text-right leading-tight lg:block"
          >
            <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#AE4000]">
              Concierge Support
            </span>
            <span className="block text-[15px] font-bold text-[#102030]">
              {PHONE}
            </span>
          </a>

          {/* Login button */}
          {!isLoggedIn && (
            <button
              type="button"
              onClick={() => goTo("/signin")}
              className="hidden whitespace-nowrap rounded-full bg-[#AE4000] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#AE4000]/30 transition-all hover:bg-[#8C3300] hover:shadow-lg sm:block"
            >
              Login / Sign Up
            </button>
          )}

          {/* Admin Dashboard button - Desktop */}
          <button
            type="button"
            onClick={() => goTo("/admin")}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-[#102030] bg-[#102030] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:border-[#AE4000] hover:bg-[#AE4000] sm:flex"
          >
            <ShieldCheck size={16} />
            Admin
          </button>

          {/* Account / Dashboard */}
          <button
            type="button"
            onClick={() => goTo("/user-dashboard/profile")}
            aria-label="Open my dashboard"
            className="hidden h-11 items-center gap-2 rounded-full border border-[#D9E1EA] bg-[#F5F8FB] py-1 pl-1 pr-4 text-[#102030] transition-all hover:border-[#AE4000] hover:bg-[#FDF1E8] hover:shadow-md sm:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#102030] text-sm font-semibold text-white">
              {isLoggedIn && user ? (
                userName.charAt(0).toUpperCase()
              ) : (
                <User size={16} />
              )}
            </span>

            <span className="max-w-[90px] truncate text-sm font-semibold">
              {isLoggedIn && user ? userName : "Account"}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9E1EA] bg-[#F5F8FB] text-[#102030] xl:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white transition-all duration-300 ease-in-out xl:hidden ${
          mobileOpen
            ? "max-h-[760px] border-t border-[#E5EAF0] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-8">
          {/* Mobile links */}
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={mobileLinkClass}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile contact */}
          <a
            href={`tel:${PHONE}`}
            className="mt-4 flex items-center gap-3 rounded-xl bg-[#FDF1E8] px-4 py-3"
          >
            <Phone size={18} className="text-[#AE4000]" />

            <span className="leading-tight">
              <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#AE4000]">
                Concierge Support
              </span>
              <span className="block text-[15px] font-bold text-[#102030]">
                {PHONE}
              </span>
            </span>
          </a>

          {/* Mobile account actions */}
          <div className="mt-4 space-y-3">
            {/* Admin Dashboard - Mobile */}
            <button
              type="button"
              onClick={() => goTo("/admin/dashboard")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#102030] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#AE4000]"
            >
              <ShieldCheck size={16} />
              Admin Dashboard
            </button>

            {/* User Dashboard */}
            <button
              type="button"
              onClick={() => goTo("/user-dashboard/profile")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D9E1EA] bg-[#F5F8FB] px-4 py-3 text-sm font-semibold text-[#102030]"
            >
              <User size={15} />
              My Dashboard
            </button>

            {isLoggedIn && user ? (
              <>
                <button
                  type="button"
                  onClick={() => goTo("/user-dashboard/profile")}
                  className="flex w-full items-center gap-3 rounded-xl border border-[#D9E1EA] bg-white px-4 py-3 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#102030] text-white">
                    <User size={16} />
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-[#102030]">
                      {userName}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-[#64748B]">
                      {user.email || ""}
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-3 text-sm font-semibold text-red-500"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => goTo("/signin")}
                className="w-full rounded-full bg-[#AE4000] px-4 py-3 text-sm font-semibold text-white"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;