import React, { useState, useEffect } from "react";
import '../styles/HomePage.css'

const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/countries/flag");
        const data = await response.json();
        if(data.error === "false") {
          setCountries(data.data);
        } else {
          console.error("Error fetching countries:", data.msg);
        }
      } catch (error) {
        console.error("Error, unable to fetch countries data:", error);
      }
    };
    fetchCountries();
  },[]);


  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
};

    const handleSearch = (event) => {
      event.preventDefault();
      console.log("Searching for:", searchTerm);
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
                <li key={country.iso3}>
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