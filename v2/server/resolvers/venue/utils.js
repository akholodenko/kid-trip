import { fromDbVenueTypeTransform } from '../venue_type'
import { fromDbUserTransform } from '../user/utils'

export const fromDbVenueTransform = venue => {
  return {
    id: venue.id,
    name: venue.name,
    slug: venue.slug,
    description:
      venue.dataValues && venue.dataValues.description
        ? venue.dataValues.description
        : null,
    streetAddress: venue.street_address,
    city: venue.city ? venue.city.name : null,
    state: venue.city ? venue.city.state : null,
    zipcode: venue.zipcode,
    createdAt:
      venue.dataValues && venue.dataValues.created_at
        ? venue.dataValues.created_at.toString()
        : null,
    lat: venue.lat,
    lng: venue.lng,
    venueTypes: venue.venueTypes
      ? venue.venueTypes.map(venueType => fromDbVenueTypeTransform(venueType))
      : null,
    users: venue.users
      ? venue.users.map(user => fromDbUserTransform(user))
      : null,
    venueStats: venue.venueStats,
    creator: venue.creator ? fromDbUserTransform(venue.creator) : null
  }
}
