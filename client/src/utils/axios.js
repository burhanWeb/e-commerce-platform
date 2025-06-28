import axios from "axios";
import

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default customFetch;
