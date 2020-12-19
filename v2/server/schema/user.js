import { gql } from 'apollo-server'

export default gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String
    zipcode: String
    venues: [Venue]
    favoriteVenues: [Venue]
    feedConfig: FeedConfig
  }
`
