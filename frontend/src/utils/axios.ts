
import axios from 'axios';

// Create custom axios instance with default config
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const adminAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ADMIN_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})
