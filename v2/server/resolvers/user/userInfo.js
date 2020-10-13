import VenueType from '../../models/venue_type'
import City from '../../models/city'
import Venue from '../../models/venue'
import { VENUE_ATTRIBUTES } from '../venue'
import UserFeedConfig from '../../models/user_feed_config'
import User from '../../models/user'
import UserVenueFavorite from '../../models/user_venue_favorite'
import { fromDbUserTransform } from './utils'

export const getUser = (userId, { fields }) => {
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
  }

  return User.findByPk(userId, {
    attributes: ['id', 'first_name', 'last_name', 'zipcode'],
    include: associations,
    order: [order]
  }).then(user => {
    if (!!fields && !!fields.favoriteVenues) {
      return getUserFavoriteVenues(userId, fields).then(response => {
        user.favoriteVenues = response
        return fromDbUserTransform(user)
      })
    } else {
      return fromDbUserTransform(user)
    }
  })
}

const getUserFavoriteVenues = (userId, fields) => {
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
