import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

const VenueType = sequelize.define('venueType', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: Sequelize.STRING
}, {
	tableName: 'venue_types',
	timestamps: false
});

export default VenueType