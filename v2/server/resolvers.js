import graphsqlFields from 'graphql-fields'

import { initModelAssociations } from './models/associations'
import { getVenue } from './resolvers/venue'
import { getVenueType, getVenueTypes } from "./resolvers/venue_type"
import { getCities } from './resolvers/city'
import { signup, login, getUser } from './resolvers/user'

initModelAssociations()

export default {
	Query: {
		venue(obj, args, context, info) {
			return getVenue(args.id, { fields: graphsqlFields(info) })
		},
		venueTypes() {
			return getVenueTypes()
		},
		venueType(obj, args, context, info) {
			return getVenueType(args.id)
		},
		cities(obj, args) {
			return getCities({ limit: args.first })
		},
		user(obj, args, context, info) {
			return getUser(args.id, { fields: graphsqlFields(info) })
		}
	},
	Mutation: {
		signup,
		login,
	},
}