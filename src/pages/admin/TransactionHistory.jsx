import React, { useState } from "react";
import {
  Search,
  Plus,
  FileText,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

const transactions = [
  { id: "#161", date: "Sep 01, 2026 • 14:32", agent: "Rayya Travels", ref: "a1be9f2c", purpose: "Ticket Booking", amount: "-₹23,000.00", balance: "₹29,500.00", credit: false },
  { id: "#159", date: "Aug 12, 2026 • 09:15", agent: "Rayya Travels", ref: "5169a8b", purpose: "Wallet Adjustment", amount: "+₹48,042.78", balance: "₹52,500.00", credit: true },
  { id: "#158", date: "Aug 10, 2026 • 11:20", agent: "Rayya Travels", ref: "F-A1099", purpose: "Ticket Booking", amount: "-₹9,743.50", balance: "₹4,457.22", credit: false },
  { id: "#154", date: "Jul 22, 2026 • 08:05", agent: "Rayya Travels", ref: "1784c9", purpose: "Wallet Recharge", amount: "+₹5.00", balance: "₹14,200.72", credit: true },
];

const SummaryCard = ({ icon: Icon, label, value, valueClass = "text-navy-900", dark = false }) => (
  <div
    className={`relative overflow-hidden rounded-3xl p-5 border ${
      dark ? "bg-navy-900 border-transparent shadow-xl" : "bg-white border-navy-100 shadow-card"
    }`}
  >
    <div className="relative flex items-center gap-4">
      <span
        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white ${
          dark ? "bg-ember-500" : "bg-navy-900"
        }`}
      >
        <Icon size={20} />
      </span>
      <div>
        <p className={`text-[11px] font-semibold tracking-[0.18em] ${dark ? "text-navy-200" : "text-navy-500"}`}>{label}</p>
        <p className={`text-2xl font-extrabold leading-tight ${dark ? "text-white" : valueClass}`}>{value}</p>
      </div>
    </div>
  </div>
);

export const TransactionHistoryPage = () => {
  const [agentQ, setAgentQ] = useState("");
  const [refQ, setRefQ] = useState("");
  const [type, setType] = useState("all");

  const shown = transactions.filter(
    (t) =>
      t.agent.toLowerCase().includes(agentQ.toLowerCase()) &&
      `${t.id} ${t.ref}`.toLowerCase().includes(refQ.toLowerCase()) &&
      (type === "all" || (type === "credit") === t.credit)
  );

  const reset = () => { setAgentQ(""); setRefQ(""); setType("all"); };
  const pill = "w-full bg-[#EEF3F7]/60 border border-navy-100 rounded-full pl-11 pr-4 py-3.5 text-sm text-navy-800 outline-none focus:border-ember-400";

  return (
    <div className="p-4 sm:p-6 lg:pl-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          {/*<p className="text-sm text-navy-400 mb-3">
            Finance <span className="mx-2">/</span> Wallets &amp; Ledgers <span className="mx-2">/</span>
            <span className="text-ember-600 font-semibold">Transaction History</span>
          </p>*/}
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-2xl bg-ember-500 text-white flex items-center justify-center shadow-lg shadow-ember-500/30">
              <Wallet size={24} />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold text-navy-900 leading-tight">Transaction History</h1>
              <p className="text-navy-400">Track wallet credits, debits and agent balances.</p>
            </div>
          </div>
        </div>
        {/*<button className="flex items-center gap-2 bg-ember-500 shadow-lg shadow-ember-500/30 text-white text-sm font-bold px-6 py-3 rounded-full">
          <Plus size={16} /> Manual Adjustment
        </button>*/}
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <SummaryCard icon={FileText} label="TOTAL TRANSACTIONS" value="161" />
        <SummaryCard icon={TrendingUp} label="TOTAL CREDITS" value="₹1,28,450.00" valueClass="text-emerald-600" />
        <SummaryCard icon={TrendingDown} label="TOTAL DEBITS" value="₹89,720.00" valueClass="text-red-500" />
        <SummaryCard icon={Wallet} label="ACTIVE BALANCE" value="₹29,500.00" dark />
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-3xl border border-navy-100 shadow-card p-6 mb-5">
        <div className="flex items-center gap-4 pb-5 mb-5 border-b border-navy-50">
          <span className="w-11 h-11 rounded-xl bg-navy-900 text-white flex items-center justify-center"><Search size={18} /></span>
          <div>
            <p className="font-bold text-navy-900">Filter Transactions</p>
            <p className="text-sm text-navy-400">Find entries by agent, transaction ID, PNR or type</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300" />
            <input value={agentQ} onChange={(e) => setAgentQ(e.target.value)} placeholder="Search Agent..." className={pill} />
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300" />
            <input value={refQ} onChange={(e) => setRefQ(e.target.value)} placeholder="Transaction ID / PNR" className={pill} />
          </div>
          <div className="relative">
            <select value={type} onChange={(e) => setType(e.target.value)} className="appearance-none bg-[#EEF3F7]/60 border border-navy-100 rounded-full pl-5 pr-10 py-3.5 text-sm font-medium text-navy-800 outline-none focus:border-ember-400">
              <option value="all">All Types</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
          </div>
          <button onClick={reset} className="flex items-center gap-2 border border-navy-100 text-navy-800 text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-ember-50">
            <RefreshCw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-navy-100 shadow-card overflow-hidden">
        <div className="flex items-center justify-between gap-3 bg-navy-900 px-6 py-5">
          <div>
            <p className="font-bold text-white text-lg">Wallet Transactions</p>
            <p className="text-sm text-navy-200">Complete ledger of agent wallet activity</p>
          </div>
          <span className="bg-white/10 border border-white/10 text-ember-300 text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
            {shown.length} Records
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-[#EEF3F7] text-left text-[11px] font-bold tracking-widest text-navy-500">
                <th className="px-6 py-4">TRANSACTION</th>
                <th className="px-6 py-4">AGENT</th>
                <th className="px-6 py-4">REFERENCE &amp; PURPOSE</th>
                <th className="px-6 py-4">AMOUNT</th>
                <th className="px-6 py-4">BALANCE</th>
                <th className="px-6 py-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {shown.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-navy-400">No transactions found.</td></tr>
              )}
              {shown.map((tx) => (
                <tr key={tx.id} className="border-t border-navy-50 hover:bg-ember-50/40">
                  <td className="px-6 py-4">
                    <p className="font-bold text-navy-900">{tx.id}</p>
                    <p className="text-xs text-navy-400">{tx.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-navy-900 text-ember-300 text-xs font-bold flex items-center justify-center">
                        {tx.agent.charAt(0)}
                      </span>
                      <span className="font-medium text-navy-800">{tx.agent}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-navy-50 text-navy-600 text-xs font-mono px-2.5 py-1 rounded-lg">{tx.ref}</span>
                      <span className="bg-ember-50 text-ember-700 text-xs font-semibold px-3 py-1 rounded-full">{tx.purpose}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`font-bold ${tx.credit ? "text-emerald-600" : "text-red-500"}`}>{tx.amount}</p>
                    <p className={`flex items-center gap-1 text-xs ${tx.credit ? "text-emerald-500" : "text-red-400"}`}>
                      {tx.credit ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />} {tx.credit ? "Credit" : "Debit"}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-navy-900">{tx.balance}</td>
                  <td className="px-6 py-4 text-navy-300">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};