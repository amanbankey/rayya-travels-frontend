import api from "./axios";

// ===============================
// GET COUNTRIES
// ===============================
export const getCountries = async (params = {}) => {
  const response = await api.get("/countries", {
    params,
  });

  return response.data;
};

// ===============================
// GET SINGLE COUNTRY
// ===============================
export const getCountryById = async (id) => {
  const response = await api.get(`/countries/${id}`);

  return response.data;
};

// ===============================
// ADD COUNTRY
// ===============================
export const addCountry = async (data) => {
  const response = await api.post("/countries", data);

  return response.data;
};

// ===============================
// UPDATE COUNTRY
// ===============================
export const updateCountry = async (id, data) => {
  const response = await api.put(`/countries/${id}`, data);

  return response.data;
};

// ===============================
// DELETE COUNTRY
// ===============================
export const deleteCountry = async (id) => {
  const response = await api.delete(`/countries/${id}`);

  return response.data;
};

// ===============================
// UPDATE COUNTRY STATUS
// ===============================
export const updateCountryStatus = async (id, status) => {
  const response = await api.patch(`/countries/${id}/status`, {
    status,
  });

  return response.data;
};