import axios from "axios";

const BASE_URL =
  import.meta.env.mode === "development"
    ? "http://localhost:5001/api"
    : `${import.meta.env.VITE_API_URL}/api`;

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5001/api",
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
  // baseURL: "https://rayg-app-backend-production.up.railway.app/api",
  baseURL: BASE_URL,
  withCredentials: true,
});
