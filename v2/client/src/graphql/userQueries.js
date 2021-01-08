import { gql } from '@apollo/client'
import { VenueDetails } from './venueQueries'

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser @client {
      id
      firstName
      lastName
    }
  }
`

export const CURRENT_USER_FEED_CONFIG_QUERY = gql`
  query {
    userFeedConfig {
      cityIds
      venueTypeIds
      cityDetails {
        id
        name
        state
      }
    }
  }
`

export const GET_USER_PROFILE_BY_PUBLIC_ID = gql`
  query($publicId: String!) {
    userProfile(publicId: $publicId) {
      publicId
      user {
        id
        firstName
        lastName
        zipcode
      }
      config {
        headerImageUrl
      }
      stats {
        created
        favorited
        followedByCurrentUser
        followers
        followees
      }
      recentFavoriteVenues {
        ...VenueDetails
      }
      recentAddedVenues {
        ...VenueDetails
      }
    }
  }
  ${VenueDetails}
`

export const GET_FOLLOWERS_FOR_CURRENT_USER = gql`
  query {
    me {
      stats {
        followers
        followees
      }
      followees {
        id
        publicId
        firstName
        lastName
      }
      followers {
        id
        publicId
        firstName
        lastName
      }
    }
  }
`
