import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

import { sendFollowEmail } from '../utils/emailUtils'
import User from './user'
import { USER_ATTRIBUTES } from '../resolvers/user/userInfo'
import { fromDbUserTransform } from '../resolvers/user/utils'

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

UserFollower.afterCreate(userFollowerInstance => {
  Promise.all([
    User.findByPk(userFollowerInstance.follower_user_id, {
      attributes: USER_ATTRIBUTES
    }),
    User.findByPk(userFollowerInstance.followee_user_id, {
      attributes: USER_ATTRIBUTES
    })
  ]).then(responses => {
    sendFollowEmail(
      fromDbUserTransform(responses[0]),
      fromDbUserTransform(responses[1])
    )
  })
})

export default UserFollower
