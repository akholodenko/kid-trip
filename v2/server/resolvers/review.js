import Review from '../models/review'
import User from '../models/user'

import { fromDbReviewTransform } from './review/utils'
import Venue from '../models/venue'
import Message from '../models/message'
import { fromDbMessageTransform } from './message/utils'

export const REVIEW_ATTRIBUTES = [
  'id',
  'venue_id',
  'user_id',
  'rating',
  'description',
  'createdAt',
  'updatedAt',
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
    include: associations,
    order: [['updatedAt', 'desc']],
  }).then((reviews) => {
    return reviews.map((review) => fromDbReviewTransform(review))
  })
}

export const createReview = (obj, args, { user }) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  return Review.create({
    user_id: user.userId,
    venue_id: args.venueId,
    rating: args.rating,
    description: args.description,
  }).then((response) => fromDbReviewTransform(response))
}
