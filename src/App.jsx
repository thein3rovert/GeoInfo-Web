import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header'; // Adjust the path as necessary
import HomePage from './components/HomePage'; // Adjust the path as necessary
// import GeoInfo from './GeoInfo'; // Assume you have a GeoInfo component
// import LineChart from './LineChart'; // Assume you have a LineChart component
// import BarChart from './BarChart'; // Assume you have a BarChart component

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* <Route path="/geoinfo" component={GeoInfo} />
        <Route path="/line-chart" component={LineChart} />
        <Route path="/bar-chart" component={BarChart} /> */}
      </Switch>
    </Router>
  );
};

export default App;