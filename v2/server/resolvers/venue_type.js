import VenueType from "../models/venue_type";

export const getVenueTypes = () => {
	return VenueType.findAll({
		attributes: ['id', 'name'],
		order: [['name', 'ASC']]
	}).then((venueTypes) => {
		return venueTypes.map((venueType) => {
			return {
				id: venueType.id,
				name: venueType.name
			}
		})
	})
}

export const getVenueType = (venueTypeId) => {
	return VenueType.findByPk(venueTypeId, {
		attributes: ['id', 'name'],
		order: [['name', 'ASC']]
	}).then((venueType) => {
		return {
			id: venueType.id,
			name: venueType.name
		}
	})
}