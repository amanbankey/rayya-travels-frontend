import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiEdit2,
  FiX,
  FiUploadCloud,
  FiCheckCircle,
  FiLoader,
  FiRefreshCw,
  FiImage,
} from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

// ===== DUMMY DATA (backend removed) =====
let airlineStore = [
  { _id: "al1", name: "Air India", code: "AI", logo: "", status: "Active" },
  { _id: "al2", name: "IndiGo", code: "6E", logo: "", status: "Active" },
  { _id: "al3", name: "Emirates", code: "EK", logo: "", status: "Active" },
  { _id: "al4", name: "Singapore Airlines", code: "SQ", logo: "", status: "Active" },
  { _id: "al5", name: "British Airways", code: "BA", logo: "", status: "Deactive" },
  { _id: "al6", name: "Air France", code: "AF", logo: "", status: "Active" },
  { _id: "al7", name: "Qatar Airways", code: "QR", logo: "", status: "Active" },
  { _id: "al8", name: "SpiceJet", code: "SG", logo: "", status: "Deactive" },
];

const getLogoUrl = (logo) => {
  if (!logo) return "";
  return logo;
};

// =====================================================
// AIRLINE FORM MODAL
// =====================================================

const AirlineFormModal = ({
  airline,
  onClose,
  onSuccess,
}) => {
  const isEdit = Boolean(airline?._id);

  const [formData, setFormData] = useState({
    name: airline?.name || "",
    code: airline?.code || "",
    logo: null,
    status: airline?.status || "Active",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ===================================================
  // HANDLE INPUT
  // ===================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ===================================================
  // HANDLE LOGO
  // ===================================================

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please upload a PNG, JPG, WEBP or SVG image."
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setError("");
  };

  // ===================================================
  // SUBMIT
  // ===================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Airline name is required.");
      return;
    }

    if (!formData.code.trim()) {
      setError("Airline IATA code is required.");
      return;
    }

    if (formData.code.trim().length !== 2) {
      setError("IATA code must contain exactly 2 letters.");
      return;
    }

    setSaving(true);
    setError("");

    const code = formData.code.trim().toUpperCase();
    const name = formData.name.trim();

    const logo = formData.logo
      ? URL.createObjectURL(formData.logo)
      : airline?.logo || "";

    if (isEdit) {
      airlineStore = airlineStore.map((item) =>
        item._id === airline._id
          ? { ...item, name, code, logo, status: formData.status }
          : item
      );
    } else {
      airlineStore = [
        {
          _id: `al${Date.now()}`,
          name,
          code,
          logo,
          status: formData.status,
        },
        ...airlineStore,
      ];
    }

    setSaving(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl border border-stone-200">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-stone-100 px-6 py-5">

          <div className="flex items-start justify-between gap-4">

            <div className="flex items-start gap-3">

              <div className="w-11 h-11 rounded-3xl bg-ember-50 text-ember-600 flex items-center justify-center">
                <TbPlaneDeparture size={22} />
              </div>

              <div>

                <div className="flex items-center gap-2 flex-wrap">

                  <h2 className="text-lg font-bold text-navy-900">
                    {isEdit
                      ? "Edit Airline"
                      : "Add New Airline"}
                  </h2>

                  {isEdit && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded-full">
                      <FiCheckCircle size={10} />
                      {formData.status}
                    </span>
                  )}

                </div>

                <p className="text-xs text-stone-500 mt-1">
                  {isEdit
                    ? "Update airline master information and official branding."
                    : "Add a new airline to the global airline registry."}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-9 h-9 rounded-2xl flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition disabled:opacity-50"
            >
              <FiX size={18} />
            </button>

          </div>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          {/* ERROR */}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          {/* =================================================
              AIRLINE INFORMATION
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-7 h-7 rounded-xl bg-ember-50 text-ember-600 flex items-center justify-center">
                <TbPlaneDeparture size={15} />
              </div>

              <div>

                <p className="text-sm font-bold text-navy-900">
                  Airline Information
                </p>

                <p className="text-[11px] text-stone-400">
                  Basic airline identification details
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* AIRLINE NAME */}

              <div>

                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Airline Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="flex items-center gap-2 border border-stone-200 rounded-2xl px-3.5 py-3 focus-within:border-ember-400 focus-within:ring-4 focus-within:ring-ember-50 transition">

                  <TbPlaneDeparture
                    size={17}
                    className="text-stone-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter airline name"
                    className="flex-1 outline-none text-sm text-stone-700 placeholder:text-stone-300"
                  />

                </div>

              </div>

              {/* IATA CODE */}

              <div>

                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  IATA Code
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  maxLength={2}
                  onChange={handleChange}
                  placeholder="e.g. AI"
                  className="w-full border border-stone-200 rounded-2xl px-3.5 py-3 text-sm text-stone-700 uppercase outline-none focus:border-ember-400 focus:ring-4 focus:ring-ember-50 transition"
                />

                <p className="text-[10px] text-stone-400 mt-1.5">
                  2-letter airline identification code
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              LOGO
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-7 h-7 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center">
                <FiImage size={14} />
              </div>

              <div>

                <p className="text-sm font-bold text-navy-900">
                  Official Logo
                </p>

                <p className="text-[11px] text-stone-400">
                  Upload the official airline logo
                </p>

              </div>

            </div>

            <label className="block text-xs font-semibold text-stone-600 mb-1.5">
              Airline Logo
            </label>

            <div
              onDrop={(e) => {
                e.preventDefault();
                handleFile(
                  e.dataTransfer.files?.[0]
                );
              }}
              onDragOver={(e) =>
                e.preventDefault()
              }
              className="relative border-2 border-dashed border-stone-200 hover:border-ember-300 rounded-3xl flex flex-col items-center justify-center py-9 text-center bg-stone-50/50 hover:bg-ember-50/30 transition"
            >

              <input
                type="file"
                id="airline-logo"
                className="hidden"
                accept=".png,.jpg,.jpeg,.webp,.svg,image/*"
                onChange={(e) =>
                  handleFile(
                    e.target.files?.[0]
                  )
                }
              />

              <label
                htmlFor="airline-logo"
                className="flex flex-col items-center cursor-pointer w-full"
              >

                <div className="w-12 h-12 rounded-3xl bg-white border border-stone-200 shadow-sm flex items-center justify-center text-ember-500 mb-3">
                  <FiUploadCloud size={23} />
                </div>

                <p className="text-xs font-semibold text-stone-600">
                  Click to upload or drag & drop
                </p>

                <p className="text-[10px] text-stone-400 mt-1.5">
                  SVG, PNG, JPG or WEBP
                </p>

              </label>

            </div>

            {/* SELECTED FILE */}

            {formData.logo && (
              <div className="mt-3 flex items-center justify-between gap-3 border border-stone-200 rounded-2xl px-3.5 py-3 bg-white">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-9 h-9 rounded-xl bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0">
                    <FiImage size={16} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-semibold text-stone-700 truncate">
                      {formData.logo.name}
                    </p>

                    <p className="text-[10px] text-stone-400 mt-0.5">
                      {Math.round(
                        formData.logo.size / 1024
                      )}{" "}
                      KB
                    </p>

                  </div>

                </div>

                <label
                  htmlFor="airline-logo"
                  className="text-[11px] font-semibold text-ember-600 cursor-pointer hover:text-ember-700 whitespace-nowrap"
                >
                  Replace
                </label>

              </div>
            )}

            {/* EXISTING LOGO */}

            {!formData.logo &&
              airline?.logo && (
                <div className="mt-3 flex items-center gap-3 border border-stone-200 rounded-2xl px-3.5 py-3">

                  <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center overflow-hidden">

                    <img
                      src={getLogoUrl(airline.logo)}
                      alt={airline.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                  </div>

                  <div>

                    <p className="text-xs font-semibold text-stone-700">
                      Current Logo
                    </p>

                    <p className="text-[10px] text-stone-400 mt-0.5">
                      Upload a new file to replace it
                    </p>

                  </div>

                </div>
              )}

          </div>

          {/* =================================================
              STATUS
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FiCheckCircle size={14} />
              </div>

              <div>

                <p className="text-sm font-bold text-navy-900">
                  Operational Status
                </p>

                <p className="text-[11px] text-stone-400">
                  Control airline availability
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-3">

              {/* ACTIVE */}

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    status: "Active",
                  }))
                }
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold border transition ${
                  formData.status === "Active"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : "bg-white text-stone-500 border-stone-200 hover:bg-stone-50"
                }`}
              >

                <span
                  className={`w-2 h-2 rounded-full ${
                    formData.status === "Active"
                      ? "bg-emerald-500"
                      : "bg-stone-300"
                  }`}
                />

                Active

              </button>

              {/* DEACTIVE */}

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    status: "Deactive",
                  }))
                }
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold border transition ${
                  formData.status === "Deactive"
                    ? "bg-red-50 text-red-600 border-red-200"
                    : "bg-white text-stone-500 border-stone-200 hover:bg-stone-50"
                }`}
              >

                <span
                  className={`w-2 h-2 rounded-full ${
                    formData.status === "Deactive"
                      ? "bg-red-500"
                      : "bg-stone-300"
                  }`}
                />

                Deactive

              </button>

            </div>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-5 border-t border-stone-100">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-ember-600 hover:bg-ember-700 text-white text-xs font-semibold shadow-sm shadow-ember-200 transition disabled:opacity-60"
            >

              {saving ? (
                <>
                  <FiLoader
                    size={14}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  {isEdit
                    ? "Save Changes"
                    : "Add Airline"}
                </>
              )}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

