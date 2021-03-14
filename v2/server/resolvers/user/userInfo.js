import VenueType from '../../models/venue_type'
import City from '../../models/city'
import Venue from '../../models/venue'
import { VENUE_ATTRIBUTES } from '../venue'
import UserFeedConfig from '../../models/user_feed_config'
import User from '../../models/user'
import UserVenueFavorite from '../../models/user_venue_favorite'
import { fromDbUserTransform } from './utils'
import UserFollower from '../../models/user_follower'
import { getInboxMessages } from '../message'

export const USER_ATTRIBUTES = ['id', 'first_name', 'last_name', 'zipcode']

export const getUser = (userId, { fields }) => {
  return Promise.all([
    getUserDetails(userId, fields),
    getUserFavoriteVenues(userId, fields),
    getUserFolloweeCount(userId, fields),
    getUserFollowerCount(userId, fields),
    getInboxMessages(userId, fields)
  ]).then(responses => {
    let user = responses[0]
    user.favoriteVenues = responses[1]
    user.stats = {
      followees: responses[2],
      followers: responses[3]
    }
    user.messages = responses[4]

    return fromDbUserTransform(user)
  })
}

const getUserDetails = (userId, fields) => {
  let associations = []
  let order = [['id', 'ASC']]

  if (fields) {
    if (!!fields.venues) {
      let venueAssociations = []

      if (!!fields.venues.venueTypes) {
        venueAssociations.push({ model: VenueType })
      }

      if (!!fields.venues.city || !!fields.venues.state) {
        venueAssociations.push({ model: City })
      }

      associations.push({
        model: Venue,
        attributes: VENUE_ATTRIBUTES,
        include: venueAssociations
      })

      order = [Venue, 'name', 'ASC']
    }

    if (!!fields.feedConfig) {
      associations.push({
        model: UserFeedConfig,
        attributes: ['config']
      })
    }

    if (!!fields.followees) {
      associations.push({
        model: User,
        as: 'UserFollowees',
        attributes: USER_ATTRIBUTES
      })
    }

    if (!!fields.followers) {
      associations.push({
        model: User,
        as: 'UserFollowers',
        attributes: USER_ATTRIBUTES
      })
    }
  }

  return User.findByPk(userId, {
    attributes: USER_ATTRIBUTES,
    include: associations,
    order: [order]
  })
}

// count of users that follow this user
const getUserFollowerCount = (userId, fields) => {
  if (!!fields && !!fields.stats && !!fields.stats.followers) {
    return UserFollower.count({ where: { followee_user_id: userId } })
  }

  return null
}

// count of users that this user follows
const getUserFolloweeCount = (userId, fields) => {
  if (!!fields && !!fields.stats && !!fields.stats.followees) {
    return UserFollower.count({ where: { follower_user_id: userId } })
  }

  return null
}

const getUserFavoriteVenues = (userId, fields) => {
  if (!!fields && !!fields.favoriteVenues) {
    let associations = []

    if (!!fields.favoriteVenues.venueTypes) {
      associations.push({ model: VenueType })
    }

    if (!!fields.favoriteVenues.city || !!fields.favoriteVenues.state) {
      associations.push({ model: City })
    }

    associations.push({
      model: UserVenueFavorite,
      where: {
        user_id: userId
      }
    })

    return Venue.findAll({
      attributes: VENUE_ATTRIBUTES,
      include: associations,
      order: [['name', 'ASC']]
    })
  }

  return null
}
