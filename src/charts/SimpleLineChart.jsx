import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const CapitalLineChart = () => {
    const [country, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/countries/capitals");
                setCountries(response.data.data); 
                console.log(response.data.data);
            } catch (err) {
                setError("Error fetching city population data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Get only the first 20 cities and their capitals
    const chartData = country.slice(0, 10).map(country => ({
        name: country.name,     
        capital: country.capital
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="capital" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CapitalLineChart;