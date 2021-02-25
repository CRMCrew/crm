import axios from 'axios';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const token = cookie.get('token');

const baseURL = process.env.REACT_APP_BACKEND_URL;

let headers = {};

headers.Authorization = `Bearer ${cookie.get('token')}`;
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (1 === 1) {
      const token = cookie.get('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
