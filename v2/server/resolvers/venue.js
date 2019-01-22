import Venue from '../models/venue'
import VenueType from '../models/venue_type'

export const getVenue = (venueId) => {
	return Venue.findByPk(venueId, {
		attributes: ['id', 'name', 'street_address'],
		include: [{
			model: VenueType
		}]
	}).then((venue) => {
		return {
			id: venue.id,
			name: venue.name,
			streetAddress: venue.street_address,
			venueTypes: venue.venue_types
		}
	})
}