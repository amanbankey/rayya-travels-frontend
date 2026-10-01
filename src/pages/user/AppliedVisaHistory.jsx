import { useState } from "react";
import { Check, Stamp } from "lucide-react";
import Reveal from "../../components/Reveal";

const applications = [
  { id: "VS-5521", country: "United Arab Emirates", type: "Tourist • 30 days", applied: "15 Sep 2026", status: "Processing", step: 2, fee: 6500 },
  { id: "VS-5390", country: "United Kingdom", type: "Standard Visitor • 6 months", applied: "28 Aug 2026", status: "Approved", step: 3, fee: 14200 },
  { id: "VS-5104", country: "Singapore", type: "Tourist • 30 days", applied: "02 Jul 2026", status: "Approved", step: 3, fee: 3200 },
  { id: "VS-4870", country: "Schengen (France)", type: "Short Stay • 15 days", applied: "11 May 2026", status: "Rejected", step: 3, fee: 8900 },
];
const steps = ["Submitted", "Documents Verified", "Processing", "Decision"];
const filters = ["All", "Processing", "Approved", "Rejected"];
const statusStyle = {
  Processing: "bg-ember-50 text-ember-700",
  Approved: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-600",
};

const AppliedVisaHistory = () => {
  const [filter, setFilter] = useState("All");
  const list = applications.filter((v) => filter === "All" || v.status === filter);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-medium text-navy">Applied Visa History</h2>
          <p className="text-sm text-navy-400">Track every visa application you have submitted.</p>
        </div>
        <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-navy-100 bg-white p-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${filter === f ? "bg-navy text-white shadow" : "text-navy-400 hover:text-navy"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((v, i) => {
          const rejected = v.status === "Rejected";
          return (
            <Reveal key={v.id} delay={i * 60}>
              <article className="h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_-14px_rgba(11,22,40,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(11,22,40,0.30)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ember-600 to-ember-400 text-white shadow-md"><Stamp size={20} /></span>
                    <div>
                      <h3 className="font-serif text-xl font-medium text-navy">{v.country}</h3>
                      <p className="text-xs text-navy-400">{v.type}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[v.status]}`}>{v.status}</span>
                </div>

                <ol className="mt-7 grid grid-cols-4">
                  {steps.map((s, idx) => {
                    const done = idx < v.step || (idx === v.step && v.status !== "Processing");
                    const current = idx === v.step && v.status === "Processing";
                    const last = idx === steps.length - 1;
                    return (
                      <li key={s} className="relative flex flex-col items-center text-center">
                        {idx > 0 && <span className={`absolute right-1/2 top-3.5 h-0.5 w-full ${idx <= v.step ? (rejected ? "bg-red-300" : "bg-ember-400") : "bg-navy-100"}`} />}
                        <span className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold ${
                          done ? (rejected && last ? "bg-red-500 text-white" : "bg-ember-600 text-white") : current ? "border-2 border-ember-500 bg-white text-ember-600 ring-4 ring-ember-100" : "border border-navy-100 bg-navy-50/60 text-navy-400"
                        }`}>
                          {done ? <Check size={14} /> : idx + 1}
                        </span>
                        <span className="mt-2 px-1 text-[10px] leading-tight text-navy-400">{s}</span>
                      </li>
                    );
                  })}
                </ol>

                <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-dashed border-navy-100 pt-4 text-sm">
                  <div><dt className="text-xs text-navy-400">Application</dt><dd className="font-medium text-navy">{v.id}</dd></div>
                  <div><dt className="text-xs text-navy-400">Applied on</dt><dd className="font-medium text-navy">{v.applied}</dd></div>
                  <div className="text-right"><dt className="text-xs text-navy-400">Fee</dt><dd className="font-medium text-ember-600">₹{v.fee.toLocaleString("en-IN")}</dd></div>
                </dl>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

export default AppliedVisaHistory;