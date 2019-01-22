import VenueType from "../models/venue_type";
import Venue from '../models/venue'
import { fromDbVenueTransform } from './venue'

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
		include: [{
			model: Venue,
			attributes: ['id', 'name', 'street_address']
		}],
		order: [['name', 'ASC']]
	}).then((venueType) => {
		return {
			id: venueType.id,
			name: venueType.name,
			venues: venueType.venues.map((venue) => {
				return fromDbVenueTransform(venue)
			})
		}
	})
}