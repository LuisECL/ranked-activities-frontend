import Location from './components/Location/Location'
import Activities from './components/Activities/Activities'
import Forecast from './components/Forecast/Forecast'
import './App.css'

function App() {
  return (
    <div className="app">
      <Location />
      <Activities />
      <Forecast />
    </div>
  )
}

export default App
