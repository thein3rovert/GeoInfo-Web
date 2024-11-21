import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">GeoInfo</div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/geoinfo">GeoInfo</Link></li>
          <li><Link to="/line-chart">Line Chart</Link></li>
          <li><Link to="/bar-chart">Bar Chart</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;