// src/components/CountrySearch.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Modal from 'react-modal';
import countryService from '../services/countryAPI'; // Adjust the path as necessary

const CountrySearch = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const [invalidEntries, setInvalidEntries] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Get the country name from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const countryName = queryParams.get('country');

    useEffect(() => {
        const fetchPopulationData = async () => {
            if (countryName) {
                const result = await countryService.fetchPopulationDataByCountry(countryName);
                if (result.success) {
                    const filteredData = result.data;

                    // Aggregate population data by year
                    const populationByYear = {};
                    const invalidData = [];

                    filteredData.forEach(city => {
                        city.populationCounts.forEach(count => {
                            const year = count.year;
                            const population = count.value;

                            // Check if the year is a valid number and population is not null or non-numeric
                            const parsedYear = parseInt(year, 10);
                            const parsedPopulation = parseFloat(population);

                            if (!isNaN(parsedYear) && !isNaN(parsedPopulation)) {
                                if (!populationByYear[parsedYear]) {
                                    populationByYear[parsedYear] = 0;
                                }
                                populationByYear[parsedYear] += parsedPopulation; // Sum populations for the same year
                            } else {
                                // Store invalid entries
                                invalidData.push({ year, population });
                            }
                        });
                    });

                    // Set invalid entries to state
                    if (invalidData.length > 0) {
                        setInvalidEntries(invalidData);
                        setModalIsOpen(true); // Open modal if there are invalid entries
                    }

                    // Convert the aggregated data into an array format for the chart
                    const formattedData = Object.keys(populationByYear).map(year => ({
                        year,
                        population: populationByYear[year]
                    }));

                    // Sort the data by year
                    formattedData.sort((a, b) => a .year - b.year);
                    setData(formattedData);
                } else {
                    console.error("Error fetching population data:", result.error);
                }
            }
        };

        fetchPopulationData();
    }, [countryName]);

    const closeModal = () => {
        setModalIsOpen(false);
    };

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
            {/* Modal for contextual information */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Contextual Information"
                appElement={document.getElementById('root')}
            >
                <h2>Contextual Information</h2>
                <p>The following information is related to the selected country:</p>
                <ul>
                    {invalidEntries.map((info, index) => (
                        <li key={index}>
                            <strong>Year:</strong> {info.year} - <strong>Population Info:</strong> {info.population}
                        </li>
                    ))}
                </ul>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default CountrySearch;