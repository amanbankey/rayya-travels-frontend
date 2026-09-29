import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
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

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-medium text-ink">Wallet History</h2>
          <p className="text-sm text-muted">Every top-up, payment and refund.</p>
        </div>
        <div className="flex gap-1 rounded-full border border-line bg-white p-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${filter === f ? "bg-dark text-white shadow" : "text-muted hover:text-ink"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <Reveal>
        <div className="divide-y divide-line overflow-hidden rounded-2xl bg-white shadow-card">
          {list.map((t) => {
            const credit = t.type === "credit";
            return (
              <div key={t.id} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-ivory sm:px-7 sm:py-5">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 ${credit ? "bg-emerald-50 text-emerald-600" : "bg-badge text-badgetext"}`}>
                  {credit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink">{t.title}</p>
                  <p className="truncate text-xs text-muted">{t.note} • {t.id}</p>
                </div>
                <div className="text-right">
                  <p className={`font-serif text-xl font-medium ${credit ? "text-emerald-600" : "text-ink"}`}>
                    {credit ? "+" : "−"}₹{t.amount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted">{t.date}</p>
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
