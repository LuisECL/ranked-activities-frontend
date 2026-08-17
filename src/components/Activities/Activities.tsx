import { ACTIVITY_LABELS, type Activity } from '../../graphql/forecast'
import './Activities.css'

const ACTIVITY_OPTIONS = Object.entries(ACTIVITY_LABELS) as [Activity, string][]

interface ActivitiesProps {
  selected: Activity[]
  onToggle: (activity: Activity) => void
}

function Activities({ selected, onToggle }: ActivitiesProps) {
  return (
    <section className="activities">
      <h2 className="activities__title">Activities:</h2>
      <ul className="activities__list">
        {ACTIVITY_OPTIONS.map(([value, label]) => (
          <li key={value} className="activities__item">
            <label>
              <input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(value)} />
              {label}
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
