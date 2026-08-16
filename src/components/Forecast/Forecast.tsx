import { useQuery } from '@apollo/client/react'
import type { Geolocation } from '../../graphql/locations'
import { GET_WEEKLY_FORECAST, type Activity, type Forecast as ForecastDayData } from '../../graphql/forecast'
import ForecastDay from './ForecastDay'
import './Forecast.css'

interface ForecastProps {
  location: Geolocation | null
  activities: Activity[]
}

function Forecast({ location, activities }: ForecastProps) {
  const { data, loading } = useQuery(GET_WEEKLY_FORECAST, {
    variables: {
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
      timezone: location?.timezone ?? '',
      only: activities,
    },
    skip: !location,
  })

  const days = data?.getWeeklyForecast?.filter((day): day is ForecastDayData => day !== null) ?? []

  return (
    <section className="forecast">
      <h2 className="forecast__title">Forecast:</h2>
      <div className="forecast__panel">
        {!location && <p>Search for and select a location...</p>}
        {location && loading && <p>Loading...</p>}
        {location && !loading && days.length === 0 && <p>No forecast available</p>}
        {location && !loading && days.length > 0 && (
          <ul className="forecast__days">
            {days.map((day) => (
              <ForecastDay key={day.day} day={day} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Forecast
