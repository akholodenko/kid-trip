import Sequelize from "sequelize";

export default new Sequelize('kidtrip', 'root', null, {
	host: 'localhost',
	dialect: 'mysql'
});