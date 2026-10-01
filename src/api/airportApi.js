import api from "./axios";

// ===============================
// GET AIRPORTS
// ===============================
export const getAirports = async (params = {}) => {
  const response = await api.get("/airports", {
    params,
  });

  return response.data;
};

// ===============================
// GET SINGLE AIRPORT
// ===============================
export const getAirportById = async (id) => {
  const response = await api.get(`/airports/${id}`);

  return response.data;
};

// ===============================
// ADD AIRPORT
// ===============================
export const addAirport = async (data) => {
  const response = await api.post("/airports", data);

  return response.data;
};

// ===============================
// UPDATE AIRPORT
// ===============================
export const updateAirport = async (id, data) => {
  const response = await api.put(`/airports/${id}`, data);

  return response.data;
};

// ===============================
// DELETE AIRPORT
// ===============================
export const deleteAirport = async (id) => {
  const response = await api.delete(`/airports/${id}`);

  return response.data;
};

// ===============================
// UPDATE AIRPORT STATUS
// ===============================
export const updateAirportStatus = async (id, status) => {
  const response = await api.patch(`/airports/${id}/status`, {
    status,
  });

  return response.data;
};