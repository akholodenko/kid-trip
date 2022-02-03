import graphsqlFields from 'graphql-fields'

import {
  getVenue,
  getVenueBySlug,
  getVenues,
  createVenue,
  createUserVenueFavorite,
  deleteUserVenueFavorite,
} from './resolvers/venue'
import {
  getSimilarVenuesInRadius,
  getSimilarVenuesByName,
} from './resolvers/venue/similarVenues'
import { getVenueType, getVenueTypes } from './resolvers/venue_type'
import { getCities } from './resolvers/city'
import {
  signup,
  login,
  getUserFeedConfig,
  updateUserFeedConfig,
} from './resolvers/user'
import { getUser } from './resolvers/user/userInfo'
import {
  getUserProfile,
  createUserFollower,
  deleteUserFollower,
} from './resolvers/user/userProfile'

import {
  getMessages,
  getMessageCount,
  getConversationalists,
  getConversation,
  updateConversation,
  createMessage,
} from './resolvers/message'

import { getReviewsByVenueId, createReview } from './resolvers/review'

export default {
  Query: {
    venue(obj, args, { user }, info) {
      return getVenue(args.id, user ? user.userId : null, {
        fields: graphsqlFields(info),
      })
    },
    venueBySlug(obj, args, { user }, info) {
      return getVenueBySlug(args.slug, user ? user.userId : null, {
        fields: graphsqlFields(info),
      })
    },
    venueTypes() {
      return getVenueTypes()
    },
    venueType(obj, args, context, info) {
      return getVenueType(args.id)
    },
    venues(obj, args, context, info) {
      return getVenues(args, {
        fields: graphsqlFields(info),
      })
    },
    similarVenues(obj, args, context, info) {
      return getSimilarVenuesInRadius(args.id, args.radius, args.first, {
        fields: graphsqlFields(info),
      })
    },
    similarVenuesByName(obj, args, context, info) {
      return getSimilarVenuesByName(args.name, args.cityId, args.first, {
        fields: graphsqlFields(info),
      })
    },
    cities(obj, args) {
      return getCities({ limit: args.first, query: args.query })
    },
    user(obj, args, context, info) {
      return getUser(args.id, { fields: graphsqlFields(info) })
    },
    userFeedConfig(obj, args, { user }, info) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      return getUserFeedConfig(user.userId)
    },
    userProfile(obj, args, { user }, info) {
      if (args && args.publicId) {
        return getUserProfile(args.publicId, {
          fields: graphsqlFields(info),
          currentUserId: user && user.userId ? user.userId : null,
        })
      } else {
        throw new Error('Invalid profile')
      }
    },
    messageCount(obj, args, { user }, info) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      return getMessageCount(user.userId)
    },
    messages(obj, args, { user }, info) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      return getMessages(user.userId, args.status, graphsqlFields(info))
    },
    conversationalists(obj, args, { user }, info) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      return getConversationalists(user.userId)
    },
    conversation(obj, args, { user }, info) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      if (args && args.conversationalistUserId) {
        return getConversation(
          user.userId,
          args.conversationalistUserId,
          graphsqlFields(info)
        )
      } else {
        throw new Error('Invalid conversation')
      }
    },
    reviewsByVenueId(obj, args, context, info) {
      return getReviewsByVenueId(args.venueId, args.first, {
        fields: graphsqlFields(info),
      })
    },
    me(obj, args, { user }, info) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      return getUser(user.userId, { fields: graphsqlFields(info) })
    },
  },
  Mutation: {
    signup,
    login,
    createVenue,
    createUserVenueFavorite,
    deleteUserVenueFavorite,
    createUserFollower,
    deleteUserFollower,
    updateUserFeedConfig,
    updateConversation,
    createMessage,
    createReview,
  },
}
