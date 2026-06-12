import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-api-6otg.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.authorization = token;
  }

  return config;
});

export default api;
