import City from '../models/city'
import VenueType from "../models/venue_type";

export const getCities = () => {
	return City.findAll({
		order: [['name', 'ASC']]
	})
}