import { gql } from 'apollo-server'

export default gql`
    type Query {
		venue(id: ID!): Venue!
        venueTypes: [VenueType]!
		venueType(id: ID!): VenueType
		cities(first: Int): [City]!
    }

    type VenueType {
        id: Int!
        name: String!
    }
	
	type Venue {
		id: Int!
        name: String!
		streetAddress: String!
		venueTypes: [VenueType]
	}
	
	type City {
		id: Int!
		name: String!
		state: String!
		lat: Float
		lng: Float
	}
	
#	type State {
#		id: Int!
#		name: String!
#		shortName: String!
#	}
`;
