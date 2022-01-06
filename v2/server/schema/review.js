import { gql } from 'apollo-server'

export default gql`
  type Review {
    id: Int!
    venue: Venue
    reviewer: User
    rating: Float!
    description: String!
    createdAt: String!
    updatedAt: String!
  }
`
