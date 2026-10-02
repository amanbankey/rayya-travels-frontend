import { MdSupportAgent as PageIcon } from "react-icons/md";
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
} from "react-icons/fi";

import AgentProfileDrawer from "./AgentProfileDrawer";
import VisaChargesManagementPopup from "./AgentView";

import api from "../../api/axios";

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

  // =========================
  // GET ALL AGENTS
  // =========================
  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/agents");
      const data = response.data;

      console.log("AGENTS API RESPONSE:", data);

      if (data?.success) {
        setAgents(data?.data || []);
      } else {
        setAgents([]);
        setError(data?.message || "Failed to fetch agents");
      }
    } catch (error) {
      console.error("Fetch agents failed:", error);

      setAgents([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch agents"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    fetchAgents();
  }, []);

  // =========================
  // FILTER INPUT
  // =========================
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // APPLY FILTERS
  // =========================
  const handleApplyFilters = (e) => {
    e.preventDefault();

    console.log("Filters selected:", filters);
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    setFilters({
      companyName: "",
      mobileNumber: "",
      ownershipType: "",
      status: "",
    });

    fetchAgents();
  };

  // =========================
  // INITIALS
  // =========================
  const getInitials = (name = "") => {
    const words = name.trim().split(" ").filter(Boolean);

    if (words.length === 0) {
      return "A";
    }

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // =========================
  // DELETE AGENT
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this agent?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await api.delete(`/agents/${id}`);
      const data = response.data;

      if (data?.success) {
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
      } else {
        setError(data?.message || "Failed to delete agent");
      }
    } catch (error) {
      console.error("Delete agent failed:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete agent"
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:pl-2 bg-[#EEF3F7] overflow-y-auto hide-scrollbar w-full min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

        <div>
          {/*<p className="text-xs text-navy-500 mb-1">
            Operations{" "}
            <span className="mx-1">›</span>{" "}
            B2B Partner Network{" "}
            <span className="mx-1">›</span>

            <span className="text-ember-600 font-medium">
              Agents Directory
            </span>
          </p>*/}

          <div className="flex items-center gap-4">

            <span className="w-14 h-14 rounded-2xl bg-ember-500 text-white flex items-center justify-center flex-shrink-0">
              <PageIcon size={26} />
            </span>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-extrabold text-navy-900 leading-tight">Agent Directory</h1>

                <span className="bg-white border border-navy-100 text-navy-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {agents.length} Registered Partners
                </span>
              </div>

              <p className="text-navy-400 mt-0.5">
                Manage commercial terms, credit lines, agent verification,
                and daily communication.
              </p>
            </div>

          </div>
        </div>

        {/*<button
          type="button"
          className="flex items-center gap-2 bg-navy-900 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl h-fit"
        >
          <FiPlus size={16} />
          Onboard New Agent
        </button>*/}

      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl">
          {error}
        </div>
      )}

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

        <div className="bg-white rounded-3xl border border-navy-100 p-5">

          <p className="text-[11px] font-semibold tracking-[0.18em] text-navy-500 mb-2">
            TOTAL AGENT PARTNERS
          </p>

          <div className="flex items-center gap-3">

            <span className="text-3xl font-extrabold text-navy-900 leading-none">
              {agents.length}
            </span>

            <span className="bg-ember-50 text-ember-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
              Registered
            </span>

          </div>

        </div>

      </div>

      {/* ================= FILTER ================= */}
      <form
        onSubmit={handleApplyFilters}
        className="bg-white rounded-3xl border border-navy-100 p-6 mb-5"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

          {/* COMPANY NAME */}
          <div>

            <label className="text-xs font-semibold text-navy-600 mb-1.5 block">
              Company Name
            </label>

            <div className="flex items-center gap-2.5 border border-navy-100 bg-[#EEF3F7]/60 rounded-full px-4 py-3 focus-within:border-ember-400 focus-within:bg-white">

              <FiHome
                className="text-navy-400 flex-shrink-0"
                size={15}
              />

              <input
                type="text"
                name="companyName"
                value={filters.companyName}
                onChange={handleChange}
                placeholder="Search by name"
                className="w-full bg-transparent text-sm text-navy-700 placeholder:text-navy-300 focus:outline-none"
              />

            </div>

          </div>

          {/* MOBILE */}
          <div>

            <label className="text-xs font-semibold text-navy-600 mb-1.5 block">
              Mobile Number
            </label>

            <div className="flex items-center gap-2.5 border border-navy-100 bg-[#EEF3F7]/60 rounded-full px-4 py-3 focus-within:border-ember-400 focus-within:bg-white">

              <FiPhone
                className="text-navy-400 flex-shrink-0"
                size={15}
              />

              <input
                type="text"
                name="mobileNumber"
                value={filters.mobileNumber}
                onChange={handleChange}
                placeholder="Search by number"
                className="w-full bg-transparent text-sm text-navy-700 placeholder:text-navy-300 focus:outline-none"
              />

            </div>

          </div>

          {/* OWNERSHIP */}
          <div>

            <label className="text-xs font-semibold text-navy-600 mb-1.5 block">
              Ownership Type
            </label>

            <select
              name="ownershipType"
              value={filters.ownershipType}
              onChange={handleChange}
              className="w-full border border-navy-100 bg-[#EEF3F7]/60 rounded-full px-4 py-3 text-sm text-navy-700 focus:outline-none focus:border-ember-400 focus:bg-white"
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

            <label className="text-xs font-semibold text-navy-600 mb-1.5 block">
              Status
            </label>

            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full border border-navy-100 bg-[#EEF3F7]/60 rounded-full px-4 py-3 text-sm text-navy-700 focus:outline-none focus:border-ember-400 focus:bg-white"
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
            className="bg-ember-500 hover:bg-ember-600 text-white text-sm font-bold px-7 py-3 rounded-full transition-colors"
          >
            Apply Filters
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="border border-navy-100 text-navy-700 text-sm font-semibold px-6 py-3 rounded-full hover:bg-ember-50 transition-colors"
          >
            Reset
          </button>

        </div>

      </form>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-3xl border border-navy-100 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-navy-900">

              <tr className="border-b border-white/10">

                <th
                  colSpan={3}
                  className="text-left text-[11px] font-bold tracking-widest text-navy-300 px-6 py-3"
                >
                  AGENT INFO
                </th>

                <th className="text-left text-[11px] font-bold tracking-widest text-ember-300 px-6 py-3 border-l border-white/10">
                  COMMISSIONS &amp; RESTRICTIONS
                </th>

                <th
                  colSpan={2}
                  className="text-left text-[11px] font-bold tracking-widest text-navy-300 px-6 py-3 border-l border-white/10"
                >
                  MANAGEMENT
                </th>

              </tr>

              <tr>

                <th className="text-left text-xs font-bold tracking-widest text-white px-6 py-4">
                  ENTERPRISE
                </th>

                <th className="text-left text-xs font-bold tracking-widest text-white px-6 py-4">
                  CONTACT
                </th>

                <th className="text-left text-xs font-bold tracking-widest text-white px-6 py-4">
                  COMPLIANCE
                </th>

                <th className="text-left text-xs font-bold tracking-widest text-white px-6 py-4 border-l border-white/10">
                  COMMERCIALS
                </th>

                <th className="text-left text-xs font-bold tracking-widest text-white px-6 py-4 border-l border-white/10">
                  STATUS
                </th>

                <th className="text-left text-xs font-bold tracking-widest text-white px-6 py-4">
                  ACTIONS
                </th>

              </tr>

            </thead>

            <tbody>

              {/* LOADING */}
              {loading ? (

                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-navy-500"
                  >
                    Loading agents...
                  </td>
                </tr>

              ) : agents.length === 0 ? (

                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-navy-500"
                  >
                    No agents found.
                  </td>
                </tr>

              ) : (

                agents.map((agent) => (

                  <tr
                    key={agent._id}
                    className="border-t border-navy-50 hover:bg-[#f7f9fb] transition-colors align-top"
                  >

                    {/* ENTERPRISE */}
                    <td className="px-6 py-4">

                      <div className="flex items-start gap-3">

                        <span className="w-11 h-11 rounded-xl bg-navy-900 text-ember-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {getInitials(
                            agent.companyName || agent.fullName
                          )}
                        </span>

                        <div>

                          <p className="text-sm font-bold text-navy-900">
                            {agent.companyName ||
                              agent.fullName ||
                              "N/A"}
                          </p>

                          {agent.companyName && (
                            <p className="text-xs text-navy-400 mb-1">
                              {agent.fullName || "N/A"}
                            </p>
                          )}

                          {agent.havingGST && (
                            <span className="bg-ember-50 text-ember-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              GST
                            </span>
                          )}

                        </div>

                      </div>

                    </td>

                    {/* CONTACT */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2.5 text-xs text-navy-700 mb-2">

                        <span className="w-7 h-7 rounded-lg bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0">
                          <FiMail size={13} />
                        </span>

                        {agent.email || "N/A"}

                      </div>

                      <div className="flex items-center gap-2.5 text-xs text-navy-700">

                        <span className="w-7 h-7 rounded-lg bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0">
                          <FiPhone size={13} />
                        </span>

                        {agent.mobileNumber || "N/A"}

                        <FiMessageSquare
                          size={14}
                          className="text-emerald-500"
                        />

                      </div>

                    </td>

                    {/* COMPLIANCE */}
                    <td className="px-6 py-4">

                      {agent.identityProof?.proofType && (
                        <div className="bg-[#EEF3F7] border border-navy-100 rounded-lg px-2.5 py-1 text-xs text-navy-600 mb-2 w-fit">
                          {agent.identityProof.proofType}
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-xs font-semibold w-fit px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">

                        <FiCheckCircle size={12} />

                        Verified

                      </div>

                    </td>

                    {/* COMMERCIALS */}
                    <td className="px-6 py-4 border-l border-navy-50">

                      <div className="flex flex-col gap-1.5">

                        {agent.havingGST ? (

                          <>
                            {agent.gstName && (
                              <span className="w-fit text-xs font-medium px-2.5 py-1 rounded-lg bg-ember-50 text-ember-700">
                                GST: {agent.gstName}
                              </span>
                            )}

                            {agent.companyName && (
                              <span className="w-fit text-xs font-medium px-2.5 py-1 rounded-lg bg-[#EEF3F7] text-navy-600">
                                {agent.companyName}
                              </span>
                            )}
                          </>

                        ) : (

                          <span className="w-fit text-xs font-medium px-2.5 py-1 rounded-lg bg-[#EEF3F7] text-navy-600">
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
                          className="w-8 h-8 mt-1 flex items-center justify-center rounded-full text-ember-600 hover:bg-ember-50 transition-colors"
                        >
                          <FiEye size={15} />
                        </button>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4 border-l border-navy-50">

                      <span className="relative w-11 h-6 rounded-full bg-emerald-100 flex items-center">

                        <span className="absolute left-5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">

                          <FiCheckCircle size={11} />

                        </span>

                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-1 text-navy-500">

                        {/* VIEW */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAgent(null);
                            setVisaAgent(null);
                            setViewAgent(agent);
                          }}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-ember-50 hover:text-ember-600 transition-colors"
                          title="View Agent"
                        >
                          <FiEye size={16} />
                        </button>

                        {/* EDIT / PROFILE */}
                        <button
                          type="button"
                          onClick={() => {
                            setViewAgent(null);
                            setVisaAgent(null);
                            setSelectedAgent(agent);
                          }}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-ember-50 hover:text-ember-600 transition-colors"
                          title="Agent Profile"
                        >
                          <FiEdit2 size={16} />
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          onClick={() => handleDelete(agent._id)}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-navy-50">

          <p className="text-sm text-navy-500">
            Showing {agents.length} Agents
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled
              className="w-8 h-8 flex items-center justify-center border border-navy-100 text-navy-300 rounded-full cursor-not-allowed"
            >
              ‹
            </button>

            <button
              type="button"
              className="w-8 h-8 text-xs font-semibold rounded-full bg-ember-500 text-white"
            >
              1
            </button>

            <button
              type="button"
              disabled
              className="w-8 h-8 flex items-center justify-center border border-navy-100 text-navy-300 rounded-full cursor-not-allowed"
            >
              ›
            </button>

          </div>

        </div>

      </div>

      {/* ================= VISA VIEW ================= */}
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

      {/* ================= AGENT PROFILE ================= */}
      {selectedAgent && (
        <AgentProfileDrawer
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {/* ================= VIEW POPUP ================= */}
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
  );
};

export default AgentDirectory;