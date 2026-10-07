import { useEffect, useState } from "react";
import { Check, Stamp, Clock3, AlertCircle, Loader2 } from "lucide-react";
import Reveal from "../../components/Reveal";

import {
  getMyVisaApplications,
} from "../../api/visaApplicationApi";

// =====================================================
// BACKEND STATUSES - EXACTLY AS PER VISA APPLICATION MODEL
// =====================================================

const steps = [
  "Submitted",
  "Documents Verified",
  "Processing",
  "Decision",
];

const filters = [
  "All",
  "Pending",
  "In Process",
  "Approved",
  "Rejected",
  "On Hold",
];

// =====================================================
// STATUS STYLES
//
// Hex (arbitrary) values use kiye hain, taaki Tailwind config me
// default colors (amber/blue/emerald...) na ho tab bhi color aaye.
// =====================================================

const statusStyle = {
  Pending: {
    badge:
      "bg-[#FEF3C7] text-[#92400E] ring-[#FCD34D]",
    dot: "bg-[#F59E0B]",
  },

  "In Process": {
    badge:
      "bg-[#DBEAFE] text-[#1D4ED8] ring-[#93C5FD]",
    dot: "bg-[#3B82F6]",
  },

  Approved: {
    badge:
      "bg-[#D1FAE5] text-[#047857] ring-[#6EE7B7]",
    dot: "bg-[#10B981]",
  },

  Rejected: {
    badge:
      "bg-[#FEE2E2] text-[#B91C1C] ring-[#FCA5A5]",
    dot: "bg-[#EF4444]",
  },

  "On Hold": {
    badge:
      "bg-[#FFEDD5] text-[#C2410C] ring-[#FDBA74]",
    dot: "bg-[#F97316]",
  },
};

const defaultStatusStyle = {
  badge: "bg-[#F1F5F9] text-[#475569] ring-[#CBD5E1]",
  dot: "bg-[#94A3B8]",
};

// =====================================================
// STATUS -> STEP
// =====================================================

const getStatusStep = (status) => {
  switch (status) {
    case "Pending":
      return 0;

    case "In Process":
      return 2;

    case "Approved":
      return 3;

    case "Rejected":
      return 3;

    case "On Hold":
      return 2;

    default:
      return 0;
  }
};

// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// =====================================================
// FORMAT AMOUNT
// =====================================================

