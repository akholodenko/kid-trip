import Venue from './venue'
import VenueType from './venue_type'
import VenueClassification from './venue_classification'

export const initModelAssociations = () => {
	Venue.belongsToMany(VenueType, {
		through: VenueClassification,
		foreignKey: 'venue_id',
		otherKey: 'venue_type_id'
	});

	VenueType.belongsToMany(Venue, {
		through: VenueClassification,
		foreignKey: 'venue_type_id',
		otherKey: 'venue_id'
	});
}