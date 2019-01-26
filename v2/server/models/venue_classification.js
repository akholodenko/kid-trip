import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

const VenueClassification = sequelize.define('venueClassification', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	venue_id: Sequelize.INTEGER,
	venue_type_id: Sequelize.INTEGER
}, {
	tableName: 'venues_classifications',
	timestamps: false
});

export default VenueClassification