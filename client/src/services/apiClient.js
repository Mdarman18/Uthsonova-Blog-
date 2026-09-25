import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor — attach auth token if present ────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor — unwrap data or handle global errors ────────────────
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data ?? error),
);

export default apiClient;
