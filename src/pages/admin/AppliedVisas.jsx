import React, { useEffect, useState } from "react";
import {
  FiX,
  FiSearch,
  FiRefreshCw,
  FiEye,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiFileText,
  FiCreditCard,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiUsers,
  FiGlobe,
  FiSave,
  FiChevronDown,
  FiExternalLink,
} from "react-icons/fi";
//import { TbPlaneDeparture, TbPassport } from "react-icons/tb";

const DUMMY_APPLICATIONS = [
  {
    _id: "va1",
    referenceNumber: "VIS-8921",
    applicant: {
      name: "Vivan Travels",
      email: "vivan@vivantravels.com",
      phone: "9876543210",
      role: "agent",
    },
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
          passport: {
            url: "#",
            originalName: "passport_amit.pdf",
          },
          photo: {
            url: "#",
            originalName: "photo_amit.jpg",
          },
        },
      },
    ],
  },
  {
    _id: "va2",
    referenceNumber: "VIS-8922",
    applicant: {
      name: "Rahul Mehta",
      email: "rahul.mehta@gmail.com",
      phone: "9876501234",
      role: "user",
    },
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
          passport: {
            url: "#",
            originalName: "passport_rahul.pdf",
          },
        },
      },
      {
        _id: "tr3",
        firstName: "Neha",
        lastName: "Mehta",
        gender: "Female",
        passportNumber: "P7654322",
        files: {
          passport: {
            url: "#",
            originalName: "passport_neha.pdf",
          },
        },
      },
    ],
  },
  {
    _id: "va3",
    referenceNumber: "VIS-8923",
    applicant: {
      name: "Global Tours",
      email: "anita@globaltours.in",
      phone: "9811122233",
      role: "agent",
    },
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
      prev.length > 0 ? prev : DUMMY_APPLICATIONS
    );

    setTimeout(() => {
      setLoading(false);
    }, 300);
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

    const target = applications.find(
      (item) => item._id === id
    );

    if (!target) {
      setSaving(false);
      return;
    }

    const updated = {
      ...target,
      status,
    };

    setApplications((previous) =>
      previous.map((item) =>
        item._id === id ? updated : item
      )
    );

    setSelected(updated);

    setTimeout(() => {
      setSaving(false);
    }, 250);
  };

  const handleNoteSave = () => {
    if (!selected?._id) return;

    setSaving(true);

    const updated = {
      ...selected,
      adminNote: selected.adminNote || "",
    };

    setApplications((previous) =>
      previous.map((item) =>
        item._id === updated._id ? updated : item
      )
    );

    setSelected(updated);

    setTimeout(() => {
      setSaving(false);
      alert("Admin note saved successfully.");
    }, 300);
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
    return url || "#";
  };

  const getStatusStyle = (status) => {
    const styles = {
      Pending: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        dot: "bg-amber-500",
      },
      "In Process": {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        dot: "bg-indigo-500",
      },
      Approved: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
      },
      Rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        dot: "bg-red-500",
      },
      "On Hold": {
        bg: "bg-slate-100",
        text: "text-slate-700",
        border: "border-slate-200",
        dot: "bg-slate-500",
      },
    };

    return styles[status] || styles.Pending;
  };

  return (
    <main className="flex-1 min-w-0 overflow-y-auto bg-[#f5f7fa] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto w-full max-w-[1700px]">

        <div className="relative mb-6 overflow-hidden rounded-3xl bg-[#0b1120] shadow-xl">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-orange-500/5 blur-3xl" />

          <div className="relative flex flex-col gap-5 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                  <TbPassport size={20} />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400">
                  Visa Operations
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Applied Visas
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Manage visa applications submitted by users and agents.
                Review documents, track applications and update status.
              </p>
            </div>

            <button
              onClick={loadApplications}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-orange-400/30 hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiRefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={applications.length}
            icon={FiFileText}
            iconClass="bg-orange-50 text-orange-600"
            borderClass="border-orange-100"
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            icon={FiClock}
            iconClass="bg-amber-50 text-amber-600"
            borderClass="border-amber-100"
          />

          <StatCard
            title="In Process"
            value={inProcessCount}
            icon={FiAlertCircle}
            iconClass="bg-indigo-50 text-indigo-600"
            borderClass="border-indigo-100"
          />

          <StatCard
            title="Approved"
            value={approvedCount}
            icon={FiCheckCircle}
            iconClass="bg-emerald-50 text-emerald-600"
            borderClass="border-emerald-100"
          />
        </div>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="relative">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference, applicant, email, phone or destination..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:bg-slate-100 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
              >
                <FiX size={15} />
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredApplications.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {applications.length}
              </span>{" "}
              applications
            </p>

            {search && (
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                Search: {search}
              </span>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <FiAlertCircle size={18} />
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Visa Applications
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Review and manage submitted visa applications
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 sm:flex">
              <FiUsers size={15} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">
                {applications.length} Records
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Reference
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Applicant
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Applied By
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Destination
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Travel Date
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Payment
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="9" className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                          <TbPassport
                            size={23}
                            className="animate-pulse"
                          />
                        </div>

                        <p className="text-sm font-semibold text-slate-600">
                          Loading visa applications...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <FiSearch size={23} />
                        </div>

                        <p className="text-sm font-semibold text-slate-700">
                          No visa applications found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try changing your search query
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => {
                    const statusStyle = getStatusStyle(
                      app.status
                    );

                    return (
                      <tr
                        key={app._id}
                        className="group transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-100">
                              <TbPassport size={17} />
                            </div>

                            <span className="font-bold text-orange-600">
                              {app.referenceNumber || "-"}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b1120] text-sm font-bold text-white">
                              {(app.applicant?.name || "U")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-800">
                                {app.applicant?.name || "-"}
                              </p>

                              <p className="mt-0.5 max-w-[190px] truncate text-xs text-slate-500">
                                {app.applicant?.email || "-"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                              app.applicant?.role === "agent"
                                ? "bg-orange-50 text-orange-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {app.applicant?.role === "agent" ? (
                              <FiUsers size={12} />
                            ) : (
                              <FiUser size={12} />
                            )}

                            {app.applicant?.role || "user"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <FiMapPin
                              size={15}
                              className="text-orange-500"
                            />

                            <div>
                              <p className="font-semibold text-slate-700">
                                {app.goingTo ||
                                  app.visa?.going_to ||
                                  "-"}
                              </p>

                              <p className="mt-0.5 text-[11px] text-slate-400">
                                From{" "}
                                {app.goingFrom ||
                                  app.visa?.going_from ||
                                  "-"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <FiCalendar
                              size={14}
                              className="text-slate-400"
                            />

                            <span className="font-medium">
                              {app.travelDate || "-"}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="font-bold text-slate-800">
                            ₹
                            {Number(
                              app.totalAmount ??
                                app.amount ??
                                0
                            ).toLocaleString("en-IN")}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                              app.paymentStatus === "Paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                app.paymentStatus === "Paid"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />

                            {app.paymentStatus || "Pending"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                            />

                            {app.status || "Pending"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() => setSelected(app)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#0b1120] px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md"
                          >
                            <FiEye size={14} />
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-[#f8fafc] shadow-2xl">
            <div className="relative shrink-0 overflow-hidden bg-[#0b1120]">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4 p-5 sm:p-6">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 sm:h-14 sm:w-14">
                    <TbPassport size={25} />
                  </div>

                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400">
                        Visa Application
                      </span>

                      <span className="h-1 w-1 rounded-full bg-slate-600" />

                      <span className="text-xs font-medium text-slate-400">
                        {selected.referenceNumber}
                      </span>
                    </div>

                    <h2 className="truncate text-lg font-bold text-white sm:text-xl">
                      {selected.applicant?.name || "Applicant"}
                    </h2>

                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <FiMail size={12} />
                        {selected.applicant?.email || "-"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiPhone size={12} />
                        {selected.applicant?.phone || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="relative grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
                <ModalStat
                  icon={FiGlobe}
                  label="Route"
                  value={`${selected.goingFrom || "-"} → ${
                    selected.goingTo || "-"
                  }`}
                />

                <ModalStat
                  icon={FiCalendar}
                  label="Travel Date"
                  value={selected.travelDate || "-"}
                />

                <ModalStat
                  icon={FiUsers}
                  label="Travelers"
                  value={selected.travelers?.length || 0}
                />

                <ModalStat
                  icon={FiCreditCard}
                  label="Total"
                  value={`₹${Number(
                    selected.totalAmount ??
                      selected.amount ??
                      0
                  ).toLocaleString("en-IN")}`}
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="space-y-5 p-4 sm:p-6">

                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <SectionHeader
                    icon={FiUser}
                    title="Applicant Information"
                    subtitle="Basic applicant details"
                  />

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Detail
                      label="Name"
                      value={selected.applicant?.name}
                      icon={FiUser}
                    />

                    <Detail
                      label="Email"
                      value={selected.applicant?.email}
                      icon={FiMail}
                    />

                    <Detail
                      label="Phone"
                      value={selected.applicant?.phone}
                      icon={FiPhone}
                    />

                    <Detail
                      label="Applied By"
                      value={selected.applicant?.role}
                      icon={FiUsers}
                    />

                    <Detail
                      label="Reference"
                      value={selected.referenceNumber}
                      icon={FiFileText}
                    />

                    <Detail
                      label="Applied On"
                      value={
                        selected.createdAt
                          ? new Date(
                              selected.createdAt
                            ).toLocaleString()
                          : "-"
                      }
                      icon={FiCalendar}
                    />
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <SectionHeader
                    icon={TbPlaneDeparture}
                    title="Visa & Travel Information"
                    subtitle="Route, travel dates and payment information"
                  />

                  <div className="mb-4 rounded-2xl bg-[#0b1120] p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                          <TbPlaneDeparture size={21} />
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                            Travel Route
                          </p>

                          <p className="mt-1 text-sm font-bold text-white">
                            {selected.goingFrom ||
                              selected.visa?.going_from ||
                              "-"}{" "}
                            <span className="mx-2 text-orange-400">
                              →
                            </span>
                            {selected.goingTo ||
                              selected.visa?.going_to ||
                              "-"}
                          </p>
                        </div>
                      </div>

                      <StatusBadge status={selected.status} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Detail
                      label="Going From"
                      value={
                        selected.goingFrom ||
                        selected.visa?.going_from
                      }
                      icon={FiMapPin}
                    />

                    <Detail
                      label="Going To"
                      value={
                        selected.goingTo ||
                        selected.visa?.going_to
                      }
                      icon={FiMapPin}
                    />

                    <Detail
                      label="Travel Date"
                      value={selected.travelDate}
                      icon={FiCalendar}
                    />

                    <Detail
                      label="Return Date"
                      value={selected.returnDate}
                      icon={FiCalendar}
                    />

                    <Detail
                      label="Visa Amount"
                      value={`₹${Number(
                        selected.visaTotal ??
                          selected.amount ??
                          0
                      ).toLocaleString("en-IN")}`}
                      icon={FiCreditCard}
                    />

                    <Detail
                      label="Insurance"
                      value={
                        selected.insurance ? "Yes" : "No"
                      }
                      icon={FiShield}
                    />

                    <Detail
                      label="Insurance Amount"
                      value={`₹${Number(
                        selected.insuranceTotal ?? 0
                      ).toLocaleString("en-IN")}`}
                      icon={FiCreditCard}
                    />

                    <Detail
                      label="Total Amount"
                      value={`₹${Number(
                        selected.totalAmount ??
                          selected.amount ??
                          0
                      ).toLocaleString("en-IN")}`}
                      icon={FiCreditCard}
                      highlight
                    />

                    <Detail
                      label="Payment Status"
                      value={selected.paymentStatus}
                      icon={FiCheckCircle}
                    />
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <SectionHeader
                    icon={FiUsers}
                    title={`Traveler Details (${
                      selected.travelers?.length || 0
                    })`}
                    subtitle="Traveler information and uploaded documents"
                  />

                  <div className="space-y-4">
                    {(selected.travelers || []).map(
                      (traveler, index) => (
                        <div
                          key={traveler._id || index}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:border-orange-200 hover:bg-white hover:shadow-sm"
                        >
                          <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1120] text-sm font-bold text-white">
                                {index + 1}
                              </div>

                              <div>
                                <p className="text-sm font-bold text-slate-800">
                                  {traveler.firstName || ""}
                                  {traveler.lastName
                                    ? ` ${traveler.lastName}`
                                    : ""}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  Traveler {index + 1}
                                </p>
                              </div>
                            </div>

                            {traveler.passportNumber && (
                              <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">
                                <TbPassport size={14} />
                                {traveler.passportNumber}
                              </span>
                            )}
                          </div>

                          <div className="p-4">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {Object.entries(traveler || {})
                                .filter(
                                  ([key]) =>
                                    ![
                                      "_id",
                                      "id",
                                      "__v",
                                      "files",
                                    ].includes(key)
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
                              Object.entries(
                                traveler.files
                              ).length > 0 && (
                                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                                  <div className="mb-3 flex items-center gap-2">
                                    <FiFileText
                                      size={15}
                                      className="text-orange-500"
                                    />

                                    <h5 className="text-sm font-bold text-slate-700">
                                      Uploaded Documents
                                    </h5>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    {Object.entries(
                                      traveler.files
                                    ).map(
                                      ([key, file]) => (
                                        <a
                                          key={key}
                                          href={getDocumentUrl(
                                            file?.url
                                          )}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex max-w-full items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 transition hover:bg-orange-100"
                                        >
                                          <FiFileText size={14} />

                                          <span className="max-w-[180px] truncate">
                                            {file?.originalName ||
                                              key}
                                          </span>

                                          <FiExternalLink
                                            size={12}
                                          />
                                        </a>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      )
                    )}

                    {(!selected.travelers ||
                      selected.travelers.length === 0) && (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                        <FiUsers
                          size={24}
                          className="mx-auto text-slate-400"
                        />

                        <p className="mt-2 text-sm font-semibold text-slate-600">
                          No traveler details available
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <SectionHeader
                    icon={FiShield}
                    title="Admin Management"
                    subtitle="Update status and manage internal notes"
                  />

                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Application Status
                      </label>

                      <div className="relative">
                        <select
                          value={
                            selected.status || "Pending"
                          }
                          disabled={saving}
                          onChange={(e) =>
                            handleStatusChange(
                              selected._id,
                              e.target.value
                            )
                          }
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm font-semibold text-slate-700 outline-none transition hover:bg-white focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                        >
                          {STATUS_OPTIONS.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>
                            )
                          )}
                        </select>

                        <FiChevronDown
                          size={16}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>

                      <div className="mt-3">
                        <StatusBadge
                          status={
                            selected.status || "Pending"
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Admin Note
                      </label>

                      <textarea
                        rows="4"
                        value={selected.adminNote || ""}
                        onChange={(e) =>
                          setSelected((previous) => ({
                            ...previous,
                            adminNote: e.target.value,
                          }))
                        }
                        placeholder="Add internal note..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:bg-white focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                      />

                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={handleNoteSave}
                          disabled={saving}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#0b1120] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FiSave size={15} />
                          {saving ? "Saving..." : "Save Note"}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 border-t border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-slate-500">
                Reference{" "}
                <span className="font-semibold text-slate-700">
                  {selected.referenceNumber}
                </span>
              </p>

              <button
                onClick={() => setSelected(null)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <FiX size={15} />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconClass,
  borderClass,
}) => {
  return (
    <div
      className={`group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${borderClass}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
            {value}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            Current applications
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-105 ${iconClass}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

const ModalStat = ({ icon: Icon, label, value }) => {
  return (
    <div className="border-r border-white/10 px-4 py-3 last:border-r-0 sm:px-5">
      <div className="flex items-center gap-2">
        <Icon size={13} className="text-orange-400" />

        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
      </div>

      <p className="mt-1 truncate text-xs font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
};

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}) => {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
        <Icon size={17} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-800">
          {title}
        </h3>

        <p className="mt-0.5 text-xs text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const style = {
    Pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      dot: "bg-amber-500",
    },
    "In Process": {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
      dot: "bg-indigo-500",
    },
    Approved: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
    },
    Rejected: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-500",
    },
    "On Hold": {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-200",
      dot: "bg-slate-500",
    },
  };

  const current = style[status] || style.Pending;

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${current.bg} ${current.text} ${current.border}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${current.dot}`}
      />

      {status || "Pending"}
    </span>
  );
};

const Detail = ({
  label,
  value,
  icon: Icon,
  highlight = false,
}) => {
  const formattedLabel = String(label || "")
    .replace(/([A-Z])/g, " $1")
    .trim();

  return (
    <div
      className={`rounded-xl border p-3 transition ${
        highlight
          ? "border-orange-100 bg-orange-50/70"
          : "border-slate-100 bg-slate-50/70 hover:border-slate-200 hover:bg-white"
      }`}
    >
      <div className="flex items-center gap-1.5">
        {Icon && (
          <Icon
            size={12}
            className={
              highlight
                ? "text-orange-500"
                : "text-slate-400"
            }
          />
        )}

        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {formattedLabel}
        </p>
      </div>

      <p
        className={`mt-1.5 break-words text-sm font-semibold ${
          highlight ? "text-orange-700" : "text-slate-700"
        }`}
      >
        {value === null ||
        value === undefined ||
        value === ""
          ? "-"
          : String(value)}
      </p>
    </div>
  );
};

export default AppliedVisas;