import React from "react";
import {
  FiX,
  FiPlus,
  FiEdit2,
  FiMail,
  FiPhone,
  FiMapPin,
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

const VisaChargesManagementPopup = ({
  agent,
  onClose,
  onViewProfile,
}) => {
  if (!agent) return null;

  const agentName =
    agent.companyName ||
    agent.fullName ||
    "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* POPUP */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-navy-400 hover:text-navy-700 bg-white rounded-full p-1"
        >
          <FiX size={20} />
        </button>

        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">

          {/* HEADER */}
          <div className="flex items-start justify-between gap-3 mb-5 flex-wrap pr-8">

            <div>

              <p className="text-xs font-semibold tracking-wide text-navy-400 mb-1">
                AGENT SETTINGS{" "}
                <span className="mx-1">›</span>

                <span className="text-ember-600">
                  VISA CHARGES MANAGEMENT
                </span>
              </p>

              <h2 className="text-2xl font-bold text-navy-900">
                {agentName}
              </h2>

              <p className="text-xs text-navy-500 mt-1">
                {agent.fullName || "N/A"}
              </p>

            </div>

            <button
              onClick={onViewProfile}
              className="border border-navy-100 text-ember-600 text-xs font-semibold px-3 py-2 rounded-xl"
            >
              View Agent Profile
            </button>

          </div>

          {/* AGENT CONTACT INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

            <div className="bg-[#EEF3F7] border border-navy-100 rounded-2xl p-3">

              <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                AGENT
              </p>

              <p className="text-sm font-bold text-navy-900">
                {agent.fullName || "N/A"}
              </p>

            </div>

            <div className="bg-[#EEF3F7] border border-navy-100 rounded-2xl p-3">

              <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                CONTACT
              </p>

              <div className="flex items-center gap-1.5">

                <FiPhone
                  size={12}
                  className="text-navy-400"
                />

                <p className="text-sm font-medium text-navy-800">
                  {agent.mobileNumber || "N/A"}
                </p>

              </div>

            </div>

            <div className="bg-[#EEF3F7] border border-navy-100 rounded-2xl p-3">

              <p className="text-[10px] font-semibold tracking-wide text-navy-400 mb-1">
                LOCATION
              </p>

              <p className="text-sm font-bold text-navy-900">
                {agent.city || "N/A"}
                {agent.state
                  ? `, ${agent.state}`
                  : ""}
              </p>

            </div>

          </div>

          {/* CONFIGURATION STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

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

          {/* CONFIGURED VISAS */}
          <p className="text-sm font-bold text-navy-900 mb-3">
            Configured Visas
          </p>

          <div className="border border-navy-100 rounded-2xl overflow-hidden">

            {/* VISA HEADER */}
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

            {/* VISA DETAILS */}
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

            {/* DOCUMENTS */}
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

            {/* PRICING */}
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

      </div>

    </div>
  );
};

export default VisaChargesManagementPopup;