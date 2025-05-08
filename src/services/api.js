import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust backend URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

export const loginUser = async (userData) => {
  return await api.post("/auth/login", userData);
};
export default api;
