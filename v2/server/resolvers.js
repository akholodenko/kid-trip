import graphsqlFields from 'graphql-fields'
import atob from 'atob'

import { initModelAssociations } from './models/associations'
import {
  getVenue,
  getVenueBySlug,
  getVenues,
  getSimilarVenuesInRadius,
  createVenue,
  createUserVenueFavorite,
  deleteUserVenueFavorite
} from './resolvers/venue'
import { getVenueType, getVenueTypes } from './resolvers/venue_type'
import { getCities } from './resolvers/city'
import {
  signup,
  login,
  getUser,
  getUserFeedConfig,
  getUserProfile,
  updateUserFeedConfig
} from './resolvers/user'

initModelAssociations()

export default {
  Query: {
    venue(obj, args, { user }, info) {
      return getVenue(args.id, user ? user.userId : null, {
        fields: graphsqlFields(info)
      })
    },
    venueBySlug(obj, args, { user }, info) {
      return getVenueBySlug(args.slug, user ? user.userId : null, {
        fields: graphsqlFields(info)
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
        fields: graphsqlFields(info)
      })
    },
    similarVenues(obj, args, context, info) {
      return getSimilarVenuesInRadius(args.id, args.radius, args.first, {
        fields: graphsqlFields(info)
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
        return getUserProfile(args.publicId, { fields: graphsqlFields(info) })
      } else {
        throw new Error('Invalid profile')
      }
    },
    me(obj, args, { user }, info) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      return getUser(user.userId, { fields: graphsqlFields(info) })
    }
  },
  Mutation: {
    signup,
    login,
    createVenue,
    createUserVenueFavorite,
    deleteUserVenueFavorite,
    updateUserFeedConfig
  }
}