const formatAmount = (amount) => {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "₹0";
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

// =====================================================
// GET VISA TYPE
// =====================================================

const getVisaType = (application) => {
  const visa = application?.visa || {};

  return (
    visa?.title ||
    visa?.name ||
    visa?.visaType ||
    visa?.type ||
    visa?.about ||
    "Visa Application"
  );
};

// =====================================================
// GET VISA DURATION
// =====================================================

const getVisaDuration = (application) => {
  const visa = application?.visa || {};

  const duration =
    visa?.duration ||
    visa?.validity ||
    visa?.validityPeriod ||
    "";

  if (!duration) {
    return "";
  }

  return String(duration);
};

// =====================================================
// APPLICATION CARD
// =====================================================

const AppliedVisaHistory = () => {
  const [filter, setFilter] = useState("All");

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ===================================================
  // GET LOGGED-IN USER / AGENT APPLICATIONS
  // ===================================================

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyVisaApplications();

      if (response?.success) {
        setApplications(
          Array.isArray(response.applications)
            ? response.applications
            : []
        );
      } else {
        setApplications([]);
        setError(
          response?.message ||
            "Unable to load visa applications."
        );
      }
    } catch (err) {
      console.error(
        "getMyVisaApplications error:",
        err
      );

      setApplications([]);

      setError(
        err?.response?.data?.message ||
          "Unable to load visa application history."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // LOAD ON COMPONENT MOUNT
  // ===================================================

  useEffect(() => {
    fetchApplications();
  }, []);

  // ===================================================
  // FILTER APPLICATIONS
  // ===================================================

  const list = applications.filter((application) => {
    if (filter === "All") {
      return true;
    }

    return application.status === filter;
  });

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div>
        <div className="mb-5">
          <h2 className="text-2xl font-medium text-navy">
            Applied Visa History
          </h2>

          <p className="text-sm text-navy-400">
            Track every visa application you have submitted.
          </p>
        </div>

        <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-navy-100 bg-white">
          <div className="flex flex-col items-center gap-3 text-navy-400">
            <Loader2
              size={28}
              className="animate-spin"
            />

            <p className="text-sm">
              Loading visa applications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error) {
    return (
      <div>
        <div className="mb-5">
          <h2 className="text-2xl font-medium text-navy">
            Applied Visa History
          </h2>

          <p className="text-sm text-navy-400">
            Track every visa application you have submitted.
          </p>
        </div>

        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-[#FEE2E2] bg-white px-5 text-center">
          <AlertCircle
            size={32}
            className="mb-3 text-[#EF4444]"
          />

          <p className="text-sm font-medium text-navy">
            Unable to load applications
          </p>

          <p className="mt-1 text-xs text-navy-400">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchApplications}
            className="mt-4 rounded-full bg-navy px-5 py-2 text-xs font-medium text-white transition hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <div>
      {/* ================================================
          HEADER
      ================================================= */}

      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-medium text-navy">
            Applied Visa History
          </h2>

          <p className="text-sm text-navy-400">
            Track every visa application you have submitted.
          </p>
        </div>

        {/* =============================================
            FILTERS
        ============================================== */}

        <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-navy-100 bg-white p-1">
          {filters.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                filter === status
                  ? "bg-navy text-white shadow"
                  : "text-navy-400 hover:text-navy"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* ================================================
          EMPTY STATE
      ================================================= */}

      {list.length === 0 && (
        <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-navy-100 bg-white px-5 text-center">
          <Stamp
            size={36}
            className="mb-3 text-navy-300"
          />

          <h3 className="text-base font-medium text-navy">
            No visa applications found
          </h3>

          <p className="mt-1 text-sm text-navy-400">
            {filter === "All"
              ? "You have not submitted any visa applications yet."
              : `No applications with ${filter} status.`}
          </p>
        </div>
      )}

      {/* ================================================
          APPLICATIONS
      ================================================= */}

      {list.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {list.map((application, index) => {
            const status = application?.status || "Pending";

            const style =
              statusStyle[status] || defaultStatusStyle;

            const currentStep = getStatusStep(status);

            const rejected = status === "Rejected";

            const isDecision =
              status === "Approved" ||
              status === "Rejected";

            const visaType = getVisaType(application);

            const visaDuration =
              getVisaDuration(application);

            return (
              <Reveal
                key={
                  application?._id ||
                  application?.referenceNumber ||
                  index
                }
                delay={index * 60}
              >
                <article className="h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_-14px_rgba(11,22,40,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(11,22,40,0.30)]">

                  {/* ==================================
                      TOP
                  =================================== */}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">

                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ember-600 text-white shadow-md">
                        <Stamp size={20} />
                      </span>

                      <div className="min-w-0">
                        <h3 className="text-xl font-medium text-navy">
                          {application?.destination ||
                            "Visa Application"}
                        </h3>

                        <p className="text-xs text-navy-400">
                          {visaType}

                          {visaDuration
                            ? ` • ${visaDuration}`
                            : ""}
                        </p>
                      </div>
                    </div>

                    {/* =================================
                        EXACT BACKEND STATUS
                    ================================== */}

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${style.badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                      />

                      {status}
                    </span>
                  </div>

                  {/* ==================================
                      STATUS TIMELINE
                  =================================== */}

                  <ol className="mt-7 grid grid-cols-4">
                    {steps.map((step, stepIndex) => {
                      const done =
                        stepIndex < currentStep ||
                        (
                          stepIndex === currentStep &&
                          isDecision
                        );

                      const current =
                        stepIndex === currentStep &&
                        !isDecision;

                      const last =
                        stepIndex === steps.length - 1;

                      return (
                        <li
                          key={step}
                          className="relative flex flex-col items-center text-center"
                        >
                          {/* Connector */}

                          {stepIndex > 0 && (
                            <span
                              className={`absolute right-1/2 top-3.5 h-0.5 w-full ${
                                stepIndex <= currentStep
                                  ? rejected
                                    ? "bg-[#FCA5A5]"
                                    : "bg-ember-400"
                                  : "bg-navy-100"
                              }`}
                            />
                          )}

                          {/* Circle */}

                          <span
                            className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold ${
                              done
                                ? rejected && last
                                  ? "bg-[#EF4444] text-white"
                                  : "bg-ember-600 text-white"
                                : current
                                ? "border-2 border-ember-500 bg-white text-ember-600 ring-4 ring-ember-100"
                                : "border border-navy-100 bg-navy-50/60 text-navy-400"
                            }`}
                          >
                            {done ? (
                              <Check size={14} />
                            ) : current ? (
                              <Clock3 size={13} />
                            ) : (
                              stepIndex + 1
                            )}
                          </span>

                          <span className="mt-2 px-1 text-[10px] leading-tight text-navy-400">
                            {step}
                          </span>
                        </li>
                      );
                    })}
                  </ol>

                  {/* ==================================
                      APPLICATION DETAILS
                  =================================== */}

                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-dashed border-navy-100 pt-4 text-sm">

                    {/* Application */}

                    <div>
                      <dt className="text-xs text-navy-400">
                        Application
                      </dt>

                      <dd className="font-medium text-navy">
                        {application?.referenceNumber ||
                          application?._id ||
                          "-"}
                      </dd>
                    </div>

                    {/* Applied On */}

                    <div>
                      <dt className="text-xs text-navy-400">
                        Applied on
                      </dt>

                      <dd className="font-medium text-navy">
                        {formatDate(
                          application?.createdAt
                        )}
                      </dd>
                    </div>

                    {/* Fee */}

                    <div className="text-right">
                      <dt className="text-xs text-navy-400">
                        Fee
                      </dt>

                      <dd className="font-medium text-ember-600">
                        {formatAmount(
                          application?.amount
                        )}
                      </dd>
                    </div>
                  </dl>

                  {/* ==================================
                      EXTRA APPLICATION INFO
                  =================================== */}

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-navy-50 pt-4">

                    <div>
                      <p className="text-[11px] text-navy-400">
                        From
                      </p>

                      <p className="mt-1 text-xs font-medium text-navy">
                        {application?.origin || "-"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] text-navy-400">
                        Travel Date
                      </p>

                      <p className="mt-1 text-xs font-medium text-navy">
                        {application?.travelDate
                          ? formatDate(
                              application.travelDate
                            )
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* ==================================
                      ADMIN NOTE
                  =================================== */}

                  {application?.adminNote && (
                    <div className="mt-4 rounded-xl border border-navy-100 bg-navy-50/40 p-3">
                      <p className="text-[11px] font-medium text-navy-500">
                        Admin Note
                      </p>

                      <p className="mt-1 text-xs leading-5 text-navy-400">
                        {application.adminNote}
                      </p>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppliedVisaHistory;