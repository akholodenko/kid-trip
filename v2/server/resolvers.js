import { getVenueType, getVenueTypes } from "./resolvers/venue_type";
import { getCities } from './resolvers/city'

export default {
	Query: {
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