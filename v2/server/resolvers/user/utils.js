import { fromDbVenueTransform } from '../venue'
import atob from 'atob'

export const fromDbUserTransform = user => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    zipcode: user.zipcode,
    venues: user.venues
      ? user.venues.map(venue => fromDbVenueTransform(venue))
      : null,
    favoriteVenues: user.favoriteVenues
      ? user.favoriteVenues.map(venue => fromDbVenueTransform(venue))
      : null,
    feedConfig:
      user.userFeedConfig && user.userFeedConfig.config
        ? user.userFeedConfig.config
        : null,
    followees: user.UserFollowees
      ? user.UserFollowees.map(user => fromDbUserTransform(user))
      : null,
    followers: user.UserFollowers
      ? user.UserFollowers.map(user => fromDbUserTransform(user))
      : null
  }
}

export const userPublicIdToDbId = publicId => atob(publicId) / 999999999
