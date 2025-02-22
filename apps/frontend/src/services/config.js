import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const instance = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
  timeout: 60 * 1000,
});