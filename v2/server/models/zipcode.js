import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

export default sequelize.define('Zipcode', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	zip: Sequelize.INTEGER,
	lat: Sequelize.DECIMAL,
	lng: Sequelize.DECIMAL
}, {
	tableName: 'zipcodes',
	timestamps: false
});