// =====================================================
// AIRLINE DIRECTORY
// =====================================================

const AirlineDirectory = () => {

  const [airlines, setAirlines] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });

  const [selectedAirline, setSelectedAirline] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ===================================================
  // FETCH AIRLINES
  // ===================================================

  const fetchAirlines = (page = 1, override) => {
    setLoading(true);
    setError("");

    const f = override || filters;
    const q = f.search.trim().toLowerCase();
    const limit = 10;

    const filtered = airlineStore.filter(
      (item) =>
        (!q ||
          item.name.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q)) &&
        (!f.status || item.status === f.status)
    );

    const totalPages = Math.max(Math.ceil(filtered.length / limit), 1);
    const safePage = Math.min(page, totalPages);

    setAirlines(
      filtered.slice((safePage - 1) * limit, safePage * limit)
    );

    setPagination({
      total: filtered.length,
      currentPage: safePage,
      totalPages,
      pageSize: limit,
    });

    setLoading(false);
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchAirlines(1);
  }, []);

  // ===================================================
  // HANDLE FILTER
  // ===================================================

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearch = (e) => {
    e.preventDefault();

    fetchAirlines(1);
  };

  // ===================================================
  // RESET
  // ===================================================

  const handleReset = () => {
    const resetFilters = {
      search: "",
      status: "",
    };

    setFilters(resetFilters);

    fetchAirlines(1, resetFilters);
  };

  // ===================================================
  // OPEN ADD
  // ===================================================

  const openAddModal = () => {
    setSelectedAirline(null);
    setShowModal(true);
  };

  // ===================================================
  // OPEN EDIT
  // ===================================================

  const openEditModal = (airline) => {
    setSelectedAirline(airline);
    setShowModal(true);
  };

  // ===================================================
  // STATUS TOGGLE
  // ===================================================

  const handleStatusToggle = (airline) => {
    const newStatus =
      airline.status === "Active" ? "Deactive" : "Active";

    airlineStore = airlineStore.map((item) =>
      item._id === airline._id
        ? { ...item, status: newStatus }
        : item
    );

    setAirlines((prev) =>
      prev.map((item) =>
        item._id === airline._id
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  // ===================================================
  // CURRENT PAGE
  // ===================================================

  const currentPage =
    pagination.currentPage || 1;

  const totalPages =
    pagination.totalPages || 1;

  const totalAirlines =
    pagination.total || 0;

  const activeAirlines = airlines.filter(
    (airline) => airline.status === "Active"
  ).length;

  return (
    <div className="flex-1 min-w-0 min-h-screen bg-stone-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

        <div>

          <p className="text-xs text-stone-400 mb-1.5">

            Master Data

            <span className="mx-2">
              ›
            </span>

            Global Aviation

            <span className="mx-2">
              ›
            </span>

            <span className="text-ember-600 font-semibold">
              Airlines Registry
            </span>

          </p>

          <div className="flex items-center gap-3 flex-wrap">

            <div className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-2xl bg-ember-50 text-ember-600 flex items-center justify-center">
                <TbPlaneDeparture size={21} />
              </div>

              <div>

                <h1 className="font-serif text-2xl font-semibold text-navy-900">
                  Airlines Master Directory
                </h1>

                <p className="text-xs text-stone-400 mt-0.5">
                  Manage global airline master data
                </p>

              </div>

            </div>

            <span className="bg-ember-50 border border-ember-100 text-ember-600 text-xs font-bold px-3 py-1.5 rounded-full">
              {totalAirlines} Airlines
            </span>

          </div>

        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-ember-600 hover:bg-ember-700 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-sm shadow-ember-200 transition"
        >
          <FiPlus size={16} />
          Add New Airline
        </button>

      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 max-w-2xl">

        {/* TOTAL */}

        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-4 flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-ember-50 text-ember-600 flex items-center justify-center">
            <TbPlaneDeparture size={20} />
          </div>

          <div>

            <p className="text-xs font-medium text-stone-400">
              Total Airlines
            </p>

            <p className="text-xl font-bold text-navy-900 mt-0.5">
              {totalAirlines}
            </p>

          </div>

        </div>

        {/* ACTIVE */}

        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-4 flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FiCheckCircle size={19} />
          </div>

          <div>

            <p className="text-xs font-medium text-stone-400">
              Active Airlines
            </p>

            <div className="flex items-center gap-2 mt-0.5">

              <p className="text-xl font-bold text-navy-900">
                {activeAirlines}
              </p>

              <span className="w-2 h-2 rounded-full bg-emerald-500" />

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          SEARCH / FILTER
      ================================================= */}

      <form
        onSubmit={handleSearch}
        className="bg-white rounded-3xl border border-stone-200 shadow-sm p-4 mb-5"
      >

        <div className="flex flex-col lg:flex-row gap-3">

          {/* SEARCH */}

          <div className="flex-1 flex items-center gap-2 border border-stone-200 rounded-2xl px-3.5 py-2.5 focus-within:border-ember-400 focus-within:ring-4 focus-within:ring-ember-50 transition">

            <FiSearch
              className="text-stone-400 flex-shrink-0"
              size={17}
            />

            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by airline name or IATA code..."
              className="w-full text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none"
            />

          </div>

          {/* STATUS */}

          <div className="relative flex items-center border border-stone-200 rounded-2xl px-3.5 py-2.5 min-w-[170px]">

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="appearance-none bg-transparent outline-none text-sm text-stone-600 w-full pr-6 cursor-pointer"
            >

              <option value="">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Deactive">
                Deactive
              </option>

            </select>

            <FiChevronDown
              size={15}
              className="absolute right-3.5 text-stone-400 pointer-events-none"
            />

          </div>

          {/* SEARCH */}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold px-5 py-2.5 rounded-2xl transition disabled:opacity-60"
          >

            <FiSearch size={15} />

            Search

          </button>

          {/* RESET */}

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-sm font-semibold px-5 py-2.5 rounded-2xl transition"
          >

            <FiRefreshCw size={14} />

            Reset

          </button>

        </div>

      </form>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="mb-5 rounded-3xl border border-red-100 bg-red-50 px-4 py-3 flex items-center justify-between gap-4">

          <p className="text-xs font-medium text-red-600">
            {error}
          </p>

          <button
            onClick={() =>
              fetchAirlines(currentPage)
            }
            className="text-xs font-semibold text-red-600 hover:text-red-800"
          >
            Retry
          </button>

        </div>
      )}

      {/* =================================================
          TABLE CARD
      ================================================= */}

      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">

        {/* TABLE HEADER */}

        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">

          <div>

            <p className="text-sm font-bold text-navy-900">
              Airlines Registry
            </p>

            <p className="text-[11px] text-stone-400 mt-0.5">
              Live data from airline master database
            </p>

          </div>

          <button
            onClick={() =>
              fetchAirlines(currentPage)
            }
            disabled={loading}
            className="w-9 h-9 rounded-2xl border border-stone-200 flex items-center justify-center text-stone-400 hover:text-ember-600 hover:bg-ember-50 transition disabled:opacity-50"
            title="Refresh"
          >

            <FiRefreshCw
              size={15}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

          </button>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[720px]">

            <thead>

              <tr className="bg-stone-50/80 border-b border-stone-200">

                {/* SL */}

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5 w-[90px]">
                  SL
                </th>

                {/* NAME */}

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5">
                  Name
                </th>

                {/* CODE */}

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5 w-[160px]">
                  Code
                </th>

                {/* LOGO */}

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5 w-[180px]">
                  Logo
                </th>

                {/* ACTION */}

                <th className="text-right text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5 w-[120px]">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="py-20 text-center"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <FiLoader
                        size={24}
                        className="text-ember-600 animate-spin mb-3"
                      />

                      <p className="text-sm font-semibold text-stone-600">
                        Loading airlines...
                      </p>

                      <p className="text-xs text-stone-400 mt-1">
                        Fetching latest airline data
                      </p>

                    </div>

                  </td>

                </tr>

              ) : airlines.length === 0 ? (

                /* EMPTY */

                <tr>

                  <td
                    colSpan="5"
                    className="py-20 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-12 h-12 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center mb-3">
                        <TbPlaneDeparture size={22} />
                      </div>

                      <p className="text-sm font-semibold text-stone-700">
                        No airlines found
                      </p>

                      <p className="text-xs text-stone-400 mt-1">
                        Try changing your search or filters.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                /* DATA */

                airlines.map((airline, index) => {

                  const serialNumber =
                    (currentPage - 1) *
                      pagination.pageSize +
                    index +
                    1;

                  return (
                    <tr
                      key={airline._id}
                      className="border-b border-stone-100 last:border-0 hover:bg-stone-50/70 transition"
                    >

                      {/* SL */}

                      <td className="px-5 py-4">

                        <span className="text-xs font-semibold text-stone-400">
                          {serialNumber}
                        </span>

                      </td>

                      {/* NAME */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-2xl bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0 overflow-hidden">

                            {airline.logo ? (
                              <img
                              src={getLogoUrl(airline.logo)}
                              alt={airline.name}
                                className="w-full h-full object-contain p-1.5"
                                onError={(e) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <TbPlaneDeparture
                                size={18}
                              />
                            )}

                          </div>

                          <div>

                            <p className="text-sm font-semibold text-navy-800">
                              {airline.name}
                            </p>

                            <p className="text-[11px] text-stone-400 mt-0.5">
                              Airline Partner
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CODE */}

                      <td className="px-5 py-4">

                        <span className="inline-flex items-center bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold px-2.5 py-1.5 rounded-xl uppercase">
                          {airline.code}
                        </span>

                      </td>

                      {/* LOGO */}

                      <td className="px-5 py-4">

                        <div className="w-16 h-10 rounded-2xl border border-stone-200 bg-white flex items-center justify-center overflow-hidden">

                          {airline.logo ? (

                            <img
                            src={getLogoUrl(airline.logo)}
                            alt={airline.name}
                            className="max-w-full max-h-full object-contain p-1"
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />

                          ) : (

                            <span className="text-[10px] text-stone-400">
                              No Logo
                            </span>

                          )}

                        </div>

                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-end gap-2">

                          {/* STATUS */}

                          <button
                            type="button"
                            onClick={() =>
                              handleStatusToggle(
                                airline
                              )
                            }
                            title="Change status"
                            className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1.5 rounded-full border transition ${
                              airline.status ===
                              "Active"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                                : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                            }`}
                          >

                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                airline.status ===
                                "Active"
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }`}
                            />

                            {airline.status}

                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                airline
                              )
                            }
                            className="w-9 h-9 rounded-2xl border border-stone-200 text-stone-400 hover:text-ember-600 hover:border-ember-200 hover:bg-ember-50 flex items-center justify-center transition"
                            title="Edit airline"
                          >

                            <FiEdit2
                              size={15}
                            />

                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })

              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-stone-100">

          <p className="text-xs text-stone-400">

            {pagination.total > 0
              ? `Showing ${
                  (currentPage - 1) *
                    pagination.pageSize +
                  1
                }–${Math.min(
                  currentPage *
                    pagination.pageSize,
                  pagination.total
                )} of ${
                  pagination.total
                } airlines`
              : "No airlines to display"}

          </p>

          <div className="flex items-center gap-2">

            {/* PREVIOUS */}

            <button
              type="button"
              disabled={
                currentPage <= 1 ||
                loading
              }
              onClick={() =>
                fetchAirlines(
                  currentPage - 1
                )
              }
              className="flex items-center gap-1.5 border border-stone-200 text-stone-600 text-xs font-semibold px-3 py-2 rounded-2xl hover:bg-stone-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >

              <FiChevronLeft size={14} />

              Previous

            </button>

            {/* CURRENT PAGE */}

            <div className="min-w-[38px] h-8 rounded-2xl bg-ember-600 text-white flex items-center justify-center text-xs font-bold">
              {currentPage}
            </div>

            {/* NEXT */}

            <button
              type="button"
              disabled={
                currentPage >=
                  totalPages ||
                loading
              }
              onClick={() =>
                fetchAirlines(
                  currentPage + 1
                )
              }
              className="flex items-center gap-1.5 border border-stone-200 text-stone-600 text-xs font-semibold px-3 py-2 rounded-2xl hover:bg-stone-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >

              Next

              <FiChevronRight size={14} />

            </button>

          </div>

        </div>

      </div>

      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (
        <AirlineFormModal
          airline={selectedAirline}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={() =>
            fetchAirlines(currentPage)
          }
        />
      )}

    </div>
  );
};

export default AirlineDirectory;