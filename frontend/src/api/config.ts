export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const endpoints = {
  chat: `${API_BASE_URL}/api/chat`,
  dashboard: `${API_BASE_URL}/api/dashboard`,
  crowd: `${API_BASE_URL}/api/crowd`,
  emergency: `${API_BASE_URL}/api/emergency`,
  match: `${API_BASE_URL}/api/match`,
  weather: `${API_BASE_URL}/api/weather`,
  report: `${API_BASE_URL}/api/report`,
};
