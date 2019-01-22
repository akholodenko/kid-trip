import Sequelize from "sequelize";
import sequelize from '../config/sequelize'
import Venue from './venue'
import VenueClassification from './venue_classification'

const VenueType = sequelize.define('venue_types', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: Sequelize.STRING
}, {
	timestamps: false
});

//
// VenueType.belongsToMany(Venue, {
// 	through: {
// 		model: VenueClassification,
// 		unique: false
// 	},
// 	foreignKey: 'venue_type_id',
// 	constraints: false
// 	//otherKey: 'venue_id'
// });

export default VenueType