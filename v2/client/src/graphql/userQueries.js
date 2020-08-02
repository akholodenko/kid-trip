import gql from 'graphql-tag'

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
    }
  }
`
