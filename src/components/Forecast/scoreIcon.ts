export function getScoreIcon(score: number) {
  if (score >= 3) {
    return { symbol: '✓✓', modifier: 'forecast-activities__icon--high', label: 'Great conditions' }
  }
  if (score >= 0) {
    return { symbol: '✓', modifier: 'forecast-activities__icon--medium', label: 'Good conditions' }
  }
  return { symbol: '✕', modifier: 'forecast-activities__icon--low', label: 'Poor conditions' }
}
