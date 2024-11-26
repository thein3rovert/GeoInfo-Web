import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/elanco.jpg'; 
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
      <img src={logo} alt="GeoInfo Elanco" />
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;