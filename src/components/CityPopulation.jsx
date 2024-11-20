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
    return (

        <div>
            <h1>City Populations</h1>
            <ul>
                {cities.map((city) => (
                    <li key={city.id}>{city.name}: {city.population}</li>
                ))}
            </ul>
        </div>
    );
}
export default CityPopulation;