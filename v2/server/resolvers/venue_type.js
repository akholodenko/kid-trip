import VenueType from '../models/venue_type'
import Venue from '../models/venue'
import { fromDbVenueTransform } from './venue/utils'
import { S3_URL } from '../utils/urlUtils'

export const fromDbVenueTypeTransform = venueType => {
  return {
    id: venueType.id,
    name: venueType.name,
    image: `${S3_URL}assets/venue-header-backgrounds/${
      venueType.image ? venueType.image : 'restaurant-header-cmp.jpg'
    }`
  }
}

export const getVenueTypes = () => {
  return VenueType.findAll({
    attributes: ['id', 'name', 'image'],
    order: [['name', 'ASC']]
  }).then(venueTypes => {
    return venueTypes.map(venueType => {
      return {
        id: venueType.id,
        name: venueType.name,
        image: venueType.image
      }
    })
  })
}

export const getVenueType = venueTypeId => {
  return VenueType.findByPk(venueTypeId, {
    attributes: ['id', 'name', 'image'],
    include: [
      {
        model: Venue,
        attributes: ['id', 'name', 'street_address', 'zipcode']
      }
    ],
    order: [['name', 'ASC']]
  }).then(venueType => {
    return {
      id: venueType.id,
      name: venueType.name,
      image: venueType.image,
      venues: venueType.venues.map(venue => {
        return fromDbVenueTransform(venue)
      })
    }
  })
}
