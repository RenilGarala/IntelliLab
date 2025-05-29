import axios from "axios";

console.log(import.meta.env);

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api/v1"
      : "https://intellilab-backend.onrender.com/api/v1",
  withCredentials: true,
});
