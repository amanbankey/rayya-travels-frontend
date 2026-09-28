const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const submitForm = async (endpoint, payload) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Request failed");
  return response.json();
};

export const uploadForm = async (endpoint, payload, files = {}) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => formData.append(key, value));
  Object.entries(files).forEach(([key, file]) => formData.append(key, file));

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Upload failed");
  return response.json();
};