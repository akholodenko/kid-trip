import gql from "graphql-tag"

const VenueDetails = gql `
    fragment VenueDetails on Venue {
        id
        name
        slug
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
`

export const GET_VENUE_BASICS = gql`
    query ($venueId: ID!) {
        venue(id: $venueId) {
            ...VenueDetails
        }
    }
    ${VenueDetails}
`

export const GET_VENUE_BY_SLUG = gql`
    query ($venueSlug: String!) {
        venueBySlug(slug: $venueSlug) {
            ...VenueDetails
        }
    }
    ${VenueDetails}
`

export const GET_VENUES_FOR_CURRENT_USER = gql`
    query {
        me {
            venues {
                ...VenueDetails
            }
        }
    }
    ${VenueDetails}
`

export const GET_VENUE_TYPES = gql`
    query {
        venueTypes {
            id
            name
        }
    }
`