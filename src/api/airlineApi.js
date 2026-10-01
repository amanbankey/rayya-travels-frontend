import api from "./axios";

// =====================================================
// GET AIRLINES
// =====================================================

export const getAirlines = async (params = {}) => {
  const response = await api.get("/airlines", {
    params,
  });

  return response.data;
};

// =====================================================
// GET SINGLE AIRLINE
// =====================================================

export const getAirlineById = async (id) => {
  const response = await api.get(`/airlines/${id}`);

  return response.data;
};

// =====================================================
// ADD AIRLINE
// =====================================================

export const addAirline = async (data) => {
  const response = await api.post("/airlines", data);

  return response.data;
};

// =====================================================
// UPDATE AIRLINE
// =====================================================

export const updateAirline = async (id, data) => {
  const response = await api.put(`/airlines/${id}`, data);

  return response.data;
};

// =====================================================
// DELETE AIRLINE
// =====================================================

export const deleteAirline = async (id) => {
  const response = await api.delete(`/airlines/${id}`);

  return response.data;
};

// =====================================================
// UPDATE AIRLINE STATUS
// =====================================================

export const updateAirlineStatus = async (id, status) => {
  const response = await api.patch(
    `/airlines/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

// =====================================================
// GET AIRLINE PRICE LIST
// =====================================================

export const getAirlinePrices = async (params = {}) => {
  const response = await api.get("/airlines/prices/list", {
    params,
  });

  return response.data;
};

// =====================================================
// GET AIRLINE PRICE
// =====================================================

export const getAirlinePrice = async (params = {}) => {
  const response = await api.get("/airlines/prices", {
    params,
  });

  return response.data;
};

// =====================================================
// CREATE / UPDATE AIRLINE PRICE
// =====================================================

export const createOrUpdateAirlinePrice = async (data) => {
  const response = await api.post(
    "/airlines/prices",
    data
  );

  return response.data;
};
export const getActiveOtbPrices = async () => {
  const response = await api.get(
    "/airlines/prices/active"
  );

  return response.data;
};