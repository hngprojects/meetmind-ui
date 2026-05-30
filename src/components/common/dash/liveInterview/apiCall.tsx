import api from "@/lib/api";

export const fetchDashboardOverview = async () => {
  const response = await api.get("/api/v1/dashboard/overview");
  return response.data;
};
