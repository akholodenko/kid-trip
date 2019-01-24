import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

const VenueType = sequelize.define('venue_types', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: Sequelize.STRING
}, {
	timestamps: false
});

export default VenueType