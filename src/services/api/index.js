import axios from 'axios';
import { API_BASE_URL } from '../../config/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const nutritionAPI = {
  searchFood: async (query) => {
    try {
      const response = await api.get(`/nutrition/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getFoodDetails: async (foodId) => {
    try {
      const response = await api.get(`/nutrition/food/${foodId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const workoutAPI = {
  getWorkouts: async () => {
    try {
      const response = await api.get('/workouts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const userAPI = {
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/user/profile', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
