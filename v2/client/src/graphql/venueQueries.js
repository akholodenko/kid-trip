import { gql } from '@apollo/client'

export const VenueDetails = gql`
  fragment VenueDetails on Venue {
    id
    name
    slug
    description
    streetAddress
    zipcode
    city
    state
    lat
    lng
    venueTypes {
      id
      name
      image
    }
  }
`

const VenueStats = gql`
  fragment VenueStats on Venue {
    venueStats {
      favorites
      favoriteByCurrentUser
    }
  }
`

export const GET_VENUE_BASICS = gql`
  query($venueId: ID!) {
    venue(id: $venueId) {
      ...VenueDetails
    }
  }
  ${VenueDetails}
`

export const GET_VENUE_ADVANCED = gql`
  query($venueId: ID!) {
    venue(id: $venueId) {
      ...VenueDetails
      ...VenueStats
    }
  }
  ${VenueDetails}
  ${VenueStats}
`

export const GET_VENUE_BY_SLUG = gql`
  query($venueSlug: String!) {
    venueBySlug(slug: $venueSlug) {
      ...VenueDetails
      ...VenueStats
    }
  }
  ${VenueDetails}
  ${VenueStats}
`

export const GET_VENUES_FOR_CURRENT_USER = gql`
  query {
    me {
      venues {
        ...VenueDetails
      }
      favoriteVenues {
        ...VenueDetails
      }
    }
  }
  ${VenueDetails}
`

export const GET_VENUE_TYPES = gql`
  query {
    venueTypes {
      id
      name
      image
    }
  }
`

export const GET_SIMILAR_VENUES_IN_RADIUS = gql`
  query($venueId: ID!, $limit: Int, $radius: Int) {
    similarVenues(id: $venueId, first: $limit, radius: $radius) {
      id
      name
      slug
      streetAddress
      zipcode
      city
    }
  }
`

export const GET_SIMILAR_VENUES_BY_NAME = gql`
  query($name: String!, $cityId: Int, $limit: Int) {
    similarVenuesByName(name: $name, cityId: $cityId, first: $limit) {
      id
      name
      slug
      streetAddress
      zipcode
      city
      state
      venueTypes {
        id
        name
      }
    }
  }
`

export const GET_FEED_VENUES = gql`
  query($cityIds: String, $venueTypeIds: String, $sort: String, $first: Int) {
    venues(
      cityIds: $cityIds
      venueTypeIds: $venueTypeIds
      sort: $sort
      first: $first
    ) {
      id
      createdAt
      name
      slug
      description
      streetAddress
      zipcode
      city
      state
      lat
      lng
      creator {
        id
        firstName
        lastName
      }
      venueTypes {
        id
        name
        image
      }
    }
  }
`
