import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ForecastDay from './ForecastDay'
import type { Forecast } from '../../graphql/forecast'

const baseDay: Forecast = {
  day: '2026-08-16',
  weather_code: 61,
  weather_description: 'Drizzle: Light intensity',
  activities: [],
}

function renderDay(day: Partial<Forecast> = {}) {
  return render(
    <ul>
      <ForecastDay day={{ ...baseDay, ...day }} />
    </ul>,
  )
}

describe('ForecastDay', () => {
  it('formats the weekday and date from the ISO day string', () => {
    renderDay({ day: '2026-08-16' })
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Aug-16')).toBeInTheDocument()
  })

  it('shows the weather description as text and as the icon label', () => {
    renderDay({ weather_description: 'Partly cloudy' })
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Partly cloudy' })).toBeInTheDocument()
  })

  it('renders no activity list items when the day has none', () => {
    renderDay({ activities: [] })
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})
