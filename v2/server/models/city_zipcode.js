import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

const CityZipcode = sequelize.define('cityZipcode', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	city_id: Sequelize.INTEGER,
	zipcode: Sequelize.INTEGER
}, {
	tableName: 'cities_zipcodes',
	timestamps: false
});

export default CityZipcode