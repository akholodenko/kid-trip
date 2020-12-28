import { gql } from 'apollo-server'

export default gql`
  input CityInput {
    id: Int!
  }

  input VenueTypeInput {
    id: Int!
  }
`
