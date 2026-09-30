import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiChevronDown,
  FiSettings,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiGlobe,
  FiSave,
  FiEdit3,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// =====================================================
// YES / NO OPTIONS
// =====================================================

const yesNoFields = [
  {
    section: "Identity & Passport",
    fields: [
      {
        key: "allowForPassportFront",
        label: "Passport Front",
      },
      {
        key: "allowForPassportFrontRequired",
        label: "Passport Front Required",
      },
      {
        key: "allowForPassportBack",
        label: "Passport Back",
      },
      {
        key: "allowForPassportBackRequired",
        label: "Passport Back Required",
      },
      {
        key: "allowForPassportNumber",
        label: "Passport No",
      },
      {
        key: "allowForPassportNumberRequired",
        label: "Passport No Required",
      },
    ],
  },

  {
    section: "Applicant Details",
    fields: [
      {
        key: "allowForFirstName",
        label: "First Name",
      },
      {
        key: "allowForFirstNameRequired",
        label: "First Name Required",
      },
      {
        key: "allowForLastName",
        label: "Last Name",
      },
      {
        key: "allowForLastNameRequired",
        label: "Last Name Required",
      },
      {
        key: "allowForNationality",
        label: "Nationality",
      },
      {
        key: "allowForNationalityRequired",
        label: "Nationality Required",
      },
      {
        key: "allowForGender",
        label: "Gender",
      },
      {
        key: "allowForGenderRequired",
        label: "Gender Required",
      },
      {
        key: "allowForDob",
        label: "DOB",
      },
      {
        key: "allowForDobRequired",
        label: "DOB Required",
      },
    ],
  },

  {
    section: "PAN Card",
    fields: [
      {
        key: "allowForPanCard",
        label: "Pancard",
      },
      {
        key: "allowForPanCardRequired",
        label: "Pancard Required",
      },
      {
        key: "allowForPanCardNumber",
        label: "Pancard No",
      },
      {
        key: "allowForPanCardNumberRequired",
        label: "Pancard No Required",
      },
    ],
  },

  {
    section: "Travel Details",
    fields: [
      {
        key: "allowForCheckinPoint",
        label: "Check In Point",
      },
      {
        key: "allowForCheckinPointRequired",
        label: "Check In Point Required",
      },
      {
        key: "allowForCheckoutPoint",
        label: "Check Out Point",
      },
      {
        key: "allowForCheckoutPointRequired",
        label: "Check Out Point Required",
      },
      {
        key: "allowForTravelDate",
        label: "Travel Date",
      },
      {
        key: "allowForTravelDateRequired",
        label: "Travel Date Required",
      },
    ],
  },

  {
    section: "Applicant Information",
    fields: [
      {
        key: "allowForInsurance",
        label: "Insurance",
      },
      {
        key: "allowForInsuranceRequired",
        label: "Insurance Required",
      },
      {
        key: "allowForOccupation",
        label: "Occupation",
      },
      {
        key: "allowForOccupationRequired",
        label: "Occupation Required",
      },
      {
        key: "allowForPhoto",
        label: "Photo",
      },
      {
        key: "allowForPhotoRequired",
        label: "Photo Required",
      },
    ],
  },

  {
    section: "Hotel Details",
    fields: [
      {
        key: "allowForHotelName",
        label: "Hotel Name",
      },
      {
        key: "allowForHotelNameRequired",
        label: "Hotel Name Required",
      },
      {
        key: "allowForHotelVoucher",
        label: "Hotel Voucher",
      },
      {
        key: "allowForHotelVoucherRequired",
        label: "Hotel Voucher Required",
      },
    ],
  },

  {
    section: "Family Details",
    fields: [
      {
        key: "allowForMotherName",
        label: "Mother Name",
      },
      {
        key: "allowForMotherNameRequired",
        label: "Mother Name Required",
      },
      {
        key: "allowForFatherName",
        label: "Father Name",
      },
      {
        key: "allowForFatherNameRequired",
        label: "Father Name Required",
      },
      {
        key: "allowForSpouseName",
        label: "Spouse Name",
      },
      {
        key: "allowForSpouseNameRequired",
        label: "Spouse Name Required",
      },
      {
        key: "allowForPlaceOfBirth",
        label: "Place of Birth",
      },
      {
        key: "allowForPlaceOfBirthRequired",
        label: "Place of Birth Required",
      },
    ],
  },

  {
    section: "Additional Documents",
    fields: [
      {
        key: "allowForAdditionalFolder",
        label: "Additional Folder",
      },
      {
        key: "allowForAdditionalFolderRequired",
        label: "Additional Folder Required",
      },
    ],
  },
];

