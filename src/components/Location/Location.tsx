import './Location.css'

function Location() {
  return (
    <section className="location">
      <h2 className="location__title">Location:</h2>
      <input
        type="text"
        className="location__input"
        placeholder="Search for a city or town..."
      />
    </section>
  )
}

export default Location
