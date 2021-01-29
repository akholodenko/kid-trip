import { fromDbVenueTransform } from '../venue/utils'
import atob from 'atob'
import btoa from 'btoa'

export const fromDbUserTransform = user => {
  return {
    id: user.id,
    publicId: userDbIdToPublicId(user.id),
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    zipcode: user.zipcode,
    stats: user.stats,
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

export const userDbIdToPublicId = userId => btoa(userId * 999999999)
