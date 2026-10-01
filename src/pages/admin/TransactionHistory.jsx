import React, { useState } from "react";
import {
  X,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Grid3x3,
  Plus,
  Download,
  Filter,
  Eye,
  Pencil,
  FileText,
  Image as ImageIcon,
  CreditCard,
  Ticket,
  BedDouble,
  Save,
  Edit2,
  Plane,
  Wallet,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
 
import { TopBarActions } from "../../components/admin/TopBarActions";
import { Breadcrumb } from "../../components/admin/BreadCrumb";
import { StatCard } from "../../components/admin/StatCard";

import { StatusBadge } from "../../components/admin/StatusBadge";

const transactions = [
  { id: "#161", date: "Sep 01, 2026 • 14:32", agent: "Vivan Travels", ref: "a1be9f2c", purpose: "Ticket Booking", amount: "-₹23,000.00", balance: "₹29,500.00", credit: false },
  { id: "#159", date: "Aug 12, 2026 • 09:15", agent: "Vivan Travels", ref: "5169a8b", purpose: "Wallet Adjustment", amount: "+₹48,042.78", balance: "₹52,500.00", credit: true },
  { id: "#158", date: "Aug 10, 2026 • 11:20", agent: "Vivan Travels", ref: "F-A1099", purpose: "Ticket Booking", amount: "-₹9,743.50", balance: "₹4,457.22", credit: false },
  { id: "#154", date: "Jul 22, 2026 • 08:05", agent: "Vivan Travels", ref: "1784c9", purpose: "Wallet Recharge", amount: "+₹5.00", balance: "₹14,200.72", credit: true },
];
 

const FilterBar = ({ children }) => (
  <div className="flex flex-wrap items-center gap-3 bg-white border border-stone-200 rounded-2xl p-3 mb-4">{children}</div>
);
export const TransactionHistoryPage = () => {
  return (
    <div className="overflow-y-auto w-full bg-stone-50">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200">
        <Breadcrumb items={["Finance", "Wallets & Ledgers", "Transaction History"]} badge="161 Records" />
        <TopBarActions>
          <button className="flex items-center gap-2 bg-navy-900 text-white text-sm font-semibold px-4 py-2 rounded-xl">
            <Plus size={15} /> Manual Adjustment
          </button>
          <button className="text-stone-400 hover:text-stone-600">
            <Grid3x3 size={18} />
          </button>
        </TopBarActions>
      </div>
 
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <StatCard label="TOTAL TRANSACTIONS" value="161" />
          <StatCard label="TOTAL CREDITS" value="₹1,28,450.00" valueClass="text-emerald-600" />
          <StatCard label="TOTAL DEBITS" value="₹89,720.00" valueClass="text-red-500" />
          <StatCard label="ACTIVE BALANCE" value="₹29,500.00" dark />
        </div>
 
        <FilterBar>
          <div className="flex items-center gap-2 border border-stone-200 rounded-xl px-3 py-2 flex-1 min-w-[160px]">
            <Search size={14} className="text-stone-400" />
            <input placeholder="Search Agent..." className="text-sm outline-none flex-1" />
          </div>
          <div className="flex items-center gap-2 border border-stone-200 rounded-xl px-3 py-2 flex-1 min-w-[160px]">
            <input placeholder="Transaction ID / PNR" className="text-sm outline-none flex-1" />
          </div>
          <button className="flex items-center gap-2 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-600">
            All Types <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-600">
            All Channels <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-600">
            Date Range
          </button>
        </FilterBar>
 
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden overflow-x-auto shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-bold tracking-wide text-stone-500 border-b border-stone-100 bg-stone-50">
                <th className="px-4 py-3">Transaction</th>
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Reference & Purpose</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-stone-50 last:border-0 transition-colors hover:bg-[#FDF6F0]">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-navy-900">{tx.id}</p>
                    <p className="text-xs text-stone-400">{tx.date}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-ember-100 text-ember-700 text-[10px] font-bold flex items-center justify-center">
                        V
                      </span>
                      <span className="text-navy-800">{tx.agent}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-stone-100 text-stone-600 text-xs font-mono px-2 py-0.5 rounded-lg">{tx.ref}</span>
                      <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">{tx.purpose}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className={`font-semibold ${tx.credit ? "text-emerald-600" : "text-red-500"}`}>{tx.amount}</p>
                    <p className={`flex items-center gap-1 text-xs ${tx.credit ? "text-emerald-500" : "text-red-400"}`}>
                      {tx.credit ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />} {tx.credit ? "Credit" : "Debit"}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-medium text-navy-800">{tx.balance}</td>
                  <td className="px-4 py-3 text-stone-300">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};