import axios from 'axios';

// const API_BASE_URL = 'https://welin-dashboard-backend-493mx.ondigitalocean.app/api';
const API_BASE_URL = 'http://localhost:5000';


export const partnerAPI = {
  submitPartnerForm: async (formData) => {
    const token = localStorage.getItem('partnerToken');
    try {
      const response = await axios.post(
        `${API_BASE_URL}/members`,
        formData,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getPartnerData: async () => {
    const token = localStorage.getItem('partnerToken');
    try {
      const response = await axios.get(
        `${API_BASE_URL}/partner/data`,
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