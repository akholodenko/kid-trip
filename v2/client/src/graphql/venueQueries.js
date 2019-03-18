import gql from "graphql-tag"

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