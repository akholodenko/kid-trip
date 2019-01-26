import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

export default sequelize.define('city', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: Sequelize.STRING,
	state: Sequelize.STRING,
	lat: Sequelize.DECIMAL,
	lng: Sequelize.DECIMAL,
	timezone: Sequelize.STRING
}, {
	tableName: 'cities',
	timestamps: false
});