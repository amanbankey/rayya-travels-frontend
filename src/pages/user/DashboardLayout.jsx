import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  BookOpen,
  Camera,
  FileText,
  LogOut,
  Plane,
  Plus,
  ShieldCheck,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";

const tabs = [
  { name: "My Profile", path: "/user-dashboard/profile", icon: User },
  { name: "My Bookings", path: "/user-dashboard/bookings", icon: BookOpen },
  { name: "Wallet History", path: "/user-dashboard/wallet", icon: Wallet },
  {
    name: "Applied Visa History",
    path: "/user-dashboard/visa-history",
    icon: FileText,
  },
];

const defaults = {
  fullName: "",
  email: "",
  mobile: "",
  nationality: "India",
  dob: "",
  gender: "Female",
  address: "",
  city: "",
  pincode: "",
  photo: "",
};

const loadProfile = () => {
  let user = {};
  let saved = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
    saved = JSON.parse(localStorage.getItem("raaya_profile")) || {};
  } catch {
    /* ignore */
  }

  return {
    ...defaults,
    fullName: user.fullName || user.name || user.username || "Riya",
    email: user.email || "riya@gmail.com",
    ...saved,
  };
};

const completionKeys = [
  "fullName",
  "nationality",
  "dob",
  "gender",
  "email",
  "mobile",
  "address",
  "photo",
];

const animCss = `
@property --dash-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
@keyframes dashUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes dashPop { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
@keyframes dashFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes dashSpin { to { --dash-angle: 360deg; } }
@keyframes dashFly { from { left: -60px; } to { left: 100%; } }
@keyframes dashBob { 0%,100% { transform: translateY(-3px) rotate(45deg); } 50% { transform: translateY(4px) rotate(45deg); } }
@keyframes dashMarch { to { background-position: 28px 0; } }
@keyframes dashDrift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,14px); } }
@keyframes dashShine { from { transform: translateX(-100%); } to { transform: translateX(260%); } }
@keyframes dashPulse { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,.55); } 100% { box-shadow: 0 0 0 8px rgba(16,185,129,0); } }
.dash-up { opacity: 0; animation: dashUp .7s cubic-bezier(.2,.7,.2,1) forwards; }
.dash-pop { opacity: 0; animation: dashPop .6s cubic-bezier(.2,.8,.2,1) forwards; }
.dash-float { animation: dashFloat 4.5s ease-in-out infinite; }
.dash-ring { background: conic-gradient(from var(--dash-angle), #7a5832, #fde2bd, #a58e6f, #2f2a26, #7a5832); animation: dashSpin 5s linear infinite; }
.dash-fly { animation: dashFly 11s linear infinite; }
.dash-bob { animation: dashBob 2.6s ease-in-out infinite; }
.dash-path { background-image: linear-gradient(to right, rgba(165,142,111,.7) 60%, transparent 60%); background-size: 14px 2px; background-repeat: repeat-x; animation: dashMarch 1.4s linear infinite; }
.dash-drift { animation: dashDrift 12s ease-in-out infinite; }
.dash-shine { animation: dashShine 2.6s ease-in-out infinite; }
.dash-live { animation: dashPulse 1.8s ease-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .dash-up,.dash-pop,.dash-float,.dash-ring,.dash-fly,.dash-bob,.dash-path,.dash-drift,.dash-shine,.dash-live { animation: none !important; opacity: 1; }
}
`;

const useCountUp = (target, duration = 1100) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf;
    const from = 0;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      setValue(Math.round(from + (target - from) * eased));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const updateProfile = (next) => {
    setProfile(next);
    localStorage.setItem("raaya_profile", JSON.stringify(next));
  };

  const percent = useMemo(
    () =>
      Math.round(
        (completionKeys.filter((k) => String(profile[k] || "").trim()).length /
          completionKeys.length) *
          100
      ),
    [profile]
  );

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Photo must be under 2MB");
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateProfile({ ...profile, photo: reader.result });
      toast.success("Photo updated");
    };

    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout successfully");
    navigate("/");
  };

  const shown = useCountUp(percent);

  const missing = [
    !profile.address && "Address",
    !profile.photo && "Photo",
  ].filter(Boolean);

  const name = profile.fullName || "Traveller";

  return (
    <main className="min-h-screen bg-page pb-16">
      <div className="mx-auto max-w-[1180px] px-4 pt-6 sm:px-8 lg:px-12">
        <style>{animCss}</style>

        {/* Profile hero */}
        <section className="dash-pop relative overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-ivory via-white to-badge/70 shadow-[0_22px_50px_-26px_rgba(122,88,50,0.55)]">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhoto}
          />

          {/* Decor */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(165,142,111,0.55) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "linear-gradient(to bottom, black, transparent 65%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent 65%)",
            }}
          />

          <div className="dash-drift pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-peach/70 blur-3xl" />
          <div className="dash-drift pointer-events-none absolute -bottom-20 left-1/4 h-52 w-52 rounded-full bg-sand/25 blur-3xl [animation-delay:-6s]" />

          {/* Flight path */}
          <div className="pointer-events-none absolute inset-x-0 top-6 h-6">
            <div className="dash-path absolute inset-x-6 top-1/2 h-[2px]" />
            <div className="dash-fly absolute top-0">
              <div className="dash-bob text-brown">
                <Plane size={20} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Sign out */}
        <button
  type="button"
  onClick={handleLogout}
  className="absolute right-3 top-1.5 z-10 flex items-center gap-1.5 rounded-full bg-dark px-3 py-1.5 text-[11px] font-medium text-white shadow-lg shadow-dark/20 transition-all hover:-translate-y-0.5 hover:bg-brown sm:text-xs"
