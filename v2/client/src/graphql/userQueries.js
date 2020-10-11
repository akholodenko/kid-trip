import { gql } from '@apollo/client'

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
      user {
        id
        firstName
        lastName
        zipcode
      }
      config {
        headerImageUrl
      }
    }
  }
`
