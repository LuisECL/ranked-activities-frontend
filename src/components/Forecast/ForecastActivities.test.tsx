import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ForecastActivities from './ForecastActivities'
import type { ActivityScore } from '../../graphql/forecast'

describe('ForecastActivities', () => {
  it('renders nothing when there are no activities', () => {
    const { container } = render(<ForecastActivities activities={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders each activity label and sorts them by score, highest first', () => {
    const activities: ActivityScore[] = [
      { activity: 'SKIING', score: -5 },
      { activity: 'SURFING', score: 4 },
      { activity: 'INDOORS_SIGHTSEEING', score: 1 },
    ]

    render(<ForecastActivities activities={activities} />)

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('Surfing')
    expect(items[1]).toHaveTextContent('Indoors Sightseeing')
    expect(items[2]).toHaveTextContent('Skiing')
  })

  it('gives the score icon an accessible label matching its tier', () => {
    render(<ForecastActivities activities={[{ activity: 'SKIING', score: 5 }]} />)
    expect(screen.getByRole('img', { name: 'Great conditions' })).toBeInTheDocument()
  })
})
