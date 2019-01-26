import Venue from '../models/venue'
import VenueType from '../models/venue_type'
import User from '../models/user'

import { fromDbUserTransform } from './user'

export const fromDbVenueTransform = (venue) => {
	return {
		id: venue.id,
		name: venue.name,
		streetAddress: venue.street_address,
		lat: venue.lat,
		lng: venue.lng,
		venueTypes: venue.venueTypes,
		users: venue.users ? venue.users.map(user => fromDbUserTransform(user)) : null,
	}
}

export const getVenue = (venueId, { fields }) => {
	let associations = []

	if (!!fields.venueTypes) {
		associations.push({ model: VenueType })
	}

	if (!!fields.users) {
		associations.push({ model: User })
	}

	return Venue.findByPk(venueId, {
		attributes: ['id', 'name', 'street_address', 'lat', 'lng'],
		include: associations,
	}).then((venue) => {
		return fromDbVenueTransform(venue)
	})
}