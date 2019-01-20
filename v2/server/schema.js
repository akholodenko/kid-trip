import { gql } from 'apollo-server'

export default gql`
    type Query {
        hello: String
        venueTypes: [VenueType]!
		venueType(id: ID!): VenueType
		cities: [City]!
    }

    type VenueType {
        id: Int!
        name: String!
    }
	
	type Venue {
		id: Int!
        name: String!
	}
	
	type City {
		id: Int!
		name: String!
		state: String!
	}
	
#	type State {
#		id: Int!
#		name: String!
#		shortName: String!
#	}
`;
