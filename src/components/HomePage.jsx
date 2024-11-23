import React, { useState, useEffect } from "react";
import '../styles/HomePage.css'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/countries/flag");
        const data = await response.json();
        if (data.error === "false") {
          setCountries(data.data);
        } else {
          console.error("Error fetching countries:", data.msg);
        }
      } catch (error) {
        console.error("Error, unable to fetch countries data:", error);
      }
    };
    fetchCountries();
  }, []);


  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelection = (selectedCountryName) => {
    setSearchTerm(selectedCountryName);
    setFilteredCountries([]);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setIsModalOpen(true); // Open the modal on form submission
    console.log("Searching for:", searchTerm);
  };

  const handleChartSelect = (chartType) => {
    // setSelectedChart(chartType);
    setIsModalOpen(false); 
    if(chartType === 'Line Chart') {
      navigate('/line-chart'); 
    } else if (chartType === 'Bar Chart'){
      navigate('/bar-chart')
    }
    console.log("Selected chart type:", chartType);
  };

  return (
    <div>
      <div className="hero">
        <h1>Welcome to GeoInfo</h1>
        <p>A React application for exploring geographic information</p>
        <button className="btn">Learn More</button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for country..."
            value={searchTerm}
            onChange={handleInputChange}
          />

          <button type="submit">Search</button>
        </form>
        {searchTerm && (
          <ul className="dropdown-list">
            {filteredCountries.map(country => (
              <li key={country.iso3}
                onClick={() => handleCountrySelection(country.name)}>
                <img
                  src={country.flag}
                  alt={country.name}
                  style={{ width: '20px', marginRight: '10px' }}
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
        appElement={document.getElementById('root')} // Pass the root element directly
      >

        <h2>Select Chart Type</h2>
        <button onClick={() => handleChartSelect('Bar Chart')}>View Country and Capital</button>
        <button onClick={() => handleChartSelect('Line Chart')}>View Country and Population</button>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>

      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>View geographic information on a map</li>
          <li>Utilize line charts and bar charts for clear and insightful data representation.</li>
          <li>Learn about different geographic locations, including population statistics and key information.</li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;

// Todo: Review and commit the citypopulation and the simpleLineChart