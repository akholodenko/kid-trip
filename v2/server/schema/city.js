import { gql } from 'apollo-server'

export default gql`
  type City {
    id: Int!
    name: String!
    state: String!
    lat: Float
    lng: Float
  }
`
