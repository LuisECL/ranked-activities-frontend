import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LocationResults from './LocationResults'
import type { Geolocation } from '../../graphql/locations'

const manchester: Geolocation = {
  id: '1',
  name: 'Manchester',
  latitude: 53.48,
  longitude: -2.24,
  country: 'United Kingdom',
  admin_level_1: 'England',
  admin_level_2: 'Greater Manchester',
  timezone: 'Europe/London',
}

const howe: Geolocation = {
  id: '2',
  name: 'Howe',
  latitude: 42.99,
  longitude: -71.46,
  country: 'United States',
  admin_level_1: 'Indiana',
  admin_level_2: null,
  timezone: 'America/New_York',
}

describe('LocationResults', () => {
  it('shows a loading message while loading', () => {
    render(<LocationResults loading results={[]} selectedLocation={null} onSelect={vi.fn()} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows a no-results message when the search returned nothing', () => {
    render(<LocationResults loading={false} results={[]} selectedLocation={null} onSelect={vi.fn()} />)
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('renders every result, combining admin_level_2 into the subtitle only when present', () => {
    render(<LocationResults loading={false} results={[manchester, howe]} selectedLocation={null} onSelect={vi.fn()} />)

    expect(screen.getByText('Manchester, United Kingdom')).toBeInTheDocument()
    expect(screen.getByText('England, Greater Manchester')).toBeInTheDocument()
    expect(screen.getByText('Howe, United States')).toBeInTheDocument()
    expect(screen.getByText('Indiana')).toBeInTheDocument()
  })

  it('marks the currently selected location', () => {
    render(<LocationResults loading={false} results={[manchester, howe]} selectedLocation={manchester} onSelect={vi.fn()} />)

    expect(screen.getByRole('button', { name: /Manchester, United Kingdom/ })).toHaveClass(
      'location__result--selected',
    )
    expect(screen.getByRole('button', { name: /Howe, United States/ })).not.toHaveClass(
      'location__result--selected',
    )
  })

  it('calls onSelect with the clicked location', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<LocationResults loading={false} results={[manchester, howe]} selectedLocation={null} onSelect={onSelect} />)

    await user.click(screen.getByRole('button', { name: /Howe, United States/ }))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(howe)
  })
})
