import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiEdit2,
  FiMapPin,
  FiX,
  FiFlag,
  FiGlobe,
  FiLoader,
  FiRefreshCw,
} from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

// ===== DUMMY DATA (backend removed) =====
const DUMMY_COUNTRIES = [
  { _id: "c1", countryName: "India", code: "IN" },
  { _id: "c2", countryName: "United Arab Emirates", code: "AE" },
  { _id: "c3", countryName: "United Kingdom", code: "GB" },
  { _id: "c4", countryName: "United States", code: "US" },
  { _id: "c5", countryName: "Singapore", code: "SG" },
  { _id: "c6", countryName: "France", code: "FR" },
  { _id: "c7", countryName: "Thailand", code: "TH" },
  { _id: "c8", countryName: "Saudi Arabia", code: "SA" },
  { _id: "c9", countryName: "Australia", code: "AU" },
];

let airportStore = [
  { _id: "ap1", airportName: "Indira Gandhi International Airport", airportCode: "DEL", countryName: "India", countryCode: "IN", cityName: "New Delhi", latitude: "28.5562", longitude: "77.1000", status: "Active" },
  { _id: "ap2", airportName: "Chhatrapati Shivaji Maharaj International Airport", airportCode: "BOM", countryName: "India", countryCode: "IN", cityName: "Mumbai", latitude: "19.0896", longitude: "72.8656", status: "Active" },
  { _id: "ap3", airportName: "Raja Bhoj Airport", airportCode: "BHO", countryName: "India", countryCode: "IN", cityName: "Bhopal", latitude: "23.2875", longitude: "77.3374", status: "Active" },
  { _id: "ap4", airportName: "Dubai International Airport", airportCode: "DXB", countryName: "United Arab Emirates", countryCode: "AE", cityName: "Dubai", latitude: "25.2532", longitude: "55.3657", status: "Active" },
  { _id: "ap5", airportName: "Heathrow Airport", airportCode: "LHR", countryName: "United Kingdom", countryCode: "GB", cityName: "London", latitude: "51.4700", longitude: "-0.4543", status: "Active" },
  { _id: "ap6", airportName: "John F. Kennedy International Airport", airportCode: "JFK", countryName: "United States", countryCode: "US", cityName: "New York", latitude: "40.6413", longitude: "-73.7781", status: "Deactive" },
  { _id: "ap7", airportName: "Singapore Changi Airport", airportCode: "SIN", countryName: "Singapore", countryCode: "SG", cityName: "Singapore", latitude: "1.3644", longitude: "103.9915", status: "Active" },
  { _id: "ap8", airportName: "Charles de Gaulle Airport", airportCode: "CDG", countryName: "France", countryCode: "FR", cityName: "Paris", latitude: "49.0097", longitude: "2.5479", status: "Active" },
];

// =====================================================
// AIRPORT FORM MODAL
// =====================================================

// =====================================================
// AIRPORT FORM MODAL
// =====================================================

