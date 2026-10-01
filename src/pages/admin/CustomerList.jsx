import { FiUsers as PageIcon, FiSearch } from "react-icons/fi";
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
    <div className="flex-1 min-w-0 min-h-screen bg-[#EEF3F7] p-4 sm:p-6 lg:p-8 overflow-y-auto">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          {/*<p className="text-xs text-navy-500 mb-1">
            Operations{" "}
            <span className="mx-1">›</span>

            <span className="text-ember-600 font-medium">
              Customer List
            </span>
          </p>*/}

          <div className="flex items-center gap-4"><span className="w-14 h-14 rounded-2xl bg-ember-500 text-white flex items-center justify-center shadow-lg shadow-ember-500/30 flex-shrink-0"><PageIcon size={24} /></span><div><h1 className="text-3xl font-extrabold text-navy-900 leading-tight">Customer List</h1><p className="text-navy-400 mt-0.5">Manage client accounts and direct actions.</p></div></div>
        </div>

        {/*<button
          type="button"
          className="flex items-center gap-2 bg-navy-900 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl h-fit"
        >
          <FiPlus size={16} />

          Add New Customer
        </button>*/}
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl">
          {error}
        </div>
      )}

      {/* ================= STAT CARD ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="relative overflow-hidden bg-white rounded-3xl border border-navy-100 shadow-card p-4">
          <div className="relative flex items-center gap-4">
            <span className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 bg-navy-900"><FiUsers size={18} /></span>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-navy-500">TOTAL REGISTERED</p>
              <p className="text-2xl font-extrabold text-navy-900 leading-tight">{totalUsers}</p>
              <p className="text-xs text-navy-400">Registered customers</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white rounded-3xl border border-navy-100 shadow-card p-4">
          <div className="relative flex items-center gap-4">
            <span className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 bg-ember-500"><FiUser size={18} /></span>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-navy-500">CURRENT RESULTS</p>
              <p className="text-2xl font-extrabold text-navy-900 leading-tight">{customers.length}</p>
              <p className="text-xs text-navy-400">Customers displayed</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-3xl border border-navy-100 p-6 mb-5 shadow-card"
      >
        <div className="flex items-center gap-4 pb-5 mb-5 border-b border-navy-50"><span className="w-11 h-11 rounded-xl bg-navy-900 text-white flex items-center justify-center"><FiSearch size={18} /></span><div><p className="font-bold text-navy-900">Search Customers</p><p className="text-sm text-navy-400">Find customers using name, email or phone number</p></div></div>
        <div className="flex flex-col lg:flex-row gap-3">

          {/* NAME */}
          <div className="flex-1 flex items-center gap-2 border border-navy-100 bg-[#EEF3F7]/60 rounded-full px-5 py-3.5">

            <FiUser
              className="text-navy-400 flex-shrink-0"
              size={16}
            />

            <input
              type="text"
              name="name"
              value={searchForm.name}
              onChange={handleChange}
              placeholder="Search by Name"
              className="w-full bg-transparent text-sm text-navy-700 focus:outline-none"
            />
          </div>

          {/* EMAIL */}
          <div className="flex-1 flex items-center gap-2 border border-navy-100 bg-[#EEF3F7]/60 rounded-full px-5 py-3.5">

            <FiMail className="text-navy-400 flex-shrink-0" size={16} />

            <input
              type="text"
              name="email"
              value={searchForm.email}
              onChange={handleChange}
              placeholder="Search by Email"
              className="w-full bg-transparent text-sm text-navy-700 focus:outline-none"
            />
          </div>

          {/* NUMBER */}
          <div className="flex-1 flex items-center gap-2 border border-navy-100 bg-[#EEF3F7]/60 rounded-full px-5 py-3.5">

            <FiPhone className="text-navy-400 flex-shrink-0" size={16} />

            <input
              type="text"
              name="number"
              value={searchForm.number}
              onChange={handleChange}
              placeholder="Search by Number"
              className="w-full bg-transparent text-sm text-navy-700 focus:outline-none"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2">

            <button
              type="submit"
              disabled={searching}
              className="bg-ember-500 shadow-lg shadow-ember-500/30 hover:bg-ember-600 disabled:opacity-60 text-white text-sm font-bold px-7 py-3.5 rounded-full"
            >
              {searching ? "Searching..." : "Search"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="border border-navy-100 text-navy-700 text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-ember-50"
            >
              Reset
            </button>

          </div>
        </div>
      </form>

      {/* ================= USER TABLE ================= */}
      <div className="bg-white rounded-3xl border border-navy-100 overflow-hidden shadow-card">

        <div className="flex items-center justify-between gap-3 bg-navy-900 px-6 py-5">
          <div>
            <p className="font-bold text-white text-lg">Customer Accounts</p>
            <p className="text-sm text-navy-200">Manage registered customer information</p>
          </div>
          <span className="bg-white/10 border border-white/10 text-ember-300 text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">{customers.length} Records</span>
        </div>
        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-navy-900 text-navy-100">
              <tr className=" border-b border-navy-100">

                <th className="text-left text-[11px] font-bold tracking-widest text-navy-100 px-4 py-3">
                  SL
                </th>

                <th className="text-left text-[11px] font-bold tracking-widest text-navy-100 px-4 py-3">
                  FULL NAME
                </th>

                <th className="text-left text-[11px] font-bold tracking-widest text-navy-100 px-4 py-3">
                  EMAIL
                </th>

                <th className="text-left text-[11px] font-bold tracking-widest text-navy-100 px-4 py-3">
                  NUMBER
                </th>

                <th className="text-left text-[11px] font-bold tracking-widest text-navy-100 px-4 py-3">
                  COUNTRY
                </th>

                <th className="text-left text-[11px] font-bold tracking-widest text-navy-100 px-4 py-3">
                  ROLE
                </th>

                <th className="text-left text-[11px] font-bold tracking-widest text-navy-100 px-4 py-3">
                  ACTION
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-10 text-center text-sm text-navy-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-10 text-center text-sm text-navy-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                customers.map((customer, i) => (

                  <tr
                    key={customer._id}
                    className="border-b border-navy-50 last:border-0"
                  >

                    {/* SL */}
                    <td className="px-4 py-4 text-sm text-navy-600">
                      {i + 1}
                    </td>

                    {/* FULL NAME */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3">

                        <span className="w-11 h-11 rounded-xl bg-navy-900 text-ember-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {getInitials(customer.fullName)}
                        </span>

                        <p className="text-sm font-semibold text-navy-900">
                          {customer.fullName || "N/A"}
                        </p>

                      </div>

                    </td>

                    {/* EMAIL */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2 text-sm text-navy-600">

                        <span className="w-8 h-8 rounded-lg bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0"><FiMail size={14} /></span>

                        <span>
                          {customer.email || "N/A"}
                        </span>

                      </div>

                    </td>

                    {/* NUMBER */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2 text-sm text-navy-600">

                        <span className="w-8 h-8 rounded-lg bg-ember-50 text-ember-600 flex items-center justify-center flex-shrink-0"><FiPhone size={14} /></span>

                        <span>
                          {customer.phoneNumber || "N/A"}
                        </span>

                      </div>

                    </td>

                    {/* COUNTRY */}
                    <td className="px-4 py-4">

                      <span className="text-sm text-navy-700">
                        {customer.country || "N/A"}
                      </span>

                    </td>

                    {/* ROLE */}
                    <td className="px-4 py-4">

                      <span className="bg-ember-50 text-ember-600 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                        {customer.role || "N/A"}
                      </span>

                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-4 relative">

                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === customer._id
                              ? null
                              : customer._id
                          )
                        }
                        className="text-navy-400 hover:text-navy-700"
                      >
                        <FiMoreVertical size={18} />
                      </button>

                      {openMenu === customer._id && (

                        <div className="absolute right-4 top-10 z-10 w-32 bg-white border border-navy-100 rounded-xl shadow-lg py-1">

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
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-navy-700 hover:bg-ember-50"
                          >
                            <FiEye size={13} />
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
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            <FiTrash2 size={13} />

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

        {/* ================= FOOTER ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-navy-50">

          <p className="text-sm text-navy-500">
            Showing {customers.length} of {totalUsers} users
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled
              className="border border-navy-100 text-navy-400 text-xs font-medium px-3 py-1.5 rounded-xl cursor-not-allowed"
            >
              Previous
            </button>

            <button
              type="button"
              className="w-8 h-8 text-xs font-semibold rounded-xl bg-navy-900 text-white"
            >
              1
            </button>

            <button
              type="button"
              disabled
              className="border border-navy-100 text-navy-400 text-xs font-medium px-3 py-1.5 rounded-xl cursor-not-allowed"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CustomerList;