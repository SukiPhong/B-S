import axios, { endpoints } from "./axios";

// Lấy thống kê doanh thu theo tháng hoặc năm
export const apiGetRevenue = (params) => {
  return axios({
    method: "get",
    url: endpoints.analytics.getRevenue,
    params: {
      type: params?.type || "month", // 'month' hoặc 'year'
      date: params?.date || new Date(),
    },
  });
};

// Lấy thống kê tổng quan cho dashboard
export const apiGetDashboardStats = () => {
  return axios({
    method: "get",
    url: endpoints.analytics.getDashboard,
  });
};