const AirportFormModal = ({
  airport,
  onClose,
  onSuccess,
}) => {
  const isEdit = Boolean(airport?._id);

  const [formData, setFormData] = useState({
    airportName: airport?.airportName || "",
    airportCode: airport?.airportCode || "",
    countryName: airport?.countryName || "",
    countryCode: airport?.countryCode || "",
    cityName: airport?.cityName || "",
    latitude: airport?.latitude || "",
    longitude: airport?.longitude || "",
    status: airport?.status || "Active",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);

  // ===================================================
  // FETCH COUNTRIES
  // ===================================================

  useEffect(() => {
    setCountriesLoading(true);
    setCountries(DUMMY_COUNTRIES);
    setCountriesLoading(false);
  }, []);

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
  // COUNTRY CHANGE
  // ===================================================

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(
      (country) => country.countryName === e.target.value
    );

    setFormData((prev) => ({
      ...prev,
      countryName: selectedCountry?.countryName || "",
      countryCode: selectedCountry?.code || "",
    }));

    setError("");
  };

  // ===================================================
  // SUBMIT
  // ===================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.airportName.trim() ||
      !formData.airportCode.trim() ||
      !formData.countryName.trim() ||
      !formData.cityName.trim()
    ) {
      setError(
        "Name, country, short name 1 and short name 2 are required."
      );
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      airportName: formData.airportName.trim(),
      airportCode: formData.airportCode.trim().toUpperCase(),
      countryName: formData.countryName.trim(),
      countryCode: formData.countryCode
        ? formData.countryCode.trim().toUpperCase()
        : "",
      cityName: formData.cityName.trim(),
      latitude: formData.latitude ? String(formData.latitude).trim() : "",
      longitude: formData.longitude ? String(formData.longitude).trim() : "",
      status: formData.status,
    };

    if (isEdit) {
      airportStore = airportStore.map((item) =>
        item._id === airport._id ? { ...item, ...payload } : item
      );
    } else {
      airportStore = [
        { _id: `ap${Date.now()}`, ...payload },
        ...airportStore,
      ];
    }

    setSaving(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl border border-stone-200">

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

                <h2 className="text-lg font-bold text-navy-900">
                  {isEdit
                    ? "Edit Airport"
                    : "Add New Airport"}
                </h2>

                <p className="text-xs text-stone-500 mt-1">
                  {isEdit
                    ? "Update airport master information."
                    : "Add airport details to the global registry."}
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
            <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">

              <div className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-[11px] font-bold">
                !
              </div>

              <p className="text-xs font-medium text-red-600">
                {error}
              </p>

            </div>
          )}

          {/* =================================================
              AIRPORT DETAILS
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-8 h-8 rounded-2xl bg-ember-50 text-ember-600 flex items-center justify-center">
                <TbPlaneDeparture size={16} />
              </div>

              <div>

                <p className="text-sm font-bold text-navy-900">
                  Airport Information
                </p>

                <p className="text-[11px] text-stone-400">
                  Basic airport identification details
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* NAME */}

              <div className="md:col-span-2">

                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="flex items-center gap-2 border border-stone-200 rounded-2xl px-3.5 py-3 bg-white focus-within:border-ember-400 focus-within:ring-4 focus-within:ring-ember-50 transition">

                  <TbPlaneDeparture
                    size={17}
                    className="text-stone-400 flex-shrink-0"
                  />

                  <input
                    type="text"
                    name="airportName"
                    value={formData.airportName}
                    onChange={handleChange}
                    placeholder="Enter airport name"
                    className="flex-1 outline-none text-sm text-stone-700 placeholder:text-stone-300"
                  />

                </div>

              </div>

              {/* COUNTRY */}

              <div>

                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Country Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">

                  <div className="flex items-center gap-2 border border-stone-200 rounded-2xl px-3.5 py-3 bg-white focus-within:border-ember-400 focus-within:ring-4 focus-within:ring-ember-50 transition">

                    <FiFlag
                      size={16}
                      className="text-stone-400 flex-shrink-0"
                    />

                    <select
                      name="countryName"
                      value={formData.countryName}
                      onChange={handleCountryChange}
                      disabled={countriesLoading}
                      className="flex-1 appearance-none bg-transparent outline-none text-sm text-stone-700 cursor-pointer disabled:text-stone-400 disabled:cursor-not-allowed pr-6"
                    >

                      <option value="">
                        {countriesLoading
                          ? "Loading countries..."
                          : "Select Country"}
                      </option>

                      {countries.map((country) => (
                        <option
                          key={country._id}
                          value={country.countryName}
                        >
                          {country.countryName}
                          {country.code
                            ? ` (${country.code})`
                            : ""}
                        </option>
                      ))}

                    </select>

                    <FiChevronDown
                      size={15}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                    />

                  </div>

                </div>

              </div>

              {/* SHORT NAME 1 */}

              {/* SHORT NAME 1 */}

<div>

<label className="block text-xs font-semibold text-stone-600 mb-1.5">
  Short Name 1
  <span className="text-red-500 ml-1">
    *
  </span>