// =====================================================
// YES / NO SELECT
// =====================================================

// =====================================================
// DUMMY DATA (backend removed)
// =====================================================

const makeCountry = (id, countryName, code, currency, allowForVisa, allowForOtb, status = "Active") => {
  const rules = {};
  yesNoFields.forEach((section) =>
    section.fields.forEach((field) => {
      rules[field.key] = field.key.endsWith("Required") ? "No" : "Yes";
    })
  );

  return {
    _id: id,
    countryName,
    code,
    currency,
    status,
    ...rules,
    allowForAdditionalFolder: "No",
    allowForAdditionalFolderLabel: "",
    allowForVisa,
    allowForOtb,
  };
};

let countryStore = [
  makeCountry("c1", "India", "IN", "INR", "No", "No"),
  makeCountry("c2", "United Arab Emirates", "AE", "AED", "Yes", "No"),
  makeCountry("c3", "Singapore", "SG", "SGD", "Yes", "No"),
  makeCountry("c4", "Thailand", "TH", "THB", "Yes", "No"),
  makeCountry("c5", "Saudi Arabia", "SA", "SAR", "Yes", "Yes"),
  makeCountry("c6", "United Kingdom", "GB", "GBP", "Yes", "No"),
  makeCountry("c7", "United States", "US", "USD", "Yes", "No"),
  makeCountry("c8", "France", "FR", "EUR", "Yes", "No"),
  makeCountry("c9", "Australia", "AU", "AUD", "No", "No", "Inactive"),
  makeCountry("c10", "Malaysia", "MY", "MYR", "Yes", "No"),
  makeCountry("c11", "Sri Lanka", "LK", "LKR", "Yes", "No"),
  makeCountry("c12", "Vietnam", "VN", "VND", "Yes", "No"),
];

// =====================================================
// PREMIUM YES / NO TOGGLE
// =====================================================

