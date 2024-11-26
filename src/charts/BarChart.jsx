import React, { useState, useEffect } from 'react';
import countryService from '../services/countryAPI';
import '../styles/PopulationTrend.css';


const BarChart = () => {
    /*
    ================
    Create States
    ================
    */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
/*
=================
Function to cosume data from fetchPopulationData
=================
*/
        const fetchData = async () => {
            const fetchPopulationDataResult = await countryService.fetchPopulationData();
            if (fetchPopulationDataResult.success) {
                setData(fetchPopulationDataResult.data);
            } else {
                setError(fetchPopulationDataResult.error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

/*
==================
Populate chart data with fetch data
==================
*/
    const chartData = [];
    data.forEach(cityData => {
        cityData.populationCounts.forEach(popCount => {
            chartData.push({
                year: popCount.year,
                city: cityData.city,
                population: parseFloat(popCount.value)
            });
        });
    });

    return (
        <div>
            <h2>Select Cities to Compare</h2>
            <button onClick={() => handleCitySelection("City A")}>City A</button>
            <button onClick={() => handleCitySelection("City B")}>City B</button>
        </div>

    );

};

export default BarChart;