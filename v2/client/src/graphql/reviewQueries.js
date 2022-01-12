import { gql } from '@apollo/client'

export const ReviewDetails = gql`
  fragment ReviewDetails on Review {
    id
    venue {
      id
      name
      slug
      description
      streetAddress
      zipcode
    }
    reviewer {
      id
      firstName
      lastName
      email
    }
    rating
    description
    createdAt
    updatedAt
  }
`
