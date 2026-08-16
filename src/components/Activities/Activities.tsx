import './Activities.css'

const ACTIVITIES = ['Skiing', 'Surfing', 'Outdoors sightseeing', 'Indoors Sightseeing']

function Activities() {
  return (
    <section className="activities">
      <h2 className="activities__title">Activities:</h2>
      <ul className="activities__list">
        {ACTIVITIES.map((activity) => (
          <li key={activity} className="activities__item">
            <label>
              <input type="checkbox" defaultChecked />
              {activity}
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
