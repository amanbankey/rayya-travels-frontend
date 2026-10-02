import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiUser,
  FiMail,
  FiPhone,
  FiSearch,
  FiMapPin,
  FiMoreVertical,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

import api from "../../api/axios";

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

  // =========================
  // GET ALL USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/users");

      const data = response.data;

      if (data?.success) {
        setCustomers(data?.users || []);
        setTotalUsers(data?.total || 0);
      } else {
        setCustomers([]);
        setTotalUsers(0);

        setError(data?.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users failed:", error);

      setCustomers([]);
      setTotalUsers(0);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET USER STATS
  // =========================
  const fetchUserStats = async () => {
    try {
      const response = await api.get("/users/stats");

      const data = response.data;

      if (data?.success) {
        setTotalUsers(data?.data?.stats?.totalRegistered || 0);
      }
    } catch (error) {
      console.error("Fetch user stats failed:", error);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    fetchUsers();
    //fetchUserStats();
  }, []);

  // =========================
  // SEARCH INPUT
  // =========================
  const handleChange = (e) => {
    setSearchForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // SEARCH USERS
  // =========================
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setSearching(true);
      setError("");
      setOpenMenu(null);

      const response = await api.post("/users/search", searchForm);

      const data = response.data;

      if (data?.success) {
        setCustomers(data?.users || []);
      } else {
        setCustomers([]);
        setError(data?.message || "Search failed");
      }
    } catch (error) {
      console.error("Search failed:", error);

      setCustomers([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Search failed"
      );
    } finally {
      setSearching(false);
    }
  };

  // =========================
  // RESET SEARCH
  // =========================
  const handleReset = async () => {
    setSearchForm({
      name: "",
      email: "",
      number: "",
    });

    await fetchUsers();
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await api.delete(`/users/${id}`);

      const data = response.data;

      if (data?.success) {
        setCustomers((prev) =>
          prev.filter((customer) => customer._id !== id)
        );

        setTotalUsers((prev) => Math.max(prev - 1, 0));

        setOpenMenu(null);
      } else {
        setError(data?.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete user failed:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete user"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // INITIALS
  // =========================
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
    <div className="p-4 sm:p-6 lg:pl-2">

      {/* ================= HEADER ================= */}
      <div className="mb-6">
        {/*<p className="text-sm text-navy-400 mb-3">
          Operations <span className="mx-2">/</span>
          <span className="text-ember-600 font-semibold">Customer List</span>
        </p>*/}
        <div className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-2xl bg-ember-500 text-white flex items-center justify-center flex-shrink-0">
            <FiUsers size={24} />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-navy-900 leading-tight">Customer List</h1>
            <p className="text-navy-400 mt-0.5">Manage client accounts and direct actions.</p>
          </div>
        </div>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl">
          {error}
        </div>
      )}

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-3xl border border-navy-100 p-4 flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-navy-900 text-white flex items-center justify-center flex-shrink-0"><FiUsers size={18} /></span>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-navy-500">TOTAL REGISTERED</p>
            <p className="text-2xl font-extrabold text-navy-900 leading-tight">{totalUsers}</p>
            <p className="text-xs text-navy-400">Registered customers</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-navy-100 p-4 flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-ember-500 text-white flex items-center justify-center flex-shrink-0"><FiUser size={18} /></span>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-navy-500">CURRENT RESULTS</p>
            <p className="text-2xl font-extrabold text-navy-900 leading-tight">{customers.length}</p>
            <p className="text-xs text-navy-400">Customers displayed</p>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <form onSubmit={handleSearch} className="bg-white rounded-3xl border border-navy-100 p-6 mb-5">
        <div className="flex items-center gap-4 pb-5 mb-5 border-b border-navy-50">
          <span className="w-11 h-11 rounded-xl bg-navy-900 text-white flex items-center justify-center"><FiSearch size={18} /></span>
          <div>
            <p className="font-bold text-navy-900">Search Customers</p>
            <p className="text-sm text-navy-400">Find customers using name, email or phone number</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          {[
            { name: "name", icon: FiUser, placeholder: "Search by Name" },
            { name: "email", icon: FiMail, placeholder: "Search by Email" },
            { name: "number", icon: FiPhone, placeholder: "Search by Number" },
          ].map(({ name, icon: Icon, placeholder }) => (
            <div key={name} className="flex-1 flex items-center gap-3 border border-navy-100 bg-[#EEF3F7]/60 rounded-full px-5 py-3 focus-within:border-ember-400 focus-within:bg-white">
              <Icon className="text-navy-400 flex-shrink-0" size={16} />
              <input
                type="text"
                name={name}
                value={searchForm[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-navy-700 placeholder:text-navy-300 focus:outline-none"
              />
            </div>
          ))}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={searching}
              className="bg-ember-500 hover:bg-ember-600 disabled:opacity-60 text-white text-sm font-bold px-7 py-3 rounded-full transition-colors"
            >
              {searching ? "Searching..." : "Search"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="border border-navy-100 text-navy-700 text-sm font-semibold px-6 py-3 rounded-full hover:bg-ember-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* ================= USER TABLE ================= */}
      <div className="bg-white rounded-3xl border border-navy-100 overflow-hidden">

        <div className="flex items-center justify-between gap-3 bg-navy-900 px-6 py-5">
          <div>
            <p className="font-bold text-white text-lg">Customer Accounts</p>
            <p className="text-sm text-navy-200">Manage registered customer information</p>
          </div>
          <span className="bg-white/10 text-ember-300 text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
            {customers.length} Records
          </span>
        </div>

        {/* click outside closes the action menu */}
        {openMenu && <div className="fixed inset-0 z-[5]" onClick={() => setOpenMenu(null)} />}

        <div className="overflow-x-auto min-h-[260px]">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="bg-[#EEF3F7]">
                {["SL", "FULL NAME", "EMAIL", "NUMBER", "COUNTRY", "ROLE", "ACTION"].map((h) => (
                  <th key={h} className={`text-[11px] font-bold tracking-widest text-navy-500 px-6 py-4 ${h === "ACTION" ? "text-right" : "text-left"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="px-6 py-12 text-center text-sm text-navy-500">Loading users...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-12 text-center text-sm text-navy-500">No users found.</td></tr>
              ) : (
                customers.map((customer, i) => {
                  const openUp = customers.length > 3 && i >= customers.length - 2;
                  return (
                    <tr key={customer._id} className="border-t border-navy-50 hover:bg-[#f7f9fb] transition-colors">

                      <td className="px-6 py-4 text-sm font-semibold text-navy-400">{String(i + 1).padStart(2, "0")}</td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-11 h-11 rounded-xl bg-navy-900 text-ember-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {getInitials(customer.fullName)}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-navy-900">{customer.fullName || "N/A"}</p>
                            <p className="text-xs text-navy-400">Customer</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5 text-sm text-navy-700">
                          <span className="w-8 h-8 rounded-lg bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0"><FiMail size={14} /></span>
                          {customer.email || "N/A"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5 text-sm text-navy-700">
                          <span className="w-8 h-8 rounded-lg bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0"><FiPhone size={14} /></span>
                          {customer.phoneNumber || "N/A"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5 text-sm text-navy-700">
                          <span className="w-8 h-8 rounded-lg bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0"><FiMapPin size={14} /></span>
                          {customer.country || "N/A"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 bg-ember-50 text-ember-700 text-xs font-bold px-3 py-1 rounded-full capitalize">
                          <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />
                          {customer.role || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4 relative text-right">
                        <button
                          type="button"
                          onClick={() => setOpenMenu(openMenu === customer._id ? null : customer._id)}
                          className="w-9 h-9 inline-flex items-center justify-center rounded-full text-navy-400 hover:bg-navy-50 hover:text-navy-700 transition-colors"
                        >
                          <FiMoreVertical size={18} />
                        </button>

                        {openMenu === customer._id && (
                          <div className={`absolute right-6 z-10 w-36 bg-white border border-navy-100 rounded-2xl p-1 text-left ${openUp ? "bottom-14" : "top-14"}`}>
                            <button
                              type="button"
                              onClick={() => {
                                console.log("View user:", customer._id);
                                setOpenMenu(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-navy-700 rounded-xl hover:bg-ember-50"
                            >
                              <FiEye size={13} /> View
                            </button>
                            <button
                              type="button"
                              disabled={deletingId === customer._id}
                              onClick={() => handleDelete(customer._id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 rounded-xl hover:bg-red-50 disabled:opacity-50"
                            >
                              <FiTrash2 size={13} />
                              {deletingId === customer._id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-navy-50">
          <p className="text-sm text-navy-500">Showing {customers.length} of {totalUsers} users</p>
          <div className="flex items-center gap-2">
            <button type="button" disabled className="border border-navy-100 text-navy-300 text-xs font-medium px-4 py-2 rounded-full cursor-not-allowed">Previous</button>
            <button type="button" className="w-8 h-8 text-xs font-semibold rounded-full bg-ember-500 text-white">1</button>
            <button type="button" disabled className="border border-navy-100 text-navy-300 text-xs font-medium px-4 py-2 rounded-full cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerList;