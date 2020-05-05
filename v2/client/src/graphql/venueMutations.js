import gql from 'graphql-tag'

export const CREATE_VENUE_MUTATION = gql`
  mutation CreateVenueMutation(
    $name: String!
    $streetAddress: String!
    $zipcode: Int!
    $cityId: Int!
    $typeId: Int!
  ) {
    createVenue(
      name: $name
      streetAddress: $streetAddress
      zipcode: $zipcode
      city: { id: $cityId }
      venueType: { id: $typeId }
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

export const CREATE_USER_VENUE_FAVORITE_MUTATION = gql`
  mutation CreateUserVenueFavorite($venueId: Int!) {
    createUserVenueFavorite(venueId: $venueId) {
      favorites
    }
  }
`

export const DELETE_USER_VENUE_FAVORITE_MUTATION = gql`
  mutation DeleteUserVenueFavorite($venueId: Int!) {
    deleteUserVenueFavorite(venueId: $venueId) {
      favorites
    }
  }
`
