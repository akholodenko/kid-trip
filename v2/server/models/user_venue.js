import Sequelize from "sequelize"
import sequelize from '../config/sequelize'

const UserVenue = sequelize.define('users_venues', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	user_id: Sequelize.INTEGER,
	venue_id: Sequelize.INTEGER,
}, {
	timestamps: false,
})

export default UserVenue