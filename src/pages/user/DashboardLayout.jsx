
import { useRef, useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BookOpen,
  Camera,
  FileText,
  Package,
  ShieldCheck,
  Sparkles,
  User,
  Wallet,
  X,
} from "lucide-react";

import { getMe } from "../../api/authApi";
import api from "../../api/axios";

const tabs = [
  {
    name: "My Profile",
    path: "/user-dashboard/profile",
    icon: User,
  },
  {
    name: "My Bookings",
    path: "/user-dashboard/bookings",
    icon: BookOpen,
  },
  {
    name: "Wallet History",
    path: "/user-dashboard/wallet",
    icon: Wallet,
  },
  {
    name: "Applied Visa History",
    path: "/user-dashboard/visa-history",
    icon: FileText,
  },
  {
    name: "Applied Packages",
    path: "/user-dashboard/package",
    icon: Package,
  },
];

const defaults = {
  fullName: "",
  email: "",
  phoneNumber: "",
  country: "India",
  dob: "",
  gender: "Female",
  address: "",
  profilePhoto: "",
};

const animCss = `
@property --dash-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes dashUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dashPop {
  from {
    opacity: 0;
    transform: scale(.97);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes dashSpin {
  to {
    --dash-angle: 360deg;
  }
}

@keyframes dashDrift {
  0%,100% {
    transform: translate(0,0);
  }

  50% {
    transform: translate(30px,14px);
  }
}

@keyframes dashPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16,185,129,.55);
  }

  100% {
    box-shadow: 0 0 0 8px rgba(16,185,129,0);
  }
}

.dash-up {
  opacity: 0;
  animation: dashUp .7s cubic-bezier(.2,.7,.2,1) forwards;
}

.dash-pop {
  opacity: 0;
  animation: dashPop .6s cubic-bezier(.2,.8,.2,1) forwards;
}

.dash-ring {
  background: conic-gradient(
    from var(--dash-angle),
    #e97d34,
    #ffffff,
    #45607f,
    #a84000,
    #e97d34
  );

  animation: dashSpin 6s linear infinite;
}

.dash-drift {
  animation: dashDrift 12s ease-in-out infinite;
}

.dash-live {
  animation: dashPulse 1.8s ease-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .dash-up,
  .dash-pop,
  .dash-ring,
  .dash-drift,
  .dash-live {
    animation: none !important;
    opacity: 1;
  }
}
`;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [profile, setProfile] = useState(defaults);

  // ==========================================
  // GET LOGGED-IN USER FROM BACKEND
  // ==========================================

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please sign in first");
        navigate("/");
        return;
      }

      try {
        const response = await getMe();

        const backendUser =
          response?.data?.user ||
          response?.user ||
          null;

        if (!backendUser) {
          throw new Error("User data not found");
        }

        const userProfile = {
          ...defaults,
          fullName: backendUser.fullName || "",
          email: backendUser.email || "",
          phoneNumber: backendUser.phoneNumber || "",
          country: backendUser.country || "India",
          dob: backendUser.dob || "",
          gender: backendUser.gender || "Female",
          address: backendUser.address || "",
          profilePhoto: backendUser.profilePhoto || "",
        };

        setProfile(userProfile);

        localStorage.setItem(
          "user",
          JSON.stringify(backendUser)
        );
      } catch (error) {
        console.error("Get logged-in user error:", error);

        const status = error?.response?.status;

        if (status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          toast.error("Session expired. Please sign in again.");
          navigate("/");
          return;
        }

        toast.error(
          error?.response?.data?.message ||
            "Unable to load user profile"
        );
      }
    };

    fetchLoggedInUser();
  }, [navigate]);

  // ==========================================
  // UPDATE PROFILE - BACKEND + LOCAL STATE
  // ==========================================

  const updateProfile = async (next) => {
    try {
      const payload = {
        fullName: next.fullName,
        email: next.email,
        mobile: next.phoneNumber,
        nationality: next.country,
        dob: next.dob,
        gender: next.gender,
        address: next.address,
      };

      const response = await api.put(
        "/user/profile/personal",
        payload
      );

      const updatedUser =
        response?.data?.user ||
        response?.user ||
        null;

      const finalProfile = {
        ...next,
        ...(updatedUser
          ? {
              fullName: updatedUser.fullName || "",
              email: updatedUser.email || "",
              phoneNumber: updatedUser.phoneNumber || "",
              country: updatedUser.country || "India",
              dob: updatedUser.dob || "",
              gender: updatedUser.gender || "Female",
              address: updatedUser.address || "",
              profilePhoto:
                updatedUser.profilePhoto ||
                next.profilePhoto ||
                "",
            }
          : {}),
      };

      setProfile(finalProfile);

      const currentUser =
        JSON.parse(localStorage.getItem("user")) || {};

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          ...(updatedUser || {}),
          fullName: finalProfile.fullName,
          email: finalProfile.email,
          phoneNumber: finalProfile.phoneNumber,
          country: finalProfile.country,
          dob: finalProfile.dob,
          gender: finalProfile.gender,
          address: finalProfile.address,
          profilePhoto: finalProfile.profilePhoto,
        })
      );

      return {
        success: true,
        user: finalProfile,
      };
    } catch (error) {
      console.error("Update profile error:", error);

      throw error;
    }
  };

  // ==========================================
  // PROFILE PHOTO
  // ==========================================

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Photo must be under 2MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const nextProfile = {
        ...profile,
        profilePhoto: reader.result,
      };

      setProfile(nextProfile);

      const currentUser =
        JSON.parse(localStorage.getItem("user")) || {};

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          profilePhoto: reader.result,
        })
      );

      toast.success("Photo updated");
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    const nextProfile = {
      ...profile,
      profilePhoto: "",
    };

    setProfile(nextProfile);

    const currentUser =
      JSON.parse(localStorage.getItem("user")) || {};

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...currentUser,
        profilePhoto: "",
      })
    );

    if (fileRef.current) {
      fileRef.current.value = "";
    }

    toast.success("Profile photo removed");
  };

  const name = profile.fullName || "Traveller";

  return (
    <main className="min-h-screen bg-gradient-to-b from-oat via-white to-oat pb-16">
      <div className="mx-auto max-w-[1180px] px-4 pt-6 sm:px-8 lg:px-12">
        <style>{animCss}</style>

        {/* ==========================================
            PROFILE HERO
        ========================================== */}

        <section className="dash-pop relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-950 via-navy to-navy-700 shadow-[0_26px_60px_-28px_rgba(11,22,40,0.8)]">

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhoto}
          />

          {/* Decor */}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent 80%)",
            }}
          />

          <div className="dash-drift pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-ember-500/40 blur-3xl" />

          <div className="dash-drift pointer-events-none absolute -bottom-24 left-1/4 h-60 w-60 rounded-full bg-ember-400/20 blur-3xl [animation-delay:-6s]" />

          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-ember-600 via-ember-400 to-transparent" />

          <div className="relative flex flex-col items-center gap-5 px-5 pb-8 pt-12 text-center sm:flex-row sm:gap-7 sm:px-10 sm:pt-12 sm:text-left">

            {/* Avatar */}

            <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32">

              <div className="dash-ring absolute -inset-[4px] rounded-[32px]" />

              <div className="absolute -inset-[2px] rounded-[30px] bg-navy" />

              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-ember-600 to-ember-400 text-5xl text-white">

                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt="Profile"
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
                title="Change photo"
                className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy bg-white text-ember-600 shadow-lg transition-transform hover:scale-110 hover:bg-ember-50"
              >
                <Camera size={15} />
              </button>

              {profile.profilePhoto && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  aria-label="Remove profile photo"
                  title="Remove photo"
                  className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-navy bg-ember-600 text-white shadow-md transition-transform hover:scale-110"
                >
                  <X size={12} />
                </button>
              )}

            </div>

            {/* User Information */}

            <div className="min-w-0">

              <p className="dash-up inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-ember-300 [animation-delay:150ms]">
                <Sparkles size={11} />
                Member Dashboard
              </p>

              <h1 className="dash-up mt-1 truncate text-3xl font-medium text-white sm:text-5xl [animation-delay:250ms]">
                {name}
              </h1>

              <p className="dash-up truncate text-sm text-navy-200 [animation-delay:350ms]">
                {profile.email || "No email available"}
              </p>

              <div className="dash-up mt-4 flex flex-wrap justify-center gap-2 sm:justify-start [animation-delay:450ms]">

                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium text-navy-100 backdrop-blur">
                  <span className="dash-live h-2 w-2 rounded-full bg-emerald-400" />
                  <ShieldCheck size={13} />
                  Secure session
                </span>

                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium text-navy-100 backdrop-blur">
                  {profile.country || "India"}
                </span>

              </div>

            </div>
          </div>
        </section>

        {/* ==========================================
            TAB NAVBAR
        ========================================== */}

        <nav className="dash-up sticky top-[74px] z-30 mt-5 [animation-delay:300ms]">

          <div className="no-scrollbar flex gap-1.5 overflow-x-auto rounded-2xl border border-navy-100 bg-white/95 p-1.5 shadow-[0_10px_30px_-14px_rgba(11,22,40,0.25)] backdrop-blur-xl">

            {tabs.map(
              ({ name: label, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `group flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-ember-600 to-ember-400 text-white shadow-lg shadow-ember-600/30"
                        : "text-navy-400 hover:bg-ember-50 hover:text-ember-600"
                    }`
                  }
                >
                  <Icon
                    size={16}
                    className="transition-transform group-hover:scale-110"
                  />

                  {label}
                </NavLink>
              )
            )}

          </div>
        </nav>

        {/* ==========================================
            CHILD PAGES
        ========================================== */}

        <div className="mt-6">
          <Outlet
            context={{
              profile,
              updateProfile,
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;

