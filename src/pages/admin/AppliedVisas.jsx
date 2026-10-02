import { FiFileText as PageIcon, FiSearch, FiClock, FiRefreshCw, FiCheckCircle } from "react-icons/fi";

import React, { useEffect, useState } from "react";

import {
  getAdminVisaApplications,
  updateAdminVisaApplication,
} from "../../api/visaApplicationApi";

const STATUS_OPTIONS = [
  "Pending",
  "In Process",
  "Approved",
  "Rejected",
  "On Hold",
];

const STATUS_STYLE = {
  Pending: "bg-yellow-50 text-yellow-700",
  "In Process": "bg-navy-50 text-navy-700",
  Approved: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-600",
  "On Hold": "bg-orange-50 text-ember-700",
};

const AppliedVisas = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminVisaApplications();

      setApplications(response.applications || []);
    } catch (err) {
      console.error("Applied Visa Error:", err);

      setError(
        err?.response?.data?.message ||
        "Unable to load visa applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    const searchable = [
      app.referenceNumber,
      app.applicant?.name,
      app.applicant?.email,
      app.applicant?.phone,
      app.applicant?.role,
      app.goingFrom,
      app.goingTo,
      app.visa?.going_from,
      app.visa?.going_to,
    ];

    return searchable.some((value) =>
      String(value || "").toLowerCase().includes(query)
    );
  });

  const handleStatusChange = async (id, status) => {
    try {
      setSaving(true);

      const response = await updateAdminVisaApplication(
        id,
        { status }
      );

      const updated = response.application;

      setApplications((previous) =>
        previous.map((item) =>
          item._id === id ? updated : item
        )
      );

      setSelected(updated);
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Unable to update application status."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleNoteSave = async () => {
    if (!selected?._id) return;

    try {
      setSaving(true);

      const response = await updateAdminVisaApplication(
        selected._id,
        { adminNote: selected.adminNote || "" }
      );

      const updated = response.application;

      setApplications((previous) =>
        previous.map((item) =>
          item._id === updated._id ? updated : item
        )
      );

      setSelected(updated);

      alert("Admin note saved successfully.");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Unable to save admin note."
      );
    } finally {
      setSaving(false);
    }
  };

  const pendingCount = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const approvedCount = applications.filter(
    (app) => app.status === "Approved"
  ).length;

  const inProcessCount = applications.filter(
    (app) => app.status === "In Process"
  ).length;

  const getDocumentUrl = (url) => {
    if (!url) return "#";

    if (url.startsWith("http")) return url;

    return `//https://rayya-travels-backend.onrender.com${url.startsWith("/") ? url : `/${url}`}`;
  };
