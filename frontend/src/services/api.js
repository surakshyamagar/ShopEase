import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  // enable cookies
  // Allow cookies to be sent with requests to my backend
  withCredentials: true,
  headers: {
     "Content-Type": "application/json",
  },
});

export default api;