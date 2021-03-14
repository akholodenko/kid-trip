import { getZipCode } from '../zipcode'
import sequelize from '../../config/sequelize'
import { fromMiles } from '../../utils/numberUtils'
import { fromDbVenueTransform } from './utils'
import { getVenue, getVenues } from '../venue'

export const getSimilarVenuesByName = (name = '', cityId = null, limit = 3) => {
  return sequelize
    .query(
      `SELECT venues.*
       FROM venues
       where SIMILARITY(venues.name, '${name}') >= 0.3
       ${cityId ? ` AND city_id = ${cityId}` : ''}
       LIMIT ${limit}`
    )
    .then(response => {
      let venueIds = response[0]
        .map(venue => {
          return venue.id
        })
        .join(',')

      if (venueIds) {
        return getVenues(
          { ids: venueIds, sort: 'DESC' },
          { fields: { venueTypes: true, city: true, state: true } }
        )
      } else {
        return null
      }
    })
}

export const getSimilarVenuesInRadius = (
  venueId = null,
  radius = 5,
  limit = 3,
  { fields }
) => {
  return getVenue(venueId, null, { fields: { venueTypes: true } }).then(
    response => {
      const venueTypeId = response.venueTypes[0].id
      const lat = response.lat
      const lng = response.lng

      if (!lat || !lng) {
        return getZipCode(response.zipcode).then(coordinates => {
          return sqlQueryVenuesByTypeInRadius(
            venueTypeId,
            radius,
            coordinates,
            limit,
            [venueId]
          )
        })
      } else {
        return sqlQueryVenuesByTypeInRadius(
          venueTypeId,
          radius,
          { lat: lat, lng: lng },
          limit,
          [venueId]
        )
      }
    }
  )
}

const sqlQueryVenuesByTypeInRadius = (
  venueTypeId,
  radius,
  coordinates,
  limit,
  excludedVenueIds = []
) =>
  sequelize
    .query(
      `
			select * from
				(SELECT 
					venues.*,
					c.name as "city_name",
					(ST_SetSRID(geom, 4269)::geography <-> ST_Transform(ST_SetSRID(ST_MakePoint(${
            coordinates.lat
          },${coordinates.lng}),4326),4269)::geography) as distance
				FROM venues
				join venues_classifications vc on vc.venue_id = venues.id
				join cities c on c.id = venues.city_id
				where  
					vc.venue_type_id = ${venueTypeId} 
					${
            excludedVenueIds
              ? ` and venues.id not in (${excludedVenueIds.join(',')})`
              : ''
          } 
				ORDER BY distance LIMIT ${limit}) as list
			where list.distance <= ${fromMiles(radius)}`
    )
    .then(response =>
      response[0].map(venue => {
        venue.city = venue.city_name ? { name: venue.city_name } : null

        return fromDbVenueTransform(venue)
      })
    )
