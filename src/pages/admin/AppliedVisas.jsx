import React, { useEffect, useState } from "react";

// ===== DUMMY DATA (backend removed) =====
const DUMMY_APPLICATIONS = [
  {
    _id: "va1",
    referenceNumber: "VIS-8921",
    applicant: { name: "Vivan Travels", email: "vivan@vivantravels.com", phone: "9876543210", role: "agent" },
    goingFrom: "India",
    goingTo: "UAE",
    travelDate: "2026-10-15",
    returnDate: "2026-11-14",
    visaTotal: 7150,
    insurance: false,
    insuranceTotal: 0,
    totalAmount: 7150,
    paymentStatus: "Paid",
    status: "Pending",
    adminNote: "",
    createdAt: "2026-09-26T11:30:00.000Z",
    travelers: [
      {
        _id: "tr1",
        firstName: "Amit",
        lastName: "Sharma",
        gender: "Male",
        passportNumber: "N1234567",
        files: {
          passport: { url: "#", originalName: "passport_amit.pdf" },
          photo: { url: "#", originalName: "photo_amit.jpg" },
        },
      },
    ],
  },
  {
    _id: "va2",
    referenceNumber: "VIS-8922",
    applicant: { name: "Rahul Mehta", email: "rahul.mehta@gmail.com", phone: "9876501234", role: "user" },
    goingFrom: "India",
    goingTo: "Singapore",
    travelDate: "2026-11-02",
    returnDate: "2026-11-09",
    visaTotal: 4200,
    insurance: true,
    insuranceTotal: 450,
    totalAmount: 4650,
    paymentStatus: "Paid",
    status: "In Process",
    adminNote: "Documents verified.",
    createdAt: "2026-09-27T09:10:00.000Z",
    travelers: [
      {
        _id: "tr2",
        firstName: "Rahul",
        lastName: "Mehta",
        gender: "Male",
        passportNumber: "P7654321",
        files: {
          passport: { url: "#", originalName: "passport_rahul.pdf" },
        },
      },
      {
        _id: "tr3",
        firstName: "Neha",
        lastName: "Mehta",
        gender: "Female",
        passportNumber: "P7654322",
        files: {
          passport: { url: "#", originalName: "passport_neha.pdf" },
        },
      },
    ],
  },
  {
    _id: "va3",
    referenceNumber: "VIS-8923",
    applicant: { name: "Global Tours", email: "anita@globaltours.in", phone: "9811122233", role: "agent" },
    goingFrom: "India",
    goingTo: "Thailand",
    travelDate: "2026-10-28",
    returnDate: "2026-11-04",
    visaTotal: 2500,
    insurance: false,
    insuranceTotal: 0,
    totalAmount: 2500,
    paymentStatus: "Pending",
    status: "Approved",
    adminNote: "",
    createdAt: "2026-09-28T15:45:00.000Z",
    travelers: [
      {
        _id: "tr4",
        firstName: "Sunil",
        lastName: "Verma",
        gender: "Male",
        passportNumber: "K9988776",
        files: {},
      },
    ],
  },
];

const STATUS_OPTIONS = [
  "Pending",
  "In Process",
  "Approved",
  "Rejected",
  "On Hold",
];

