import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3000';

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60 * 1000,
});