import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

const VenueClassification = sequelize.define('venues_classifications', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	venue_id: Sequelize.INTEGER,
	venue_type_id: Sequelize.INTEGER
}, {
	timestamps: false
});

export default VenueClassification