import gql from "graphql-tag"

export const GET_VENUE_BASICS = gql`
    query ($venueId: ID!) {
        venue(id: $venueId) {
            id
            name
            streetAddress
            zipcode
            city
            state
            lat
            lng
            venueTypes {
                id
                name
            }
        }
    }
`

export const GET_VENUES_FOR_CURRENT_USER = gql`
    query {
        me {
            venues {
                id
                name
                streetAddress
                city
                state
                zipcode
                venueTypes {
                    name
                }
            }
        }
    }
`