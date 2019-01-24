import Sequelize from "sequelize";
import sequelize from '../config/sequelize'

const User = sequelize.define('users', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	first_name: Sequelize.STRING,
	last_name: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING
}, {
	underscored: true
});

export default User