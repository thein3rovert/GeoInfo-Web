import React, { useEffect, useState } from 'react';
import PopulationComparisonChart from './components/PopulationComparisonChart';
import countryService from '../services/countryAPI';

const UsePopulationComparison = () => {
    const [selectedCities, setSelectedCities] = useState([]);
    const [populationData, setPopulationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCitySelection = (city) => {
        if (selectedCities.includes(city)) {
            setSelectedCities(selectedCities.filter(c => c !== city));
        } else {
            if (selectedCities.length < 2) {
                setSelectedCities([...selectedCities, city]);
            }
        }
    };

    // Fetch population data when the component mounts
    useEffect(() => {
        const fetchPopulationData = async () => {
            const result = await countryService.fetchPopulationData();
            if (result.success) {
                setPopulationData(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };

        fetchPopulationData();
    }, []);

    // Prepare data for the chart based on selected cities
    const chartData = populationData.reduce((acc, city) => {
        if (selectedCities.includes(city.name)) { // Assuming city has a 'name' property
            city.populationCounts.forEach(count => {
                const existingYearData = acc.find(data => data.year === count.year) || {};
                acc.push({
                    year: count.year,
                    populationA: selectedCities.includes("City A") ? (city.name === "City A" ? count.value : existingYearData.populationA || 0) : existingYearData.populationA || 0,
                    populationB: selectedCities.includes("City B") ? (city.name === "City B" ? count.value : existingYearData.populationB || 0) : existingYearData.populationB || 0,
                });
            });
        }
        return acc;
    }, []).filter((data, index, self) => index === self.findIndex((d) => d.year === data.year));

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Select Cities to Compare</h2>
            {populationData.map(city => (
                <button key={city.name} onClick={() => handleCitySelection(city.name)}>
                    {selectedCities.includes(city.name) ? `Deselect ${city.name}` : `Select ${city.name}`}
                </button>
            ))}
            {selectedCities.length === 2 && <PopulationComparisonChart data={chartData} />}
        </div>
    );
};

export default UsePopulationComparison;