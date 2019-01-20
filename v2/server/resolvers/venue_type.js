import VenueType from "../models/venue_type";

export const getVenueTypes = () => {
	return VenueType.findAll({
		attributes: ['id', 'name'],
		order: [['name', 'ASC']]
	}).then((venueTypes) => {
		let cleanVenues = venueTypes.map((venueType) => {
			return {
				id: venueType.id,
				name: venueType.name
			}
		})

		return cleanVenues
	})
}

export const getVenueType = (venueTypeId) => {
	return VenueType.findById(venueTypeId, {
		attributes: ['id', 'name'],
		order: [['name', 'ASC']]
	}).then((venueType) => {
		return {
			id: venueType.id,
			name: venueType.name
		}
	})
}