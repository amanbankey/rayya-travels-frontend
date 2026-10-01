import api from "./axios";

// ========================================
// USER SIGNUP
// ========================================

export const signupUser = async (formData) => {
  const response = await api.post("/auth/signup", formData);

  return response.data;
};

// ========================================
// USER SIGNIN
// ========================================

export const signinUser = async (formData) => {
  const response = await api.post("/auth/signin", formData);

  return response.data;
};

// ========================================
// ADMIN SIGNUP
// ========================================

export const signupAdmin = async (formData) => {
  const response = await api.post(
    "/auth/admin/signup",
    formData
  );

  return response.data;
};

// ========================================
// ADMIN LOGIN
// ========================================

export const signinAdmin = async (formData) => {
  const response = await api.post(
    "/auth/admin/login",
    formData
  );

  return response.data;
};

// ========================================
// GET LOGGED IN USER
// ========================================

export const getMe = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

// ========================================
// AGENT SIGNUP
// ========================================

export const signupAgent = async (
  formData
) => {
  const response =
    await api.post(
      "/auth/agent/signup",
      formData
    );

  return response.data;
};

// ========================================
// AGENT SIGNIN
// ========================================

export const signinAgent = async (
  formData
) => {
  const response =
    await api.post(
      "/auth/agent/signin",
      formData
    );

  return response.data;
};