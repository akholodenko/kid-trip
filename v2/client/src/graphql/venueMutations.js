import gql from "graphql-tag"

export const CREATE_VENUE_MUTATION = gql`
    mutation CreateVenueMutation($name: String!, $streetAddress: String!, 
        $zipcode: Int!, $cityId: Int!, $typeId: Int!) {
        createVenue (
            name: $name
            streetAddress: $streetAddress
            zipcode: $zipcode
            city: {
                id: $cityId
            }
            venueType: {
                id: $typeId
            }
        ) {
            id
            name
            streetAddress
            venueTypes {
                name
            }
        }
    }
`
