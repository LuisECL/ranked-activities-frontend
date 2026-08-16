import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { SEARCH_LOCATIONS, type Geolocation } from '../../graphql/locations'
import LocationResults from './LocationResults'
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

  const hasQuery = debouncedQuery.trim().length >= 2

  const { data, loading } = useQuery(SEARCH_LOCATIONS, {
    variables: { q: debouncedQuery },
    skip: !hasQuery,
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
        {hasQuery && (
          <LocationResults
            loading={loading}
            results={results}
            selectedLocation={selectedLocation}
            onSelect={onSelect}
          />
        )}
      </div>
    </section>
  )
}

export default Location