>
  <LogOut size={12} />
  Sign Out
</button>

          {/* Compact card content */}
          <div className="relative flex flex-col gap-5 px-5 pb-5 pt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:pb-6 sm:pt-16">
            {/* Identity */}
            <div className="flex min-w-0 flex-col items-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left">
              <div className="dash-float relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                <div className="dash-ring absolute -inset-[4px] rounded-[30px]" />
                <div className="absolute -inset-[2px] rounded-[27px] bg-white" />

                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[25px] bg-gradient-to-br from-dark to-brown font-serif text-4xl text-peach sm:text-5xl">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    name.charAt(0).toUpperCase()
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Change photo"
                  className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-brown text-white shadow-lg transition-transform hover:scale-110 hover:bg-dark"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div className="min-w-0">
                <p className="dash-up inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-sand [animation-delay:150ms]">
                  <Sparkles size={11} />
                  Member Dashboard
                </p>

                <h1 className="dash-up mt-1 truncate font-serif text-3xl font-medium text-ink sm:text-4xl [animation-delay:250ms]">
                  {name}
                </h1>

                <p className="dash-up truncate text-sm text-muted [animation-delay:350ms]">
                  {profile.email}
                </p>

                <div className="dash-up mt-3 flex flex-wrap justify-center gap-2 sm:justify-start [animation-delay:450ms]">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-badge px-3 py-1 text-[11px] font-medium text-badgetext">
                    <BadgeCheck size={12} />
                    Raaya Member
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1 text-[11px] font-medium text-brown">
                    <span className="dash-live h-2 w-2 rounded-full bg-emerald-500" />
                    <ShieldCheck size={12} />
                    Secure session
                  </span>
                </div>
              </div>
            </div>

            {/* Profile strength */}
            <div className="dash-up w-full rounded-2xl border border-line/80 bg-white/80 p-3.5 shadow-card backdrop-blur sm:p-4 md:w-[270px] [animation-delay:400ms]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                    Profile strength
                  </p>

                  <p className="font-serif text-3xl font-medium leading-none text-ink">
                    {shown}
                    <span className="text-xl text-sand">%</span>
                  </p>
                </div>

                <span className="rounded-full bg-oat px-2.5 py-1 text-[10px] font-medium text-brown">
                  {percent === 100 ? "Complete" : "In progress"}
                </span>
              </div>

              <div className="relative mt-2.5 h-2 overflow-hidden rounded-full bg-mist">
                <div
                  className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-sand to-brown transition-all duration-700"
                  style={{ width: `${shown}%` }}
                >
                  <span className="dash-shine absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
              </div>

              {missing.length > 0 ? (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {missing.map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={
                        m === "Photo"
                          ? () => fileRef.current?.click()
                          : () => document.getElementById("address")?.focus()
                      }
                      className="inline-flex items-center gap-1 rounded-full border border-dashed border-sand px-3 py-1 text-xs font-medium text-brown transition-all hover:-translate-y-0.5 hover:bg-brown hover:text-white"
                    >
                      <Plus size={12} />
                      {m}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-2.5 text-xs font-medium text-emerald-600">
                  Your profile is complete ✓
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Top tab navbar */}
        <nav className="dash-up sticky top-[74px] z-30 mt-5 [animation-delay:300ms]">
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto rounded-2xl border border-line bg-white/90 p-1.5 shadow-card backdrop-blur-xl">
            {tabs.map(({ name: label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `group flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-dark to-brown text-white shadow-lg shadow-brown/25"
                      : "text-muted hover:bg-oat hover:text-brown"
                  }`
                }
              >
                <Icon
                  size={16}
                  className="transition-transform group-hover:scale-110"
                />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="mt-6">
          <Outlet context={{ profile, updateProfile, percent }} />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;