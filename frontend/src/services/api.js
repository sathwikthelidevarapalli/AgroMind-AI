// Axios instance and API helpers
// Centralizes base URL and timeouts for production readiness.
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
  timeout: 12000,
});

export const predictCrop = async (payload) => {
  const { data } = await api.post("/predict", payload);
  return data;
};

export const fetchWeather = async (location) => {
  // Optional helper; backend may expose /weather. If unavailable, caller should handle errors.
  const { data } = await api.get("/weather", { params: { location } });
  return data;
};

export default api;
