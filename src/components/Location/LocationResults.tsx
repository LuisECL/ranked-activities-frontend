import type { Geolocation } from '../../graphql/locations'
import './LocationResults.css'

interface LocationResultsProps {
  loading: boolean
  results: Geolocation[]
  selectedLocation: Geolocation | null
  onSelect: (location: Geolocation) => void
}

function LocationResults({ loading, results, selectedLocation, onSelect }: LocationResultsProps) {
  if (loading) {
    return <p className="location__status">Loading...</p>
  }

  if (results.length === 0) {
    return <p className="location__status">No results</p>
  }

  return (
    <ul className="location__results">
      {results.map((location) => (
        <li key={location.id}>
          <button
            type="button"
            className={
              location.id === selectedLocation?.id
                ? 'location__result location__result--selected'
                : 'location__result'
            }
            onClick={() => onSelect(location)}
          >
            <span className="location__result-name">
              {location.name}, {location.country}
            </span>
            <span className="location__result-admin">
              {location.admin_level_2
                ? `${location.admin_level_1}, ${location.admin_level_2}`
                : location.admin_level_1}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default LocationResults
