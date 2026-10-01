// src/api/visaApi.js

import api from "./axios";


// ======================================================
// GET VISAS
// ======================================================

export const getVisas = async (params = {}) => {
  const response = await api.get("/visas", {
    params,
  });

  return response.data;
};


// ======================================================
// GET VISA BY ID
// ======================================================

export const getVisaById = async (id) => {
  const response = await api.get(`/visas/${id}`);

  return response.data;
};


// ======================================================
// ADD VISA
// ======================================================

export const addVisa = async (data) => {
  const response = await api.post("/visas", data);

  return response.data;
};


// ======================================================
// UPDATE VISA
// ======================================================

export const updateVisa = async (id, data) => {
  const response = await api.put(
    `/visas/${id}`,
    data
  );

  return response.data;
};


// ======================================================
// DELETE VISA
// ======================================================

export const deleteVisa = async (id) => {
  const response = await api.delete(
    `/visas/${id}`
  );

  return response.data;
};


// ======================================================
// UPDATE STATUS
// ======================================================

export const updateVisaStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `/visas/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};