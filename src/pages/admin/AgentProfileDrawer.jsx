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

  const entityType =
    agent.companyName
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
        className="absolute inset-0 bg-black/40"
      />

      {/* DRAWER */}
      <div className="relative w-full sm:w-[480px] lg:w-[560px] h-full bg-[#EEF3F7] shadow-2xl flex flex-col overflow-hidden">

        {view === "profile" ? (

          <>
            {/* ================= HEADER ================= */}
            <div className="flex items-start justify-between gap-3 bg-white px-5 py-4 border-b border-navy-100">

              <div className="flex items-start gap-3">

                <div className="w-11 h-11 rounded-xl bg-ember-50 flex items-center justify-center flex-shrink-0">

                  <TbPlaneDeparture className="text-ember-600 text-lg" />

                </div>

                <div>

                  <div className="flex items-center gap-2 flex-wrap">

                    <p className="text-base font-bold text-navy-900">
                      {agentName}
                    </p>

                    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">

                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                      Active Partner

                    </span>

                  </div>

                  <p className="text-xs text-navy-400 mt-0.5">
                    ID: {agentId}
                  </p>

                </div>

              </div>

              <button
                onClick={onClose}
                className="text-navy-400 hover:text-navy-700 flex-shrink-0"
              >
                <FiX size={20} />
              </button>

            </div>

            {/* ================= CONTENT ================= */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

              {/* VISA BANNER */}
              <div className="bg-navy-900 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 flex-wrap">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">

                    <FiCreditCard className="text-white text-base" />

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-white">
                      View Visa Charges
                    </p>

                    <p className="text-xs text-navy-300">
                      1 Configured Route
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => setView("settings")}
                  className="flex items-center gap-1 bg-white text-navy-800 text-xs font-semibold px-3 py-2 rounded-xl"
                >
                  Open Settings
                  <FiChevronRight size={13} />
                </button>

              </div>

              {/* WALLET / CREDIT */}
              <div className="grid grid-cols-2 gap-3">

                <div className="bg-white border border-navy-100 rounded-2xl p-3">

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                    WALLET BALANCE
                  </p>

                  <p className="text-sm font-medium text-navy-500">
                    Not Available
                  </p>

                </div>

                <div className="bg-white border border-navy-100 rounded-2xl p-3">

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                    CREDIT LIMIT
                  </p>

                  <p className="text-sm font-medium text-navy-500">
                    Not Available
                  </p>

                </div>

              </div>

              {/* ================= IDENTITY ================= */}
              <div className="bg-white border border-navy-100 rounded-2xl p-4">

                <p className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">

                  <FiFileText
                    className="text-navy-500"
                    size={15}
                  />

                  Identity

                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                  {/* LEGAL NAME */}
                  <div>

                    <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                      Legal Name
                    </p>

                    <p className="text-sm font-medium text-navy-800">
                      {agent.fullName || "N/A"}
                    </p>

                  </div>

                  {/* DOB */}
                  <div>

                    <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                      Date of Birth
                    </p>

                    <p className="text-sm font-medium text-navy-500">
                      Not Available
                    </p>

                  </div>

                  {/* GENDER */}
                  <div>

                    <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                      Gender
                    </p>

                    <p className="text-sm font-medium text-navy-500">
                      Not Available
                    </p>

                  </div>

                  {/* VERIFICATION */}
                  <div>

                    <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                      Verification
                    </p>

                    <p className="flex items-center gap-1 text-sm font-medium text-emerald-600">

                      <FiCheckCircle size={13} />

                      {identityProof}

                    </p>

                  </div>

                </div>

                {/* DOCUMENT */}
                {identityDocument !== "Not Available" && (
                  <div className="mt-4 pt-3 border-t border-navy-50">

                    <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                      IDENTITY DOCUMENT
                    </p>

                    <p className="text-sm font-medium text-navy-800">
                      {identityDocument}
                    </p>

                  </div>
                )}

              </div>

              {/* ================= COMPANY + CONTACT ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* COMPANY */}
                <div className="bg-white border border-navy-100 rounded-2xl p-4">

                  <p className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">

                    <FiBriefcase
                      className="text-navy-500"
                      size={15}
                    />

                    Company

                  </p>

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                    Company Name
                  </p>

                  <p className="text-sm font-medium text-navy-800">
                    {agent.companyName || "Not Available"}
                  </p>

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mt-3 mb-1">
                    ENTITY TYPE
                  </p>

                  <p className="text-sm font-medium text-navy-800">
                    {entityType}
                  </p>

                </div>

                {/* CONTACT */}
                <div className="bg-white border border-navy-100 rounded-2xl p-4">

                  <p className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">

                    <FiFileText
                      className="text-navy-500"
                      size={15}
                    />

                    Contact &amp; Tax

                  </p>

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                    Email
                  </p>

                  <div className="flex items-center gap-2 mb-3">

                    <FiMail
                      size={13}
                      className="text-navy-400 flex-shrink-0"
                    />

                    <p className="text-sm font-medium text-navy-800 break-all">
                      {agent.email || "N/A"}
                    </p>

                    {agent.email && (
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="text-ember-600 hover:text-ember-600 flex-shrink-0"
                        title="Copy Email"
                      >
                        <FiCopy size={13} />
                      </button>
                    )}

                  </div>

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                    Mobile
                  </p>

                  <div className="flex items-center gap-2">

                    <FiPhone
                      size={13}
                      className="text-navy-400"
                    />

                    <p className="text-sm font-medium text-navy-800">
                      {agent.mobileNumber || "N/A"}
                    </p>

                  </div>

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mt-3 mb-1">
                    GST
                  </p>

                  <p className="text-sm font-medium text-navy-800">
                    {agent.havingGST
                      ? agent.gstName || "GST Registered"
                      : "No GST"}
                  </p>

                </div>

              </div>

              {/* ================= LOCATION ================= */}
              <div className="bg-white border border-navy-100 rounded-2xl p-4">

                <p className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">

                  <FiMapPin
                    className="text-navy-500"
                    size={15}
                  />

                  Location

                </p>

                <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                  Registered Address
                </p>

                <p className="text-sm font-medium text-navy-800">
                  {agent.address || "N/A"}
                </p>

                <p className="text-sm font-medium text-navy-600 mt-1">
                  {location || "N/A"}
                </p>

              </div>

              {/* ================= DOCUMENTS ================= */}
              <div className="bg-white border border-navy-100 rounded-2xl p-4">

                <p className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">

                  <FiFileText
                    className="text-navy-500"
                    size={15}
                  />

                  Documents

                </p>

                <div className="space-y-3">

                  {/* IDENTITY */}
                  <div className="flex items-center justify-between gap-3 border border-navy-50 rounded-xl px-3 py-2">

                    <div>

                      <p className="text-xs font-semibold text-navy-800">
                        Identity Proof
                      </p>

                      <p className="text-[11px] text-navy-500">
                        {agent.identityProof?.documentName ||
                          "Not uploaded"}
                      </p>

                    </div>

                    {agent.identityProof?.documentUrl && (
                      <a
                        href={agent.identityProof.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-ember-600"
                      >
                        View
                      </a>
                    )}

                  </div>

                  {/* OFFICE PROOF */}
                  <div className="flex items-center justify-between gap-3 border border-navy-50 rounded-xl px-3 py-2">

                    <div>

                      <p className="text-xs font-semibold text-navy-800">
                        Office Proof
                      </p>

                      <p className="text-[11px] text-navy-500">
                        {agent.officeProof?.documentName ||
                          "Not uploaded"}
                      </p>

                    </div>

                    {agent.officeProof?.documentUrl && (
                      <a
                        href={agent.officeProof.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-ember-600"
                      >
                        View
                      </a>
                    )}

                  </div>

                  {/* GST DOCUMENT */}
                  <div className="flex items-center justify-between gap-3 border border-navy-50 rounded-xl px-3 py-2">

                    <div>

                      <p className="text-xs font-semibold text-navy-800">
                        GST Document
                      </p>

                      <p className="text-[11px] text-navy-500">
                        {agent.gstDocument?.documentName ||
                          "Not uploaded"}
                      </p>

                    </div>

                    {agent.gstDocument?.documentUrl && (
                      <a
                        href={agent.gstDocument.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-ember-600"
                      >
                        View
                      </a>
                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="flex items-center justify-end gap-3 bg-white px-5 py-4 border-t border-navy-100">

              <button
                onClick={onClose}
                className="text-sm font-semibold text-navy-600 px-4 py-2"
              >
                Close
              </button>

              <button
                type="button"
                className="bg-gradient-to-r from-ember-600 to-ember-400 shadow-lg shadow-ember-500/30 hover:brightness-110 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
              >
                Edit Profile
              </button>

            </div>

          </>

        ) : (

          /* ================= SETTINGS ================= */
          <>

            <div className="flex-1 overflow-y-auto px-5 py-5">

              <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">

                <div>

                  <p className="text-xs font-semibold tracking-wide text-navy-400 mb-1">

                    AGENT SETTINGS{" "}
                    <span className="mx-1">›</span>

                    <span className="text-ember-600">
                      VISA CHARGES MANAGEMENT
                    </span>

                  </p>

                  <h2 className="text-xl font-bold text-navy-900">
                    {agentName}
                  </h2>

                  <p className="text-xs text-navy-500 mt-1">
                    {agent.fullName || "N/A"}
                  </p>

                </div>

                <button
                  onClick={() => setView("profile")}
                  className="border border-navy-100 text-ember-600 text-xs font-semibold px-3 py-2 rounded-xl"
                >
                  View Agent Profile
                </button>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">

                <div className="bg-[#EEF3F7] border border-navy-100 rounded-2xl p-3">

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                    CONFIGURED ROUTES
                  </p>

                  <p className="text-lg font-bold text-navy-900">
                    1{" "}
                    <span className="text-xs font-medium text-navy-400">
                      total
                    </span>
                  </p>

                </div>

                <div className="bg-[#EEF3F7] border border-navy-100 rounded-2xl p-3">

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                    ACTIVE ROUTES
                  </p>

                  <p className="text-lg font-bold text-navy-900">
                    1{" "}
                    <span className="text-xs font-medium text-navy-400">
                      live
                    </span>
                  </p>

                </div>

                <div className="bg-[#EEF3F7] border border-navy-100 rounded-2xl p-3">

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                    BASE AGENT PRICING
                  </p>

                  <p className="text-lg font-bold text-navy-900">
                    ₹6,880{" "}
                    <span className="text-xs font-medium text-navy-400">
                      avg/adult
                    </span>
                  </p>

                </div>

              </div>

              <p className="text-sm font-bold text-navy-900 mb-3">
                Configured Visas
              </p>

              {/* VISA */}
              <div className="border border-navy-100 rounded-2xl overflow-hidden">

                <div className="flex items-center justify-between gap-3 bg-[#EEF3F7] px-4 py-3 flex-wrap">

                  <div className="flex items-center gap-3">

                    <span className="w-9 h-9 rounded-full bg-white border border-navy-100 flex items-center justify-center flex-shrink-0">

                      <TbPlaneDeparture
                        className="text-ember-600"
                        size={16}
                      />

                    </span>

                    <div>

                      <p className="text-sm font-bold text-navy-900">

                        {configuredVisa.from}{" "}

                        <span className="text-navy-400">
                          →
                        </span>{" "}

                        {configuredVisa.to}

                      </p>

                      <p className="text-xs text-navy-500">
                        {configuredVisa.title}
                      </p>

                    </div>

                  </div>

                  <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full">

                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                    {configuredVisa.status}

                  </span>

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 py-4 border-t border-navy-50">

                  <div>

                    <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                      ENTRY TYPE
                    </p>

                    <p className="text-sm font-medium text-navy-800">
                      {configuredVisa.entryType}
                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                      VALIDITY
                    </p>

                    <p className="text-sm font-medium text-navy-800">
                      {configuredVisa.validity}
                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                      PROCESSING SLA
                    </p>

                    <p className="text-sm font-medium text-navy-800">
                      {configuredVisa.sla}
                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                      STAY PERIOD
                    </p>

                    <p className="text-sm font-medium text-navy-800">
                      {configuredVisa.stayPeriod}
                    </p>

                  </div>

                </div>

                <div className="px-4 py-4 border-t border-navy-50">

                  <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-2">
                    REQUIRED DOCUMENTS
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {configuredVisa.documents.map((doc) => (

                      <span
                        key={doc}
                        className="border border-navy-100 text-navy-700 text-xs px-2.5 py-1 rounded-xl"
                      >
                        {doc}
                      </span>

                    ))}

                  </div>

                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 border-t border-navy-50">

                  <div className="flex flex-wrap gap-6">

                    <div>

                      <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                        RETAIL PRICE
                      </p>

                      <p className="text-sm font-medium text-navy-400 line-through">
                        {configuredVisa.retailPrice}
                      </p>

                    </div>

                    <div>

                      <p className="text-[10px] font-semibold tracking-wide text-ember-600 mb-1">
                        AGENT PRICE (ADULT)
                      </p>

                      <p className="text-sm font-bold text-ember-600">
                        {configuredVisa.agentPriceAdult}
                      </p>

                    </div>

                    <div>

                      <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                        AGENT PRICE (CHILD)
                      </p>

                      <p className="text-sm font-medium text-navy-800">
                        {configuredVisa.agentPriceChild}
                      </p>

                    </div>

                    <div>

                      <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                        YOUR MARGIN
                      </p>

                      <p className="text-sm font-bold text-red-500">
                        {configuredVisa.margin}
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-2 bg-navy-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl"
                  >

                    <FiEdit2 size={13} />

                    Edit Visa Charges

                  </button>

                </div>

              </div>

              {/* ADD ROUTE */}
              <button
                type="button"
                className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-navy-100 rounded-2xl py-6 mt-4 text-navy-500 hover:border-gray-400 hover:text-navy-600"
              >

                <FiPlus size={20} />

                <span className="text-sm font-semibold">
                  Add New Route Configuration
                </span>

                <span className="text-xs text-navy-400">
                  Configure specialized pricing for this agent on a new route.
                </span>

              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default AgentProfileDrawer;