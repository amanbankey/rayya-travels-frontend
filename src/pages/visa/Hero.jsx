import { useState } from "react";
import { ArrowRight, Briefcase, Calendar, CheckCircle2, MapPin, Plane, ShieldCheck, Users, Zap } from "lucide-react";
import { submitForm } from "../../services/api";

const visaTypes = [
  { key: "tourist", label: "Tourist Visa", icon: Plane },
  { key: "business", label: "Business & Delegation", icon: Briefcase },
  { key: "expedited", label: "Expedited / Express", icon: Zap },
];

const initialValues = {
  visaType: "tourist",
  destination: "Dubai, United Arab Emirates",
  entryCategory: "30-Day Single Entry eVisa",
  travelFrom: "2026-11-15",
  travelTo: "2026-11-30",
  travellers: "2 Travellers",
  passport: "Indian Passport",
};

const fieldClass = "mt-1 w-full bg-transparent text-[15px] font-medium text-ink outline-none";
const labelClass = "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-brown";

const VisaHero = () => {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await submitForm("/visa/check-requirements", values);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="relative overflow-hidden bg-dark pb-40 pt-16 sm:pb-48 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />

      <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-peach" /> Global Immigration & Entry Desk
        </span>

        <h1 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
          Your Visa Journey <span className="italic text-peach">Starts Here</span>
        </h1>

        <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/80">
          Fast, verified visa processing and document support for seamless global entry. Curated for international
          itineraries with zero friction.
        </p>

        {/* <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-white/75">
          <li className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-brown" /> Authorized Desk
          </li>
          <li className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-brown" /> 256-bit Document Vault
          </li>
          <li className="flex items-center gap-1.5">
            <Zap size={15} className="text-brown" /> Priority Consulate Queues
          </li>
        </ul> */}
      </div>

      <div className="relative mx-auto -mt-2 max-w-[1150px] px-4 sm:mt-4 sm:px-8">
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 shadow-2xl sm:p-6">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {visaTypes.map((type) => {
              const Icon = type.icon;
              const active = values.visaType === type.key;

              return (
                <button
                  type="button"
                  key={type.key}
                  onClick={() => setValues({ ...values, visaType: type.key })}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-dark text-white" : "bg-oat text-ink/70 hover:bg-mist"
                  }`}
                >
                  <Icon size={14} /> {type.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid gap-3 rounded-xl bg-oat p-3 lg:grid-cols-4">
            <label className="rounded-lg bg-white px-4 py-3">
              <span className={labelClass}>
                <MapPin size={13} /> Destination
              </span>
              <input name="destination" value={values.destination} onChange={handleChange} className={fieldClass} />
              <span className="mt-0.5 block text-xs text-ink/50">Popular: UAE, UK, Singapore, US</span>
            </label>

            <label className="rounded-lg bg-white px-4 py-3">
              <span className={labelClass}>
                <ShieldCheck size={13} /> Entry Category
              </span>
              <select name="entryCategory" value={values.entryCategory} onChange={handleChange} className={fieldClass}>
                <option>30-Day Single Entry eVisa</option>
                <option>90-Day Multiple Entry Visa</option>
                <option>Long Stay Visitor Visa</option>
              </select>
              <span className="mt-0.5 block text-xs text-ink/50">Instant eVisa Eligible</span>
            </label>

            <label className="rounded-lg bg-white px-4 py-3">
              <span className={labelClass}>
                <Calendar size={13} /> Intended Travel Date
              </span>
              <span className="mt-1 flex items-center gap-2">
                <input type="date" name="travelFrom" value={values.travelFrom} onChange={handleChange} className={fieldClass} />
                <input type="date" name="travelTo" value={values.travelTo} onChange={handleChange} className={fieldClass} />
              </span>
              <span className="mt-0.5 block text-xs text-ink/50">Recommended: Apply 15+ days ahead</span>
            </label>

            <label className="rounded-lg bg-white px-4 py-3">
              <span className={labelClass}>
                <Users size={13} /> Applicants & Passport
              </span>
              <span className="mt-1 flex items-center gap-2">
                <select
                  name="travellers"
                  value={values.travellers}
                  onChange={handleChange}
                  className="w-full bg-transparent text-[15px] font-medium text-ink outline-none"
                >
                  <option>1 Traveller</option>
                  <option>2 Travellers</option>
                  <option>4 Travellers</option>
                </select>
                <select
                  name="passport"
                  value={values.passport}
                  onChange={handleChange}
                  className="w-full bg-transparent text-[15px] font-medium text-ink outline-none"
                >
                  <option>Indian Passport</option>
                  <option>US Passport</option>
                  <option>UK Passport</option>
                </select>
              </span>
              <span className="mt-0.5 block text-xs text-ink/50">Biometrics & Photo Guidance Included</span>
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-1.5 text-xs text-ink/70">
              <CheckCircle2 size={14} className="text-emerald-600" /> Diplomatic embassy standards • Guaranteed
              real-time tracking
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 rounded-lg bg-dark px-6 py-4 text-sm font-medium text-white transition-all hover:bg-ink hover:shadow-lg disabled:opacity-60"
            >
              {status === "loading" ? "Checking" : "Check Visa Requirements"} <ArrowRight size={15} />
            </button>
          </div>

          {status === "success" && (
            <p className="mt-3 rounded-lg bg-badge px-4 py-2.5 text-center text-sm font-medium text-badgetext">
              Requirements request received. Our visa desk will confirm the exact document list shortly.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-center text-sm font-medium text-red-700">
              Unable to submit right now. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default VisaHero;