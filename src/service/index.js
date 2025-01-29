import axios from "axios";

// Base URL ni o'rnatish
axios.defaults.baseURL = "http://localhost:4000";

// Interceptorni sozlash
axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});
