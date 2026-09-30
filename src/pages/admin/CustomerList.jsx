import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiUser,
  FiMail,
  FiPhone,
  FiPlus,
  FiMoreVertical,
  FiEye,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiMapPin,
} from "react-icons/fi";

// =====================================================
// DUMMY DATA
// =====================================================

const DUMMY_USERS = [
  {
    _id: "u1",
    fullName: "Rahul Mehta",
    email: "rahul.mehta@gmail.com",
    phoneNumber: "9876501234",
    country: "India",
    role: "user",
  },
  {
    _id: "u2",
    fullName: "Priya Nair",
    email: "priya.nair@outlook.com",
    phoneNumber: "9823012345",
    country: "India",
    role: "user",
  },
  {
    _id: "u3",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 5551234567",
    country: "USA",
    role: "user",
  },
  {
    _id: "u4",
    fullName: "Alice Smith",
    email: "alice.smith@example.co.uk",
    phoneNumber: "+44 7700900123",
    country: "United Kingdom",
    role: "user",
  },
  {
    _id: "u5",
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@gmail.com",
    phoneNumber: "9988776655",
    country: "India",
    role: "user",
  },
  {
    _id: "u6",
    fullName: "Sneha Kapoor",
    email: "sneha.k@gmail.com",
    phoneNumber: "9898989898",
    country: "India",
    role: "user",
  },
];

// =====================================================
// CUSTOMER LIST
// =====================================================

