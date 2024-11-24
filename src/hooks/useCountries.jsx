// src/hooks/useCountries.js

import { useState, useEffect } from 'react';
import countryService from '../services/countryAPI';

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchBarEntry, setSearchBarEntry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch countries data
  useEffect(() => {
    const fetchCountriesData = async () => {
      setIsLoading(true);
      setError(null);
      
      const result = await countryService.fetchCountries();
      
      if (result.success) {
        setCountries(result.data);
      } else {
        setError(result.error);
      }
      
      setIsLoading(false);
    };

    fetchCountriesData();
  }, []);

  const filterCountries = (searchValue) => {
    setSearchBarEntry(searchValue);
    
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const selectCountry = (countryName) => {
    setSearchBarEntry(countryName);
    setFilteredCountries([]);
    setSelectedCountry(countryName);
  };

  return {
    countries,
    filteredCountries,
    searchBarEntry,
    selectedCountry,
    isLoading,
    error,
    filterCountries,
    selectCountry
  };
};

// Change to default export
export default useCountries;