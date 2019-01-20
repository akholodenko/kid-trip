import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

export default sequelize.define('cities', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: Sequelize.STRING,
	state: Sequelize.STRING,
	lat: Sequelize.DECIMAL,
	lng: Sequelize.DECIMAL,
	timezone: Sequelize.STRING
}, {
	timestamps: false
});