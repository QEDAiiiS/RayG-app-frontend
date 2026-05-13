import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5001/api",
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
  baseURL: "https://rayg-app-backend-production.up.railway.app/api",
  withCredentials: true,
});
