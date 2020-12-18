import { gql } from 'apollo-server'
import Queries from './schema/queries'
import Mutations from './schema/mutations'
import VenueInputs from './schema/venueInputs'

const allSchema = gql`
  type VenueType {
    id: Int!
    name: String!
    image: String
    venues: [Venue]
  }

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

  type VenueStats {
    favorites: Int
    favoriteByCurrentUser: Boolean
  }

  type City {
    id: Int!
    name: String!
    state: String!
    lat: Float
    lng: Float
  }

  type UserProfile {
    user: User!
    config: UserProfileConfiguration!
    stats: UserProfileStats!
    recentFavoriteVenues: [Venue]
    recentAddedVenues: [Venue]
  }

  type UserProfileConfiguration {
    headerImageUrl: String
  }

  type UserProfileStats {
    created: Int
    favorited: Int
  }

  type AuthPayload {
    token: String
    user: User
  }

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

  type FeedConfig {
    cityIds: String
    venueTypeIds: String
    cityDetails: [City]
  }
`
export default [Queries, Mutations, VenueInputs, allSchema]
