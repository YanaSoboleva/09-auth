import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const api = axios.create({
  baseURL, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken'); // Назва з вашого middleware
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Це "ключ", який відкриє нотатки
  }
  return config;
});
