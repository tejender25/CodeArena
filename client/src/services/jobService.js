import api from "./api";

export const createJob = (data) =>
  api.post("/jobs/create", data);

export const getJobs = (page = 1, keyword = "") =>
  api.get(`/jobs?page=${page}&keyword=${keyword}`);

export const getJobById = (id) =>
  api.get(`/jobs/${id}`);

export const getMyJobs = () =>
    api.get("/jobs/my-jobs");

export const updateJob = (id, data) =>
  api.put(`/jobs/${id}`, data);

export const deleteJob = (id) =>
  api.delete(`/jobs/${id}`);