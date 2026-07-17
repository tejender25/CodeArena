import api from "./api";

export const applyJob = (jobId, data) =>
  api.post(`/applications/apply/${jobId}`, data);

export const getMyApplications = () =>
  api.get("/applications/my-applications");

export const getApplicants = (jobId) =>
  api.get(`/applications/job/${jobId}`);

export const updateStatus = (applicationId, status) =>
  api.patch(`/applications/status/${applicationId}`, {
    status,
  });