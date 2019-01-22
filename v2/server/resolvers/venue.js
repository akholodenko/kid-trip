import Venue from '../models/venue'
import VenueType from '../models/venue_type'

export const fromDbVenueTransform = (venue) => {
	return {
		id: venue.id,
		name: venue.name,
		streetAddress: venue.street_address,
		lat: venue.lat,
		lng: venue.lng,
		venueTypes: venue.venue_types
	}
}

export const getVenue = (venueId) => {
	return Venue.findByPk(venueId, {
		attributes: ['id', 'name', 'street_address', 'lat', 'lng'],
		include: [{
			model: VenueType
		}]
	}).then((venue) => {
		return fromDbVenueTransform(venue)
	})
}