</label>

<input
  type="text"
  name="airportCode"
  value={formData.airportCode}
  onChange={handleChange}
  placeholder="e.g. DEL"
  maxLength={10}
  className="w-full border border-stone-200 rounded-2xl px-3.5 py-3 text-sm text-stone-700 uppercase outline-none bg-white focus:border-ember-400 focus:ring-4 focus:ring-ember-50 transition"
/>

<p className="text-[10px] text-stone-400 mt-1.5">
  Airport identification code
</p>

</div>

              {/* SHORT NAME 2 */}

           {/* SHORT NAME 2 */}

<div>

<label className="block text-xs font-semibold text-stone-600 mb-1.5">
  Short Name 2
  <span className="text-red-500 ml-1">
    *
  </span>
</label>

<div className="flex items-center gap-2 border border-stone-200 rounded-2xl px-3.5 py-3 bg-white focus-within:border-ember-400 focus-within:ring-4 focus-within:ring-ember-50 transition">

  <FiMapPin
    size={16}
    className="text-stone-400 flex-shrink-0"
  />

  <input
    type="text"
    name="cityName"
    value={formData.cityName}
    onChange={handleChange}
    placeholder="Enter short name 2"
    className="flex-1 outline-none text-sm text-stone-700 placeholder:text-stone-300"
  />

</div>

<p className="text-[10px] text-stone-400 mt-1.5">
  City / location short name
</p>

