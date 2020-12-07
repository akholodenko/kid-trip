import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

const UserProfileConfig = sequelize.define(
  'userProfileConfig',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    config: Sequelize.JSONB
  },
  {
    tableName: 'users_profile_config'
  }
)

export default UserProfileConfig
