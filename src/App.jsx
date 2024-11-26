import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import HomePage from './components/HomePage'; 
import BarChart from './charts/BarChart';
import CountrySearch from './charts/CountrySearch';



const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/line-chart" element={<BarChart />} />
        <Route path="/bar-chart" element={<CountrySearch />} />
      
      </Routes>
      {/* <Footer/> */}
    </Router>
   
    
  );
};

export default App;