import { gql } from 'apollo-server'

export default gql`
    type Query {
        hello: String
        venueTypes: [VenueType]!
		venueType(id: ID!): VenueType
    }

    type VenueType {
        id: Int!
        name: String!
    }
	
	type Venue {
		id: Int!
        name: String!
	}
`;
