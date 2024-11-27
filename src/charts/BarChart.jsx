import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import countryService from '../services/countryAPI';
import '../styles/PopulationTrend.css';

const BarChartComponent = () => {
    /*
    ================
    Create States
    ================
    */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCities, setSelectedCities] = useState([]);

    useEffect(() => {
        /*
        =================
        Function to consume data from fetchPopulationData
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
    Populate chart data with fetched data
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

    // Function to handle city selection
    const handleCitySelection = (city) => {
        if (selectedCities.includes(city)) {
            setSelectedCities(selectedCities.filter(c => c !== city));
        } else {
            setSelectedCities([...selectedCities, city]);
        }
    };

    // Filter chart data based on selected cities
    const filteredChartData = chartData.filter(item => selectedCities.includes(item.city));

    return (
        <div>
            <h2>Select Cities to Compare</h2>
            <button onClick={() => handleCitySelection("City A")}>City A</button>
            <button onClick={() => handleCitySelection("City B")}>City B</button>

            {selectedCities.length > 0 && (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={filteredChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedCities.map(city => (
                            <Bar key={city} dataKey="population" name={city} fill="#8884d8" />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default BarChartComponent;