//http://localhost:5000
//https://rayya-travels-backend.onrender.com
  return (
    <main className="p-4 sm:p-6 lg:pl-2 flex-1 min-w-0 overflow-y-auto bg-[#EEF3F7] p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-2xl bg-ember-500 text-white flex items-center justify-center flex-shrink-0">
            <PageIcon size={24} />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-navy-900 leading-tight">Applied Visas</h1>
            <p className="text-navy-400 mt-0.5">Manage visa applications submitted by users and agents.</p>
          </div>
        </div>

        {/*<button
          onClick={loadApplications}
          disabled={loading}
          className="rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-ember-50 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>*/}
      </div>

      {/* STATS */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={applications.length}
          color="blue"
        />

        <StatCard
          title="Pending"
          value={pendingCount}
          color="amber"
        />

        <StatCard
          title="In Process"
          value={inProcessCount}
          color="indigo"
        />

        <StatCard
          title="Approved"
          value={approvedCount}
          color="emerald"
        />
      </div>

      {/* SEARCH */}
      <div className="mb-5 rounded-3xl border border-navy-100 bg-white p-4">
        <div className="relative">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-navy-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reference, applicant, email, phone or destination..."
            className="w-full rounded-full border border-navy-100 bg-[#EEF3F7]/60 py-3.5 pl-12 pr-5 text-sm text-navy-800 outline-none transition placeholder:text-navy-300 focus:border-ember-400 focus:bg-white"
          />
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-navy-900 text-[11px] uppercase tracking-widest text-white">
              <tr>
                <th className="px-6 py-4 font-bold">Reference</th>
                <th className="px-6 py-4 font-bold">Applicant</th>
                <th className="px-6 py-4 font-bold">Applied By</th>
                <th className="px-6 py-4 font-bold">Destination</th>
                <th className="px-6 py-4 font-bold">Travel Date</th>
                <th className="px-6 py-4 font-bold">Amount</th>
                <th className="px-6 py-4 font-bold">Payment</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-12 text-center text-navy-500"
                  >
                    Loading visa applications...
                  </td>
                </tr>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-12 text-center text-navy-500"
                  >
                    No visa applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="transition-colors hover:bg-[#f7f9fb]"
                  >
                    <td className="px-6 py-4 font-bold text-ember-600">
                      {app.referenceNumber || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-navy-900">
                        {app.applicant?.name || "-"}
                      </p>

                      <p className="mt-0.5 text-xs text-navy-400">
                        {app.applicant?.email || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-ember-50 px-3 py-1 text-xs font-bold capitalize text-ember-700">
                        {app.applicant?.role || "User"}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-navy-800">
                      {app.goingTo ||
                        app.visa?.going_to ||
                        "-"}
                    </td>

                    <td className="px-6 py-4 text-navy-600">
                      {app.travelDate || "-"}
                    </td>

                    <td className="px-6 py-4 font-bold text-navy-900">
                      ₹{Number(app.totalAmount ?? app.amount ?? 0).toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-navy-600">
                        {app.paymentStatus || "Pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLE[app.status || "Pending"] || "bg-navy-50 text-navy-700"}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {app.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelected(app)}
                        className="rounded-full bg-ember-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-ember-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/60 p-3 sm:p-6">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-navy-100 bg-white">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-100 bg-navy-900 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visa Application Details
                </h2>

                <p className="mt-0.5 text-xs font-semibold text-ember-300">
                  {selected.referenceNumber}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* APPLICANT */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 font-bold text-navy-900">
                  <span className="h-4 w-1 rounded-full bg-ember-500" />
                  Applicant Information
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Detail label="Name" value={selected.applicant?.name} />
                  <Detail label="Email" value={selected.applicant?.email} />
                  <Detail label="Phone" value={selected.applicant?.phone} />
                  <Detail label="Applied By" value={selected.applicant?.role} />
                  <Detail label="Reference" value={selected.referenceNumber} />
                  <Detail
                    label="Applied On"
                    value={
                      selected.createdAt
                        ? new Date(selected.createdAt).toLocaleString()
                        : "-"
                    }
                  />
                </div>
              </section>

              {/* VISA */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 font-bold text-navy-900">
                  <span className="h-4 w-1 rounded-full bg-ember-500" />
                  Visa & Travel Information
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Detail
                    label="Going From"
                    value={selected.goingFrom || selected.visa?.going_from}
                  />

                  <Detail
                    label="Going To"
                    value={selected.goingTo || selected.visa?.going_to}
                  />

                  <Detail
                    label="Travel Date"
                    value={selected.travelDate}
                  />

                  <Detail
                    label="Return Date"
                    value={selected.returnDate}
                  />

                  <Detail
                    label="Visa Amount"
                    value={`₹${selected.visaTotal ?? selected.amount ?? 0}`}
                  />

                  <Detail
                    label="Insurance"
                    value={selected.insurance ? "Yes" : "No"}
                  />

                  <Detail
                    label="Insurance Amount"
                    value={`₹${selected.insuranceTotal ?? 0}`}
                  />

                  <Detail
                    label="Total Amount"
                    value={`₹${selected.totalAmount ?? selected.amount ?? 0}`}
                  />

                  <Detail
                    label="Payment Status"
                    value={selected.paymentStatus}
                  />
                </div>
              </section>

              {/* TRAVELERS */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 font-bold text-navy-900">
                  <span className="h-4 w-1 rounded-full bg-ember-500" />
                  Traveler Details ({selected.travelers?.length || 0})
                </h3>

                {(selected.travelers || []).map((traveler, index) => (
                  <div
                    key={traveler._id || index}
                    className="mb-4 rounded-2xl border border-navy-100 p-4"
                  >
                    <h4 className="mb-3 flex items-center gap-2 font-bold text-navy-800">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-[11px] text-ember-300">
                        {index + 1}
                      </span>
                      Traveler {index + 1}
                    </h4>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(traveler || {})
                        .filter(
                          ([key]) =>
                            !["_id", "id", "__v", "files"].includes(key)
                        )
                        .map(([key, value]) => (
                          <Detail
                            key={key}
                            label={key}
                            value={
                              typeof value === "object"
                                ? JSON.stringify(value)
                                : value
                            }
                          />
                        ))}
                    </div>

                    {traveler.files &&
                      Object.entries(traveler.files).length > 0 && (
                        <div className="mt-4">
                          <h5 className="mb-2 text-sm font-bold text-navy-700">
                            Uploaded Documents
                          </h5>

                          <div className="flex flex-wrap gap-2">
                            {Object.entries(traveler.files).map(
                              ([key, file]) => (
                                <a
                                  key={key}
                                  href={getDocumentUrl(file?.url)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="rounded-full border border-ember-200 bg-ember-50 px-4 py-2 text-xs font-semibold text-ember-700 transition-colors hover:bg-ember-100"
                                >
                                  View {file?.originalName || key}
                                </a>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </section>

              {/* ADMIN STATUS */}
              <section className="rounded-2xl border border-navy-100 bg-[#EEF3F7]/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-navy-900">
                  <span className="h-4 w-1 rounded-full bg-ember-500" />
                  Admin Management
                </h3>

                <label className="mb-2 block text-sm font-semibold text-navy-700">
                  Application Status
                </label>

                <select
                  value={selected.status || "Pending"}
                  disabled={saving}
                  onChange={(e) =>
                    handleStatusChange(
                      selected._id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-full border border-navy-100 bg-white px-4 py-3 text-sm outline-none focus:border-ember-400 sm:max-w-xs"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <label className="mb-2 mt-4 block text-sm font-semibold text-navy-700">
                  Admin Note
                </label>

                <textarea
                  rows="3"
                  value={selected.adminNote || ""}
                  onChange={(e) =>
                    setSelected((previous) => ({
                      ...previous,
                      adminNote: e.target.value,
                    }))
                  }
                  placeholder="Add internal note..."
                  className="w-full rounded-2xl border border-navy-100 bg-white px-4 py-3 text-sm outline-none placeholder:text-navy-300 focus:border-ember-400"
                />

                <button
                  onClick={handleNoteSave}
                  disabled={saving}
                  className="mt-3 rounded-full bg-ember-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-ember-600 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Note"}
                </button>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: { tile: "bg-navy-900 text-white", Icon: PageIcon },
    amber: { tile: "bg-yellow-100 text-yellow-700", Icon: FiClock },
    indigo: { tile: "bg-ember-500 text-white", Icon: FiRefreshCw },
    emerald: { tile: "bg-emerald-100 text-emerald-700", Icon: FiCheckCircle },
  };

  const { tile, Icon } = colors[color];

  return (
    <div className="flex items-center gap-4 rounded-3xl border border-navy-100 bg-white p-4">
      <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${tile}`}>
        <Icon size={18} />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">{title}</p>
        <p className="text-2xl font-extrabold leading-tight text-navy-900">{value}</p>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="rounded-xl bg-[#EEF3F7] p-3">
    <p className="text-xs capitalize text-navy-500">
      {label.replace(/([A-Z])/g, " $1")}
    </p>

    <p className="mt-1 break-words text-sm font-medium text-navy-800">
      {value === null || value === undefined || value === ""
        ? "-"
        : String(value)}
    </p>
  </div>
);

export default AppliedVisas;