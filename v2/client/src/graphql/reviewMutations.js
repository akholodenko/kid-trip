import { gql } from '@apollo/client'
import { ReviewDetails } from './reviewQueries'

export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($venueId: Int!, $rating: Int!, $description: String!) {
    createReview(
      venueId: $venueId
      rating: $rating
      description: $description
    ) {
      ...ReviewDetails
    }
  }
  ${ReviewDetails}
`
