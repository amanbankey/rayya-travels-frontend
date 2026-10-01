
import api from './axios';

// User / Agent: Submit visa application
export const submitVisaApplication = async (formData) => {
  const { data } = await api.post(
    '/visa-applications/apply',
    formData
  );

  return data;
};

// User / Agent: Get own applications
export const getMyVisaApplications = async () => {
  const { data } = await api.get(
    '/visa-applications/my-applications'
  );

  return data;
};

// Admin: Get all visa applications
export const getAdminVisaApplications = async () => {
  const { data } = await api.get(
    '/admin/visa-applications'
  );

  return data;
};

// Admin: Update application status / note
export const updateAdminVisaApplication = async (
  id,
  update
) => {
  const { data } = await api.patch(
    `/admin/visa-applications/${id}`,
    update
  );

  return data;
};