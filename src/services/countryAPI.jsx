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
  // New method to fetch population data
  async fetchPopulationData() {
    try {
      const response = await apiClient.get('/countries/population/cities'); // Adjust the endpoint as necessary
      if (response.error === "false") {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.msg };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || "Failed to fetch population data"
      };
    }
  },

  async fetchPopulationDataByCountry(countryName) {
    try {
      const response = await apiClient.get('/countries/population/cities');
      if (response.error === false) {
        // Filter the data for the selected country
        const filteredData = response.data.filter(city => city.country === countryName);
        return { success: true, data: filteredData };
      } else {
        return { success: false, error: response.msg };
      }
    } catch (error) {
      return { success: false, error: error.message || "Failed to fetch population data" };
    }
  }
};



// Change to default export
export default countryService;