const AppliedVisas = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadApplications = () => {
    setLoading(true);
    setError("");
    setApplications((prev) =>
      prev.length ? prev : DUMMY_APPLICATIONS
    );
    setLoading(false);
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

  const handleStatusChange = (id, status) => {
    setSaving(true);

    const target = applications.find((item) => item._id === id);
    const updated = { ...target, status };

    setApplications((previous) =>
      previous.map((item) => (item._id === id ? updated : item))
    );

    setSelected(updated);
    setSaving(false);
  };

  const handleNoteSave = () => {
    if (!selected?._id) return;

    setSaving(true);

    const updated = { ...selected, adminNote: selected.adminNote || "" };

    setApplications((previous) =>
      previous.map((item) =>
        item._id === updated._id ? updated : item
      )
    );

    setSelected(updated);
    setSaving(false);

    alert("Admin note saved successfully.");
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

    return url;
  };

  return (
    <main className="flex-1 min-w-0 overflow-y-auto bg-stone-50 p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-navy-900">
            Applied Visas
          </h1>

          <p className="mt-1 text-sm text-stone-500">
            Manage visa applications submitted by users and agents.
          </p>
        </div>

        <button
          onClick={loadApplications}
          disabled={loading}
          className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
      <div className="mb-5 rounded-2xl border border-stone-200 bg-white p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reference, applicant, email, phone or destination..."
          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-ember-500 focus:ring-2 focus:ring-ember-100"
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="border-b bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-4 py-4">Reference</th>
                <th className="px-4 py-4">Applicant</th>
                <th className="px-4 py-4">Applied By</th>
                <th className="px-4 py-4">Destination</th>
                <th className="px-4 py-4">Travel Date</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4">Payment</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-12 text-center text-stone-500"
                  >
                    Loading visa applications...
                  </td>
                </tr>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-12 text-center text-stone-500"
                  >
                    No visa applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="transition hover:bg-stone-50"
                  >
                    <td className="px-4 py-4 font-semibold text-ember-700">
                      {app.referenceNumber || "-"}
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium text-navy-800">
                        {app.applicant?.name || "-"}
                      </p>

                      <p className="mt-1 text-xs text-stone-500">
                        {app.applicant?.email || "-"}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-ember-50 px-3 py-1 text-xs font-medium capitalize text-ember-700">
                        {app.applicant?.role || "User"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-stone-700">
                      {app.goingTo ||
                        app.visa?.going_to ||
                        "-"}
                    </td>

                    <td className="px-4 py-4 text-stone-600">
                      {app.travelDate || "-"}
                    </td>

                    <td className="px-4 py-4 font-medium text-navy-800">
                      ₹{Number(app.totalAmount ?? app.amount ?? 0).toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-xs font-medium text-stone-600">
                        {app.paymentStatus || "Pending"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        {app.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelected(app)}
                        className="rounded-xl bg-ember-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-ember-700"
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-6">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-navy-900">
                  Visa Application Details
                </h2>

                <p className="mt-1 text-xs text-stone-500">
                  {selected.referenceNumber}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-stone-50"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 p-5">
              {/* APPLICANT */}
              <section>
                <h3 className="mb-3 font-semibold text-navy-800">
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
                <h3 className="mb-3 font-semibold text-navy-800">
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
                <h3 className="mb-3 font-semibold text-navy-800">
                  Traveler Details ({selected.travelers?.length || 0})
                </h3>

                {(selected.travelers || []).map((traveler, index) => (
                  <div
                    key={traveler._id || index}
                    className="mb-4 rounded-2xl border border-stone-200 p-4"
                  >
                    <h4 className="mb-3 font-semibold text-navy-800">
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
                          <h5 className="mb-2 text-sm font-semibold text-stone-700">
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
                                  className="rounded-xl border border-ember-200 bg-ember-50 px-3 py-2 text-xs font-medium text-ember-700 hover:bg-ember-100"
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
              <section className="rounded-2xl border border-stone-200 p-4">
                <h3 className="mb-3 font-semibold text-navy-800">
                  Admin Management
                </h3>

                <label className="mb-2 block text-sm font-medium text-stone-700">
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
                  className="w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-ember-500 sm:max-w-xs"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <label className="mb-2 mt-4 block text-sm font-medium text-stone-700">
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
                  className="w-full rounded-xl border border-stone-300 px-3 py-3 text-sm outline-none focus:border-ember-500"
                />

                <button
                  onClick={handleNoteSave}
                  disabled={saving}
                  className="mt-3 rounded-xl bg-ember-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-ember-700 disabled:opacity-50"
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
    blue: "border-ember-100 bg-ember-50 text-ember-700",
    amber: "border-amber-100 bg-amber-50 text-amber-700",
    indigo: "border-navy-100 bg-navy-50 text-navy-700",
    emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  };

  return (
    <div className={`rounded-2xl border p-5 ${colors[color]}`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="rounded-xl bg-stone-50 p-3">
    <p className="text-xs capitalize text-stone-500">
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