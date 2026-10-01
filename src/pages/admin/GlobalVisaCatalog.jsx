import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiFilter,
  FiX,
  FiClock,
  FiFileText,
  FiMoreVertical,
  FiEye,
  FiTrash2,
  FiEdit3,
  FiSearch,
  FiGlobe,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiDollarSign,
} from "react-icons/fi";

import {
  TbPlaneDeparture,
  TbPlaneArrival,
} from "react-icons/tb";

// ======================================================
// DUMMY DATA (backend removed)
// ======================================================

let visaStore = [
  {
    _id: "v1",
    going_from: "India",
    going_to: "UAE",
    description: "Dubai Visa 30 Days Single Entry",
    about: "Tourist visa for Dubai and other emirates, valid for a 30 day stay.",
    spec: "E-Visa",
    entry: "Single",
    validity: "60 Days",
    duration: "30 Days",
    documents: "Passport, Photo, PAN Card",
    processing_time: "2-5 Working Days",
    amount: "7150",
    child_amount: "1300",
    absconding_fees: "4000",
    status: "Active",
  },
  {
    _id: "v2",
    going_from: "India",
    going_to: "Singapore",
    description: "Singapore Tourist Visa 30 Days",
    about: "Short stay tourist visa for Singapore.",
    spec: "E-Visa",
    entry: "Single",
    validity: "90 Days",
    duration: "30 Days",
    documents: "Passport, Photo, Bank Statement, Return Ticket",
    processing_time: "3-5 Working Days",
    amount: "4200",
    child_amount: "4200",
    absconding_fees: "0",
    status: "Active",
  },
  {
    _id: "v3",
    going_from: "India",
    going_to: "Thailand",
    description: "Thailand Tourist Visa 60 Days",
    about: "Tourist visa for Thailand with 60 days stay.",
    spec: "Sticker",
    entry: "Single",
    validity: "90 Days",
    duration: "60 Days",
    documents: "Passport, Photo, Hotel Voucher",
    processing_time: "4-6 Working Days",
    amount: "2500",
    child_amount: "2500",
    absconding_fees: "0",
    status: "Active",
  },
  {
    _id: "v4",
    going_from: "India",
    going_to: "Saudi Arabia",
    description: "KSA Tourist Visa 30 Days",
    about: "Tourist e-visa for Saudi Arabia.",
    spec: "E-Visa",
    entry: "Multiple",
    validity: "365 Days",
    duration: "30 Days",
    documents: "Passport, Photo",
    processing_time: "2-4 Working Days",
    amount: "9800",
    child_amount: "9800",
    absconding_fees: "1500",
    status: "Deactive",
  },
  {
    _id: "v5",
    going_from: "United Arab Emirates",
    going_to: "Saudi Arabia",
    description: "30 Days Tourist Visa - KSA",
    about: "Standard tourist e-visa valid for 30 days from entry.",
    spec: "E-Visa",
    entry: "Single",
    validity: "90 Days",
    duration: "30 Days",
    documents: "Passport Front Page, Recent Photograph",
    processing_time: "2-3 Working Days",
    amount: "350",
    child_amount: "250",
    absconding_fees: "1500",
    status: "Active",
  },
];


// ======================================================
// EMPTY FORM
// ONLY BACKEND MODEL FIELDS
// ======================================================

const emptyForm = {
  going_from: "",
  going_to: "",
  description: "",
  about: "",
  spec: "",
  entry: "",
  validity: "",
  duration: "",
  documents: "",
  processing_time: "",
  amount: "",
  child_amount: "0",
  absconding_fees: "",
  status: "Active",
};


// ======================================================
// MAIN COMPONENT
// ======================================================

