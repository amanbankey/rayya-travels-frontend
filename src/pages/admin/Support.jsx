
import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiX,
  FiHelpCircle as PageIcon,
} from "react-icons/fi";
import api from "../../api/axios";

const statusOptions = ["Pending", "In Progress", "Resolved"];

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const getStatusClass = (status) => {
  switch (status) {
    case "Resolved":
      return "bg-emerald-50 text-emerald-600";

    case "In Progress":
      return "bg-blue-50 text-blue-600";

    default:
      return "bg-amber-50 text-amber-600";
  }
};

const UpdateTicketModal = ({ ticket, onClose, onUpdated }) => {
  const [status, setStatus] = useState(ticket.status);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    setError("");

    try {
      const response = await api.patch(
        `/admin/support-tickets/${ticket.id}`,
        {
          status,
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to update ticket"
        );
      }

      onUpdated(response.data.data);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update ticket"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-navy-50 px-6 py-5">
          <div>
            <h2 className="text-base font-bold text-ember-600">
              Support Ticket
            </h2>

            <p className="mt-1 text-xs text-navy-500">
              View support request details and update status.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-navy-400 transition hover:bg-navy-50 hover:text-navy-700"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="max-h-[75vh] space-y-5 overflow-y-auto px-6 py-5">
          <div className="rounded-2xl bg-[#EEF3F7] p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-wide text-navy-400">
                  SUPPORT ID
                </p>

                <p className="mt-1 text-sm font-bold text-ember-600">
                  {ticket.supportId || "-"}
                </p>
              </div>

              <span
                className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusClass(
                  ticket.status
                )}`}
              >
                <FiClock size={10} />
                {ticket.status || "Pending"}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ember-600 text-xs font-bold text-white">
                {getInitials(ticket.fullName)}
              </div>

              <div>
                <p className="text-sm font-bold text-navy-900">
                  {ticket.fullName || "-"}
                </p>

                <p className="text-xs text-navy-500">
                  {ticket.email || "-"}
                </p>

                <p className="text-xs text-navy-500">
                  {ticket.phone || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-[10px] font-bold tracking-wide text-navy-400">
                SERVICE
              </p>

              <div className="rounded-xl border border-navy-100 bg-[#EEF3F7] px-3 py-2.5 text-sm font-semibold text-navy-800">
                {ticket.service || "-"}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-[10px] font-bold tracking-wide text-navy-400">
                DESTINATION
              </p>

              <div className="rounded-xl border border-navy-100 bg-[#EEF3F7] px-3 py-2.5 text-sm font-semibold text-navy-800">
                {ticket.destination || "-"}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-[10px] font-bold tracking-wide text-navy-400">
                TRAVEL DATE
              </p>

              <div className="rounded-xl border border-navy-100 bg-[#EEF3F7] px-3 py-2.5 text-sm font-semibold text-navy-800">
                {ticket.travelDate || "-"}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-[10px] font-bold tracking-wide text-navy-400">
                TRAVELLERS
              </p>

              <div className="rounded-xl border border-navy-100 bg-[#EEF3F7] px-3 py-2.5 text-sm font-semibold text-navy-800">
                {ticket.travellers || "-"}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-[10px] font-bold tracking-wide text-navy-400">
              REQUEST DETAILS
            </p>

            <div className="min-h-[100px] rounded-xl border border-navy-100 bg-[#EEF3F7] px-3 py-3 text-sm leading-6 text-navy-600">
              {ticket.brief || "No additional details provided."}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-bold tracking-wide text-navy-400">
              UPDATE STATUS
            </p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {statusOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStatus(item)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                    status === item
                      ? "border-ember-400 bg-ember-50 text-ember-600"
                      : "border-navy-100 text-navy-500 hover:bg-ember-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-navy-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-navy-600 transition hover:bg-navy-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-2xl bg-ember-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiCheckCircle size={15} />

            {isSaving ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

const SupportHelpdeskQueue = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTicket, setActiveTicket] = useState(null);

  const [pendingCount, setPendingCount] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (status !== "All") {
        params.append("status", status);
      }

      params.append("page", "1");
      params.append("limit", "50");

      const response = await api.get(
        `/admin/support-tickets?${params.toString()}`
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to fetch tickets"
        );
      }

      const data = response.data.data || {};

      setTickets(data.tickets || []);
      setTotal(data.total || 0);
      setPendingCount(data.pendingCount || 0);
    } catch (err) {
      console.error("Support Tickets Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load support tickets"
      );

      setTickets([]);
      setTotal(0);
      setPendingCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [status]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleUpdatedTicket = (updatedTicket) => {
    const formattedTicket = {
      id: updatedTicket.id || updatedTicket._id,
      supportId: updatedTicket.supportId || updatedTicket.ticketId,
      fullName: updatedTicket.fullName || "",
      email: updatedTicket.email || "",
      phone: updatedTicket.phone || "",
      service: updatedTicket.service || "",
      destination: updatedTicket.destination || "",
      travelDate: updatedTicket.travelDate || "",
      travellers: updatedTicket.travellers || "",
      brief: updatedTicket.brief || "",
      status: updatedTicket.status || "Pending",
      createdAt: updatedTicket.createdAt,
      updatedAt: updatedTicket.updatedAt,
    };

    setTickets((prev) =>
      prev.map((ticket) =>
        String(ticket.id) === String(formattedTicket.id)
          ? formattedTicket
          : ticket
      )
    );

    fetchTickets();
  };

  return (
    <div className=" min-h-screen flex-1 min-w-0 overflow-y-auto bg-[#EEF3F7] p-4 sm:p-6 lg:pl-2">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-ember-500 text-white ">
                <PageIcon size={24} />
              </span>

              <h1 className="text-3xl font-extrabold leading-tight text-navy-900">
                Support & Helpdesk
              </h1>
            </div>

            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-600">
              {pendingCount} Pending
            </span>
          </div>

          <p className="mt-1 max-w-xl text-sm text-navy-500">
            Manage contact requests submitted from the website.
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border-y border-r border-navy-100 border-l-4 border-l-amber-900 bg-white p-4">
          <p className="text-[10px] font-bold tracking-wide text-navy-400">
            TOTAL SUPPORT REQUESTS
          </p>

          <p className="mt-1 text-xl font-bold text-amber-900">
            {total}
          </p>
        </div>

        <div className="rounded-2xl border-y border-r border-navy-100 border-l-4 border-l-amber-400 bg-white p-4">
          <p className="text-[10px] font-bold tracking-wide text-navy-400">
            PENDING REQUESTS
          </p>

          <p className="mt-1 text-xl font-bold text-amber-600">
            {pendingCount}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-card">
        <div className="flex flex-col items-center gap-3 border-b border-navy-50 p-4 sm:flex-row">
          <div className="relative w-full flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
              size={15}
            />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchTickets();
                }
              }}
              placeholder="Search by Name, Email, Mobile or Support ID..."
              className="w-full rounded-xl border border-navy-100 py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ember-100"
            />
          </div>

          <button
            onClick={fetchTickets}
            className="w-full rounded-xl bg-ember-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
          >
            Search
          </button>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-navy-100 bg-white px-3 py-2.5 text-xs font-semibold text-navy-600 outline-none sm:w-auto"
          >
            <option value="All">Status: All</option>

            {statusOptions.map((item) => (
              <option key={item} value={item}>
                Status: {item}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="m-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-gradient-to-r from-navy-900 to-navy-800 text-navy-100">
              <tr className="border-b border-navy-50">
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-navy-100">
                  SUPPORT ID
                </th>

                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-navy-100">
                  NAME
                </th>

                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-navy-100">
                  MOBILE NO
                </th>

                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-navy-100">
                  SERVICE
                </th>

                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-navy-100">
                  DESCRIPTION
                </th>

                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-navy-100">
                  STATUS
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-bold tracking-wide text-navy-100">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-navy-500"
                  >
                    Loading support requests...
                  </td>
                </tr>
              ) : tickets.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-navy-500"
                  >
                    No support requests found.
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-gray-50 transition hover:bg-ember-50"
                  >
                    <td className="px-5 py-4">
                      <span className="inline-block rounded bg-ember-50 px-2 py-0.5 text-[11px] font-bold text-ember-600">
                        {ticket.supportId || "-"}
                      </span>

                      <p className="mt-1.5 text-[10px] text-navy-400">
                        {ticket.createdAt
                          ? new Date(ticket.createdAt).toLocaleString()
                          : "-"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ember-600 text-xs font-bold text-white">
                          {getInitials(ticket.fullName)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-navy-900">
                            {ticket.fullName || "-"}
                          </p>

                          <p className="text-xs text-navy-400">
                            {ticket.email || "-"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <p className="text-sm font-semibold text-navy-700">
                        {ticket.phone || "-"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-navy-800">
                        {ticket.service || "-"}
                      </p>

                      {ticket.destination && (
                        <p className="mt-1 text-xs text-navy-400">
                          {ticket.destination}
                        </p>
                      )}
                    </td>

                    <td className="max-w-sm px-5 py-4">
                      <p className="line-clamp-2 text-xs text-navy-500">
                        {ticket.brief || "No details provided."}
                      </p>

                      {ticket.travelDate && (
                        <p className="mt-1 text-[10px] font-semibold text-navy-400">
                          Travel: {ticket.travelDate}
                        </p>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClass(
                          ticket.status
                        )}`}
                      >
                        <FiClock size={10} />
                        {ticket.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setActiveTicket(ticket)}
                        className="rounded-xl p-1.5 text-ember-600 transition hover:bg-ember-50"
                        title="View / Update"
                      >
                        <FiEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {activeTicket && (
        <UpdateTicketModal
          ticket={activeTicket}
          onClose={() => setActiveTicket(null)}
          onUpdated={handleUpdatedTicket}
        />
      )}
    </div>
  );
};

export default SupportHelpdeskQueue;

