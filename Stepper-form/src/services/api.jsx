// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Assuming json-server runs locally on port 3000

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createUser = (userData) => {
  return api.post('/users', userData);
};

export default api;
