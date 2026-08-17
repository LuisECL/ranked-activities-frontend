import type { Forecast } from '../../graphql/forecast'
import ForecastActivities from './ForecastActivities'
import './ForecastDay.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface ForecastDayProps {
  day: Forecast
}

function ForecastDay({ day }: ForecastDayProps) {
  const date = new Date(`${day.day}T00:00:00`)
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  const formattedDate = `${MONTHS[date.getMonth()]}-${String(date.getDate()).padStart(2, '0')}`

  return (
    <li className="forecast-day">
      <div className="forecast-day__header">
        <div className="forecast-day__date-group">
          <span className="forecast-day__weekday">{weekday}</span>
          <span className="forecast-day__date">{formattedDate}</span>
        </div>
        <div className="forecast-day__weather">
          <span className="forecast-day__icon" role="img" aria-label={day.weather_description} />
          <span className="forecast-day__description">{day.weather_description}</span>
        </div>
      </div>
      <ForecastActivities activities={day.activities} />
    </li>
  )
}

export default ForecastDay
