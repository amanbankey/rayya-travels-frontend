import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { CalendarDays, Check, CircleCheck, Globe, Home, Info, Mail, MapPin, Phone, Save, User, Fingerprint, Contact, Map } from "lucide-react";
import Reveal from "../../components/Reveal";

const countries = [
  "India", "United Arab Emirates", "United Kingdom", "United States", "Canada",
  "Australia", "Singapore", "Malaysia", "Thailand", "Saudi Arabia", "Qatar", "Other",
];
const genders = ["Male", "Female", "Others"];

const validate = (v) => {
  const e = {};
  if (!v.fullName.trim()) e.fullName = "Full name is required";
  if (!v.dob) e.dob = "Date of birth is required";
  else if (new Date(v.dob) > new Date()) e.dob = "Date of birth cannot be in the future";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email";
  if (!/^[6-9]\d{9}$/.test(v.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
  if (v.pincode && !/^\d{6}$/.test(v.pincode)) e.pincode = "Enter a 6-digit pincode";
  return e;
};

const inputClass = "w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/60";

const Field = ({ label, required, icon: Icon, error, valid, children }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-ink">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div
      className={`flex items-center gap-3 rounded-xl border bg-paper px-3 py-2.5 transition-all focus-within:border-brown focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(122,88,50,0.10)] ${
        error ? "border-red-300 bg-red-50/40" : "border-line hover:border-sand/60"
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-soft to-badge text-brown">
        <Icon size={16} />
      </span>
      {children}
      {valid && <CircleCheck size={18} className="shrink-0 text-emerald-500" />}
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const Section = ({ icon: Icon, title, hint, children }) => (
  <section className="rounded-2xl border border-line/70 bg-white p-5 shadow-card sm:p-7">
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-dark text-peach shadow-md">
        <Icon size={18} />
      </span>
      <div className="flex-1">
        <h3 className="font-serif text-xl font-medium text-ink">{title}</h3>
      </div>
      <span className="hidden rounded-full bg-oat px-3 py-1 text-xs text-muted sm:block">{hint}</span>
    </div>
    {children}
  </section>
);

const MyProfile = () => {
  const { profile, updateProfile, percent } = useOutletContext();
  const [values, setValues] = useState(profile);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const set = (key, val) => {
    setValues((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };
  const ok = (key) => !!String(values[key] || "").trim() && !validate(values)[key];

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return toast.error("Please fix the highlighted fields");
    setSaving(true);
    setTimeout(() => {
      updateProfile(values);
      setSaving(false);
      toast.success("Profile saved successfully");
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Reveal>
        <div className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-gradient-to-r from-ivory to-badge/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">Personal Information</h2>
            <p className="text-sm text-muted">Used on your tickets and visa applications.</p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-badgetext/20 bg-white px-3.5 py-1.5 text-xs font-medium text-badgetext shadow-sm">
            <Info size={13} /> Must match your passport
          </span>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <Section icon={Fingerprint} title="Identity Details" hint="As printed on your passport">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full Name" required icon={User} error={errors.fullName} valid={ok("fullName")}>
              <input className={inputClass} value={values.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Enter full name" />
            </Field>

            <Field label="Nationality" required icon={Globe}>
              <select className={`${inputClass} cursor-pointer`} value={values.nationality} onChange={(e) => set("nationality", e.target.value)}>
                {countries.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>

            <Field label="Date of Birth" required icon={CalendarDays} error={errors.dob} valid={ok("dob")}>
              <input type="date" className={inputClass} value={values.dob} max={new Date().toISOString().split("T")[0]} onChange={(e) => set("dob", e.target.value)} />
            </Field>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Gender <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {genders.map((g) => {
                  const active = values.gender === g;
                  return (
                    <button
                      type="button"
                      key={g}
                      onClick={() => set("gender", g)}
                      className={`flex h-[58px] items-center justify-center gap-1.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        active
                          ? "border-transparent bg-gradient-to-br from-dark to-brown text-white shadow-lg shadow-brown/25"
                          : "border-line bg-paper text-muted hover:-translate-y-0.5 hover:border-sand hover:text-brown"
                      }`}
                    >
                      {active && <Check size={15} />} {g}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>
      </Reveal>

      <Reveal delay={100}>
        <Section icon={Contact} title="Contact Details" hint="Tickets and updates are sent here">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Email Address" required icon={Mail} error={errors.email} valid={ok("email")}>
              <input type="email" className={inputClass} value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
            </Field>
            <Field label="Mobile Number" required icon={Phone} error={errors.mobile} valid={ok("mobile")}>
              <span className="border-r border-line pr-3 text-sm font-medium text-muted">+91</span>
              <input inputMode="numeric" maxLength={10} className={inputClass} value={values.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, ""))} placeholder="98765 43210" />
            </Field>
          </div>
        </Section>
      </Reveal>

      <Reveal delay={140}>
        <Section icon={Map} title="Address" hint="Optional">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Field label="Street Address" icon={Home} valid={ok("address")}>
                <input id="address" className={inputClass} value={values.address} onChange={(e) => set("address", e.target.value)} placeholder="House no., street, area" />
              </Field>
            </div>
            <Field label="City" icon={MapPin} valid={ok("city")}>
              <input className={inputClass} value={values.city} onChange={(e) => set("city", e.target.value)} placeholder="City" />
            </Field>
            <Field label="Pincode" icon={MapPin} error={errors.pincode} valid={ok("pincode")}>
              <input inputMode="numeric" maxLength={6} className={inputClass} value={values.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} placeholder="462001" />
            </Field>
          </div>
        </Section>
      </Reveal>

      <Reveal delay={180}>
        <div className="flex flex-col-reverse items-center justify-between gap-4 rounded-2xl border border-line/70 bg-ivory p-5 sm:flex-row">
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <div className="h-2 w-full overflow-hidden rounded-full bg-mist sm:w-40">
              <div className="h-full rounded-full bg-gradient-to-r from-sand to-brown transition-all duration-700" style={{ width: `${percent}%` }} />
            </div>
            <span className="whitespace-nowrap text-xs text-muted">{percent}% complete</span>
          </div>
          <div className="flex w-full gap-3 sm:w-auto">
            <button type="button" onClick={() => { setValues(profile); setErrors({}); }} className="flex-1 rounded-full border border-line bg-white px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-oat sm:flex-none">
              Reset
            </button>
            <button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-dark to-brown px-8 py-2.5 text-sm font-medium text-white shadow-lg shadow-brown/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 sm:flex-none">
              <Save size={15} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </Reveal>
    </form>
  );
};

export default MyProfile;
