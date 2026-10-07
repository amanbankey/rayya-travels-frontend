import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Check,
  CircleCheck,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  Fingerprint,
  Contact,
  LockKeyhole,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Reveal from "../../components/Reveal";
import api from "../../api/axios";

const countries = [
  "India",
  "UAE",
  "UK",
  "US",
  "Canada",
  "Australia",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Saudi Arabia",
  "Qatar",
  "Other",
];

const genders = ["Male", "Female", "Others"];

/* ==========================================
   DATE HELPERS (timezone safe)
========================================== */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const pad = (n) => String(n).padStart(2, "0");

const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

const parseISO = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(
    String(value || "")
  );

  if (!match) return null;

  return {
    year: Number(match[1]),
    month: Number(match[2]) - 1,
    day: Number(match[3]),
  };
};

const getTodayISO = () => {
  const now = new Date();
  return toISO(now.getFullYear(), now.getMonth(), now.getDate());
};

const formatDisplayDate = (value) => {
  const parsed = parseISO(value);

  if (!parsed) return "";

  return `${pad(parsed.day)} ${MONTHS[parsed.month].slice(0, 3)} ${
    parsed.year
  }`;
};

// Hides the scrollbar but keeps scrolling working
const hideScrollbar =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

const validate = (values) => {
  const errors = {};

  if (!String(values.fullName || "").trim()) {
    errors.fullName = "Full name is required";
  }

  if (values.dob) {
    const selectedDate = new Date(values.dob);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      errors.dob = "Date of birth cannot be in the future";
    }
  }

  if (!String(values.email || "").trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!String(values.phoneNumber || "").trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(values.phoneNumber)) {
    errors.phoneNumber = "Enter a valid 10-digit mobile number";
  }

  return errors;
};

