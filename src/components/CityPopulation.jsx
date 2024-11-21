import React, { useState, useEffect } from "react";
import axios from "axios";

const CityPopulation = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect(() => {

        const fetchCities = async () => {

            try {
                const response = await axios.get("http://localhost:8080/api/countries/population/cities");
                setCities(response.data.data);
                console.log(response.data.data); // Log the data to the console
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
        return <div>{error}</div>;
    }
      // Limit to the first 10 cities

    const limitedCities = cities.slice(0, 10);

    return (
        <div>
            <h1>City Populations</h1>
            <ul>
                {limitedCities.map((city, index) => (
                    <li key={index}> {/* Use index as key if no unique ID is available */}
                        {city.city}: {city.populationCounts.length > 0 ? city.populationCounts[0].value : 'No data available'}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default CityPopulation;