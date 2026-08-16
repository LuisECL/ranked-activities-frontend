import type { Activity } from '../../graphql/forecast'
import './Activities.css'

interface ActivityOption {
  value: Activity
  label: string
}

const ACTIVITY_OPTIONS: ActivityOption[] = [
  { value: 'SKIING', label: 'Skiing' },
  { value: 'SURFING', label: 'Surfing' },
  { value: 'OUTDOORS_SIGHTSEEING', label: 'Outdoors sightseeing' },
  { value: 'INDOORS_SIGHTSEEING', label: 'Indoors Sightseeing' },
]

interface ActivitiesProps {
  selected: Activity[]
  onToggle: (activity: Activity) => void
}

function Activities({ selected, onToggle }: ActivitiesProps) {
  return (
    <section className="activities">
      <h2 className="activities__title">Activities:</h2>
      <ul className="activities__list">
        {ACTIVITY_OPTIONS.map((option) => (
          <li key={option.value} className="activities__item">
            <label>
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
              />
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
