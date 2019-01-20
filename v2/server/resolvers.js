import { getVenueType, getVenueTypes } from "./resolvers/venue_type";

export default {
	Query: {
		venueTypes() {
			return getVenueTypes()
		},
		venueType(obj, args, context, info) {
			return getVenueType(args.id)
		}
	}
};