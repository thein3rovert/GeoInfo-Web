import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header'; 
import HomePage from './components/HomePage'; 
import CityPopulation from './components/CityPopulation';

// import GeoInfo from './GeoInfo'; 
// import BarChart from './BarChart'; 

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/line-chart" component={CityPopulation} />
        {/* <Route path="/geoinfo" component={GeoInfo} />
        
        <Route path="/bar-chart" component={BarChart} /> */}
      </Switch>
    </Router>
  );
};

export default App;