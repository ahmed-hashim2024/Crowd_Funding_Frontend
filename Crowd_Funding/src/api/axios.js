import axios from 'axios';

// في Vite بنوصل للمتغيرات عن طريق import.meta.env
// لو المتغير مش موجود (مثلاً نسيناه)، بنحط رابط احتياطي
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor لإضافة الـ Token تلقائياً (كما هو)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;