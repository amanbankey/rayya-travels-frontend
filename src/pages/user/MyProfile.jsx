import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Check,
  CircleCheck,
  Globe,
  Home,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  Fingerprint,
  Contact,
} from "lucide-react";
import Reveal from "../../components/Reveal";

const countries = [
  "India",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
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

const validate = (v) => {
  const e = {};

  if (!v.fullName?.trim()) {
    e.fullName = "Full name is required";
  }

  if (v.dob && new Date(v.dob) > new Date()) {
    e.dob = "Date of birth cannot be in the future";
  }

  if (!/^\S+@\S+\.\S+$/.test(v.email || "")) {
    e.email = "Enter a valid email";
  }

  if (!/^[6-9]\d{9}$/.test(v.phoneNumber || "")) {
    e.phoneNumber = "Enter a valid 10-digit mobile number";
  }

  return e;
};

const inputClass =
  "w-full bg-transparent text-sm text-navy outline-none placeholder:text-navy-300";

const Field = ({
  label,
  required,
  icon: Icon,
  error,
  valid,
  children,
}) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-navy">
      {label}{" "}
      {required && <span className="text-red-500">*</span>}
    </label>

    <div
      className={`flex items-center gap-3 rounded-xl border bg-navy-50/60 px-3 py-2.5 transition-all focus-within:border-ember-500 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(233,125,52,0.18)] ${
        error
          ? "border-red-300 bg-red-50/40"
          : "border-navy-100 hover:border-ember-300"
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-soft to-badge text-ember-600">
        <Icon size={16} />
      </span>

      {children}

      {valid && (
        <CircleCheck
          size={18}
          className="shrink-0 text-emerald-500"
        />
      )}
    </div>

    {error && (
      <p className="mt-1 text-xs text-red-500">
        {error}
      </p>
    )}
  </div>
);

const Section = ({
  icon: Icon,
  title,
  hint,
  children,
}) => (
  <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-[0_8px_30px_-14px_rgba(11,22,40,0.18)] sm:p-7">

    <div className="mb-6 flex items-center gap-3">

      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ember-600 to-ember-400 text-white shadow-lg shadow-ember-600/30">
        <Icon size={18} />
      </span>

      <div className="flex-1">
        <h3 className=" text-xl font-medium text-navy">
          {title}
        </h3>
      </div>

      <span className="hidden rounded-full bg-oat px-3 py-1 text-xs text-navy-400 sm:block">
        {hint}
      </span>

    </div>

    {children}
  </section>
);

const MyProfile = () => {
  const { profile, updateProfile } = useOutletContext();

  const [values, setValues] = useState(profile);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const found = validate(values);

    setErrors(found);

    if (Object.keys(found).length) {
      toast.error(
        "Please fix the highlighted fields"
      );
      return;
    }

    setSaving(true);

    /*
     * Currently this updates the dashboard/localStorage state.
     *
     * Your backend does not currently have a
     * PUT/PATCH profile update endpoint.
     */

    setTimeout(() => {
      updateProfile(values);

      setSaving(false);

      toast.success(
        "Profile saved successfully"
      );
    }, 600);
  };

  const handleReset = () => {
    setValues(profile);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >

      {/* ==========================================
          IDENTITY DETAILS
      ========================================== */}

      <Reveal delay={60}>
        <Section
          icon={Fingerprint}
          title="Identity Details"
          hint="Personal Information"
        >

          <div className="grid gap-5 md:grid-cols-2">

            {/* Full Name */}

            <Field
              label="Full Name"
              required
              icon={User}
              error={errors.fullName}
              valid={ok("fullName")}
            >
              <input
                className={inputClass}
                value={values.fullName || ""}
                onChange={(e) =>
                  set(
                    "fullName",
                    e.target.value
                  )
                }
                placeholder="Enter full name"
              />
            </Field>

            {/* Country */}

            <Field
              label="Country"
              required
              icon={Globe}
            >
              <select
                className={`${inputClass} cursor-pointer`}
                value={
                  values.country || "India"
                }
                onChange={(e) =>
                  set(
                    "country",
                    e.target.value
                  )
                }
              >
                {countries.map((country) => (
                  <option
                    key={country}
                    value={country}
                  >
                    {country}
                  </option>
                ))}
              </select>
            </Field>

            {/* DOB */}

            <Field
              label="Date of Birth"
              icon={CalendarDays}
              error={errors.dob}
              valid={ok("dob")}
            >
              <input
                type="date"
                className={inputClass}
                value={values.dob || ""}
                max={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) =>
                  set(
                    "dob",
                    e.target.value
                  )
                }
              />
            </Field>

            {/* Gender */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Gender
              </label>

              <div className="grid grid-cols-3 gap-2">
                {genders.map((g) => {
                  const active =
                    values.gender === g;

                  return (
                    <button
                      type="button"
                      key={g}
                      onClick={() =>
                        set("gender", g)
                      }
                      className={`flex h-[58px] items-center justify-center gap-1.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        active
                          ? "border-transparent bg-gradient-to-br from-ember-600 to-ember-400 text-white shadow-lg shadow-ember-600/25"
                          : "border-navy-100 bg-navy-50/60 text-navy-400 hover:-translate-y-0.5 hover:border-ember-300 hover:text-ember-600"
                      }`}
                    >
                      {active && (
                        <Check size={15} />
                      )}

                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </Section>
      </Reveal>

      {/* ==========================================
          CONTACT DETAILS
      ========================================== */}

      <Reveal delay={100}>
        <Section
          icon={Contact}
          title="Contact Details"
          hint="Tickets and updates are sent here"
        >

          <div className="grid gap-5 md:grid-cols-2">

            {/* Email */}

            <Field
              label="Email Address"
              required
              icon={Mail}
              error={errors.email}
              valid={ok("email")}
            >
              <input
                type="email"
                className={inputClass}
                value={values.email || ""}
                onChange={(e) =>
                  set(
                    "email",
                    e.target.value
                  )
                }
                placeholder="you@example.com"
              />
            </Field>

            {/* Phone */}

            <Field
              label="Mobile Number"
              required
              icon={Phone}
              error={errors.phoneNumber}
              valid={ok("phoneNumber")}
            >

              <span className="border-r border-navy-100 pr-3 text-sm font-medium text-navy-400">
                +91
              </span>

              <input
                inputMode="numeric"
                maxLength={10}
                className={inputClass}
                value={
                  values.phoneNumber || ""
                }
                onChange={(e) =>
                  set(
                    "phoneNumber",
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="98765 43210"
              />

            </Field>

          </div>
        </Section>
      </Reveal>

      {/* ==========================================
          ADDRESS
      ========================================== */}

      <Reveal delay={140}>
        <Section
          icon={MapPin}
          title="Address"
          hint="Optional"
        >

          <div className="grid gap-5">

            <Field
              label="Street Address"
              icon={Home}
              valid={ok("address")}
            >
              <input
                className={inputClass}
                value={values.address || ""}
                onChange={(e) =>
                  set(
                    "address",
                    e.target.value
                  )
                }
                placeholder="House no., street, area"
              />
            </Field>

          </div>
        </Section>
      </Reveal>

      {/* ==========================================
          SAVE / RESET
      ========================================== */}

      <Reveal delay={180}>
        <div className="flex flex-col-reverse items-center justify-end gap-4 rounded-2xl border border-navy-100 bg-ember-50/40 p-5 sm:flex-row">

          <div className="flex w-full gap-3 sm:w-auto">

            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-full border border-navy-100 bg-white px-6 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-oat sm:flex-none"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember-600 to-ember-400 px-8 py-2.5 text-sm font-medium text-white shadow-lg shadow-ember-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 sm:flex-none"
            >
              <Save size={15} />

              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>
        </div>
      </Reveal>

    </form>
  );
};

export default MyProfile;