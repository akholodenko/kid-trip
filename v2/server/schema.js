import { gql } from 'apollo-server'

export default gql`
    type Query {
        user(id: ID!): User!
        venue(id: ID!): Venue!
        venueTypes: [VenueType]!
        venueType(id: ID!): VenueType
        cities(first: Int): [City]!
        me: User
    }

    type VenueType {
        id: Int!
        name: String!
        venues: [Venue]
    }

    type Venue {
        id: Int!
        name: String!
        streetAddress: String!
        lat: Float
        lng: Float
        venueTypes: [VenueType]
        users: [User]
        zipcode: Int!
        city: String
        state: String
    }
    
    type City {
        id: Int!
        name: String!
        state: String!
        lat: Float
        lng: Float
    }

    type Mutation {
#        post(url: String!, description: String!): Link!
        signup(email: String!, password: String!, firstName: String!, lastName: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        createVenue(name: String!, streetAddress: String!, zipcode: Int!, lat: Float, lng: Float, cityId: Int!, venueTypeId: Int): Venue
    }

    type AuthPayload {
        token: String
        user: User
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        venues: [Venue]
    }
`
