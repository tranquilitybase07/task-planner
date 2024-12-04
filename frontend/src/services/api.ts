import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to include the token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses to check for token expiration
API.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  (error) => {
    if (error.response?.status === 401) {
      // If the token is expired or invalid
      localStorage.removeItem("token"); // Remove the token
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error); // Reject the error
  }
);

export default API;
