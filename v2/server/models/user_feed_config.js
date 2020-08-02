import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

const UserFeedConfig = sequelize.define(
  'userFeedConfig',
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
    tableName: 'users_feed_config'
  }
)

export default UserFeedConfig
