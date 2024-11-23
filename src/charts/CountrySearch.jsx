// src/components/PopulationChart.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CountrySearch = () => {
    const [data, setData] = useState([]);
    const location = useLocation();

    // Get the country name from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const countryName = queryParams.get('country');

    useEffect(() => {
        const fetchPopulationData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/countries/population/cities");
                const result = await response.json();
                if (result.error === false) {
                    // if (result.error === false) {
                    // Filter the data for the selected country
                    const filteredData = result.data.filter(city => city.country === countryName);
                    console.log(filteredData);

                    // Aggregate population data by year
                    const populationByYear = {};
                    console.log(populationByYear);

                    filteredData.forEach(city => {
                        city.populationCounts.forEach(count => {
                            const year = count.year;
                            const population = parseFloat(count.value);
                            if (!populationByYear[year]) {
                                populationByYear[year] = 0;
                            }
                            populationByYear[year] += population; // Sum populations for the same year
                        });
                    });
                    // Convert the aggregated data into an array format for the chart
                    const formattedData = Object.keys(populationByYear).map(year => ({
                        year,
                        population: populationByYear[year]
                    }));
                    // Sort the data by year
                    formattedData.sort((a, b) => a.year - b.year);
                    setData(formattedData);
                } else {
                    console.error("Error fetching population data:", result.msg);
                }
            } catch (error) {
                console.error("Error fetching population data:", error);
            }
        };


        if (countryName) {

            fetchPopulationData();

        }

    }, [countryName]);

    return (
        <div>
            <h2>Population Data for {countryName}</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="population" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CountrySearch;