const CustomerList = () => {
  const [searchForm, setSearchForm] = useState({
    name: "",
    email: "",
    number: "",
  });

  const [customers, setCustomers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // =====================================================
  // GET ALL USERS
  // =====================================================

  const fetchUsers = () => {
    setLoading(true);
    setError("");

    setCustomers(DUMMY_USERS);
    setTotalUsers(DUMMY_USERS.length);

    setLoading(false);
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchUsers();
  }, []);

  // =====================================================
  // SEARCH INPUT
  // =====================================================

  const handleChange = (e) => {
    setSearchForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =====================================================
  // SEARCH USERS
  // =====================================================

  const handleSearch = (e) => {
    e.preventDefault();

    setSearching(true);
    setError("");
    setOpenMenu(null);

    const name = searchForm.name.trim().toLowerCase();
    const email = searchForm.email.trim().toLowerCase();
    const number = searchForm.number.trim();

    setCustomers(
      DUMMY_USERS.filter(
        (u) =>
          (!name || u.fullName.toLowerCase().includes(name)) &&
          (!email || u.email.toLowerCase().includes(email)) &&
          (!number || (u.phoneNumber || "").includes(number))
      )
    );

    setSearching(false);
  };

  // =====================================================
  // RESET SEARCH
  // =====================================================

  const handleReset = () => {
    setSearchForm({
      name: "",
      email: "",
      number: "",
    });

    fetchUsers();
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setError("");

    setTimeout(() => {
      setCustomers((prev) =>
        prev.filter((customer) => customer._id !== id)
      );

      setTotalUsers((prev) => Math.max(prev - 1, 0));

      setDeletingId(null);
      setOpenMenu(null);
    }, 300);
  };

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = (name = "") => {
    const words = name.trim().split(" ").filter(Boolean);

    if (words.length === 0) {
      return "U";
    }

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <div className="relative min-h-screen flex-1 overflow-y-auto bg-[#EEF3F7]">

      {/* =====================================================
          TOP ACCENT
      ===================================================== */}

      <div className="sticky top-0 z-20 h-1 w-full bg-gradient-to-r from-[#AE4000] via-[#E0620F] to-[#AE4000]" />

      <div className="p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium">
              <span className="text-[#71869A]">
                Operations
              </span>

              <span className="text-[#AE4000]">
                /
              </span>

              <span className="font-semibold text-[#AE4000]">
                Customer List
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#AE4000] to-[#E0620F] text-white shadow-lg shadow-[#AE4000]/20">
                <FiUsers size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#102030] sm:text-3xl">
                  Customer List
                </h1>

                <p className="mt-0.5 text-sm text-[#71869A]">
                  Manage customer accounts and direct actions.
                </p>
              </div>
            </div>
          </div>

          
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* TOTAL */}

          <div className="group relative overflow-hidden rounded-3xl border border-[#DCE4EB] bg-white p-5 shadow-[0_8px_30px_rgba(16,32,48,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(16,32,48,0.10)]">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#AE4000]/5" />

            <div className="relative flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#102030] text-[#FFB27A] shadow-md">
                <FiUsers size={20} />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8192A2]">
                  Total Registered
                </p>

                <span className="text-2xl font-bold text-[#102030]">
                  {totalUsers}
                </span>

                <p className="mt-0.5 text-xs text-[#91A1AF]">
                  Registered customers
                </p>
              </div>
            </div>
          </div>

          {/* ACTIVE */}

          <div className="group relative overflow-hidden rounded-3xl border border-[#DCE4EB] bg-white p-5 shadow-[0_8px_30px_rgba(16,32,48,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(16,32,48,0.10)]">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E0620F]/5" />

            <div className="relative flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#AE4000] to-[#E0620F] text-white shadow-md shadow-[#AE4000]/20">
                <FiUser size={20} />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8192A2]">
                  Current Results
                </p>

                <span className="text-2xl font-bold text-[#102030]">
                  {customers.length}
                </span>

                <p className="mt-0.5 text-xs text-[#91A1AF]">
                  Customers displayed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SEARCH CARD
        ===================================================== */}

        <form
          onSubmit={handleSearch}
          className="mb-5 overflow-hidden rounded-3xl border border-[#DCE4EB] bg-white shadow-[0_8px_30px_rgba(16,32,48,0.06)]"
        >

          <div className="flex items-center gap-3 border-b border-[#E8EDF1] bg-[#F8FAFC] px-5 py-4">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#102030] text-[#FFB27A]">
              <FiSearch size={16} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#102030]">
                Search Customers
              </h2>

              <p className="text-xs text-[#8A9AAA]">
                Find customers using name, email or phone number
              </p>
            </div>
          </div>

          <div className="p-5">

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">

              {/* NAME */}

              <div className="group flex items-center gap-2.5 rounded-2xl border border-[#DCE4EB] bg-[#F9FBFC] px-3.5 py-3 transition-all duration-200 focus-within:border-[#AE4000] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#AE4000]/5">

                <FiUser
                  className="shrink-0 text-[#9AA9B6] group-focus-within:text-[#AE4000]"
                  size={17}
                />

                <input
                  type="text"
                  name="name"
                  value={searchForm.name}
                  onChange={handleChange}
                  placeholder="Search by Name"
                  className="w-full bg-transparent text-sm text-[#102030] outline-none placeholder:text-[#9AA9B6]"
                />
              </div>

              {/* EMAIL */}

              <div className="group flex items-center gap-2.5 rounded-2xl border border-[#DCE4EB] bg-[#F9FBFC] px-3.5 py-3 transition-all duration-200 focus-within:border-[#AE4000] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#AE4000]/5">

                <FiMail
                  className="shrink-0 text-[#9AA9B6] group-focus-within:text-[#AE4000]"
                  size={17}
                />

                <input
                  type="text"
                  name="email"
                  value={searchForm.email}
                  onChange={handleChange}
                  placeholder="Search by Email"
                  className="w-full bg-transparent text-sm text-[#102030] outline-none placeholder:text-[#9AA9B6]"
                />
              </div>

              {/* NUMBER */}

              <div className="group flex items-center gap-2.5 rounded-2xl border border-[#DCE4EB] bg-[#F9FBFC] px-3.5 py-3 transition-all duration-200 focus-within:border-[#AE4000] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#AE4000]/5">

                <FiPhone
                  className="shrink-0 text-[#9AA9B6] group-focus-within:text-[#AE4000]"
                  size={17}
                />

                <input
                  type="text"
                  name="number"
                  value={searchForm.number}
                  onChange={handleChange}
                  placeholder="Search by Number"
                  className="w-full bg-transparent text-sm text-[#102030] outline-none placeholder:text-[#9AA9B6]"
                />
              </div>

              {/* BUTTONS */}

              <div className="flex gap-2">

                <button
                  type="submit"
                  disabled={searching}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#AE4000] to-[#E0620F] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#AE4000]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiSearch size={15} />

                  {searching ? "Searching..." : "Search"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#DCE4EB] bg-white px-4 py-3 text-sm font-semibold text-[#536575] transition-all duration-200 hover:border-[#AE4000]/30 hover:bg-[#FFF7F2] hover:text-[#AE4000]"
                >
                  <FiRefreshCw size={14} />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* =====================================================
            USER TABLE
        ===================================================== */}

        <div className="overflow-hidden rounded-3xl border border-[#DCE4EB] bg-white shadow-[0_8px_30px_rgba(16,32,48,0.06)]">

          {/* TABLE HEADER */}

          <div className="flex flex-col gap-1 border-b border-[#E3E9EE] bg-gradient-to-r from-[#102030] to-[#16304A] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-sm font-bold text-white">
                Customer Accounts
              </h2>

              <p className="mt-0.5 text-xs text-[#AFC0CF]">
                Manage registered customer information
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-[#FFB27A]">
              {customers.length} Records
            </div>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="border-b border-[#E3E9EE] bg-[#F6F8FA]">

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    SL
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Full Name
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Email
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Number
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Country
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Role
                  </th>

                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-14 text-center text-sm text-[#718394]"
                    >
                      Loading users...
                    </td>
                  </tr>
                ) : customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-14 text-center"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F5F7] text-[#9AA9B6]">
                        <FiUsers size={20} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-[#102030]">
                        No users found
                      </p>

                      <p className="mt-1 text-xs text-[#8A9AAA]">
                        Try changing your search filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  customers.map((customer, i) => (
                    <tr
                      key={customer._id}
                      className="group border-b border-[#EDF1F4] transition-colors duration-200 last:border-0 hover:bg-[#FFF9F5]"
                    >

                      {/* SL */}

                      <td className="px-5 py-4">
                        <span className="text-xs font-semibold text-[#8A9AAA]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </td>

                      {/* NAME */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#102030] to-[#16304A] text-xs font-bold text-[#FFB27A] shadow-sm">
                            {getInitials(customer.fullName)}
                          </span>

                          <div>
                            <p className="text-sm font-semibold text-[#102030]">
                              {customer.fullName || "N/A"}
                            </p>

                            <p className="mt-0.5 text-[11px] text-[#91A1AF]">
                              Customer
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2 text-sm text-[#536575]">

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F3F6F8] text-[#7D8F9E]">
                            <FiMail size={13} />
                          </span>

                          <span>
                            {customer.email || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* NUMBER */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2 text-sm text-[#536575]">

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F3F6F8] text-[#7D8F9E]">
                            <FiPhone size={13} />
                          </span>

                          <span>
                            {customer.phoneNumber || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* COUNTRY */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFF3EA] text-[#AE4000]">
                            <FiMapPin size={13} />
                          </span>

                          <span className="text-sm font-medium text-[#536575]">
                            {customer.country || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* ROLE */}

                      <td className="px-5 py-4">

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#AE4000]/15 bg-[#FFF3EA] px-3 py-1.5 text-[11px] font-bold capitalize text-[#AE4000]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#E0620F]" />
                          {customer.role || "N/A"}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td className="relative px-5 py-4">

                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === customer._id
                                ? null
                                : customer._id
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[#7E8F9D] transition-all duration-200 hover:border-[#AE4000]/15 hover:bg-[#FFF3EA] hover:text-[#AE4000]"
                        >
                          <FiMoreVertical size={18} />
                        </button>

                        {openMenu === customer._id && (
                          <div className="absolute right-5 top-14 z-30 w-36 overflow-hidden rounded-2xl border border-[#DCE4EB] bg-white p-1.5 shadow-[0_15px_40px_rgba(16,32,48,0.18)]">

                            {/* VIEW */}

                            <button
                              type="button"
                              onClick={() => {
                                console.log(
                                  "View user:",
                                  customer._id
                                );

                                setOpenMenu(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-[#536575] transition-colors hover:bg-[#F4F7F9] hover:text-[#102030]"
                            >
                              <FiEye size={14} />
                              View
                            </button>

                            {/* DELETE */}

                            <button
                              type="button"
                              disabled={
                                deletingId === customer._id
                              }
                              onClick={() =>
                                handleDelete(customer._id)
                              }
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                            >
                              <FiTrash2 size={14} />

                              {deletingId === customer._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>

          {/* =====================================================
              FOOTER
          ===================================================== */}

          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#E8EDF1] bg-[#FAFBFC] px-5 py-3.5 sm:flex-row">

            <p className="text-xs font-medium text-[#8192A2]">
              Showing{" "}
              <span className="font-bold text-[#102030]">
                {customers.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-[#102030]">
                {totalUsers}
              </span>{" "}
              users
            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                disabled
                className="rounded-xl border border-[#DCE4EB] bg-white px-3.5 py-2 text-xs font-semibold text-[#A1AFBA] cursor-not-allowed"
              >
                Previous
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-[#AE4000] to-[#E0620F] text-xs font-bold text-white shadow-md shadow-[#AE4000]/20"
              >
                1
              </button>

              <button
                type="button"
                disabled
                className="rounded-xl border border-[#DCE4EB] bg-white px-3.5 py-2 text-xs font-semibold text-[#A1AFBA] cursor-not-allowed"
              >
                Next
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;