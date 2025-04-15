import axios from 'axios';

// const API_BASE_URL = 'https://welin-dashboard-backend-493mx.ondigitalocean.app/api';
const API_BASE_URL = 'http://localhost:5000/api';

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: () => {
    localStorage.removeItem('partnerToken');
  },

  getDashboardData: async () => {
    const token = localStorage.getItem('partnerToken');
    try {
      const response = await axios.get(
        `${API_BASE_URL}/auth/dashboard`,
        {
          headers: {
            'Authorization': token
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}; 