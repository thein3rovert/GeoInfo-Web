import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import useCountries from '../hooks/useCountries'; 

import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchBarEntry, setSearchBarEntry] = useState('');

  const {
    filteredCountries,
    selectedCountry,
    isLoading,
    error,
    filterCountries,
    selectCountry
  } = useCountries();

/*
=================
Function to handle search modal
=================
*/
  const handleSearch = (event) => {
    event.preventDefault();
    if (selectedCountry) {
      setIsModalOpen(true);
    }
  };
/*
=================
Function to handle modal options
=================
*/
  const handleChartSelect = (chartType) => {
    setIsModalOpen(false);
    if (chartType === 'Line Chart') {
      navigate(`/bar-chart?country=${encodeURIComponent(selectedCountry)}`);
    } else if (chartType === 'Compare Chart') {
      navigate('/compare-chart');
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to GeoInfo</h1>
        <p>A simple application for exploring geographic information</p>
        <button className="btn">Learn More</button>
      </div>

      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for country..."
            value={searchBarEntry}
            onChange={(e) => {
              setSearchBarEntry(e.target.value);
              filterCountries(e.target.value); 
            }}
          />
          <button type="submit">Search</button>
        </form>
        
        {searchBarEntry && (
          <ul className="dropdown-list">
            {filteredCountries.map(country => (
              <li 
                key={country.iso3}
                onClick={() => {
                  selectCountry(country.name);
                  setSearchBarEntry(country.name);
                }}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="country-flag"
                />
                {country.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select Chart Type"
        className="chart-modal"
        appElement={document.getElementById('root')}
      >
        <h2>Select Chart Type</h2>
        <div className="chart-options">
          <button onClick={() => handleChartSelect('Compare Chart')}>
            Compare country population
          </button>
          <button onClick={() => handleChartSelect('Line Chart')}>
            View Country and Population
          </button>
          <button onClick={() => setIsModalOpen(false)} className="close-button">
            Close
          </button>
        </div>
      </Modal>

      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>
            <p>View geographic information on a chart</p>
          </li>
          <li>
            <p>Utilize line charts and bar charts for clear and insightful data representation.</p>
          </li>
          <li>
            <p>Learn about different geographic locations, including population statistics and key information.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;