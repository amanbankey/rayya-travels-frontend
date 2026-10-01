import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiHome,
  FiPhone,
  FiMail,
  FiMessageSquare,
  FiEye,
  FiEdit2,
  FiCheckCircle,
  FiTrash2,
  FiUsers,
  FiRefreshCw,
} from "react-icons/fi";

import AgentProfileDrawer from "./AgentProfileDrawer";
import VisaChargesManagementPopup from "./AgentView";

// =====================================================
// DUMMY DATA
// =====================================================

const DUMMY_AGENTS = [
  {
    _id: "665f1a2b3c4d5e6f7a8b9c01",
    companyName: "Vivan Travels",
    fullName: "Vivan Sharma",
    email: "vivan@vivantravels.com",
    mobileNumber: "9876543210",
    city: "Bhopal",
    state: "Madhya Pradesh",
    country: "India",
    address: "12, MP Nagar Zone 1, Bhopal - 462011",
    havingGST: true,
    gstName: "Vivan Travels Pvt Ltd",
    identityProof: {
      proofType: "Aadhaar Card",
      documentName: "aadhaar_vivan.pdf",
      documentUrl: "#",
    },
    officeProof: {
      documentName: "office_rent_agreement.pdf",
      documentUrl: "#",
    },
    gstDocument: {
      documentName: "gst_certificate.pdf",
      documentUrl: "#",
    },
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9c02",
    companyName: "Global Tours",
    fullName: "Anita Verma",
    email: "anita@globaltours.in",
    mobileNumber: "9811122233",
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    address: "45, Vijay Nagar, Indore - 452010",
    havingGST: true,
    gstName: "Global Tours & Travels",
    identityProof: {
      proofType: "PAN Card",
      documentName: "pan_anita.pdf",
      documentUrl: "#",
    },
    officeProof: {
      documentName: "electricity_bill.pdf",
      documentUrl: "#",
    },
    gstDocument: {
      documentName: "gst_global_tours.pdf",
      documentUrl: "#",
    },
  },
  {
    _id: "665f1a2b3c4d5e6f7a8b9c03",
    companyName: "",
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@gmail.com",
    mobileNumber: "9988776655",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    address: "B-22, Lajpat Nagar, New Delhi - 110024",
    havingGST: false,
    gstName: "",
    identityProof: {
      proofType: "Passport",
      documentName: "passport_rajesh.pdf",
      documentUrl: "#",
    },
    officeProof: null,
    gstDocument: null,
  },
];

// =====================================================
// AGENT DIRECTORY
// =====================================================

