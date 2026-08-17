import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Activities from './Activities'
import type { Activity } from '../../graphql/forecast'

describe('Activities', () => {
  it('checks only the activities included in the selected prop', () => {
    const selected: Activity[] = ['SKIING', 'SURFING']
    render(<Activities selected={selected} onToggle={vi.fn()} />)

    expect(screen.getByRole('checkbox', { name: 'Skiing' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Surfing' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Outdoors sightseeing' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Indoors Sightseeing' })).not.toBeChecked()
  })

  it('calls onToggle with the activity value when its checkbox is clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<Activities selected={[]} onToggle={onToggle} />)

    await user.click(screen.getByRole('checkbox', { name: 'Surfing' }))

    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenCalledWith('SURFING')
  })
})
