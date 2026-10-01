import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import Reveal from "../../components/Reveal";

const transactions = [
  { id: "TXN-90231", title: "Wallet top-up", note: "UPI • Ref 4471820", date: "24 Sep 2026", amount: 50000, type: "credit" },
  { id: "TXN-90188", title: "Flight booking BK-20841", note: "BHO → DXB", date: "22 Sep 2026", amount: 48200, type: "debit" },
  { id: "TXN-89917", title: "Visa application fee", note: "UAE Tourist Visa", date: "15 Sep 2026", amount: 6500, type: "debit" },
  { id: "TXN-89540", title: "Refund • BK-19402", note: "Cancelled booking", date: "08 Jun 2026", amount: 5980, type: "credit" },
  { id: "TXN-89122", title: "Wallet top-up", note: "Net banking • Ref 3320981", date: "01 Jun 2026", amount: 25000, type: "credit" },
];
const filters = ["All", "Credit", "Debit"];

const WalletHistory = () => {
  const [filter, setFilter] = useState("All");
  const list = transactions.filter((t) => filter === "All" || t.type === filter.toLowerCase());
  const credits = transactions.filter((t) => t.type === "credit").reduce((a, t) => a + t.amount, 0);
  const debits = transactions.filter((t) => t.type === "debit").reduce((a, t) => a + t.amount, 0);
  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-medium text-navy">Wallet History</h2>
          <p className="text-sm text-navy-400">Every top-up, payment and refund.</p>
        </div>
        <div className="flex gap-1 rounded-full border border-navy-100 bg-white p-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${filter === f ? "bg-navy text-white shadow" : "text-navy-400 hover:text-navy"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <Reveal>
        <div className="mb-5 grid gap-4 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-navy to-navy-700 p-6 text-white shadow-[0_18px_40px_-20px_rgba(11,22,40,0.7)] md:col-span-1">
            <span className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-ember-500/40 blur-2xl" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-ember-600 to-ember-400"><Wallet size={20} /></span>
            <p className="relative mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ember-300">Available balance</p>
            <p className="relative font-serif text-4xl font-medium">{fmt(credits - debits)}</p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_30px_-14px_rgba(11,22,40,0.18)]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><TrendingUp size={20} /></span>
            <div><p className="text-xs text-navy-400">Total credited</p><p className="font-serif text-2xl font-medium text-emerald-600">{fmt(credits)}</p></div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_30px_-14px_rgba(11,22,40,0.18)]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember-50 text-ember-600"><TrendingDown size={20} /></span>
            <div><p className="text-xs text-navy-400">Total spent</p><p className="font-serif text-2xl font-medium text-navy">{fmt(debits)}</p></div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="divide-y divide-navy-50 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-14px_rgba(11,22,40,0.18)]">
          {list.map((t) => {
            const credit = t.type === "credit";
            return (
              <div key={t.id} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-ember-50/50 sm:px-7 sm:py-5">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 ${credit ? "bg-emerald-50 text-emerald-600" : "bg-ember-50 text-ember-700"}`}>
                  {credit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-navy">{t.title}</p>
                  <p className="truncate text-xs text-navy-400">{t.note} • {t.id}</p>
                </div>
                <div className="text-right">
                  <p className={`font-serif text-xl font-medium ${credit ? "text-emerald-600" : "text-navy"}`}>
                    {credit ? "+" : "−"}₹{t.amount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-navy-400">{t.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
};

export default WalletHistory;