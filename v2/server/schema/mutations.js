import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    signup(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      zipcode: String
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createVenue(
      name: String!
      streetAddress: String!
      zipcode: Int!
      lat: Float
      lng: Float
      city: CityInput
      venueType: VenueTypeInput
    ): Venue
    createUserVenueFavorite(venueId: Int!): VenueStats
    deleteUserVenueFavorite(venueId: Int!): VenueStats
    updateUserFeedConfig(venueTypeIds: String, cityIds: String): FeedConfig
  }
`
