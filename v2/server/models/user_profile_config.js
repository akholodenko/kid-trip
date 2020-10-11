import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'
import User from './user'

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

User.hasOne(UserProfileConfig, {
  foreignKey: 'user_id'
})

UserProfileConfig.belongsTo(User, {
  foreignKey: 'user_id'
})

export default UserProfileConfig
