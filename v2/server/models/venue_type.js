import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

export default sequelize.define('venue_types', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: Sequelize.STRING
}, {
	timestamps: false
});