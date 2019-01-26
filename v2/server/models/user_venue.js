import Sequelize from "sequelize"
import sequelize from '../config/sequelize'

const UserVenue = sequelize.define('userVenue', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	user_id: Sequelize.INTEGER,
	venue_id: Sequelize.INTEGER,
}, {
	tableName: 'users_venues',
	timestamps: false,
})

export default UserVenue