const PremiumToggle = ({ value, onChange, label }) => {
  const enabled = value === "Yes";

  return (
    <div
      className={`group flex items-center justify-between gap-4 p-4 rounded-3xl border transition-all duration-200 ${
        enabled
          ? "bg-ember-50/60 border-ember-100"
          : "bg-white border-stone-200 hover:border-stone-300"
      }`}
    >
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold transition-colors ${
            enabled ? "text-navy-900" : "text-stone-600"
          }`}
        >
          {label}
        </p>

        <p className="text-[10px] text-stone-400 mt-1">
          {enabled
            ? "Enabled for this country"
            : "Disabled for this country"}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(enabled ? "No" : "Yes")}
        className={`relative flex-shrink-0 w-[52px] h-[28px] rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-4 ${
          enabled
            ? "bg-ember-600 focus:ring-ember-100"
            : "bg-stone-200 focus:ring-stone-100"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

// =====================================================
// VISA RULES MODAL
// =====================================================

const VisaRulesModal = ({ country, onClose, onSaved }) => {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (country) {
      setForm({
        ...country,
        allowForAdditionalFolderLabel:
          country.allowForAdditionalFolderLabel || "",
      });
    }
  }, [country]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaving(true);

    const updated = { ...country, ...form };

    countryStore = countryStore.map((item) =>
      item._id === country._id ? updated : item
    );

    toast.success("Country validation updated successfully");

    onSaved?.(updated);

    setTimeout(() => {
      onClose();
    }, 500);

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-[28px] shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="px-6 sm:px-8 py-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-ember-50 text-ember-600 flex items-center justify-center">
                <FiSettings size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-navy-900">
                  Update VISA Validation
                </h2>

                <p className="text-xs text-stone-500 mt-0.5">
                  Configure application fields and document requirements.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="text-sm">🌐</span>

              <div>
                <p className="text-xs font-semibold text-navy-800">
                  {country?.countryName}
                </p>

                <p className="text-[10px] text-stone-400">
                  {country?.code}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-2xl hover:bg-stone-100 flex items-center justify-center text-stone-500 transition"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 overflow-y-auto max-h-[calc(92vh-90px)]"
        >
          {/* GENERAL */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-navy-900">
                  General Application Rules
                </h3>

                <p className="text-xs text-stone-400 mt-1">
                  Control whether each field is available and required.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <PremiumToggle
    label="Allow For Visa"
    value={form.allowForVisa}
    onChange={(value) =>
      handleChange("allowForVisa", value)
    }
  />

  <PremiumToggle
    label="Allow For OTB"
    value={form.allowForOtb}
    onChange={(value) =>
      handleChange("allowForOtb", value)
    }
  />
</div>
          </div>

          {/* ALL RULE SECTIONS */}
          {yesNoFields.map((section) => (
            <div key={section.section} className="mb-7">
             <div className="flex items-center gap-3 mb-4">
  <div className="w-1 h-6 rounded-full bg-ember-600" />

  <div>
    <h3 className="text-sm font-bold text-navy-900">
      {section.section}
    </h3>

    <p className="text-[11px] text-stone-400 mt-0.5">
      Configure field availability and requirement settings
    </p>
  </div>
</div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
  {section.fields.map((field) => (
    <PremiumToggle
      key={field.key}
      label={field.label}
      value={form[field.key]}
      onChange={(value) =>
        handleChange(field.key, value)
      }
    />
  ))}
</div>
            </div>
          ))}

          {/* FOLDER LABEL */}
          <div className="mb-7">
            <label className="block text-xs font-medium text-stone-500 mb-2">
              Additional Folder Custom Label
            </label>

            <input
              type="text"
              value={form.allowForAdditionalFolderLabel || ""}
              onChange={(e) =>
                handleChange(
                  "allowForAdditionalFolderLabel",
                  e.target.value
                )
              }
              placeholder="e.g. Additional Documents"
              className="w-full border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-700 outline-none focus:border-ember-500 focus:ring-2 focus:ring-ember-100"
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-5 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-stone-200 text-sm font-semibold text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-ember-600 hover:bg-ember-700 disabled:opacity-60 text-white text-sm font-semibold shadow-sm"
            >
              <FiSave size={16} />

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =====================================================
// ADD COUNTRY MODAL
// =====================================================

const AddCountryModal = ({ onClose, onAdded }) => {
  const [form, setForm] = useState({
    countryName: "",
    code: "",
    currency: "",
    status: "Active",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.countryName || !form.code || !form.currency) {
      toast.error("Country name, code and currency are required");
      return;
    }

    setSaving(true);

    const newCountry = makeCountry(
      `c${Date.now()}`,
      form.countryName.trim(),
      form.code.trim().toUpperCase(),
      form.currency.trim().toUpperCase(),
      "No",
      "No",
      form.status
    );

    countryStore = [newCountry, ...countryStore];

    toast.success("Country added successfully");

    onAdded?.(newCountry);

    setTimeout(() => {
      onClose();
    }, 500);

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[28px] shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-ember-50 text-ember-600 flex items-center justify-center">
              <FiGlobe size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">
                Add Country
              </h2>

              <p className="text-xs text-stone-400 mt-1">
                Add a new country to the master directory.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl hover:bg-stone-100 flex items-center justify-center text-stone-500"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-2">
              Country Name
            </label>

            <input
              name="countryName"
              value={form.countryName}
              onChange={handleChange}
              placeholder="e.g. India"
              className="w-full border border-stone-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-ember-500 focus:ring-2 focus:ring-ember-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-2">
                ISO Code
              </label>

              <input
                name="code"
                maxLength={3}
                value={form.code}
                onChange={handleChange}
                placeholder="IN"
                className="w-full border border-stone-200 rounded-2xl px-4 py-3 text-sm uppercase outline-none focus:border-ember-500 focus:ring-2 focus:ring-ember-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-2">
                Currency
              </label>

              <input
                name="currency"
                value={form.currency}
                onChange={handleChange}
                placeholder="INR"
                className="w-full border border-stone-200 rounded-2xl px-4 py-3 text-sm uppercase outline-none focus:border-ember-500 focus:ring-2 focus:ring-ember-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-2">
              Status
            </label>

            <div className="relative">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="appearance-none w-full border border-stone-200 rounded-2xl px-4 py-3 pr-10 text-sm outline-none focus:border-ember-500"
              >
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>

              <FiChevronDown
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-stone-200 text-sm font-semibold text-stone-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-ember-600 hover:bg-ember-700 disabled:opacity-60 text-white text-sm font-semibold"
            >
              <FiPlus size={16} />

              {saving ? "Adding..." : "Add Country"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =====================================================
// MAIN COMPONENT
// =====================================================

const CountriesDirectory = () => {
  const [countries, setCountries] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });

  const [filters, setFilters] = useState({
    country: "",
    isoCode: "",
    visaStatus: "",
    otbStatus: "",
  });

  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // =====================================================
  // LOAD COUNTRIES
  // =====================================================

  const loadCountries = (page = 1, customFilters = filters) => {
    setLoading(true);

    const q = (
      customFilters.country || customFilters.isoCode || ""
    )
      .trim()
      .toLowerCase();
    const limit = 10;

    const filtered = countryStore.filter(
      (item) =>
        (!q ||
          item.countryName.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q)) &&
        (!customFilters.visaStatus ||
          item.allowForVisa === customFilters.visaStatus) &&
        (!customFilters.otbStatus ||
          item.allowForOtb === customFilters.otbStatus)
    );

    const totalPages = Math.max(Math.ceil(filtered.length / limit), 1);
    const safePage = Math.min(page, totalPages);

    setCountries(filtered.slice((safePage - 1) * limit, safePage * limit));

    setPagination({
      total: filtered.length,
      currentPage: safePage,
      totalPages,
      pageSize: limit,
    });

    setLoading(false);
  };

  useEffect(() => {
    loadCountries(1);
  }, []);

  // =====================================================
  // FILTER CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    e.preventDefault();

    loadCountries(1, filters);
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    const resetFilters = {
      country: "",
      isoCode: "",
      visaStatus: "",
      otbStatus: "",
    };

    setFilters(resetFilters);

    loadCountries(1, resetFilters);
  };

  // =====================================================
  // INLINE VISA / OTB UPDATE
  // =====================================================

  const applyInlineUpdate = (country, changes, message) => {
    countryStore = countryStore.map((item) =>
      item._id === country._id ? { ...item, ...changes } : item
    );

    setCountries((prev) =>
      prev.map((item) =>
        item._id === country._id ? { ...item, ...changes } : item
      )
    );

    toast.success(message);
  };

  const toggleVisaOtb = (country) => {
    const newVisaValue =
      country.allowForVisa === "Yes" ? "No" : "Yes";

    applyInlineUpdate(
      country,
      { allowForVisa: newVisaValue },
      "Visa status updated successfully"
    );
  };

  const toggleOtb = (country) => {
    const newOtbValue =
      country.allowForOtb === "Yes" ? "No" : "Yes";

    applyInlineUpdate(
      country,
      { allowForOtb: newOtbValue },
      "OTB status updated successfully"
    );
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openRulesModal = (country) => {
    setSelectedCountry(country);
    setShowRulesModal(true);
  };

  // =====================================================
  // AFTER EDIT
  // =====================================================

  const handleCountryUpdated = (updatedCountry) => {
    setCountries((prev) =>
      prev.map((country) =>
        country._id === updatedCountry._id
          ? updatedCountry
          : country
      )
    );
  };

  // =====================================================
  // AFTER ADD
  // =====================================================

  const handleCountryAdded = () => {
    loadCountries(1, filters);
  };

  // =====================================================
  // PAGINATION
  // =====================================================

  const changePage = (page) => {
    if (
      page < 1 ||
      page > pagination.totalPages ||
      loading
    ) {
      return;
    }

    loadCountries(page, filters);
  };

  // =====================================================
  // STATS
  // =====================================================

  const totalCountries = pagination.total || 0;

  const visaEnabled = countries.filter(
    (country) => country.allowForVisa === "Yes"
  ).length;

  const otbEnabled = countries.filter(
    (country) => country.allowForOtb === "Yes"
  ).length;

  const currencies = new Set(
    countries.map((country) => country.currency)
  ).size;

  return (
    <div className="flex-1 min-w-0 min-h-screen bg-stone-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div>
          <p className="text-xs text-stone-500 mb-1">
            Master Data
            <span className="mx-1">›</span>
            <span className="text-ember-600 font-medium">
              Countries
            </span>
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-serif text-2xl font-semibold text-navy-900">
              Global Countries Directory
            </h1>

            <span className="bg-ember-50 text-ember-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">
              {totalCountries} Countries
            </span>
          </div>

          <p className="text-sm text-stone-500 mt-1">
            Manage global geographic and administrative parameters.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-ember-600 hover:bg-ember-700 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-sm transition"
        >
          <FiPlus size={16} />
          Add Country
        </button>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">

        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <p className="text-[10px] font-semibold text-stone-400 tracking-wide">
            TOTAL COUNTRIES
          </p>

          <div className="flex items-center gap-2 mt-2">
            <FiGlobe className="text-ember-500" size={18} />

            <span className="text-xl font-bold text-navy-900">
              {totalCountries}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <p className="text-[10px] font-semibold text-stone-400 tracking-wide">
            VISA ENABLED
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-ember-600">
              {visaEnabled}
            </span>

            <span className="text-[10px] text-stone-400">
              current page
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <p className="text-[10px] font-semibold text-stone-400 tracking-wide">
            OTB ENABLED
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-ember-500">
              {otbEnabled}
            </span>

            <span className="text-[10px] text-stone-400">
              current page
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <p className="text-[10px] font-semibold text-stone-400 tracking-wide">
            CURRENCIES
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-navy-900">
              {currencies}
            </span>

            <span className="text-[10px] text-stone-400">
              current page
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <form
        onSubmit={handleSearch}
        className="bg-white rounded-3xl border border-stone-200 p-4 mb-5 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row gap-3">

          <div className="flex-1 flex items-center gap-2 border border-stone-200 rounded-2xl px-3 py-2.5 focus-within:border-ember-500 focus-within:ring-2 focus-within:ring-ember-50">
            <FiSearch
              className="text-stone-400 flex-shrink-0"
              size={16}
            />

            <input
              type="text"
              name="country"
              value={filters.country}
              onChange={handleChange}
              placeholder="Search country"
              className="w-full text-sm text-stone-700 focus:outline-none"
            />
          </div>

          <input
            type="text"
            name="isoCode"
            value={filters.isoCode}
            onChange={handleChange}
            placeholder="ISO Code"
            className="lg:w-36 border border-stone-200 rounded-2xl px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-ember-500"
          />

          <div className="relative lg:w-40">
            <select
              name="visaStatus"
              value={filters.visaStatus}
              onChange={handleChange}
              className="appearance-none w-full border border-stone-200 rounded-2xl px-3 py-2.5 pr-9 text-sm text-stone-700 outline-none focus:border-ember-500 bg-white"
            >
              <option value="">Visa Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <FiChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
          </div>

          <div className="relative lg:w-40">
            <select
              name="otbStatus"
              value={filters.otbStatus}
              onChange={handleChange}
              className="appearance-none w-full border border-stone-200 rounded-2xl px-3 py-2.5 pr-9 text-sm text-stone-700 outline-none focus:border-ember-500 bg-white"
            >
              <option value="">OTB Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <FiChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-ember-600 hover:bg-ember-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-2xl"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="border border-stone-200 hover:bg-stone-50 text-stone-700 text-sm font-semibold px-5 py-2.5 rounded-2xl"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">

                <th className="text-left text-xs font-semibold text-stone-500 px-5 py-4">
                  SL
                </th>

                <th className="text-left text-xs font-semibold text-stone-500 px-5 py-4">
                  COUNTRY
                </th>

                <th className="text-left text-xs font-semibold text-stone-500 px-5 py-4">
                  ISO CODE
                </th>

                <th className="text-left text-xs font-semibold text-stone-500 px-5 py-4">
                  CURRENCY
                </th>

                <th className="text-center text-xs font-semibold text-stone-500 px-5 py-4">
                  ALLOW FOR VISA
                </th>

                <th className="text-center text-xs font-semibold text-stone-500 px-5 py-4">
                  ALLOW FOR OTB
                </th>

                <th className="text-left text-xs font-semibold text-stone-500 px-5 py-4">
                  STATUS
                </th>

                <th className="text-center text-xs font-semibold text-stone-500 px-5 py-4">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-14 text-sm text-stone-400"
                  >
                    Loading countries...
                  </td>
                </tr>
              ) : countries.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-14"
                  >
                    <div className="flex flex-col items-center">
                      <FiGlobe
                        size={30}
                        className="text-stone-300 mb-3"
                      />

                      <p className="text-sm font-semibold text-stone-500">
                        No countries found
                      </p>

                      <p className="text-xs text-stone-400 mt-1">
                        Try changing your search filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                countries.map((country, index) => (
                  <tr
                    key={country._id}
                    className="border-b border-stone-100 last:border-0 hover:bg-ember-50/30 transition"
                  >

                    <td className="px-5 py-4 text-sm text-stone-500">
                      {String(
                        (pagination.currentPage - 1) *
                          pagination.pageSize +
                          index +
                          1
                      ).padStart(2, "0")}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-ember-50 text-ember-600 flex items-center justify-center">
                          <FiGlobe size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-navy-900">
                            {country.countryName}
                          </p>

                          <p className="text-[10px] text-stone-400">
                            Global Country
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1.5 rounded-xl">
                        {country.code}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-stone-700">
                        {country.currency}
                      </span>
                    </td>

                    {/* VISA */}
                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleVisaOtb(country)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                          country.allowForVisa === "Yes"
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            : "bg-red-50 text-red-500 hover:bg-red-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            country.allowForVisa === "Yes"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        />

                        {country.allowForVisa === "Yes"
                          ? "Yes"
                          : "No"}
                      </button>
                    </td>

                    {/* OTB */}
                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleOtb(country)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                          country.allowForOtb === "Yes"
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            : "bg-red-50 text-red-500 hover:bg-red-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            country.allowForOtb === "Yes"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        />

                        {country.allowForOtb === "Yes"
                          ? "Yes"
                          : "No"}
                      </button>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold ${
                          country.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            country.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        />

                        {country.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => openRulesModal(country)}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-2xl border border-stone-200 text-stone-400 hover:text-ember-600 hover:border-ember-200 hover:bg-ember-50 transition"
                        title="Edit validation rules"
                      >
                        <FiEdit3 size={15} />
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-stone-100">

          <p className="text-xs text-stone-500">
            Showing{" "}
            {countries.length > 0
              ? (pagination.currentPage - 1) *
                  pagination.pageSize +
                1
              : 0}{" "}
            to{" "}
            {(pagination.currentPage - 1) *
              pagination.pageSize +
              countries.length}{" "}
            of {pagination.total} entries
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={pagination.currentPage === 1}
              onClick={() =>
                changePage(pagination.currentPage - 1)
              }
              className="w-9 h-9 flex items-center justify-center border border-stone-200 text-stone-500 rounded-xl disabled:opacity-40 hover:bg-stone-50"
            >
              <FiChevronLeft size={14} />
            </button>

            {Array.from(
              {
                length: Math.min(pagination.totalPages, 5),
              },
              (_, i) => i + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                onClick={() => changePage(page)}
                className={`w-9 h-9 text-xs font-semibold rounded-xl ${
                  page === pagination.currentPage
                    ? "bg-ember-600 text-white"
                    : "border border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                pagination.currentPage >=
                pagination.totalPages
              }
              onClick={() =>
                changePage(pagination.currentPage + 1)
              }
              className="w-9 h-9 flex items-center justify-center border border-stone-200 text-stone-500 rounded-xl disabled:opacity-40 hover:bg-stone-50"
            >
              <FiChevronRight size={14} />
            </button>

          </div>
        </div>
      </div>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {showRulesModal && selectedCountry && (
        <VisaRulesModal
          country={selectedCountry}
          onClose={() => {
            setShowRulesModal(false);
            setSelectedCountry(null);
          }}
          onSaved={handleCountryUpdated}
        />
      )}

      {/* =====================================================
          ADD MODAL
      ===================================================== */}

      {showAddModal && (
        <AddCountryModal
          onClose={() => setShowAddModal(false)}
          onAdded={handleCountryAdded}
        />
      )}
    </div>
  );
};

export default CountriesDirectory;