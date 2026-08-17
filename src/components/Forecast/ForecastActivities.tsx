import { ACTIVITY_LABELS, type ActivityScore } from '../../graphql/forecast'
import { getScoreIcon } from './scoreIcon'
import './ForecastActivities.css'

interface ForecastActivitiesProps {
  activities: ActivityScore[]
}

function ForecastActivities({ activities }: ForecastActivitiesProps) {
  if (activities.length === 0) {
    return null
  }

  const sortedActivities = [...activities].sort((a, b) => b.score - a.score)

  return (
    <ul className="forecast-activities">
      {sortedActivities.map((activityScore) => {
        const icon = getScoreIcon(activityScore.score)

        return (
          <li key={activityScore.activity} className="forecast-activities__item">
            <span className={`forecast-activities__icon ${icon.modifier}`} role="img" aria-label={icon.label}>
              {icon.symbol}
            </span>
            <span className="forecast-activities__meta">
              <span>{ACTIVITY_LABELS[activityScore.activity]}</span>
              {/* <span>{activityScore.score}</span> */}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default ForecastActivities
