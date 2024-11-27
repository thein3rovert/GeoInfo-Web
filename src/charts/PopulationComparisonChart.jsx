import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p>{`Year: ${label}`}</p>
                <p>{`City A: ${payload[0].value}`}</p>
                <p>{`City B: ${payload[1].value}`}</p>
            </div>
        );
    }
    return null;
};

const PopulationComparisonChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="populationA" fill="#82ca9d" name="City A" />
                <Bar dataKey="populationB" fill="#8884d8" name="City B" />
            </BarChart>
        </ResponsiveContainer>
    );
};


export default PopulationComparisonChart;