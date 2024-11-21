import React, { Component } from "react";
import './HomePage.css'

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="hero">
          <h1>Welcome to GeoInfo</h1>
          <p>A React application for exploring geographic information</p>
          <button className="btn">Learn More</button>
        </div>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>View geographic information on a map</li>
            <li>Explore line charts and bar charts for data visualization</li>
            <li>Learn more about different geographic locations</li>
          </ul>
        </section>
      </div>
    );
  }
}

export default HomePage;