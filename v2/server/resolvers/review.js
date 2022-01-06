import Review from '../models/review'
import User from '../models/user'

import { fromDbReviewTransform } from './review/utils'
import Venue from '../models/venue'

export const REVIEW_ATTRIBUTES = [
  'id',
  'venue_id',
  'user_id',
  'rating',
  'description',
  'createdAt',
  'updatedAt'
]

export const getReviewsByVenueId = (venueId, first = 3, { fields }) => {
  let associations = []

  if (!!fields.reviewer) {
    associations.push({ model: User })
  }

  if (!!fields.venue) {
    associations.push({ model: Venue })
  }

  return Review.findAll({
    where: { venue_id: venueId },
    attributes: REVIEW_ATTRIBUTES,
    include: associations
  }).then(reviews => {
    return reviews.map(review => fromDbReviewTransform(review))
  })
}
