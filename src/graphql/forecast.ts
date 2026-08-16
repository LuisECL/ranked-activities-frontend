import { gql, type TypedDocumentNode } from '@apollo/client'

export type Activity = 'SKIING' | 'SURFING' | 'OUTDOORS_SIGHTSEEING' | 'INDOORS_SIGHTSEEING'

export interface ActivityScore {
  activity: Activity
  score: number
}

export interface Forecast {
  day: string
  weather_code: number
  weather_description: string
  activities: ActivityScore[]
}

export interface GetWeeklyForecastData {
  getWeeklyForecast: (Forecast | null)[] | null
}

export interface GetWeeklyForecastVars {
  latitude: number
  longitude: number
  timezone: string
  only: Activity[]
}

export const GET_WEEKLY_FORECAST: TypedDocumentNode<GetWeeklyForecastData, GetWeeklyForecastVars> = gql`
  query GetWeeklyForecast($latitude: Float!, $longitude: Float!, $timezone: String!, $only: [Activity!]) {
    getWeeklyForecast(latitude: $latitude, longitude: $longitude, timezone: $timezone) {
      day
      weather_code
      weather_description
      activities(only: $only) {
        activity
        score
      }
    }
  }
`
