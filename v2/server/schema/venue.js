import { gql } from 'apollo-server'

export default gql`
  type Venue {
    id: Int!
    name: String!
    slug: String!
    description: String
    streetAddress: String!
    lat: Float
    lng: Float
    venueTypes: [VenueType]
    creator: User
    users: [User]
    zipcode: Int!
    city: String
    state: String
    venueStats: VenueStats
    createdAt: String
  }

  type VenueType {
    id: Int!
    name: String!
    image: String
    venues: [Venue]
  }

  type VenueStats {
    favorites: Int
    favoriteByCurrentUser: Boolean
  }
`
