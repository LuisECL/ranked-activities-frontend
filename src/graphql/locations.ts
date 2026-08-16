import { gql, type TypedDocumentNode } from '@apollo/client'

export interface Geolocation {
  id: string
  name: string
  latitude: number
  longitude: number
  country: string
  admin_level_1: string
  admin_level_2: string | null
}

export interface SearchLocationsData {
  searchLocations: (Geolocation | null)[] | null
}

export interface SearchLocationsVars {
  q: string
}

export const SEARCH_LOCATIONS: TypedDocumentNode<SearchLocationsData, SearchLocationsVars> = gql`
  query SearchLocations($q: String!) {
    searchLocations(q: $q) {
      id
      name
      latitude
      longitude
      country
      admin_level_1
      admin_level_2
    }
  }
`
