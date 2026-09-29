import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronDown, LogOut, Menu, Minus, Phone, ShieldCheck, User, X } from "lucide-react";

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
  const profileRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");
  const userName = user?.fullName || user?.name || user?.username || "User";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Invalid user data");
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/");
    toast.success("Logout successfully");
  };

  const desktopLinkClass = ({ isActive }) =>
    `whitespace-nowrap border-b-2 pb-1 uppercase transition-all duration-200 ${
      isActive
        ? "border-brown font-serif text-base text-brown sm:text-lg"
        : "border-transparent text-[11px] font-medium tracking-[0.18em] text-ink/80 hover:text-brown"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
      isActive ? "bg-soft text-brown" : "text-ink/80 hover:bg-oat"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur-xl">
      <nav className="mx-auto grid h-[70px] max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-8 lg:px-12">
        <NavLink to="/" className="flex items-center gap-2.5">
          <Minus size={14} className="text-sand" />
          <span className="leading-none">
            <span className="block font-serif text-xl font-medium tracking-wide text-ink">RAAYA</span>
            <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.35em] text-muted">Travels</span>
          </span>
        </NavLink>

        <ul className="hidden items-center justify-center gap-6 xl:flex xl:gap-9">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end={item.path === "/"} className={desktopLinkClass}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="col-start-3 flex items-center justify-end gap-3 sm:gap-4 xl:col-start-auto">
          <a href={`tel:${PHONE}`} className="hidden text-right leading-tight lg:block">
            <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-brown">Concierge Support</span>
            <span className="block text-[15px] font-semibold text-ink">{PHONE}</span>
          </a>

          {!isLoggedIn && (
            <button
              onClick={() => goTo("/signin")}
              className="hidden whitespace-nowrap rounded-full bg-dark px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-ink hover:shadow-lg sm:block"
            >
              Login / Sign Up
            </button>
          )}

          <button
            type="button"
            onClick={() => goTo("/user-dashboard/profile")}
            aria-label="Open my dashboard"
            className="hidden h-11 items-center gap-2 rounded-full border border-line bg-soft py-1 pl-1 pr-4 text-ink transition-all hover:border-sand hover:bg-line hover:shadow-md sm:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-dark text-sm font-semibold text-white">
              {isLoggedIn && user ? userName.charAt(0).toUpperCase() : <User size={16} />}
            </span>
           <span className="max-w-[90px] truncate text-sm font-medium">{isLoggedIn && user ? userName : "Account"}</span>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-soft text-ink xl:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden bg-ivory transition-all duration-300 ease-in-out xl:hidden ${
          mobileOpen ? "max-h-[640px] border-t border-line opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-8">
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

          <a
            href={`tel:${PHONE}`}
            className="mt-4 flex items-center gap-3 rounded-xl bg-oat px-4 py-3"
          >
            <Phone size={18} className="text-brown" />
            <span className="leading-tight">
              <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-brown">Concierge Support</span>
              <span className="block text-[15px] font-semibold text-ink">{PHONE}</span>
            </span>
          </a>

          <div className="mt-4 space-y-3">
            <button
              onClick={() => goTo("/user-dashboard/profile")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brown px-4 py-3 text-sm font-medium text-white"
            >
              <User size={15} /> My Dashboard
            </button>
            {isLoggedIn && user ? (
              <>
                <button
                  onClick={() => goTo("/user-dashboard/profile")}
                  className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dark text-white">
                    <User size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">{userName}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted">{user.email || ""}</span>
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-3 text-sm font-medium text-red-500"
                >
                  <LogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => goTo("/signin")}
                  className="w-full rounded-full bg-dark px-4 py-3 text-sm font-medium text-white"
                >
                  Login / Sign Up
                </button>
                <button
                  onClick={() => goTo("/admin/login")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-dark px-4 py-3 text-sm font-medium text-ink"
                >
                  <ShieldCheck size={15} /> Admin Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;