import { initModelAssociations } from './models/associations'
import { getVenue } from './resolvers/venue'
import { getVenueType, getVenueTypes } from "./resolvers/venue_type";
import { getCities } from './resolvers/city'

initModelAssociations()

export default {
	Query: {
		venue(obj, args) {
			return getVenue(args.id)
		},
		venueTypes() {
			return getVenueTypes()
		},
		venueType(obj, args, context, info) {
			return getVenueType(args.id)
		},
		cities(obj, args) {
			return getCities({ limit: args.first })
		}
	}
};