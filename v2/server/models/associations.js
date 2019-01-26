import Venue from './venue'
import VenueType from './venue_type'
import VenueClassification from './venue_classification'

import User from './user'
import UsersVenues from './user_venue'

export const initModelAssociations = () => {
	Venue.belongsToMany(VenueType, {
		through: VenueClassification,
		foreignKey: 'venue_id',
		otherKey: 'venue_type_id',
	})

	Venue.belongsToMany(User, {
		through: UsersVenues,
		foreignKey: 'venue_id',
		otherKey: 'user_id'
	})

	VenueType.belongsToMany(Venue, {
		through: VenueClassification,
		foreignKey: 'venue_type_id',
		otherKey: 'venue_id',
	})

	User.belongsToMany(Venue, {
		through: UsersVenues,
		foreignKey: 'user_id',
		otherKey: 'venue_id',
	})
}