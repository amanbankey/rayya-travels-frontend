
import React, { useState } from "react";
import {
  FiX,
  FiChevronRight,
  FiCopy,
  FiCheckCircle,
  FiMapPin,
  FiBriefcase,
  FiFileText,
  FiCreditCard,
  FiPlus,
  FiEdit2,
  FiMail,
  FiPhone,
  FiShield,
  FiGlobe,
  FiUser,
  FiDollarSign,
} from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

const configuredVisa = {
  from: "India",
  to: "UAE",
  title: "Dubai Visa | 30 Days",
  status: "Active",
  entryType: "Single",
  validity: "60 Days",
  sla: "2-5 Working Days",
  stayPeriod: "30 Days",
  documents: [
    "Passport (Front & Back)",
    "Passport Size Photo",
    "PAN Card",
  ],
  retailPrice: "₹7,150",
  agentPriceAdult: "₹6,880",
  agentPriceChild: "₹1,300",
  margin: "-₹270",
};

const AgentProfileDrawer = ({ agent, onClose }) => {
  const [view, setView] = useState("profile");

  if (!agent) return null;

  const agentName =
    agent.companyName ||
    agent.fullName ||
    "N/A";

  const location = [
    agent.city,
    agent.state,
    agent.country,
  ]
    .filter(Boolean)
    .join(", ");

  const identityProof =
    agent.identityProof?.proofType || "Not Available";

  const identityDocument =
    agent.identityProof?.documentName || "Not Available";

  const entityType = agent.companyName
    ? "Registered Company"
    : "Individual Agent";

  const agentId = agent._id
    ? `AGT-${agent._id.slice(-8).toUpperCase()}`
    : "N/A";

  const handleCopyEmail = async () => {
    if (!agent.email) return;

    try {
      await navigator.clipboard.writeText(agent.email);
    } catch (error) {
      console.error("Copy email failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">

      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
      />

      {/* DRAWER */}
      <div className="relative z-10 flex h-full w-full flex-col overflow-hidden bg-[#f8fafc] shadow-2xl sm:w-[500px] lg:w-[580px]">

        {view === "profile" ? (
          <>
            {/* ================= HEADER ================= */}
            <div className="relative overflow-hidden bg-[#171f33] px-5 py-5">

              <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-orange-500/10" />
              <div className="absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-white/[0.03]" />

              <div className="relative flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <TbPlaneDeparture
                      className="text-orange-400"
                      size={21}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">

                      <p className="truncate text-base font-bold text-white">
                        {agentName}
                      </p>

                      <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Active Partner
                      </span>

                    </div>

                    <p className="mt-1 text-[11px] text-white">
                      Agent ID:
                      <span className="ml-1 font-semibold text-white">
                        {agentId}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/15 hover:text-white"
                >
                  <FiX size={18} />
                </button>

              </div>

              <div className="relative mt-5 grid grid-cols-2 gap-2">

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.06] px-3 py-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white">
                    Entity
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold text-white">
                    {entityType}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.06] px-3 py-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white">
                    Location
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold text-white">
                    {location || "Not Available"}
                  </p>
                </div>

              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">

              <div className="space-y-4">

                {/* VISA SETTINGS BANNER */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-[#111827] p-4 shadow-sm">

                  <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-orange-500/10" />

                  <div className="relative flex items-center justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-orange-400/10 bg-orange-500/10">
                        <FiCreditCard
                          className="text-orange-400"
                          size={17}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white">
                          Visa Charges
                        </p>

                        <p className="mt-0.5 text-[11px] text-white">
                          1 configured route
                        </p>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() => setView("settings")}
                      className="flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-[10px] font-bold text-[#0b1120] transition hover:bg-slate-100"
                    >
                      Open Settings
                      <FiChevronRight size={13} />
                    </button>

                  </div>
                </div>

                {/* ================= BALANCE ================= */}
                <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow">
                    <div className="flex items-center justify-between">

                      <p className="text-[9px] font-bold tracking-wider text-slate-400">
                        WALLET BALANCE
                      </p>

                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50">
                        <FiDollarSign
                          size={13}
                          className="text-slate-400"
                        />
                      </div>

                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-500">
                      Not Available
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow">
                    <div className="flex items-center justify-between">

                      <p className="text-[9px] font-bold tracking-wider text-slate-400">
                        CREDIT LIMIT
                      </p>

                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50">
                        <FiCreditCard
                          size={13}
                          className="text-orange-500"
                        />
                      </div>

                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-500">
                      Not Available
                    </p>
                  </div>

                </div>

                {/* ================= IDENTITY ================= */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">
                      <FiUser
                        size={14}
                        className="text-slate-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#0f172a]">
                        Identity
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Personal and verification details
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 p-4 sm:grid-cols-4">

                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        LEGAL NAME
                      </p>

                      <p className="break-words text-xs font-semibold text-slate-700">
                        {agent.fullName || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        DATE OF BIRTH
                      </p>

                      <p className="text-xs font-medium text-slate-400">
                        Not Available
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        GENDER
                      </p>

                      <p className="text-xs font-medium text-slate-400">
                        Not Available
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        VERIFICATION
                      </p>

                      <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <FiCheckCircle size={13} />
                        {identityProof}
                      </p>
                    </div>

                  </div>

                  {identityDocument !== "Not Available" && (
                    <div className="mx-4 mb-4 border-t border-slate-100 pt-3">
                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        IDENTITY DOCUMENT
                      </p>

                      <p className="break-words text-xs font-semibold text-slate-700">
                        {identityDocument}
                      </p>
                    </div>
                  )}

                </div>

                {/* ================= COMPANY + CONTACT ================= */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* COMPANY */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">

                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50">
                        <FiBriefcase
                          size={14}
                          className="text-orange-500"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#0f172a]">
                          Company
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Business information
                        </p>
                      </div>

                    </div>

                    <div className="space-y-4 p-4">

                      <div>
                        <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                          COMPANY NAME
                        </p>

                        <p className="break-words text-xs font-semibold text-slate-700">
                          {agent.companyName || "Not Available"}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                          ENTITY TYPE
                        </p>

                        <p className="text-xs font-semibold text-slate-700">
                          {entityType}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* CONTACT */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">

                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">
                        <FiMail
                          size={14}
                          className="text-slate-600"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#0f172a]">
                          Contact & Tax
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Communication details
                        </p>
                      </div>

                    </div>

                    <div className="p-4">

                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        EMAIL
                      </p>

                      <div className="mb-4 flex items-center gap-2">

                        <FiMail
                          size={13}
                          className="flex-shrink-0 text-slate-400"
                        />

                        <p className="min-w-0 flex-1 break-all text-xs font-semibold text-slate-700">
                          {agent.email || "N/A"}
                        </p>

                        {agent.email && (
                          <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500 transition hover:bg-orange-100"
                            title="Copy Email"
                          >
                            <FiCopy size={12} />
                          </button>
                        )}

                      </div>

                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        MOBILE
                      </p>

                      <div className="mb-4 flex items-center gap-2">
                        <FiPhone
                          size={13}
                          className="text-slate-400"
                        />

                        <p className="text-xs font-semibold text-slate-700">
                          {agent.mobileNumber || "N/A"}
                        </p>
                      </div>

                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        GST
                      </p>

                      <p className="text-xs font-semibold text-slate-700">
                        {agent.havingGST
                          ? agent.gstName || "GST Registered"
                          : "No GST"}
                      </p>

                    </div>
                  </div>

                </div>

                {/* ================= LOCATION ================= */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50">
                      <FiMapPin
                        size={14}
                        className="text-orange-500"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#0f172a]">
                        Location
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Registered business address
                      </p>
                    </div>

                  </div>

                  <div className="p-4">

                    <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                      REGISTERED ADDRESS
                    </p>

                    <p className="text-xs font-semibold leading-5 text-slate-700">
                      {agent.address || "N/A"}
                    </p>

                    <div className="mt-3 flex items-center gap-2">

                      <FiGlobe
                        size={13}
                        className="text-slate-400"
                      />

                      <p className="text-xs font-medium text-slate-500">
                        {location || "N/A"}
                      </p>

                    </div>
                  </div>

                </div>

                {/* ================= DOCUMENTS ================= */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">
                      <FiShield
                        size={14}
                        className="text-slate-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#0f172a]">
                        Documents
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Uploaded verification documents
                      </p>
                    </div>

                  </div>

                  <div className="space-y-2.5 p-4">

                    {/* IDENTITY */}
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 transition hover:border-orange-100 hover:bg-orange-50/40">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                          <FiFileText
                            size={13}
                            className="text-slate-500"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-700">
                            Identity Proof
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-slate-400">
                            {agent.identityProof?.documentName ||
                              "Not uploaded"}
                          </p>
                        </div>

                      </div>

                      {agent.identityProof?.documentUrl && (
                        <a
                          href={agent.identityProof.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-orange-500 transition hover:bg-orange-100 hover:text-orange-600"
                        >
                          View
                        </a>
                      )}

                    </div>

                    {/* OFFICE */}
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 transition hover:border-orange-100 hover:bg-orange-50/40">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                          <FiBriefcase
                            size={13}
                            className="text-slate-500"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-700">
                            Office Proof
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-slate-400">
                            {agent.officeProof?.documentName ||
                              "Not uploaded"}
                          </p>
                        </div>

                      </div>

                      {agent.officeProof?.documentUrl && (
                        <a
                          href={agent.officeProof.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-orange-500 transition hover:bg-orange-100 hover:text-orange-600"
                        >
                          View
                        </a>
                      )}

                    </div>

                    {/* GST */}
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 transition hover:border-orange-100 hover:bg-orange-50/40">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                          <FiCreditCard
                            size={13}
                            className="text-slate-500"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-700">
                            GST Document
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-slate-400">
                            {agent.gstDocument?.documentName ||
                              "Not uploaded"}
                          </p>
                        </div>

                      </div>

                      {agent.gstDocument?.documentUrl && (
                        <a
                          href={agent.gstDocument.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-orange-500 transition hover:bg-orange-100 hover:text-orange-600"
                        >
                          View
                        </a>
                      )}

                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-4 py-3.5 sm:px-5">

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
              >
                Close
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow"
              >
                <FiEdit2 size={13} />
                Edit Profile
              </button>

            </div>
          </>
        ) : (
          <>
            {/* ================= SETTINGS HEADER ================= */}
            <div className="bg-[#0b1120] px-5 py-5">

              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                  {/*<div className="flex flex-wrap items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                    <span>Agent Settings</span>
                    <FiChevronRight size={10} />
                    <span className="text-orange-400">
                      Visa Charges
                    </span>
                  </div>*/}

                  <h2 className="mt-2 truncate text-xl font-bold text-white">
                    {agentName}
                  </h2>

                  <p className="mt-1 text-xs text-white">
                    {agent.fullName || "N/A"}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => setView("profile")}
                  className="flex-shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold text-orange-400 transition hover:bg-white/10"
                >
                  View Profile
                </button>

              </div>
            </div>

            {/* ================= SETTINGS CONTENT ================= */}
            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-5">

              <div className="space-y-5">

                {/* STATS */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-[9px] font-bold tracking-wider text-slate-400">
                      CONFIGURED ROUTES
                    </p>

                    <p className="mt-2 text-xl font-bold text-[#0f172a]">
                      1
                      <span className="ml-1 text-[10px] font-medium text-slate-400">
                        total
                      </span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-[9px] font-bold tracking-wider text-slate-400">
                      ACTIVE ROUTES
                    </p>

                    <p className="mt-2 text-xl font-bold text-emerald-600">
                      1
                      <span className="ml-1 text-[10px] font-medium text-slate-400">
                        live
                      </span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-[9px] font-bold tracking-wider text-slate-400">
                      BASE AGENT PRICING
                    </p>

                    <p className="mt-2 text-xl font-bold text-[#0f172a]">
                      ₹6,880
                      <span className="ml-1 text-[10px] font-medium text-slate-400">
                        avg/adult
                      </span>
                    </p>
                  </div>

                </div>

                {/* TITLE */}
                <div className="flex items-end justify-between gap-3">

                  <div>
                    <p className="text-sm font-bold text-[#0f172a]">
                      Configured Visas
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Route-specific pricing and requirements
                    </p>
                  </div>

                  <span className="flex-shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                    1 Route
                  </span>

                </div>

                {/* ================= VISA CARD ================= */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  {/* VISA HEADER */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3.5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-100 bg-orange-50">
                        <TbPlaneDeparture
                          className="text-orange-500"
                          size={17}
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#0f172a]">
                          {configuredVisa.from}
                          <span className="mx-1.5 text-slate-400">
                            →
                          </span>
                          {configuredVisa.to}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {configuredVisa.title}
                        </p>
                      </div>

                    </div>

                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {configuredVisa.status}
                    </span>

                  </div>

                  {/* VISA DETAILS */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-4 py-4 sm:grid-cols-4">

                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        ENTRY TYPE
                      </p>

                      <p className="text-xs font-semibold text-slate-700">
                        {configuredVisa.entryType}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        VALIDITY
                      </p>

                      <p className="text-xs font-semibold text-slate-700">
                        {configuredVisa.validity}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        PROCESSING SLA
                      </p>

                      <p className="text-xs font-semibold text-slate-700">
                        {configuredVisa.sla}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[9px] font-bold tracking-wider text-slate-400">
                        STAY PERIOD
                      </p>

                      <p className="text-xs font-semibold text-slate-700">
                        {configuredVisa.stayPeriod}
                      </p>
                    </div>

                  </div>

                  {/* REQUIRED DOCUMENTS */}
                  <div className="border-t border-slate-100 px-4 py-4">

                    <p className="mb-2.5 text-[9px] font-bold tracking-wider text-slate-400">
                      REQUIRED DOCUMENTS
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {configuredVisa.documents.map((doc) => (
                        <span
                          key={doc}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600"
                        >
                          <FiFileText size={10} />
                          {doc}
                        </span>
                      ))}

                    </div>
                  </div>

                  {/* PRICING */}
                  <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-4">

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                      <div>
                        <p className="text-[9px] font-bold tracking-wider text-slate-400">
                          RETAIL PRICE
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-400 line-through">
                          {configuredVisa.retailPrice}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] font-bold tracking-wider text-orange-500">
                          AGENT PRICE
                        </p>

                        <p className="mt-1 text-sm font-bold text-orange-600">
                          {configuredVisa.agentPriceAdult}
                        </p>

                        <p className="text-[9px] text-slate-400">
                          Adult
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] font-bold tracking-wider text-slate-400">
                          CHILD PRICE
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {configuredVisa.agentPriceChild}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] font-bold tracking-wider text-slate-400">
                          YOUR MARGIN
                        </p>

                        <p className="mt-1 text-sm font-bold text-red-500">
                          {configuredVisa.margin}
                        </p>
                      </div>

                    </div>

                    <button
                      type="button"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b1120] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#182235]"
                    >
                      <FiEdit2 size={13} />
                      Edit Visa Charges
                    </button>

                  </div>
                </div>

                {/* ADD ROUTE */}
                <button
                  type="button"
                  className="group flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white py-7 text-slate-500 transition hover:border-orange-300 hover:bg-orange-50/30 hover:text-orange-600"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-orange-100">
                    <FiPlus size={18} />
                  </div>

                  <span className="text-sm font-bold">
                    Add New Route Configuration
                  </span>

                  <span className="text-center text-[10px] text-slate-400">
                    Configure specialized pricing for a new route.
                  </span>

                </button>

              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default AgentProfileDrawer;

