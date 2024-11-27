import React, { useEffect, useState } from 'react';
import PopulationComparisonChart from '../charts/PopulationComparisonChart';
import countryService from '../services/countryAPI';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const UsePopulationComparison = () => {
    const [selectedCountryA, setSelectedCountryA] = useState(null);
    const [selectedCountryB, setSelectedCountryB] = useState(null);
    const [selectedCityA, setSelectedCityA] = useState(null);
    const [selectedCityB, setSelectedCityB] = useState(null);
    const [countries, setCountries] = useState([]);
    const [citiesA, setCitiesA] = useState([]);
    const [citiesB, setCitiesB] = useState([]);
    const [populationData, setPopulationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);

    // Fetch the list of countries when the component mounts
    useEffect(() => {
        const fetchCountries = async () => {
            const result = await countryService.fetchCountries();
            if (result.success) {
                setCountries(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };

        fetchCountries();
    }, []);

    // Handle the selection of a country and fetch its cities
    const selectCountry = async (countryName, isFirstCountry) => {
        if (isFirstCountry) {
            setSelectedCountryA(countryName);
            const citiesFromCountry = await countryService.fetchCitiesByCountry(countryName);
            if (citiesFromCountry.success && Array.isArray(citiesFromCountry.data)) {
                setCitiesA(citiesFromCountry.data);
            } else {
                console.error('Error fetching cities for Country A:', citiesFromCountry.error);
                setCitiesA([]); // Reset citiesA to an empty array on error
            }
        } else {
            setSelectedCountryB(countryName);
            const citiesFromCountry = await countryService.fetchCitiesByCountry(countryName);
            if (citiesFromCountry.success && Array.isArray(citiesFromCountry.data)) {
                setCitiesB(citiesFromCountry.data);
            } else {
                console.error('Error fetching cities for Country B:', citiesFromCountry.error);
                setCitiesB([]); // Reset citiesB to an empty array on error
            }
        }
        setIsCityModalOpen(true); // Open the modal to select cities
    };

    // Handle the selection of a city from the modal
    const handleCitySelect = (cityName, isFirstCity) => {
        if (isFirstCity) {
            setSelectedCityA(cityName);
        } else {
            setSelectedCityB(cityName);
        }
        setIsCityModalOpen(false); // Close the modal after selection
    };

    // Fetch population data for the selected cities when they change
    useEffect(() => {
        const fetchPopulationDataForCities = async () => {
            if (selectedCityA && selectedCityB) {
                const result = await countryService.fetchCitiesPopulation([selectedCityA, selectedCityB]);
                if (result.success) {
                    setPopulationData(result.data);
                } else {
                    setError(result.error);
                }
                setLoading(false);
            }
        };

        fetchPopulationDataForCities();
    }, [selectedCityA, selectedCityB]);

    // Prepare chart data based on population data
    const chartData = [];
    populationData.forEach(city => {
        if (city.city === selectedCityA || city.city === selectedCityB) {
            city.populationCounts.forEach(count => {
                const existingYearData = chartData.find(data => data.year === count.year) || { year: count.year, populationA: 0, populationB: 0 };
                if (city.city === selectedCityA) {
                    existingYearData.populationA = count.value; // Assign value for City A
                } else if (city.city === selectedCityB) {
                    existingYearData.populationB = count.value; // Assign value for City B
                }
                // Update or add the year data
                if (!chartData.includes(existingYearData)) {
                    chartData.push(existingYearData);
                }
            });
        }
    });

    // Render loading or error messages if applicable
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Select Countries to Compare</h2>
            <div>
                {countries.map(country => (
                    <button key={ country.name} onClick={() => selectCountry(country.name, !selectedCountryA)}>
                        {country.name}
                    </button>
                ))}
            </div>
            <Modal isOpen={isCityModalOpen}>
                <h2>Select Cities</h2>
                <div>
                    {selectedCountryA && citiesA.map(city => (
                        <button key={city} onClick={() => handleCitySelect(city, true)}>
                            {city}
                        </button>
                    ))}
                    {selectedCountryB && citiesB.map(city => (
                        <button key={city} onClick={() => handleCitySelect(city, false)}>
                            {city}
                        </button>
                    ))}
                </div>
                <button onClick={() => setIsCityModalOpen(false)}>Close</button>
            </Modal>
            {selectedCityA && selectedCityB && (
                <PopulationComparisonChart data={chartData} />
            )}
        </div>
    );
};

export default UsePopulationComparison;