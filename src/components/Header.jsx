import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
const Header = () => {
  return (
    <header className="header">
      <div className="logo">GeoInfo</div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/line-chart">Bar Chart</Link></li>
          <li><Link to="/bar-chart">Line Chart</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;