import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import HomePage from './components/HomePage'; 
import BarChart from './charts/BarChart';
import CountrySearch from './charts/CountrySearch';
import PopulationComparisonChart from './charts/PopulationComparisonChart';
import UsePopulationComparison from './hooks/usePopulationData';




const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/line-chart" element={<BarChart />} />
        <Route path="/bar-chart" element={<CountrySearch />} />
        <Route path="/compare-chart" element={<UsePopulationComparison />} />
      
      </Routes>
    </Router>
   
    
  );
};

export default App;