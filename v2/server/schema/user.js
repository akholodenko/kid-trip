import { gql } from 'apollo-server'

export default gql`
  type User {
    id: ID!
    publicId: String
    firstName: String!
    lastName: String!
    email: String
    zipcode: String
    venues: [Venue]
    favoriteVenues: [Venue]
    feedConfig: FeedConfig
    followees: [User]
    followers: [User]
    stats: UserProfileStats
    messages: [Message]
  }
`
