import axios from 'axios';

// قم بتغيير هذا الرابط لرابط السيرفر الفعلي الخاص بك
const API_URL = 'http://localhost:8000/api'; 

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor لإضافة الـ Token تلقائياً لكل الطلبات
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;