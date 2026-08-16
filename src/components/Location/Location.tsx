import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { SEARCH_LOCATIONS, type Geolocation } from '../../graphql/locations'
import './Location.css'

interface LocationProps {
  query: string
  onQueryChange: (value: string) => void
  selectedLocation: Geolocation | null
  onSelect: (location: Geolocation) => void
}

function Location({ query, onQueryChange, selectedLocation, onSelect }: LocationProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timeout)
  }, [query])

  const { data } = useQuery(SEARCH_LOCATIONS, {
    variables: { q: debouncedQuery },
    skip: debouncedQuery.trim().length < 2,
  })

  const results = data?.searchLocations?.filter((location): location is Geolocation => location !== null) ?? []

  return (
    <section className="location">
      <h2 className="location__title">Location:</h2>
      <div className="location__panel">
        <input
          type="text"
          className="location__input"
          placeholder="Search for a city or town..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        {results.length > 0 && (
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
        )}
      </div>
    </section>
  )
}

export default Location
