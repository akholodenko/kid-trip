import { gql } from 'apollo-server'

export default gql`
  type Query {
    user(id: ID!): User!
    userFeedConfig: FeedConfig!
    userProfile(publicId: String!): UserProfile!
    venue(id: ID!): Venue!
    venueBySlug(slug: String!): Venue!
    venueTypes: [VenueType]!
    venueType(id: ID!): VenueType
    venues(
      venueTypeIds: String
      cityIds: String
      sort: String
      first: Int
    ): [Venue]
    similarVenues(id: ID!, radius: Int, first: Int): [Venue]
    similarVenuesByName(name: String!, cityId: Int, first: Int): [Venue]
    cities(first: Int, query: String): [City]!
    messageCount(status: String): MessageCount!
    messages(status: String): [Message]
    conversationalists: [Conversationalist]
    me: User
  }
`
