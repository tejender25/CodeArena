import api from "./api";

export const applyJob = (jobId) =>
  api.post(`/applications/apply/${jobId}`);

export const getMyApplications = () =>
  api.get("/applications/my-applications");

export const getApplicants = (jobId) =>
  api.get(`/applications/job/${jobId}`);

export const updateStatus = (applicationId, status) =>
  api.put(`/applications/${applicationId}`, {
    status,
  });