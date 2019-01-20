import Sequelize from "sequelize";

const sequelize = new Sequelize('kidtrip', 'root', null, {
	host: 'localhost',
	dialect: 'mysql'
});

export default sequelize