import axios from "axios";

export const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api/v1"
      : "https://api.realtalk.theharsh.xyz/api/v1",
  withCredentials: true,
});
