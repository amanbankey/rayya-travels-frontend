import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

import SignInModal from "../pages/SignIn";
import SignUpModal from "../pages/SignUp";

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

// Read the current user session from localStorage
const readSession = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    // Both must exist -> user is really logged in
    return token && user ? user : null;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [user, setUser] = useState(readSession);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = !!user;
  const userName = user?.fullName || user?.name || user?.username || "User";
  const userEmail = user?.email || "";
  const initial = userName.charAt(0).toUpperCase();

  const syncSession = useCallback(() => setUser(readSession()), []);

  // Re-check login state whenever something could have changed it:
  // modal closed (after login/signup), page change, other tab, or custom event.
  useEffect(() => {
    syncSession();
  }, [authMode, location.pathname, syncSession]);

  useEffect(() => {
    window.addEventListener("storage", syncSession);
    window.addEventListener("auth-change", syncSession);
    window.addEventListener("focus", syncSession);
    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("auth-change", syncSession);
      window.removeEventListener("focus", syncSession);
    };
  }, [syncSession]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));

    setUser(null);
    setMobileOpen(false);

    navigate("/");
    toast.success("Logout successfully");
  };

  const desktopLinkClass = ({ isActive }) =>
    `relative whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-[#102030] to-[#223651] text-white shadow-md shadow-[#102030]/25"
        : "text-[#102030] hover:bg-[#FDF1E8] hover:text-[#AE4000]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg border-l-4 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
      isActive
        ? "border-[#AE4000] bg-[#FDF1E8] text-[#AE4000]"
        : "border-transparent text-[#102030] hover:bg-[#F3F6FA]"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_10px_30px_-12px_rgba(16,32,48,0.35)]"
          : "shadow-[0_4px_20px_-10px_rgba(16,32,48,0.2)]"
      }`}
    >
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#102030] via-[#E97D34] to-[#102030]" />

      <nav className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-8 lg:px-12">
        {/* Logo */}
        <NavLink to="/" className="flex items-center transition-transform hover:scale-[1.03]">
          <img
            src={Logo}
            alt="Rayya Tour & Travel"
            className="h-14 w-auto object-contain"
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
            className="group hidden items-center gap-2.5 lg:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDF1E8] text-[#AE4000] transition-colors group-hover:bg-[#AE4000] group-hover:text-white">
              <Phone size={17} />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#AE4000]">
                Concierge Support
              </span>
              <span className="block text-[14px] font-bold text-[#102030]">
                {PHONE}
              </span>
            </span>
          </a>

          {/* Login / Sign Up — only when logged out */}
          {!isLoggedIn && (
            <button
              type="button"
              // onClick={() => setAuthMode("signin")}
               onClick={() => navigate("/signin")}
              className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#AE4000] to-[#E97D34] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#AE4000]/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 sm:flex"
            >
              <LogIn size={16} />
              Login / Sign Up
            </button>
          )}

          {/* Admin button (unchanged behaviour) */}
          {/* Admin: an orange light travels around the inside edge of the button */}
          <button
            type="button"
            onClick={() => goTo("/admin")}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-[#102030] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#AE4000] sm:flex"
          >
            <ShieldCheck size={16} />
            <span>Admin</span>
          </button>

          {/* Account — shown only after login */}
          {isLoggedIn ? (
            <div className="group relative hidden sm:block">
              <button
                type="button"
                onClick={() => goTo("/user-dashboard/profile")}
                aria-haspopup="menu"
                aria-label="Account menu"
                className="flex h-11 items-center gap-2 rounded-full border border-[#D9E1EA] bg-[#F5F8FB] py-1 pl-1 pr-3 text-[#102030] transition-all group-hover:border-[#AE4000] group-hover:bg-[#FDF1E8] group-hover:shadow-md group-focus-within:border-[#AE4000]"
              >
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#AE4000] to-[#E97D34] text-sm font-bold text-white">
                  {initial}
                </span>
                <span className="max-w-[100px] truncate text-sm font-semibold">
                  {userName}
                </span>
                <ChevronDown
                  size={15}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              {/* Hover dropdown */}
              <div className="invisible absolute right-0 top-full z-50 w-72 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-[#E3E9F1] bg-white shadow-[0_24px_50px_-16px_rgba(16,32,48,0.45)]">
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#0A1521] via-[#102030] to-[#223651] px-5 py-4 text-white">
                    <span className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-[#E97D34]/40 blur-2xl" />
                    <div className="relative flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#AE4000] to-[#E97D34] text-lg font-bold">
                        {initial}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{userName}</p>
                        <p className="truncate text-xs text-[#C5D0DF]">{userEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    {/*<button
                      type="button"
                      onClick={() => goTo("/user-dashboard/profile")}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#102030] transition-colors hover:bg-[#FDF1E8] hover:text-[#AE4000]"
                    >
                      <LayoutDashboard size={16} />
                      My Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo("/user-dashboard/bookings")}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#102030] transition-colors hover:bg-[#FDF1E8] hover:text-[#AE4000]"
                    >
                      <BookOpen size={16} />
                      My Bookings
                    </button>*/}
                    
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9E1EA] bg-[#F5F8FB] text-[#102030] transition-colors hover:border-[#AE4000] hover:text-[#AE4000] xl:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white transition-all duration-300 ease-in-out xl:hidden ${
          mobileOpen
            ? "max-h-[820px] border-t border-[#E5EAF0] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-8">
          {/* Logged-in user card */}
          {isLoggedIn && (
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#0A1521] via-[#102030] to-[#223651] px-4 py-3 text-white">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#AE4000] to-[#E97D34] font-bold">
                {initial}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{userName}</p>
                <p className="truncate text-xs text-[#C5D0DF]">{userEmail}</p>
              </div>
            </div>
          )}

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
            {/* Admin Dashboard - Mobile (unchanged behaviour) */}
            <button
              type="button"
              onClick={() => goTo("/admin")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-[#102030] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#AE4000]"
            >
              <ShieldCheck size={16} />
              <span>Admin Dashboard</span>
            </button>

            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => goTo("/user-dashboard/profile")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D9E1EA] bg-[#F5F8FB] px-4 py-3 text-sm font-semibold text-[#102030]"
                >
                  <User size={15} />
                  My Dashboard
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-3 text-sm font-semibold text-red-500"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/signin");
                }}
                className="w-full rounded-full bg-gradient-to-r from-[#AE4000] to-[#E97D34] px-4 py-3 text-sm font-semibold text-white"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* <SignInModal
        // open={authMode === "signin"}
        onClose={() => setAuthMode(null)}
        onSwitchToSignUp={() => setAuthMode("signup")}
      />
      <SignUpModal
        open={authMode === "signup"}
        onClose={() => setAuthMode(null)}
        onSwitchToSignIn={() => setAuthMode("signin")}
      /> */}
    </header>
  );
};

export default Navbar;