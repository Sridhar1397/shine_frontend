import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/public`
});

export const enquiryApi = axios.create({
  baseURL: `${API_BASE_URL}/api`
});

export const fileUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
};

export const trackVisit = (path: string) => {
  api.post('/track-visit', { path }).catch(() => {});
};

export default api;