</div>

            </div>

          </div>

          {/* =================================================
              LOCATION
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-8 h-8 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FiGlobe size={16} />
              </div>

              <div>

                <p className="text-sm font-bold text-navy-900">
                  Location
                </p>

                <p className="text-[11px] text-stone-400">
                  Geographic coordinates of the airport
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* LATITUDE */}

              <div>

                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Latitude
                </label>

                <div className="flex items-center gap-2 border border-stone-200 rounded-2xl px-3.5 py-3 bg-white focus-within:border-ember-400 focus-within:ring-4 focus-within:ring-ember-50 transition">

                  <FiMapPin
                    size={16}
                    className="text-stone-400"
                  />

                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="e.g. 28.5562"
                    className="flex-1 outline-none text-sm text-stone-700 placeholder:text-stone-300"
                  />

                </div>

              </div>

              {/* LONGITUDE */}

              <div>

                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Longitude
                </label>

                <div className="flex items-center gap-2 border border-stone-200 rounded-2xl px-3.5 py-3 bg-white focus-within:border-ember-400 focus-within:ring-4 focus-within:ring-ember-50 transition">

                  <FiMapPin
                    size={16}
                    className="text-stone-400"
                  />

                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="e.g. 77.1000"
                    className="flex-1 outline-none text-sm text-stone-700 placeholder:text-stone-300"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              STATUS
          ================================================= */}

          <div>

            <label className="block text-xs font-semibold text-stone-600 mb-1.5">
              Status
            </label>

            <div className="relative">

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="appearance-none w-full border border-stone-200 rounded-2xl px-3.5 py-3 pr-10 text-sm text-stone-700 bg-white outline-none focus:border-ember-400 focus:ring-4 focus:ring-ember-50 transition cursor-pointer"
              >

                <option value="Active">
                  Active
                </option>

                <option value="Deactive">
                  Deactive
                </option>

              </select>

              <FiChevronDown
                size={15}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />

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
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl border border-stone-200 bg-white text-xs font-semibold text-stone-600 hover:bg-stone-50 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || countriesLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-ember-600 hover:bg-ember-700 text-white text-xs font-semibold shadow-sm shadow-ember-200 transition disabled:opacity-60"
            >

              {saving ? (
                <>
                  <FiLoader
                    size={14}
                    className="animate-spin"
                  />

                  {isEdit
                    ? "Updating..."
                    : "Adding..."}
                </>
              ) : (
                <>
                  {isEdit
                    ? "Save Changes"
                    : "Add Airport"}
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
// AIRPORT DIRECTORY
// =====================================================

const AirportDirectory = () => {

  const [airports, setAirports] = useState([]);

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

  const [selectedAirport, setSelectedAirport] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ===================================================
  // FETCH AIRPORTS
  // ===================================================

  const fetchAirports = (page = 1, override) => {
    setLoading(true);
    setError("");

    const f = override || filters;
    const q = f.search.trim().toLowerCase();
    const limit = 10;

    const filtered = airportStore.filter(
      (item) =>
        (!q ||
          item.airportName.toLowerCase().includes(q) ||
          item.airportCode.toLowerCase().includes(q) ||
          item.cityName.toLowerCase().includes(q) ||
          item.countryName.toLowerCase().includes(q)) &&
        (!f.status || item.status === f.status)
    );

    const totalPages = Math.max(Math.ceil(filtered.length / limit), 1);
    const safePage = Math.min(page, totalPages);

    setAirports(filtered.slice((safePage - 1) * limit, safePage * limit));

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
    fetchAirports(1);
  }, []);

  // ===================================================
  // FILTER CHANGE
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

    fetchAirports(1);
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

    fetchAirports(1, resetFilters);
  };

  // ===================================================
  // OPEN ADD
  // ===================================================

  const openAddModal = () => {
    setSelectedAirport(null);
    setShowModal(true);
  };

  // ===================================================
  // OPEN EDIT
  // ===================================================

  const openEditModal = (airport) => {
    setSelectedAirport(airport);
    setShowModal(true);
  };

  // ===================================================
  // STATUS TOGGLE
  // ===================================================

  const handleStatusToggle = (airport) => {
    const newStatus =
      airport.status === "Active" ? "Deactive" : "Active";

    airportStore = airportStore.map((item) =>
      item._id === airport._id ? { ...item, status: newStatus } : item
    );

    setAirports((prev) =>
      prev.map((item) =>
        item._id === airport._id ? { ...item, status: newStatus } : item
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

  return (
    <div className="flex-1 min-w-0 min-h-screen bg-stone-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

        <div>

          <p className="text-xs text-stone-400 mb-1.5">
            Master Data
            <span className="mx-2">›</span>
            Global Aviation
            <span className="mx-2">›</span>

            <span className="text-ember-600 font-semibold">
              Airport Registry
            </span>
          </p>

          <div className="flex items-center gap-3 flex-wrap">

            <div className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-2xl bg-ember-50 text-ember-600 flex items-center justify-center">
                <TbPlaneDeparture size={21} />
              </div>

              <div>
                <h1 className="font-serif text-2xl font-semibold text-navy-900">
                  Airport Directory
                </h1>

                <p className="text-xs text-stone-400 mt-0.5">
                  Manage global airport master data
                </p>
              </div>

            </div>

            <span className="bg-ember-50 border border-ember-100 text-ember-600 text-xs font-bold px-3 py-1.5 rounded-full">
              {pagination.total || 0} Airports
            </span>

          </div>

        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-ember-600 hover:bg-ember-700 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-sm shadow-ember-200 transition"
        >
          <FiPlus size={16} />
          Add New Airport
        </button>

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
              placeholder="Search by airport, code, city or country..."
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

          {/* SEARCH BUTTON */}

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
              fetchAirports(currentPage)
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
              Airport Registry
            </p>

            <p className="text-[11px] text-stone-400 mt-0.5">
              Live data from airport master database
            </p>

          </div>

          <button
            onClick={() =>
              fetchAirports(currentPage)
            }
            disabled={loading}
            className="w-9 h-9 rounded-2xl border border-stone-200 flex items-center justify-center text-stone-400 hover:text-ember-600 hover:bg-ember-50 transition disabled:opacity-50"
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

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="bg-stone-50/80 border-b border-stone-200">

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5">
                  Airport
                </th>

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5">
                  Country
                </th>

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5">
                Short Name 1
                </th>

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5">
      Short Name 2
    </th>

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5">
                  Coordinates
                </th>

                <th className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5">
                  Status
                </th>

                <th className="text-right text-[11px] font-bold text-stone-500 uppercase tracking-wide px-5 py-3.5">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="py-20 text-center"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <FiLoader
                        size={24}
                        className="text-ember-600 animate-spin mb-3"
                      />

                      <p className="text-sm font-semibold text-stone-600">
                        Loading airports...
                      </p>

                      <p className="text-xs text-stone-400 mt-1">
                        Fetching latest airport data
                      </p>

                    </div>

                  </td>

                </tr>

              ) : airports.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="py-20 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-12 h-12 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center mb-3">
                        <TbPlaneDeparture size={22} />
                      </div>

                      <p className="text-sm font-semibold text-stone-700">
                        No airports found
                      </p>

                      <p className="text-xs text-stone-400 mt-1">
                        Try changing your search or filters.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                airports.map((airport) => (

                  <tr
                    key={airport._id}
                    className="border-b border-stone-100 last:border-0 hover:bg-stone-50/70 transition"
                  >

                    {/* AIRPORT */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-2xl bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0">
                          <TbPlaneDeparture
                            size={18}
                          />
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-navy-800">
                            {airport.airportName}
                          </p>

                          <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                            <FiMapPin size={10} />
                            {airport.cityName}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* COUNTRY */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <div className="w-7 h-7 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500">
                          <FiFlag size={13} />
                        </div>

                        <div>

                          <p className="text-sm text-stone-700 font-medium">
                            {airport.countryName}
                          </p>

                          <p className="text-[11px] text-stone-400 uppercase">
                            {airport.countryCode || "—"}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* AIRPORT CODE */}

                 {/* SHORT NAME 1 */}

<td className="px-5 py-4">

<span className="inline-flex items-center bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold px-2.5 py-1.5 rounded-xl uppercase">
  {airport.airportCode || "—"}
</span>

</td>

{/* SHORT NAME 2 */}

<td className="px-5 py-4">

<span className="text-sm font-medium text-stone-700">
  {airport.cityName || "—"}
</span>

</td>

                    {/* COORDINATES */}

                    <td className="px-5 py-4">

                      <div className="text-xs text-stone-500">

                        <p>
                          <span className="text-stone-400 mr-1">
                            Lat
                          </span>
                          {airport.latitude || "—"}
                        </p>

                        <p className="mt-1">
                          <span className="text-stone-400 mr-1">
                            Lng
                          </span>
                          {airport.longitude || "—"}
                        </p>

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusToggle(
                            airport
                          )
                        }
                        title="Click to change status"
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full border transition ${
                          airport.status ===
                          "Active"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                            : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                        }`}
                      >

                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            airport.status ===
                            "Active"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        />

                        {airport.status}

                      </button>

                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4">

                      <div className="flex items-center justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(
                              airport
                            )
                          }
                          className="w-9 h-9 rounded-2xl border border-stone-200 text-stone-400 hover:text-ember-600 hover:border-ember-200 hover:bg-ember-50 flex items-center justify-center transition"
                          title="Edit airport"
                        >
                          <FiEdit2
                            size={15}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

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
                } airports`
              : "No airports to display"}

          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={
                currentPage <= 1 ||
                loading
              }
              onClick={() =>
                fetchAirports(
                  currentPage - 1
                )
              }
              className="flex items-center gap-1.5 border border-stone-200 text-stone-600 text-xs font-semibold px-3 py-2 rounded-2xl hover:bg-stone-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiChevronLeft size={14} />
              Previous
            </button>

            <div className="min-w-[38px] h-8 rounded-2xl bg-ember-600 text-white flex items-center justify-center text-xs font-bold">
              {currentPage}
            </div>

            <button
              type="button"
              disabled={
                currentPage >=
                  totalPages ||
                loading
              }
              onClick={() =>
                fetchAirports(
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
        <AirportFormModal
          airport={selectedAirport}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={() =>
            fetchAirports(currentPage)
          }
        />
      )}

    </div>
  );
};

export default AirportDirectory;