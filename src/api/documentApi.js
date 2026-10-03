import api from "./axios";

export const extractPassportData = async (file) => {
  const formData = new FormData();

  formData.append("document", file);

  const response = await api.post(
    "/documents/extract-passport",
    formData
  );

  return response.data;
};

export const extractPanData = async (file) => {
  const formData = new FormData();

  formData.append("document", file);

  const response = await api.post(
    "/documents/extract-pan",
    formData
  );

  return response.data;
};