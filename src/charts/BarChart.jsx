import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../styles/PopulationTrend.css'; // Import CSS file for styling

const PopulationTrend = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/countries/population/cities"); // Replace with your API endpoint
                setData(response.data.data);
            } catch (err) {
                setError("Error fetching population data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

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

    const uniqueCities = Array.from(new Set(data.map(cityData => cityData.city)));
    const filteredChartData = selectedCity 
        ? chartData.filter(d => d.city === selectedCity) 
        : [];

    return (
        <div className="container">
            <h1 className="title">Population Trend</h1>
            <div className="dropdown-container">
                <label htmlFor="city-select" className="dropdown-label">Select a city:</label>
                <select 
                    id="city-select" 
                    className="dropdown" 
                    onChange={(e) => setSelectedCity(e.target.value)} 
                    value={selectedCity || ""}
                >
                    <option value="">--Please choose a city--</option>
                    {uniqueCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {selectedCity && filteredChartData.length > 0 && (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={filteredChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                            type="monotone" 
                            dataKey="population" 
                            stroke="#4a90e2" 
                            strokeWidth={2} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
            {selectedCity && filteredChartData.length === 0 && (
                <div className="no-data">No data available for the selected city.</div>
            )}
        </div>
    );
};

export default PopulationTrend;