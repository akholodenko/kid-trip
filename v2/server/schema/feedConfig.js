import { gql } from 'apollo-server'

export default gql`
  type FeedConfig {
    cityIds: String
    venueTypeIds: String
    cityDetails: [City]
  }
`
