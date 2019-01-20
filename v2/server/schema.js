import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Query {
    venueTypes: [VenueType]!
  }
  
  type VenueType {
  	id: Int!
  	name: String!
  }
`);

export default schema