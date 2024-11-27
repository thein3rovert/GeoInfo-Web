# GeoInfo Web APP
This repository contains the frontend implementation of the Project Name, a user-friendly interface designed to interact with the backend services.
Built using React, this frontend application provides an intuitive and responsive user experience for accessing and displaying data related to countries, capitals and their capital,Country flags, and populations of countries and cities over the years.

## Features

- **Basic User Interface**: A simple and clean interface built with React.
- **Data Display**: Access and display data from the backend services.
- **Responsive Design**: Optimized for various screen sizes.

## Getting Started

Follow these instructions to set up and run the frontend application on your local machine.

### Prerequisites

- Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Dependencies
This project uses the following dependencies:

- Axios: ^1.7.7
- Recharts: ^2.13.3
- React Modal: ^3.16.1

Installation Commands
To install these dependencies, run the following commands in your project directory:

```
npm install axios@^1.7.7
npm install recharts@^2.13.3
npm install react-modal@^3.16.1
```

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thein3rovert/GeoInfo-Web.git
   
   cd GeoInfo-Web
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   This will run the app in development mode. Open [http://localhost:5173](http://localhost:5173/) to view it in your browser.

## Usage

- Navigate through the application to explore various features.
- Ensure the backend service is running to fetch and display data correctly.

## Backend

The backend for this project is maintained in a separate repository. You can find it [here](https://github.com/your-username/backend-repo-name).

After verifiying the API functionality and completimg the backend, i proceed to the frontend setup.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Key Components](#key-components)

## Introduction

Elanco GeoInfo is a web application designed to visualize population data for different countries using the CountriesNow API. The application features a React frontend for data visualization and a Spring Boot backend for API consumption and data processing.

## Features

- Search for various country 
- Compare population sizes between two countries using a bar chart.
- View population trends over time for a selected country using a line chart.
- Interactive user interface with modals for enhanced user experience.

## Tech Stack

### Frontend

- **Framework**: React.js
- **HTTP Client**: Axios
- **Data Visualization**:Recharts
- **Styling**: CSS

## Installation

To set up the frontend locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thein3rovert/GeoInfo-web.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd GeoInfo-web
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Usage

To start the development server, run:

```bash
npm start
```

or

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── assets/                 # Static assets
├── charts/                 # Chart components
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── services/               # API services
```

### Component Organization

```
components/
├── CityPopulation.jsx    # City-specific population display
├── Footer.jsx            # Application footer
├── Header.jsx            # Application header
└── HomePage.jsx          # Main landing page
```

### Charting Components

```
charts/
├── BarChart.jsx                    # Bar chart visualization
├── CountrySearch.jsx               # Search functionality for countries
└── PopulationComparisonChart.jsx   # Comparative population analysis
```

### API Integration

- **Country Flag Endpoint**: Fetches and displays the flag of a specified country.
- **Population Data Endpoint**: Provides population data for a specified country over time.
- **City Data Endpoint**: Supplies data for all cities in a country.

### User Interface Features

- **Search Bar for Country Flags**: Allows users to search for a country and view its flag.
- **Modal for Country Selection**: Offers options to compare population or view population trends over time.

### Data Visualization

- **Bar Chart**: Compares the populations of two countries.
- **Line Chart**: Displays the population of a selected country over time.

### Contact
For any inquiries or feedback, please contact:

Samad Olaibi - danielolaibi@gmail.com