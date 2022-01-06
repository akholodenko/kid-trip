import { fromDbUserTransform } from '../user/utils'
import { fromDbVenueTransform } from '../venue/utils'

export const fromDbReviewTransform = review => {
  return {
    id: review.id,
    venue: review.venue ? fromDbVenueTransform(review.venue) : null,
    reviewer: review.user ? fromDbUserTransform(review.user) : null,
    rating: review.rating,
    description: review.description,
    createdAt: review.createdAt.toString(),
    updatedAt: review.updatedAt.toString()
  }
}
