const BASE_URL =
  import.meta.env.VITE_API_URL || "https://rayya-travels-backend.onrender.com/api";

// http://localhost:5000/api
// https://rayya-travels-backend.onrender.com/api

export const submitForm = async (endpoint, payload) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Request failed"
    );
  }

  return data;
};

export const uploadForm = async (
  endpoint,
  payload,
  files = {}
) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  Object.entries(files).forEach(([key, file]) => {
    formData.append(key, file);
  });

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Upload failed"
    );
  }

  return data;
};