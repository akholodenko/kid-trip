import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

const UserFollower = sequelize.define(
  'userFollower',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    follower_user_id: Sequelize.INTEGER,
    followee_user_id: Sequelize.INTEGER
  },
  {
    tableName: 'users_followers'
    // underscored: true
  }
)

export default UserFollower
