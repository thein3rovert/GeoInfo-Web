// src/services/countryAPI.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

/*
======================
Create axios instance
======================
*/
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.msg || 'Server error occurred ';
    return Promise.reject(new Error(errorMessage));
  }
);


const countryService = {

/*
================
Function to fetch the country flag 
================
*/
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

  /*
================
Function to fetch population data
================
*/
  async fetchPopulationData() {
    try {
      const populationResponse = await apiClient.get('/countries/population/cities'); 
      if (populationResponse.error === "false") {
        return { success: true, data: populationResponse.data };
      } else {
        return { success: false, error: populationResponse.msg };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || "Unable fetch to population data"
      };
    }
  },
  /*
================
Function to fetch by country name
================
*/
  async fetchPopulationDataByCountry(countryName) {
    try {
      const populationByCountryResponse = await apiClient.get('/countries/population/cities');
      if (populationByCountryResponse.error === false) {
        
        /*
        =====
        Filter data for selected country
        =====
        */
        const filteredData = respopopulationByCountryResponsense.data.filter(city => city.country === countryName);
        return { success: true, data: filteredData };
      } else {
        return { success: false, error: populationByCountryResponse.msg };
      }
    } catch (error) {
      return { success: false, error: error.message || "Failed to fetch population data" };
    }
  }
};


export default countryService;