import type { Geolocation } from '../../graphql/locations'
import './Forecast.css'

interface ForecastProps {
  location: Geolocation | null
}

function Forecast({ location }: ForecastProps) {
  return (
    <section className="forecast">
      <h2 className="forecast__title">Forecast:</h2>
      <div className="forecast__panel">
        <p>{location ? `Showing forecast for ${location.name}...` : 'Search for and select a location...'}</p>
      </div>
    </section>
  )
}

export default Forecast