const MyProfile = () => {
  const { profile, updateProfile } = useOutletContext();

  const [values, setValues] = useState(profile);

  // Sync backend profile data with this page
  useEffect(() => {
    setValues(profile);
  }, [profile]);

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // ==========================================
  // CUSTOM DROPDOWN STATE
  // ==========================================

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // ==========================================
  // DOB CALENDAR STATE
  // ==========================================

  const todayParts = parseISO(getTodayISO());
  const todayIso = getTodayISO();
  const minYear = todayParts.year - 100;

  const [calView, setCalView] = useState({
    year: todayParts.year,
    month: todayParts.month,
  });

  const toggleDobCalendar = () => {
    if (openDropdown === "dob") {
      setOpenDropdown(null);
      return;
    }

    const selected = parseISO(values.dob);

    setCalView(
      selected
        ? { year: selected.year, month: selected.month }
        : { year: todayParts.year, month: todayParts.month }
    );

    setOpenDropdown("dob");
  };

  const goPrevMonth = () => {
    setCalView((prev) => {
      if (prev.month === 0) {
        return prev.year <= minYear
          ? prev
          : { year: prev.year - 1, month: 11 };
      }

      return { ...prev, month: prev.month - 1 };
    });
  };

  const goNextMonth = () => {
    setCalView((prev) => {
      const isCurrentMonth =
        prev.year === todayParts.year &&
        prev.month === todayParts.month;

      if (isCurrentMonth) return prev;

      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }

      return { ...prev, month: prev.month + 1 };
    });
  };

  const atMaxMonth =
    calView.year === todayParts.year &&
    calView.month === todayParts.month;

  const atMinMonth =
    calView.year <= minYear && calView.month === 0;

  const handleCalYearChange = (year) => {
    setCalView((prev) => {
      const nextYear = Number(year);

      // Future month na dikhe
      const month =
        nextYear === todayParts.year
          ? Math.min(prev.month, todayParts.month)
          : prev.month;

      return { year: nextYear, month };
    });
  };

  const handleCalMonthChange = (month) => {
    setCalView((prev) => ({
      ...prev,
      month: Number(month),
    }));
  };

  const calYears = Array.from(
    { length: todayParts.year - minYear + 1 },
    (_, i) => todayParts.year - i
  );

  const calendarCells = (() => {
    const firstDay = new Date(
      calView.year,
      calView.month,
      1
    ).getDay();

    const daysInMonth = new Date(
      calView.year,
      calView.month + 1,
      0
    ).getDate();

    const cells = [];

    for (let i = 0; i < firstDay; i += 1) cells.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);

    return cells;
  })();

  // ==========================================
  // PASSWORD STATE
  // ==========================================

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [changingPassword, setChangingPassword] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ==========================================
  // PROFILE INPUT
  // ==========================================

  const set = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }
  };

  const ok = (key) =>
    !!String(values[key] || "").trim() &&
    !validate(values)[key];

  // ==========================================
  // CUSTOM DROPDOWN SELECT
  // ==========================================

  const selectDropdownValue = (key, value) => {
    set(key, value);
    setOpenDropdown(null);
  };

  const selectDobDay = (day) => {
    set("dob", toISO(calView.year, calView.month, day));
    setOpenDropdown(null);
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    try {
      setSaving(true);

      await updateProfile(values);

      toast.success("Profile saved successfully");
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setValues(profile);
    setErrors({});
    setOpenDropdown(null);
  };

  // ==========================================
  // PASSWORD INPUT
  // ==========================================

  const setPassword = (key, value) => {
    setPasswords((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (passwordErrors[key]) {
      setPasswordErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }
  };

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const handlePasswordSubmit = async (ev) => {
    ev.preventDefault();

    const found = {};

    if (!passwords.currentPassword) {
      found.currentPassword = "Current password is required";
    }

    if (!passwords.newPassword) {
      found.newPassword = "New password is required";
    } else if (passwords.newPassword.length < 6) {
      found.newPassword =
        "New password must be at least 6 characters";
    }

    if (!passwords.confirmPassword) {
      found.confirmPassword =
        "Please confirm your new password";
    } else if (
      passwords.newPassword !== passwords.confirmPassword
    ) {
      found.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(found);

    if (Object.keys(found).length) {
      toast.error("Please fix the password fields");
      return;
    }

    try {
      setChangingPassword(true);

      await api.put("/user/profile/password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordErrors({});

      toast.success("Password changed successfully");
    } catch (error) {
      console.error("Change password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ==========================================
          PERSONAL INFORMATION
      ========================================== */}

      <Reveal>
        <section className="rounded-[24px] border border-navy-100 bg-white p-5 shadow-[0_12px_35px_-22px_rgba(11,22,40,0.35)] sm:p-7">

          {/* HEADER */}

          <div className="mb-7 flex items-start justify-between gap-4">

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ember-600">
                Personal Details
              </p>

              <h2 className="mt-1 text-2xl font-semibold text-navy-900">
                My Profile
              </h2>

              <p className="mt-1 text-sm text-navy-400">
                Keep your personal information up to date.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-ember-50 p-3 text-ember-600 sm:block">
              <Contact size={22} />
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid gap-5 md:grid-cols-2">

              {/* ==========================================
                  FULL NAME
              ========================================== */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy-700">
                  <User size={15} />
                  Full Name
                </label>

                <input
                  type="text"
                  value={values.fullName || ""}
                  onChange={(e) =>
                    set("fullName", e.target.value)
                  }
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ember-200 ${
                    errors.fullName
                      ? "border-red-400"
                      : "border-navy-100 focus:border-ember-400"
                  }`}
                  placeholder="Enter your full name"
                />

                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* ==========================================
                  NATIONALITY CUSTOM DROPDOWN
              ========================================== */}

              <div
                ref={openDropdown === "country" ? dropdownRef : null}
                className="relative"
              >
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy-700">
                  <Globe size={15} />
                  Nationality
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "country"
                        ? null
                        : "country"
                    )
                  }
                  className={`group flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm outline-none transition-all duration-200 ${
                    openDropdown === "country"
                      ? "border-ember-400 ring-4 ring-ember-100"
                      : "border-navy-100 hover:border-ember-300"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-50 text-ember-600">
                      <Globe size={14} />
                    </span>

                    <span className="font-medium text-navy-800">
                      {values.country || "India"}
                    </span>
                  </span>

                  <ChevronDown
                    size={18}
                    className={`text-navy-400 transition-transform duration-200 ${
                      openDropdown === "country"
                        ? "rotate-180 text-ember-600"
                        : ""
                    }`}
                  />
                </button>

                {openDropdown === "country" && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-navy-100 bg-white p-1.5 shadow-[0_20px_45px_-15px_rgba(11,22,40,0.28)] animate-[dropdownIn_.18s_ease-out]">

                    {/* Scrollbar hidden, scrolling still works */}
                    <div
                      className={`max-h-64 space-y-0.5 overflow-y-auto ${hideScrollbar}`}
                    >

                      {countries.map((country) => {
                        const selected =
                          values.country === country;

                        return (
                          <button
                            key={country}
                            type="button"
                            onClick={() =>
                              selectDropdownValue(
                                "country",
                                country
                              )
                            }
                            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-all duration-150 ${
                              selected
                                ? "bg-ember-50 font-semibold text-ember-700"
                                : "text-navy-600 hover:bg-navy-50 hover:text-navy-900"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`h-2 w-2 rounded-full transition ${
                                  selected
                                    ? "bg-ember-500"
                                    : "bg-navy-200"
                                }`}
                              />

                              {country}
                            </span>

                            {selected && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ember-500 text-white">
                                <Check size={13} strokeWidth={3} />
                              </span>
                            )}
                          </button>
                        );
                      })}

                    </div>
                  </div>
                )}
              </div>

              {/* ==========================================
                  DATE OF BIRTH - CUSTOM CALENDAR
              ========================================== */}

              <div
                ref={openDropdown === "dob" ? dropdownRef : null}
                className="relative"
              >
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy-700">
                  <CalendarDays size={15} />
                  Date of Birth
                </label>

                <button
                  type="button"
                  onClick={toggleDobCalendar}
                  className={`group flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm outline-none transition-all duration-200 ${
                    openDropdown === "dob"
                      ? "border-ember-400 ring-4 ring-ember-100"
                      : errors.dob
                      ? "border-red-400"
                      : "border-navy-100 hover:border-ember-300"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-50 text-ember-600">
                      <CalendarDays size={14} />
                    </span>

                    <span
                      className={
                        values.dob
                          ? "font-medium text-navy-800"
                          : "text-navy-300"
                      }
                    >
                      {values.dob
                        ? formatDisplayDate(values.dob)
                        : "Select date of birth"}
                    </span>
                  </span>

                  <ChevronDown
                    size={18}
                    className={`text-navy-400 transition-transform duration-200 ${
                      openDropdown === "dob"
                        ? "rotate-180 text-ember-600"
                        : ""
                    }`}
                  />
                </button>

                {openDropdown === "dob" && (
                  <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full min-w-[300px] overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[0_20px_45px_-15px_rgba(11,22,40,0.28)] animate-[dropdownIn_.18s_ease-out] sm:w-[320px]">

                    {/* CALENDAR HEADER */}

                    <div className="bg-ember-500 px-4 py-3 text-white">

                      <div className="flex items-center justify-between gap-2">

                        <button
                          type="button"
                          onClick={goPrevMonth}
                          disabled={atMinMonth}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronLeft size={17} />
                        </button>

                        <div className="flex items-center gap-1.5">

                          <select
                            value={calView.month}
                            onChange={(e) =>
                              handleCalMonthChange(
                                e.target.value
                              )
                            }
                            className="cursor-pointer appearance-none rounded-lg bg-white/15 px-2.5 py-1.5 text-center text-sm font-semibold text-white outline-none transition hover:bg-white/25"
                          >
                            {MONTHS.map((month, index) => (
                              <option
                                key={month}
                                value={index}
                                disabled={
                                  calView.year ===
                                    todayParts.year &&
                                  index > todayParts.month
                                }
                                className="text-navy-900"
                              >
                                {month}
                              </option>
                            ))}
                          </select>

                          <select
                            value={calView.year}
                            onChange={(e) =>
                              handleCalYearChange(
                                e.target.value
                              )
                            }
                            className="cursor-pointer appearance-none rounded-lg bg-white/15 px-2.5 py-1.5 text-center text-sm font-semibold text-white outline-none transition hover:bg-white/25"
                          >
                            {calYears.map((year) => (
                              <option
                                key={year}
                                value={year}
                                className="text-navy-900"
                              >
                                {year}
                              </option>
                            ))}
                          </select>

                        </div>

                        <button
                          type="button"
                          onClick={goNextMonth}
                          disabled={atMaxMonth}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronRight size={17} />
                        </button>

                      </div>

                    </div>

                    {/* CALENDAR BODY */}

                    <div className="p-3">

                      {/* WEEKDAYS */}

                      <div className="mb-1 grid grid-cols-7 text-center">
                        {WEEKDAYS.map((day) => (
                          <span
                            key={day}
                            className="py-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy-400"
                          >
                            {day}
                          </span>
                        ))}
                      </div>

                      {/* DAYS */}

                      <div className="grid grid-cols-7 gap-y-1">
                        {calendarCells.map((day, index) => {
                          if (day === null) {
                            return <span key={`empty-${index}`} />;
                          }

                          const iso = toISO(
                            calView.year,
                            calView.month,
                            day
                          );

                          const isSelected = values.dob
                            ? String(values.dob).slice(0, 10) ===
                              iso
                            : false;

                          const isToday = iso === todayIso;
                          const isFuture = iso > todayIso;

                          return (
                            <button
                              key={iso}
                              type="button"
                              disabled={isFuture}
                              onClick={() => selectDobDay(day)}
                              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all duration-150 ${
                                isSelected
                                  ? "bg-ember-500 font-semibold text-white shadow-md shadow-ember-500/30"
                                  : isFuture
                                  ? "cursor-not-allowed text-navy-200"
                                  : isToday
                                  ? "border border-ember-300 font-semibold text-ember-600 hover:bg-ember-50"
                                  : "text-navy-700 hover:bg-ember-50 hover:text-ember-700"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>

                    </div>

                    {/* FOOTER */}

                    <div className="flex items-center justify-between border-t border-navy-100 px-4 py-2.5">

                      <button
                        type="button"
                        onClick={() => {
                          set("dob", "");
                          setOpenDropdown(null);
                        }}
                        className="text-xs font-semibold text-navy-400 transition hover:text-red-500"
                      >
                        Clear
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          set("dob", todayIso);
                          setOpenDropdown(null);
                        }}
                        className="text-xs font-semibold text-ember-600 transition hover:text-ember-700"
                      >
                        Today
                      </button>

                    </div>

                  </div>
                )}

                {errors.dob && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.dob}
                  </p>
                )}
              </div>

              {/* ==========================================
                  GENDER CUSTOM DROPDOWN
              ========================================== */}

              <div
                ref={openDropdown === "gender" ? dropdownRef : null}
                className="relative"
              >
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy-700">
                  <Fingerprint size={15} />
                  Gender
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "gender"
                        ? null
                        : "gender"
                    )
                  }
                  className={`group flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm outline-none transition-all duration-200 ${
                    openDropdown === "gender"
                      ? "border-ember-400 ring-4 ring-ember-100"
                      : "border-navy-100 hover:border-ember-300"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-50 text-ember-600">
                      <Fingerprint size={14} />
                    </span>

                    <span className="font-medium text-navy-800">
                      {values.gender || "Female"}
                    </span>
                  </span>

                  <ChevronDown
                    size={18}
                    className={`text-navy-400 transition-transform duration-200 ${
                      openDropdown === "gender"
                        ? "rotate-180 text-ember-600"
                        : ""
                    }`}
                  />
                </button>

                {openDropdown === "gender" && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-navy-100 bg-white p-1.5 shadow-[0_20px_45px_-15px_rgba(11,22,40,0.28)]">

                    <div className="space-y-0.5">

                      {genders.map((gender) => {
                        const selected =
                          values.gender === gender;

                        return (
                          <button
                            key={gender}
                            type="button"
                            onClick={() =>
                              selectDropdownValue(
                                "gender",
                                gender
                              )
                            }
                            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-all duration-150 ${
                              selected
                                ? "bg-ember-50 font-semibold text-ember-700"
                                : "text-navy-600 hover:bg-navy-50 hover:text-navy-900"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                                  selected
                                    ? "bg-ember-100 text-ember-600"
                                    : "bg-navy-50 text-navy-400"
                                }`}
                              >
                                <User size={13} />
                              </span>

                              {gender}
                            </span>

                            {selected && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ember-500 text-white">
                                <Check size={13} strokeWidth={3} />
                              </span>
                            )}
                          </button>
                        );
                      })}

                    </div>
                  </div>
                )}
              </div>

              {/* ==========================================
                  EMAIL
              ========================================== */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy-700">
                  <Mail size={15} />
                  Email
                </label>

                <div className="relative">
                  <input
                    type="email"
                    value={values.email || ""}
                    onChange={(e) =>
                      set("email", e.target.value)
                    }
                    className={`w-full rounded-xl border bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:ring-2 focus:ring-ember-200 ${
                      errors.email
                        ? "border-red-400"
                        : "border-navy-100 focus:border-ember-400"
                    }`}
                    placeholder="Enter your email"
                  />

                  {ok("email") && (
                    <Check
                      size={17}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
                    />
                  )}
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* ==========================================
                  PHONE
              ========================================== */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy-700">
                  <Phone size={15} />
                  Mobile Number
                </label>

                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={values.phoneNumber || ""}
                    onChange={(e) =>
                      set(
                        "phoneNumber",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    className={`w-full rounded-xl border bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:ring-2 focus:ring-ember-200 ${
                      errors.phoneNumber
                        ? "border-red-400"
                        : "border-navy-100 focus:border-ember-400"
                    }`}
                    placeholder="Enter 10-digit mobile number"
                  />

                  {ok("phoneNumber") && (
                    <Check
                      size={17}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
                    />
                  )}
                </div>

                {errors.phoneNumber && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* ==========================================
                  ADDRESS
              ========================================== */}

              <div className="md:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy-700">
                  <MapPin size={15} />
                  Address
                </label>

                <textarea
                  rows={4}
                  value={values.address || ""}
                  onChange={(e) =>
                    set("address", e.target.value)
                  }
                  className="w-full resize-none rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-ember-400 focus:ring-2 focus:ring-ember-200"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* ACTIONS */}

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-navy-100 pt-5 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={handleReset}
                disabled={saving}
                className="rounded-xl border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-600 transition hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ember-600 to-ember-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ember-600/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>

            </div>
          </form>
        </section>
      </Reveal>

      {/* ==========================================
          CHANGE PASSWORD
      ========================================== */}

      <Reveal>
        <section className="rounded-[24px] border border-navy-100 bg-white p-5 shadow-[0_12px_35px_-22px_rgba(11,22,40,0.35)] sm:p-7">

          <div className="mb-7 flex items-start justify-between gap-4">

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ember-600">
                Account Security
              </p>

              <h2 className="mt-1 text-2xl font-semibold text-navy-900">
                Change Password
              </h2>

              <p className="mt-1 text-sm text-navy-400">
                Update your password to keep your account secure.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-ember-50 p-3 text-ember-600 sm:block">
              <LockKeyhole size={22} />
            </div>

          </div>

          <form onSubmit={handlePasswordSubmit}>

            <div className="grid gap-5 md:grid-cols-3">

              {/* CURRENT PASSWORD */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-navy-700">
                  Current Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showCurrentPassword
                        ? "text"
                        : "password"
                    }
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPassword(
                        "currentPassword",
                        e.target.value
                      )
                    }
                    className={`w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm outline-none transition focus:ring-2 focus:ring-ember-200 ${
                      passwordErrors.currentPassword
                        ? "border-red-400"
                        : "border-navy-100 focus:border-ember-400"
                    }`}
                    placeholder="Current password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 transition hover:text-ember-600"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

                {passwordErrors.currentPassword && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              {/* NEW PASSWORD */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-navy-700">
                  New Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPassword(
                        "newPassword",
                        e.target.value
                      )
                    }
                    className={`w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm outline-none transition focus:ring-2 focus:ring-ember-200 ${
                      passwordErrors.newPassword
                        ? "border-red-400"
                        : "border-navy-100 focus:border-ember-400"
                    }`}
                    placeholder="Minimum 6 characters"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 transition hover:text-ember-600"
                  >
                    {showNewPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

                {passwordErrors.newPassword && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {passwordErrors.newPassword}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-navy-700">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPassword(
                        "confirmPassword",
                        e.target.value
                      )
                    }
                    className={`w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm outline-none transition focus:ring-2 focus:ring-ember-200 ${
                      passwordErrors.confirmPassword
                        ? "border-red-400"
                        : "border-navy-100 focus:border-ember-400"
                    }`}
                    placeholder="Confirm new password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 transition hover:text-ember-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

                {passwordErrors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

            </div>

            <div className="mt-7 flex justify-end border-t border-navy-100 pt-5">

              <button
                type="submit"
                disabled={changingPassword}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {changingPassword ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Updating...
                  </>
                ) : (
                  <>
                    <LockKeyhole size={16} />
                    Update Password
                  </>
                )}
              </button>

            </div>

          </form>
        </section>
      </Reveal>

      {/* ==========================================
          SECURITY NOTE
      ========================================== */}

      <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">

        <CircleCheck
          size={19}
          className="mt-0.5 shrink-0 text-emerald-600"
        />

        <div>
          <p className="font-semibold">
            Your account is protected
          </p>

          <p className="mt-0.5 text-xs text-emerald-700">
            Password changes are securely verified using your
            current password.
          </p>
        </div>

      </div>

    </div>
  );
};

export default MyProfile;