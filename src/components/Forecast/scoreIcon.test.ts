import { describe, expect, it } from 'vitest'
import { getScoreIcon } from './scoreIcon'

describe('getScoreIcon', () => {
  it('returns the "great" tier for scores of 3 or more', () => {
    expect(getScoreIcon(3).label).toBe('Great conditions')
    expect(getScoreIcon(10).label).toBe('Great conditions')
  })

  it('returns the "good" tier for scores between 0 (inclusive) and 3', () => {
    expect(getScoreIcon(0).label).toBe('Good conditions')
    expect(getScoreIcon(2).label).toBe('Good conditions')
  })

  it('returns the "poor" tier for negative scores', () => {
    expect(getScoreIcon(-1).label).toBe('Poor conditions')
  })
})
