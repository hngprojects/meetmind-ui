import api from "@/lib/api";

export const fetchInterviewOverview = async () => {
  const response = await api.get(`/api/v1/dashboard/overview`);
  return response.data;
};

export const fetchInterviewSessions = async () => {
  const response = await api.get(`/api/v1/dashboard/sessions`);
  return response.data;
};

export const fetchSchedule = async () => {
  const response = await api.get(`/api/v1/dashboard/schedule`);
  return response.data;
};
export const fetchCompleted = async () => {
  const response = await api.get("/api/v1/dashboard/completed");
  return response.data;
};
export const fetchInterviews = async () => {
  const response = await api.get(`/api/v1/interviews?page=1&page_size=20`);
  return response.data;
};
