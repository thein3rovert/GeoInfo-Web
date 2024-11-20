import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CityPopulation from './components/CityPopulation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <h2>Welcome to development</h2>
    </div>
    <div className= "App">
      <CityPopulation/>
    </div>
    </>
  )
}

export default App