const GlobalVisaCatalog = () => {
  const [visas, setVisas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    going_from: "",
    going_to: "",
    status: "",
  });

  const [openMenu, setOpenMenu] = useState(null);

  const [modalType, setModalType] = useState(null);

  const [selectedVisa, setSelectedVisa] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [statusLoading, setStatusLoading] = useState(null);

  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });


  // ======================================================
  // FETCH VISAS
  // ======================================================

  const fetchVisas = (
    page = 1,
    currentFilters = filters
  ) => {
    setLoading(true);

    const from = (currentFilters.going_from || "").trim().toLowerCase();
    const to = (currentFilters.going_to || "").trim().toLowerCase();
    const limit = 10;

    const filtered = visaStore.filter(
      (item) =>
        (!from || item.going_from.toLowerCase().includes(from)) &&
        (!to || item.going_to.toLowerCase().includes(to)) &&
        (!currentFilters.status || item.status === currentFilters.status)
    );

    const totalPages = Math.max(Math.ceil(filtered.length / limit), 1);
    const safePage = Math.min(page, totalPages);

    setVisas(filtered.slice((safePage - 1) * limit, safePage * limit));

    setPagination({
      total: filtered.length,
      currentPage: safePage,
      totalPages,
      limit,
    });

    setLoading(false);
  };


  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {
    fetchVisas(1);
  }, []);


  // ======================================================
  // FILTER CHANGE
  // ======================================================

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ======================================================
  // SEARCH
  // ======================================================

  const handleSearch = () => {
    fetchVisas(1, filters);
  };


  // ======================================================
  // RESET
  // ======================================================

  const handleReset = () => {
    const reset = {
      going_from: "",
      going_to: "",
      status: "",
    };

    setFilters(reset);

    fetchVisas(1, reset);
  };


  // ======================================================
  // FORM CHANGE
  // ======================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ======================================================
  // ADD MODAL
  // ======================================================

  const openAddModal = () => {
    setSelectedVisa(null);
    setFormData(emptyForm);
    setModalType("add");
    setOpenMenu(null);
  };


  // ======================================================
  // EDIT MODAL
  // ======================================================

  const openEditModal = (visa) => {
    setOpenMenu(null);

    const data = visaStore.find((item) => item._id === visa._id) || visa;

    setSelectedVisa(data);

    setFormData({
      going_from: data.going_from || "",
      going_to: data.going_to || "",
      description: data.description || "",
      about: data.about || "",
      spec: data.spec || "",
      entry: data.entry || "",
      validity: data.validity || "",
      duration: data.duration || "",
      documents: data.documents || "",
      processing_time: data.processing_time || "",
      amount: data.amount || "",
      child_amount: data.child_amount || "0",
      absconding_fees: data.absconding_fees || "",
      status: data.status || "Active",
    });

    setModalType("edit");
  };


  // ======================================================
  // VIEW MODAL
  // ======================================================

  const openViewModal = (visa) => {
    setOpenMenu(null);

    const data = visaStore.find((item) => item._id === visa._id) || visa;

    setSelectedVisa(data);
    setModalType("view");
  };


  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const closeModal = () => {
    setModalType(null);
    setSelectedVisa(null);
    setFormData(emptyForm);
  };


  // ======================================================
  // ADD / UPDATE
  // ======================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaving(true);

    const isEdit = modalType === "edit";

    if (isEdit) {
      visaStore = visaStore.map((item) =>
        item._id === selectedVisa._id
          ? { ...item, ...formData }
          : item
      );
    } else {
      visaStore = [
        { _id: `v${Date.now()}`, ...formData },
        ...visaStore,
      ];
    }

    closeModal();

    fetchVisas(isEdit ? pagination.currentPage : 1);

    setSaving(false);

    alert(
      isEdit
        ? "Visa updated successfully"
        : "Visa added successfully"
    );
  };


  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = (visa) => {
    setOpenMenu(null);

    const confirmed = window.confirm(
      `Are you sure you want to delete this visa route?\n\n${visa.going_from} → ${visa.going_to}`
    );

    if (!confirmed) return;

    visaStore = visaStore.filter((item) => item._id !== visa._id);

    const nextPage =
      visas.length === 1 && pagination.currentPage > 1
        ? pagination.currentPage - 1
        : pagination.currentPage;

    fetchVisas(nextPage);

    alert("Visa deleted successfully");
  };


  // ======================================================
  // STATUS
  // ======================================================

  const handleStatusToggle = (visa) => {
    const newStatus =
      visa.status === "Active" ? "Deactive" : "Active";

    visaStore = visaStore.map((item) =>
      item._id === visa._id ? { ...item, status: newStatus } : item
    );

    setVisas((prev) =>
      prev.map((item) =>
        item._id === visa._id ? { ...item, status: newStatus } : item
      )
    );
  };


  // ======================================================
  // PAGINATION
  // ======================================================

  const changePage = (page) => {
    if (
      page < 1 ||
      page > pagination.totalPages
    ) {
      return;
    }

    fetchVisas(page);
  };


  // ======================================================
  // RENDER
  // ======================================================

  return (
    /*
      IMPORTANT:
      Page itself will NOT scroll horizontally.
      Only table container will scroll horizontally.
    */

    <div className="h-full w-full overflow-hidden bg-page">

      <div className="flex h-full min-h-0 w-full flex-col p-4 sm:p-5 lg:p-6">


        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="mb-5 flex shrink-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-stone-400">

              <span>Operations</span>

              <span>›</span>

              <span>Visa Management</span>

              <span>›</span>

              <span className="font-semibold text-ember-600">
                Visas List
              </span>

            </div>


            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-ember-600/10">
                <FiGlobe
                  size={21}
                  className="text-ember-600"
                />
              </div>


              <div>

                <h1 className="font-serif text-[23px] font-semibold tracking-tight text-navy-900">
                  Global Visa Catalog
                </h1>

                <p className="text-xs text-stone-400">
                  Manage visa routes and visa
                  information
                </p>

              </div>


              <span className="hidden rounded-full bg-ember-600/10 px-3 py-1.5 text-xs font-bold text-ember-600 sm:block">
                {pagination.total} Visas
              </span>

            </div>

          </div>


          {/* ADD */}

          <button
            onClick={openAddModal}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-navy-900
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_25px_rgba(15,23,42,0.15)]
              transition-all
              hover:-translate-y-0.5
              hover:bg-navy-800
            "
          >

            <FiPlus
              size={17}
              className="transition-transform group-hover:rotate-90"
            />

            Add New Visa

          </button>

        </div>



        {/* ==================================================
            FILTER CARD
        ================================================== */}

        <div
          className="
            mb-5
            shrink-0
            overflow-hidden
            rounded-3xl
            border
            border-stone-200/80
            bg-white
            shadow-[0_8px_30px_rgba(15,23,42,0.04)]
          "
        >

          <div className="flex items-center justify-between border-b border-stone-100 px-5 py-3.5">

            <div className="flex items-center gap-2.5">

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ember-600/10">
                <FiFilter
                  size={15}
                  className="text-ember-600"
                />
              </div>

              <div>

                <p className="text-sm font-bold text-navy-800">
                  Search & Filter
                </p>

                <p className="text-[10px] text-stone-400">
                  Find visa routes
                </p>

              </div>

            </div>

          </div>


          <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_180px_auto_auto]">

            {/* GOING FROM */}

            <FilterInput
              label="Going From"
              name="going_from"
              value={filters.going_from}
              onChange={handleFilterChange}
              placeholder="Search origin country"
              icon={
                <TbPlaneDeparture
                  size={17}
                />
              }
            />


            {/* GOING TO */}

            <FilterInput
              label="Going To"
              name="going_to"
              value={filters.going_to}
              onChange={handleFilterChange}
              placeholder="Search destination"
              icon={
                <TbPlaneArrival
                  size={17}
                />
              }
            />


            {/* STATUS */}

            <div>

              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Status
              </label>

              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="
                  h-11
                  w-full
                  rounded-2xl
                  border
                  border-stone-200
                  bg-stone-50/50
                  px-3.5
                  text-sm
                  text-stone-700
                  outline-none
                  transition
                  focus:border-ember-600/50
                  focus:bg-white
                "
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

            </div>


            {/* SEARCH */}

            <button
              onClick={handleSearch}
              className="
                flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-ember-600
                px-5
                text-sm
                font-semibold
                text-white
                shadow-[0_7px_20px_rgba(86,101,214,0.22)]
                transition
                hover:bg-ember-700
              "
            >

              <FiSearch size={16} />

              Search

            </button>


            {/* RESET */}

            <button
              onClick={handleReset}
              className="
                flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-stone-200
                bg-white
                px-5
                text-sm
                font-semibold
                text-stone-600
                transition
                hover:bg-stone-50
              "
            >

              <FiX size={15} />

              Reset

            </button>

          </div>

        </div>



        {/* ==================================================
            TABLE CARD
            ONLY THIS BOX SCROLLS
        ================================================== */}

        <div
          className="
            flex
            min-h-0
            flex-1
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-stone-200/80
            bg-white
            shadow-[0_10px_35px_rgba(15,23,42,0.05)]
          "
        >

          {/* TABLE TOP */}

          <div className="flex shrink-0 items-center justify-between border-b border-stone-100 px-5 py-4">

            <div>

              <h2 className="text-sm font-bold text-navy-800">
                Visa Routes
              </h2>

              <p className="mt-0.5 text-[11px] text-stone-400">
                All configured visa products
              </p>

            </div>


            <div className="flex items-center gap-2 text-xs text-stone-400">

              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              {visas.filter(
                (visa) =>
                  visa.status === "Active"
              ).length}{" "}
              active

            </div>

          </div>



          {/* ==================================================
              SCROLL AREA
          ================================================== */}

          <div className="min-h-0 flex-1 overflow-auto">

            <table className="w-full min-w-[1250px]">

              <thead className="sticky top-0 z-10">

                <tr className="border-b border-stone-100 bg-page">

                  <TableHead>
                    SL
                  </TableHead>

                  <TableHead>
                    ROUTE & PRODUCT
                  </TableHead>

                  <TableHead>
                    VISA DETAILS
                  </TableHead>

                  <TableHead>
                    DOCUMENTS
                  </TableHead>

                  <TableHead>
                    PRICING
                  </TableHead>

                  <TableHead>
                    STATUS
                  </TableHead>

                  <TableHead>
                    ACTION
                  </TableHead>

                </tr>

              </thead>


              <tbody>

                {/* LOADING */}

                {loading ? (

                  Array.from({
                    length: 6,
                  }).map((_, index) => (

                    <tr
                      key={index}
                      className="border-b border-stone-100"
                    >

                      {Array.from({
                        length: 7,
                      }).map(
                        (_, cell) => (

                          <td
                            key={cell}
                            className="px-5 py-5"
                          >

                            <div className="h-4 w-24 animate-pulse rounded-lg bg-stone-100" />

                          </td>

                        )
                      )}

                    </tr>

                  ))

                ) : visas.length === 0 ? (

                  /* EMPTY */

                  <tr>

                    <td
                      colSpan="7"
                      className="px-5 py-16 text-center"
                    >

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-stone-100">
                        <FiGlobe
                          size={23}
                          className="text-stone-400"
                        />
                      </div>

                      <p className="mt-4 text-sm font-bold text-stone-700">
                        No visa routes found
                      </p>

                      <p className="mt-1 text-xs text-stone-400">
                        Add a new visa or change
                        your filters.
                      </p>

                    </td>

                  </tr>

                ) : (

                  visas.map(
                    (visa, index) => {

                      const documents =
                        visa.documents
                          ? visa.documents
                              .split(",")
                              .map((item) =>
                                item.trim()
                              )
                              .filter(Boolean)
                          : [];


                      return (

                        <tr
                          key={visa._id}
                          className="
                            group
                            border-b
                            border-stone-100
                            transition
                            hover:bg-page
                          "
                        >

                          {/* SL */}

                          <td className="px-5 py-5 align-top">

                            <span className="text-xs font-bold text-stone-400">
                              {String(
                                (pagination.currentPage -
                                  1) *
                                  pagination.limit +
                                  index +
                                  1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                          </td>


                          {/* ROUTE */}

                          <td className="px-5 py-5 align-top">

                            <div className="flex min-w-[250px] items-start gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ember-600/10">

                                <TbPlaneDeparture
                                  size={19}
                                  className="text-ember-600"
                                />

                              </div>


                              <div>

                                <div className="mb-1.5 flex items-center gap-1.5">

                                  <span className="rounded-lg bg-stone-100 px-2 py-1 text-[9px] font-bold uppercase text-stone-600">
                                    {visa.going_from ||
                                      "—"}
                                  </span>

                                  <span className="text-xs text-stone-300">
                                    →
                                  </span>

                                  <span className="rounded-lg bg-ember-600/10 px-2 py-1 text-[9px] font-bold uppercase text-ember-600">
                                    {visa.going_to ||
                                      "—"}
                                  </span>

                                </div>


                                <p className="max-w-[280px] text-sm font-bold leading-5 text-navy-800">
                                  {visa.about ||
                                    "Visa Route"}
                                </p>


                                {visa.description && (

                                  <p className="mt-1 max-w-[280px] truncate text-[11px] text-stone-400">
                                    {visa.description}
                                  </p>

                                )}

                              </div>

                            </div>

                          </td>


                          {/* VISA DETAILS */}

                          <td className="px-5 py-5 align-top">

                            <div className="min-w-[180px] space-y-1.5">

                              <div className="flex items-center gap-2">

                                <span className="rounded-xl bg-navy-50 px-2.5 py-1 text-[10px] font-bold text-navy-600">
                                  {visa.entry ||
                                    "—"}
                                </span>

                              </div>


                              <p className="text-xs font-semibold text-stone-700">
                                Duration:{" "}
                                <span className="font-medium text-stone-500">
                                  {visa.duration ||
                                    "—"}
                                </span>
                              </p>


                              <p className="text-xs font-semibold text-stone-700">
                                Validity:{" "}
                                <span className="font-medium text-stone-500">
                                  {visa.validity ||
                                    "—"}
                                </span>
                              </p>


                              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">

                                <FiClock
                                  size={11}
                                />

                                {visa.processing_time ||
                                  "—"}

                              </div>

                            </div>

                          </td>


                          {/* DOCUMENTS */}

                          <td className="px-5 py-5 align-top">

                            <div className="flex max-w-[230px] flex-wrap gap-1.5">

                              {documents.length >
                              0 ? (

                                documents
                                  .slice(
                                    0,
                                    4
                                  )
                                  .map(
                                    (
                                      doc,
                                      docIndex
                                    ) => (

                                      <span
                                        key={
                                          docIndex
                                        }
                                        className="
                                          inline-flex
                                          items-center
                                          gap-1.5
                                          rounded-xl
                                          border
                                          border-stone-200
                                          bg-white
                                          px-2.5
                                          py-1.5
                                          text-[10px]
                                          font-medium
                                          text-stone-600
                                        "
                                      >

                                        <FiFileText
                                          size={
                                            11
                                          }
                                          className="text-stone-400"
                                        />

                                        {doc}

                                      </span>

                                    )
                                  )

                              ) : (

                                <span className="text-xs text-stone-400">
                                  —
                                </span>

                              )}


                              {documents.length >
                                4 && (

                                <span className="rounded-xl bg-stone-100 px-2 py-1.5 text-[10px] font-bold text-stone-500">
                                  +
                                  {documents.length -
                                    4}
                                </span>

                              )}

                            </div>

                          </td>


                          {/* PRICING */}

                          <td className="px-5 py-5 align-top">

                            <div className="min-w-[170px] space-y-1.5">

                              <PriceRow
                                label="Adult"
                                value={
                                  visa.amount
                                }
                              />

                              <PriceRow
                                label="Child"
                                value={
                                  visa.child_amount
                                }
                              />

                              <PriceRow
                                label="Absconding"
                                value={
                                  visa.absconding_fees
                                }
                              />

                            </div>

                          </td>


                          {/* STATUS */}

                          <td className="px-5 py-5 align-top">

                            <button
                              onClick={() =>
                                handleStatusToggle(
                                  visa
                                )
                              }
                              disabled={
                                statusLoading ===
                                visa._id
                              }
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                px-3
                                py-1.5
                                text-[10px]
                                font-bold
                                transition
                                ${
                                  visa.status ===
                                  "Active"
                                    ? "border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                    : "border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
                                }
                              `}
                            >

                              <span
                                className={`
                                  h-1.5
                                  w-1.5
                                  rounded-full
                                  ${
                                    visa.status ===
                                    "Active"
                                      ? "bg-emerald-500"
                                      : "bg-red-500"
                                  }
                                `}
                              />

                              {statusLoading ===
                              visa._id
                                ? "Updating..."
                                : visa.status}

                            </button>

                          </td>


                          {/* ACTION */}

                          <td className="relative px-5 py-5 align-top">

                            <button
                              onClick={() =>
                                setOpenMenu(
                                  openMenu ===
                                    visa._id
                                    ? null
                                    : visa._id
                                )
                              }
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-transparent
                                text-stone-400
                                transition
                                hover:border-stone-200
                                hover:bg-white
                                hover:text-stone-700
                              "
                            >

                              <FiMoreVertical
                                size={17}
                              />

                            </button>


                            {openMenu ===
                              visa._id && (

                              <div
                                className="
                                  absolute
                                  right-5
                                  top-14
                                  z-50
                                  w-36
                                  overflow-hidden
                                  rounded-2xl
                                  border
                                  border-stone-200
                                  bg-white
                                  p-1.5
                                  shadow-[0_15px_40px_rgba(15,23,42,0.15)]
                                "
                              >

                                <ActionButton
                                  icon={
                                    <FiEye
                                      size={
                                        14
                                      }
                                    />
                                  }
                                  text="View"
                                  onClick={() =>
                                    openViewModal(
                                      visa
                                    )
                                  }
                                />


                                <ActionButton
                                  icon={
                                    <FiEdit3
                                      size={
                                        14
                                      }
                                    />
                                  }
                                  text="Edit"
                                  onClick={() =>
                                    openEditModal(
                                      visa
                                    )
                                  }
                                />


                                <div className="my-1 border-t border-stone-100" />


                                <ActionButton
                                  danger
                                  icon={
                                    <FiTrash2
                                      size={
                                        14
                                      }
                                    />
                                  }
                                  text={
                                    deletingId ===
                                    visa._id
                                      ? "Deleting..."
                                      : "Delete"
                                  }
                                  disabled={
                                    deletingId ===
                                    visa._id
                                  }
                                  onClick={() =>
                                    handleDelete(
                                      visa
                                    )
                                  }
                                />

                              </div>

                            )}

                          </td>

                        </tr>

                      );
                    }
                  )

                )}

              </tbody>

            </table>

          </div>



          {/* ==================================================
              PAGINATION
          ================================================== */}

          {!loading &&
            visas.length > 0 && (

            <div className="flex shrink-0 items-center justify-between border-t border-stone-100 px-5 py-3.5">

              <p className="text-[11px] text-stone-400">

                Showing{" "}

                <span className="font-bold text-stone-600">
                  {(pagination.currentPage -
                    1) *
                    pagination.limit +
                    1}
                </span>

                {" "}–{" "}

                <span className="font-bold text-stone-600">
                  {Math.min(
                    pagination.currentPage *
                      pagination.limit,
                    pagination.total
                  )}
                </span>

                {" "}of{" "}

                <span className="font-bold text-stone-600">
                  {pagination.total}
                </span>

              </p>


              <div className="flex items-center gap-1.5">

                <button
                  onClick={() =>
                    changePage(
                      pagination.currentPage -
                        1
                    )
                  }
                  disabled={
                    pagination.currentPage <=
                    1
                  }
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-stone-200
                    text-stone-500
                    transition
                    hover:bg-stone-50
                    disabled:opacity-40
                  "
                >

                  <FiChevronLeft
                    size={14}
                  />

                </button>


                <span className="flex h-8 min-w-8 items-center justify-center rounded-xl bg-ember-600 px-2 text-[11px] font-bold text-white">
                  {pagination.currentPage}
                </span>


                <button
                  onClick={() =>
                    changePage(
                      pagination.currentPage +
                        1
                    )
                  }
                  disabled={
                    pagination.currentPage >=
                    pagination.totalPages
                  }
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-stone-200
                    text-stone-500
                    transition
                    hover:bg-stone-50
                    disabled:opacity-40
                  "
                >

                  <FiChevronRight
                    size={14}
                  />

                </button>

              </div>

            </div>

          )}

        </div>

      </div>



      {/* ====================================================
          ADD / EDIT MODAL
      ==================================================== */}

      {(modalType === "add" ||
        modalType === "edit") && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/45 p-4 backdrop-blur-sm">

          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]">


            {/* HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-stone-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-ember-600/10">
                  <FiGlobe
                    size={20}
                    className="text-ember-600"
                  />
                </div>


                <div>

                  <h2 className="text-lg font-bold text-navy-900">
                    {modalType === "edit"
                      ? "Edit Visa Route"
                      : "Add New Visa Route"}
                  </h2>

                  <p className="mt-0.5 text-[11px] text-stone-400">
                    Add complete visa information
                  </p>

                </div>

              </div>


              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-2xl bg-stone-100 text-stone-500 transition hover:bg-stone-200"
              >

                <FiX size={17} />

              </button>

            </div>



            {/* FORM SCROLL */}

            <form
              onSubmit={handleSubmit}
              className="min-h-0 flex-1 overflow-y-auto"
            >

              <div className="space-y-6 p-6">


                {/* ==================================================
                    ROUTE
                ================================================== */}

                <FormSection
                  title="Route Information"
                >

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <FormInput
                      label="Going From"
                      name="going_from"
                      value={
                        formData.going_from
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. India"
                      required
                      icon={
                        <TbPlaneDeparture />
                      }
                    />

                    <FormInput
                      label="Going To"
                      name="going_to"
                      value={
                        formData.going_to
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. United Arab Emirates"
                      required
                      icon={
                        <TbPlaneArrival />
                      }
                    />

                  </div>

                </FormSection>



                {/* ==================================================
                    DESCRIPTION / ABOUT / SPEC
                ================================================== */}

                <FormSection
                  title="Visa Information"
                >

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <FormTextarea
                      label="Description"
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Enter visa description"
                    />

                    <FormTextarea
                      label="About"
                      name="about"
                      value={formData.about}
                      onChange={
                        handleInputChange
                      }
                      placeholder="Enter visa title / about"
                    />

                    <FormTextarea
                      label="Specification"
                      name="spec"
                      value={formData.spec}
                      onChange={
                        handleInputChange
                      }
                      placeholder="Enter visa specification"
                    />

                    <FormInput
                      label="Entry"
                      name="entry"
                      value={formData.entry}
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. Single Entry"
                      required
                    />

                  </div>

                </FormSection>



                {/* ==================================================
                    VALIDITY
                ================================================== */}

                <FormSection
                  title="Stay & Validity"
                >

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <FormInput
                      label="Validity"
                      name="validity"
                      value={
                        formData.validity
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. 60 Days"
                      required
                    />

                    <FormInput
                      label="Duration"
                      name="duration"
                      value={
                        formData.duration
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. 30 Days"
                      required
                    />

                    <FormInput
                      label="Processing Time"
                      name="processing_time"
                      value={
                        formData.processing_time
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. 2-5 Working Days"
                      required
                    />

                  </div>

                </FormSection>



                {/* ==================================================
                    DOCUMENTS
                ================================================== */}

                <FormSection
                  title="Documents"
                >

                  <FormTextarea
                    label="Documents"
                    name="documents"
                    value={
                      formData.documents
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Passport, Photo, Ticket"
                    required
                  />

                  <p className="mt-1.5 text-[10px] text-stone-400">
                    Add multiple documents separated
                    by commas.
                  </p>

                </FormSection>



                {/* ==================================================
                    PRICING
                ================================================== */}

                <FormSection
                  title="Pricing"
                >

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <FormInput
                      label="Amount"
                      name="amount"
                      value={
                        formData.amount
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. AED 320"
                      required
                      icon={
                        <FiDollarSign />
                      }
                    />

                    <FormInput
                      label="Child Amount"
                      name="child_amount"
                      value={
                        formData.child_amount
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. AED 150"
                      required
                      icon={
                        <FiDollarSign />
                      }
                    />

                    <FormInput
                      label="Absconding Fees"
                      name="absconding_fees"
                      value={
                        formData.absconding_fees
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. AED 1000"
                      icon={
                        <FiDollarSign />
                      }
                    />

                  </div>

                </FormSection>



                {/* ==================================================
                    STATUS
                ================================================== */}

                <FormSection title="Status">

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <StatusOption
                      active={
                        formData.status ===
                        "Active"
                      }
                      status="Active"
                      icon={
                        <FiCheckCircle
                          size={17}
                        />
                      }
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          status: "Active",
                        }))
                      }
                    />

                    <StatusOption
                      active={
                        formData.status ===
                        "Deactive"
                      }
                      status="Deactive"
                      icon={
                        <FiAlertCircle
                          size={17}
                        />
                      }
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          status:
                            "Deactive",
                        }))
                      }
                    />

                  </div>

                </FormSection>

              </div>



              {/* FOOTER */}

              <div className="sticky bottom-0 flex shrink-0 justify-end gap-3 border-t border-stone-100 bg-white/95 px-6 py-4 backdrop-blur">

                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    rounded-2xl
                    border
                    border-stone-200
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-stone-600
                    transition
                    hover:bg-stone-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="
                    rounded-2xl
                    bg-ember-600
                    px-6
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(86,101,214,0.22)]
                    transition
                    hover:bg-ember-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {saving
                    ? "Saving..."
                    : modalType ===
                      "edit"
                    ? "Update Visa"
                    : "Create Visa"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}



      {/* ====================================================
          VIEW MODAL
      ==================================================== */}

      {modalType === "view" &&
        selectedVisa && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/45 p-4 backdrop-blur-sm">

          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]">


            {/* HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-stone-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-ember-600/10">
                  <FiGlobe
                    size={20}
                    className="text-ember-600"
                  />
                </div>


                <div>

                  <h2 className="text-lg font-bold text-navy-900">
                    Visa Details
                  </h2>

                  <p className="text-xs text-stone-400">
                    {selectedVisa.going_from}{" "}
                    →{" "}
                    {selectedVisa.going_to}
                  </p>

                </div>

              </div>


              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-2xl bg-stone-100 text-stone-500"
              >
                <FiX size={17} />
              </button>

            </div>



            {/* CONTENT */}

            <div className="min-h-0 flex-1 overflow-y-auto p-6">


              {/* ROUTE HERO */}

              <div className="mb-5 rounded-3xl bg-gradient-to-br from-ember-600/10 via-navy-50 to-white p-5">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="mb-2 flex items-center gap-2">

                      <span className="rounded-xl bg-white px-2.5 py-1 text-[10px] font-bold text-stone-600 shadow-sm">
                        {selectedVisa.going_from}
                      </span>

                      <span className="text-stone-400">
                        →
                      </span>

                      <span className="rounded-xl bg-ember-600 px-2.5 py-1 text-[10px] font-bold text-white">
                        {selectedVisa.going_to}
                      </span>

                    </div>


                    <h3 className="text-xl font-bold text-navy-900">
                      {selectedVisa.about ||
                        "Visa Route"}
                    </h3>


                    {selectedVisa.description && (

                      <p className="mt-1 text-xs text-stone-500">
                        {
                          selectedVisa.description
                        }
                      </p>

                    )}

                  </div>


                  <span
                    className={`
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-bold
                      ${
                        selectedVisa.status ===
                        "Active"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                  >

                    <span className="h-1.5 w-1.5 rounded-full bg-current" />

                    {selectedVisa.status}

                  </span>

                </div>

              </div>



              {/* DETAILS GRID */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                <DetailItem
                  label="Going From"
                  value={
                    selectedVisa.going_from
                  }
                />

                <DetailItem
                  label="Going To"
                  value={
                    selectedVisa.going_to
                  }
                />

                <DetailItem
                  label="Entry"
                  value={
                    selectedVisa.entry
                  }
                />

                <DetailItem
                  label="Validity"
                  value={
                    selectedVisa.validity
                  }
                />

                <DetailItem
                  label="Duration"
                  value={
                    selectedVisa.duration
                  }
                />

                <DetailItem
                  label="Processing Time"
                  value={
                    selectedVisa.processing_time
                  }
                />

                <DetailItem
                  label="Amount"
                  value={
                    selectedVisa.amount
                  }
                />

                <DetailItem
                  label="Child Amount"
                  value={
                    selectedVisa.child_amount
                  }
                />

                <DetailItem
                  label="Absconding Fees"
                  value={
                    selectedVisa.absconding_fees
                  }
                />

                <DetailItem
                  label="Specification"
                  value={
                    selectedVisa.spec
                  }
                />

                <DetailItem
                  label="Documents"
                  value={
                    selectedVisa.documents
                  }
                  full
                />

              </div>



              {/* ABOUT / DESCRIPTION */}

              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">

                <DetailItem
                  label="About"
                  value={
                    selectedVisa.about
                  }
                />

                <DetailItem
                  label="Description"
                  value={
                    selectedVisa.description
                  }
                />

              </div>



              {/* EDIT */}

              <div className="mt-6 flex justify-end">

                <button
                  onClick={() =>
                    openEditModal(
                      selectedVisa
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-ember-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_8px_20px_rgba(86,101,214,0.20)]
                    transition
                    hover:bg-ember-700
                  "
                >

                  <FiEdit3 size={15} />

                  Edit Visa

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


// ======================================================
// FILTER INPUT
// ======================================================

const FilterInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
}) => {
  return (
    <div>

      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-500">
        {label}
      </label>

      <div className="group flex h-11 items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50/50 px-3.5 transition focus-within:border-ember-600/50 focus-within:bg-white">

        <span className="shrink-0 text-stone-400 transition group-focus-within:text-ember-600">
          {icon}
        </span>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
        />

        {value && (

          <button
            type="button"
            onClick={() =>
              onChange({
                target: {
                  name,
                  value: "",
                },
              })
            }
            className="text-stone-300 transition hover:text-stone-500"
          >

            <FiX size={14} />

          </button>

        )}

      </div>

    </div>
  );
};


// ======================================================
// FORM SECTION
// ======================================================

const FormSection = ({
  title,
  children,
}) => {
  return (
    <section>

      <div className="mb-3 flex items-center gap-2">

        <span className="h-1.5 w-1.5 rounded-full bg-ember-600" />

        <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-stone-700">
          {title}
        </h3>

      </div>

      {children}

    </section>
  );
};


// ======================================================
// FORM INPUT
// ======================================================

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}) => {
  return (
    <div>

      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-500">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>


      <div className="group flex h-11 items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50/50 px-3.5 transition focus-within:border-ember-600/50 focus-within:bg-white">

        {icon && (

          <span className="shrink-0 text-stone-400 group-focus-within:text-ember-600">
            {React.cloneElement(icon, {
              size: 16,
            })}
          </span>

        )}

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
        />

      </div>

    </div>
  );
};


// ======================================================
// TEXTAREA
// ======================================================

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div>

      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-500">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>


      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={3}
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-stone-200
          bg-stone-50/50
          px-3.5
          py-3
          text-sm
          text-stone-700
          outline-none
          transition
          placeholder:text-stone-400
          focus:border-ember-600/50
          focus:bg-white
        "
      />

    </div>
  );
};


// ======================================================
// STATUS OPTION
// ======================================================

const StatusOption = ({
  active,
  status,
  icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        items-center
        gap-3
        rounded-2xl
        border
        p-3.5
        text-left
        transition
        ${
          active
            ? status === "Active"
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
            : "border-stone-200 bg-white hover:bg-stone-50"
        }
      `}
    >

      <span
        className={
          active
            ? status === "Active"
              ? "text-emerald-500"
              : "text-red-500"
            : "text-stone-400"
        }
      >
        {icon}
      </span>

      <span className="text-sm font-semibold text-stone-700">
        {status}
      </span>

      {active && (
        <span className="ml-auto h-2 w-2 rounded-full bg-current" />
      )}

    </button>
  );
};


// ======================================================
// TABLE HEAD
// ======================================================

const TableHead = ({ children }) => {
  return (
    <th className="whitespace-nowrap px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-stone-400">
      {children}
    </th>
  );
};


// ======================================================
// PRICE ROW
// ======================================================

const PriceRow = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-[11px] text-stone-400">
        {label}
      </span>

      <span className="text-[11px] font-bold text-stone-700">
        {value || "—"}
      </span>

    </div>
  );
};


// ======================================================
// ACTION BUTTON
// ======================================================

const ActionButton = ({
  icon,
  text,
  onClick,
  danger = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex
        w-full
        items-center
        gap-2
        rounded-xl
        px-3
        py-2.5
        text-xs
        font-medium
        transition
        disabled:opacity-50
        ${
          danger
            ? "text-red-500 hover:bg-red-50"
            : "text-stone-600 hover:bg-stone-50"
        }
      `}
    >
      {icon}
      {text}
    </button>
  );
};


// ======================================================
// DETAIL ITEM
// ======================================================

const DetailItem = ({
  label,
  value,
  full = false,
}) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-stone-100
        bg-stone-50/60
        p-3.5
        ${full ? "sm:col-span-2 lg:col-span-3" : ""}
      `}
    >

      <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-stone-400">
        {label}
      </p>

      <p className="break-words text-sm font-semibold leading-5 text-stone-700">
        {value || "—"}
      </p>

    </div>
  );
};


export default GlobalVisaCatalog;