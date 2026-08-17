import { useState } from 'react'
import Location from './components/Location/Location'
import Activities from './components/Activities/Activities'
import Forecast from './components/Forecast/Forecast'
import type { Geolocation } from './graphql/locations'
import type { Activity } from './graphql/forecast'
import './App.css'

const ALL_ACTIVITIES: Activity[] = ['SKIING', 'SURFING', 'OUTDOORS_SIGHTSEEING', 'INDOORS_SIGHTSEEING']

function App() {
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<Geolocation | null>(null)
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>(ALL_ACTIVITIES)

  const handleToggleActivity = (activity: Activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((current) => current !== activity) : [...prev, activity],
    )
  }

  const handleQueryChange = (value: string) => {
    setLocationQuery(value)
    setSelectedLocation(null)
  }

  return (
    <div className="app">
      <Location
        query={locationQuery}
        onQueryChange={handleQueryChange}
        selectedLocation={selectedLocation}
        onSelect={setSelectedLocation}
      />
      <Activities selected={selectedActivities} onToggle={handleToggleActivity} />
      <Forecast location={selectedLocation} activities={selectedActivities} locationQuery={locationQuery} />
    </div>
  )
}

export default App
