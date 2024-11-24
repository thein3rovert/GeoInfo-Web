import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from "../charts/BarChart"; // Make sure BarChart is correctly implemented

const CityPopulation = ({selectedCountry}) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/countries/${selectedCountry}/population/cities`);
                setCities(response.data.data);
                console.log(response.data.data); // Log the data to the console
            } catch (err) {
                setError("Error fetching city population data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (selectedCountry) {
            fetchCities();
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (cities.length > 0) {
            const selectedCity = cities[0];
            const labels = selectedCity.populationCounts.map(item => item.year);
            const populations = selectedCity.populationCounts.map(item => item.value);
            // const labels = selectedCity.populationCounts.map(item => item.year);
            // const populations = selectedCity.populationCounts.map(item => item.value);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: `${selectedCountry.city} Population`,
                        data: populations,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [cities, selectedCountry]);

    // const handleCitySelect = (city) => {
    //     setSelectedCity(city);
    // };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    // Limit to the first 20 cities
    const limitedCities = cities.slice(0, 20);

    return (
        <div className="App">
            <h1>{selectedCountry} Population Chart</h1>
            {cities.length > 0 && (
                <div style={{ width: 700 }}>
                    <BarChart chartData={chartData} />
                </div>
            )}
        </div>
        // <div className="App">
        //     <h1>Select a City</h1>
        //     <ul>
        //         {limitedCities.map(city => (
        //             <li key={city.city} onClick={() => handleCitySelect(city)}>
        //                 {city.city}
        //             </li>
        //         ))}
        //     </ul>
        //     {selectedCity && (
        //         <div style={{ width: 700 }}>
        //             <BarChart chartData={chartData} />
        //         </div>
        //     )}
        // </div>
    );
}

export default CityPopulation;