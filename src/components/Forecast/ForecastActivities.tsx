import type { Activity, ActivityScore } from '../../graphql/forecast'
import './ForecastActivities.css'

const ACTIVITY_LABELS: Record<Activity, string> = {
  SKIING: 'Skiing',
  SURFING: 'Surfing',
  OUTDOORS_SIGHTSEEING: 'Outdoors sightseeing',
  INDOORS_SIGHTSEEING: 'Indoors Sightseeing',
}

interface ForecastActivitiesProps {
  activities: ActivityScore[]
}

function ForecastActivities({ activities }: ForecastActivitiesProps) {
  if (activities.length === 0) {
    return null
  }

  return (
    <ul className="forecast-activities">
      {activities.map((activityScore) => (
        <li key={activityScore.activity} className="forecast-activities__item">
          <span>{ACTIVITY_LABELS[activityScore.activity]}</span>
          <span>{activityScore.score}</span>
        </li>
      ))}
    </ul>
  )
}

export default ForecastActivities