const AgentDirectory = () => {
  const [filters, setFilters] = useState({
    companyName: "",
    mobileNumber: "",
    ownershipType: "",
    status: "",
  });

  const [agents, setAgents] = useState([]);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [viewAgent, setViewAgent] = useState(null);
  const [visaAgent, setVisaAgent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET ALL AGENTS
  // =====================================================

  const fetchAgents = () => {
    setLoading(true);
    setError("");

    setAgents(DUMMY_AGENTS);

    setLoading(false);
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchAgents();
  }, []);

  // =====================================================
  // FILTER INPUT
  // =====================================================

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =====================================================
  // APPLY FILTERS
  // =====================================================

  const handleApplyFilters = (e) => {
    e.preventDefault();

    console.log("Filters selected:", filters);
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setFilters({
      companyName: "",
      mobileNumber: "",
      ownershipType: "",
      status: "",
    });

    fetchAgents();
  };

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = (name = "") => {
    const words = name.trim().split(" ").filter(Boolean);

    if (words.length === 0) {
      return "A";
    }

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // =====================================================
  // DELETE AGENT
  // =====================================================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this agent?"
    );

    if (!confirmed) {
      return;
    }

    setError("");

    setAgents((prev) =>
      prev.filter((agent) => agent._id !== id)
    );

    if (selectedAgent?._id === id) {
      setSelectedAgent(null);
    }

    if (viewAgent?._id === id) {
      setViewAgent(null);
    }

    if (visaAgent?._id === id) {
      setVisaAgent(null);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-y-auto bg-[#EEF3F7]">

      {/* TOP ACCENT */}

      <div className="sticky top-0 z-20 h-1 w-full bg-gradient-to-r from-[#AE4000] via-[#E0620F] to-[#AE4000]" />

      <div className="p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-medium">

              <span className="text-[#71869A]">
                Operations
              </span>

              <span className="text-[#AE4000]">
                /
              </span>

              <span className="text-[#71869A]">
                B2B Partner Network
              </span>

              <span className="text-[#AE4000]">
                /
              </span>

              <span className="font-semibold text-[#AE4000]">
                Agents Directory
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#AE4000] to-[#E0620F] text-white shadow-lg shadow-[#AE4000]/20">
                <FiUsers size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#102030] sm:text-3xl">
                  Agent Directory
                </h1>

                <p className="mt-0.5 text-sm text-[#71869A]">
                  Manage commercial terms, verification and agent communication.
                </p>
              </div>

              <span className="rounded-full border border-[#AE4000]/15 bg-[#FFF3EA] px-3 py-1.5 text-xs font-bold text-[#AE4000]">
                {agents.length} Registered Partners
              </span>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#AE4000] to-[#E0620F] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#AE4000]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#AE4000]/30"
          >
            <FiPlus size={17} />
            Onboard New Agent
          </button>
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="group relative overflow-hidden rounded-3xl border border-[#DCE4EB] bg-white p-5 shadow-[0_8px_30px_rgba(16,32,48,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(16,32,48,0.10)]">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#AE4000]/5" />

            <div className="relative flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#102030] text-[#FFB27A] shadow-md">
                <FiUsers size={20} />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8192A2]">
                  Total Agent Partners
                </p>

                <div className="flex items-center gap-2">

                  <span className="text-2xl font-bold text-[#102030]">
                    {agents.length}
                  </span>

                  <span className="rounded-full border border-[#AE4000]/15 bg-[#FFF3EA] px-2.5 py-1 text-[10px] font-bold text-[#AE4000]">
                    Registered
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =====================================================
            FILTER CARD
        ===================================================== */}

        <form
          onSubmit={handleApplyFilters}
          className="mb-5 overflow-hidden rounded-3xl border border-[#DCE4EB] bg-white shadow-[0_8px_30px_rgba(16,32,48,0.06)]"
        >

          <div className="flex items-center gap-3 border-b border-[#E8EDF1] bg-[#F8FAFC] px-5 py-4">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#102030] text-[#FFB27A]">
              <FiUsers size={16} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#102030]">
                Search & Filter Agents
              </h2>

              <p className="text-xs text-[#8A9AAA]">
                Filter agent partners by company, number, ownership or status.
              </p>
            </div>
          </div>

          <div className="p-5">

            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

              {/* COMPANY */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#536575]">
                  Company Name
                </label>

                <div className="group flex items-center gap-2.5 rounded-2xl border border-[#DCE4EB] bg-[#F9FBFC] px-3.5 py-3 transition-all duration-200 focus-within:border-[#AE4000] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#AE4000]/5">

                  <FiHome
                    className="shrink-0 text-[#9AA9B6] group-focus-within:text-[#AE4000]"
                    size={16}
                  />

                  <input
                    type="text"
                    name="companyName"
                    value={filters.companyName}
                    onChange={handleChange}
                    placeholder="Search by name"
                    className="w-full bg-transparent text-sm text-[#102030] outline-none placeholder:text-[#9AA9B6]"
                  />
                </div>
              </div>

              {/* MOBILE */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#536575]">
                  Mobile Number
                </label>

                <div className="group flex items-center gap-2.5 rounded-2xl border border-[#DCE4EB] bg-[#F9FBFC] px-3.5 py-3 transition-all duration-200 focus-within:border-[#AE4000] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#AE4000]/5">

                  <FiPhone
                    className="shrink-0 text-[#9AA9B6] group-focus-within:text-[#AE4000]"
                    size={16}
                  />

                  <input
                    type="text"
                    name="mobileNumber"
                    value={filters.mobileNumber}
                    onChange={handleChange}
                    placeholder="Search by number"
                    className="w-full bg-transparent text-sm text-[#102030] outline-none placeholder:text-[#9AA9B6]"
                  />
                </div>
              </div>

              {/* OWNERSHIP */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#536575]">
                  Ownership Type
                </label>

                <select
                  name="ownershipType"
                  value={filters.ownershipType}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#DCE4EB] bg-[#F9FBFC] px-3.5 py-3 text-sm text-[#536575] outline-none transition-all duration-200 focus:border-[#AE4000] focus:bg-white focus:ring-4 focus:ring-[#AE4000]/5"
                >
                  <option value="">All Types</option>
                  <option value="OPC">OPC</option>
                  <option value="PVT LTD">PVT LTD</option>
                  <option value="PARTNERSHIP">PARTNERSHIP</option>
                  <option value="PRIVATE">PRIVATE</option>
                </select>
              </div>

              {/* STATUS */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#536575]">
                  Status
                </label>

                <select
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#DCE4EB] bg-[#F9FBFC] px-3.5 py-3 text-sm text-[#536575] outline-none transition-all duration-200 focus:border-[#AE4000] focus:bg-white focus:ring-4 focus:ring-[#AE4000]/5"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">

              <button
                type="submit"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#AE4000] to-[#E0620F] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#AE4000]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <FiUsers size={15} />
                Apply Filters
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 rounded-2xl border border-[#DCE4EB] bg-white px-5 py-3 text-sm font-semibold text-[#536575] transition-all duration-200 hover:border-[#AE4000]/30 hover:bg-[#FFF7F2] hover:text-[#AE4000]"
              >
                <FiRefreshCw size={14} />
                Reset
              </button>
            </div>
          </div>
        </form>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="overflow-hidden rounded-3xl border border-[#DCE4EB] bg-white shadow-[0_8px_30px_rgba(16,32,48,0.06)]">

          {/* TABLE TITLE */}

          <div className="flex flex-col gap-2 border-b border-[#E3E9EE] bg-gradient-to-r from-[#102030] to-[#16304A] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-sm font-bold text-white">
                Agent Partners
              </h2>

              <p className="mt-0.5 text-xs text-[#AFC0CF]">
                Manage registered B2B travel partners
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-[#FFB27A]">
              {agents.length} Records
            </div>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1150px]">

              <thead>

                <tr className="border-b border-[#E3E9EE] bg-[#F6F8FA]">

                  <th
                    colSpan={3}
                    className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]"
                  >
                    Agent Info
                  </th>

                  <th className="border-l border-[#E3E9EE] px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#AE4000]">
                    Commissions & Restrictions
                  </th>

                  <th
                    colSpan={2}
                    className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]"
                  >
                    Management
                  </th>
                </tr>

                <tr className="border-b border-[#E3E9EE] bg-[#FAFBFC]">

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Enterprise
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Contact
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Compliance
                  </th>

                  <th className="border-l border-[#E3E9EE] px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#AE4000]">
                    Commercials
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {/* LOADING */}

                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-14 text-center text-sm text-[#718394]"
                    >
                      Loading agents...
                    </td>
                  </tr>
                ) : agents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-14 text-center"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F5F7] text-[#9AA9B6]">
                        <FiUsers size={20} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-[#102030]">
                        No agents found
                      </p>

                      <p className="mt-1 text-xs text-[#8A9AAA]">
                        Try changing your filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  agents.map((agent) => (
                    <tr
                      key={agent._id}
                      className="group border-b border-[#EDF1F4] align-top transition-colors duration-200 last:border-0 hover:bg-[#FFF9F5]"
                    >

                      {/* ENTERPRISE */}

                      <td className="px-5 py-5">

                        <div className="flex items-start gap-3">

                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#102030] to-[#16304A] text-xs font-bold text-[#FFB27A] shadow-sm">
                            {getInitials(
                              agent.companyName || agent.fullName
                            )}
                          </span>

                          <div>

                            <p className="text-sm font-bold text-[#102030]">
                              {agent.companyName ||
                                agent.fullName ||
                                "N/A"}
                            </p>

                            {agent.companyName && (
                              <p className="mt-0.5 text-xs text-[#7D8F9E]">
                                {agent.fullName || "N/A"}
                              </p>
                            )}

                            {agent.havingGST && (
                              <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-[#AE4000]/15 bg-[#FFF3EA] px-2 py-1 text-[10px] font-bold text-[#AE4000]">
                                <FiCheckCircle size={10} />
                                GST Registered
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* CONTACT */}

                      <td className="px-5 py-5">

                        <div className="mb-2 flex items-center gap-2 text-xs text-[#536575]">

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F3F6F8] text-[#7D8F9E]">
                            <FiMail size={13} />
                          </span>

                          <span>
                            {agent.email || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#536575]">

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F3F6F8] text-[#7D8F9E]">
                            <FiPhone size={13} />
                          </span>

                          <span>
                            {agent.mobileNumber || "N/A"}
                          </span>

                          <FiMessageSquare
                            size={14}
                            className="ml-1 text-[#AE4000]"
                          />
                        </div>
                      </td>

                      {/* COMPLIANCE */}

                      <td className="px-5 py-5">

                        {agent.identityProof?.proofType && (
                          <div className="mb-2 w-fit rounded-xl border border-[#DCE4EB] bg-[#F6F8FA] px-2.5 py-1.5 text-xs font-medium text-[#536575]">
                            {agent.identityProof.proofType}
                          </div>
                        )}

                        <div className="flex w-fit items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-600">
                          <FiCheckCircle size={11} />
                          Verified
                        </div>
                      </td>

                      {/* COMMERCIALS */}

                      <td className="border-l border-[#F0E2D9] bg-[#FFF9F5] px-5 py-5">

                        <div className="flex flex-col gap-2">

                          {agent.havingGST ? (
                            <>
                              {agent.gstName && (
                                <span className="w-fit rounded-xl border border-[#AE4000]/15 bg-[#FFF3EA] px-2.5 py-1.5 text-xs font-semibold text-[#AE4000]">
                                  GST: {agent.gstName}
                                </span>
                              )}

                              {agent.companyName && (
                                <span className="w-fit rounded-xl border border-[#DCE4EB] bg-white px-2.5 py-1.5 text-xs font-medium text-[#536575]">
                                  {agent.companyName}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="w-fit rounded-xl border border-[#DCE4EB] bg-white px-2.5 py-1.5 text-xs font-medium text-[#7D8F9E]">
                              No GST
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setViewAgent(null);
                              setSelectedAgent(null);
                              setVisaAgent(agent);
                            }}
                            className="mt-1 flex w-fit items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#AE4000] transition-all hover:bg-[#AE4000] hover:text-white"
                          >
                            <FiEye size={14} />
                            View
                          </button>
                        </div>
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <span className="relative flex h-6 w-11 items-center rounded-full bg-emerald-100">

                            <span className="absolute left-5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                              <FiCheckCircle size={11} />
                            </span>

                          </span>

                          <span className="text-xs font-semibold text-emerald-600">
                            Active
                          </span>
                        </div>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAgent(null);
                              setVisaAgent(null);
                              setViewAgent(agent);
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[#7E8F9D] transition-all duration-200 hover:border-[#AE4000]/15 hover:bg-[#FFF3EA] hover:text-[#AE4000]"
                            title="View Agent"
                          >
                            <FiEye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setViewAgent(null);
                              setVisaAgent(null);
                              setSelectedAgent(agent);
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[#7E8F9D] transition-all duration-200 hover:border-[#AE4000]/15 hover:bg-[#FFF3EA] hover:text-[#AE4000]"
                            title="Agent Profile"
                          >
                            <FiEdit2 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(agent._id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[#9A7D7D] transition-all duration-200 hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                            title="Delete Agent"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}

          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#E8EDF1] bg-[#FAFBFC] px-5 py-3.5 sm:flex-row">

            <p className="text-xs font-medium text-[#8192A2]">
              Showing{" "}
              <span className="font-bold text-[#102030]">
                {agents.length}
              </span>{" "}
              Agents
            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                disabled
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#DCE4EB] bg-white text-[#A1AFBA] cursor-not-allowed"
              >
                ‹
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-[#AE4000] to-[#E0620F] text-xs font-bold text-white shadow-md shadow-[#AE4000]/20"
              >
                1
              </button>

              <button
                type="button"
                disabled
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#DCE4EB] bg-white text-[#A1AFBA] cursor-not-allowed"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            VISA VIEW
        ===================================================== */}

        {visaAgent && (
          <VisaChargesManagementPopup
            agent={visaAgent}
            onClose={() => setVisaAgent(null)}
            onViewProfile={() => {
              const agent = visaAgent;

              setVisaAgent(null);
              setSelectedAgent(agent);
            }}
          />
        )}

        {/* =====================================================
            AGENT PROFILE
        ===================================================== */}

        {selectedAgent && (
          <AgentProfileDrawer
            agent={selectedAgent}
            onClose={() => setSelectedAgent(null)}
          />
        )}

        {/* =====================================================
            VIEW POPUP
        ===================================================== */}

        {viewAgent && (
          <VisaChargesManagementPopup
            agent={viewAgent}
            onClose={() => setViewAgent(null)}
            onViewProfile={() => {
              const agent = viewAgent;

              setViewAgent(null);
              setSelectedAgent(agent);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AgentDirectory;