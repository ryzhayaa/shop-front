import axios from "axios";
import { store } from "../app/store"; // Импорт стора

// 1. Создаем экземпляр API
export const API = axios.create({
  baseURL: "http://your-backend-url/api/v1",
  withCredentials: true,
});

// 2. Добавляем интерцептор
API.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Экспортируем готовый API-клиент