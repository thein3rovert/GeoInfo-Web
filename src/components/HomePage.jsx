import React, { Component } from "react";
import '../styles/HomePage.css'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

    handleInputChange = (event) => {
      this.setState({ searchTerm: event.target.value});
    };

    handleSearch = (event) => {
      event.preventDefault();
      console.log( "Searching for:", this.state.searchTerm);
    };

  render() {
    return (
      <div>
        <div className="hero">
          <h1>Welcome to GeoInfo</h1>
          <p>A React application for exploring geographic information</p>
          <button className="btn">Learn More</button>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              placeholder="Search for country"
              value={this.state.searchTerm}
              onChange={this.handleInputChange}
            />
            <button type="submit">Search</button>
          </form>
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
}

export default HomePage;

// Todo: Review and commit the citypopulation and the simpleLineChart