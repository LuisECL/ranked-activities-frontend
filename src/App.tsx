import { useState } from 'react'
import Location from './components/Location/Location'
import Activities from './components/Activities/Activities'
import Forecast from './components/Forecast/Forecast'
import type { Geolocation } from './graphql/locations'
import './App.css'

function App() {
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<Geolocation | null>(null)

  return (
    <div className="app">
      <Location
        query={locationQuery}
        onQueryChange={setLocationQuery}
        selectedLocation={selectedLocation}
        onSelect={setSelectedLocation}
      />
      <Activities />
      <Forecast location={selectedLocation} />
    </div>
  )
}

export default App
