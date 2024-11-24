// src/services/countryAPI.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.msg || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// Define the countryService object
const countryService = {
  async fetchCountries() {
    try {
      const response = await apiClient.get('/countries/flag');
      
      if (response.error === "false") {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.msg };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || "Failed to fetch countries data"
      };
    }
  },

  // Example of how to add more API methods
  // async getCountryDetails(countryId) {
  //   try {
  //     const response = await apiClient.get(`/countries/${countryId}`);
  //     return { success: true, data: response.data };
  //   } catch (error) {
  //     return { 
  //       success: false, 
  //       error: error.message || "Failed to fetch country details"
  //     };
  //   }
  // },

  // async searchCountries(searchTerm) {
  //   try {
  //     const response = await apiClient.get('/countries/search', {
  //       params: { q: searchTerm }
  //     });
  //     return { success: true, data: response.data };
  //   } catch (error) {
  //     return { 
  //       success: false, 
  //       error: error.message || "Failed to search countries"
  //     };
  //   }
  // }
};

// Change to default export
export default countryService;