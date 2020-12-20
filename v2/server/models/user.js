import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'
import Image from './image'
import UserProfileConfig from './user_profile_config'
import Venue from './venue'
import UsersVenues from './user_venue'
import UserFollower from './user_follower'
import UsersVenuesFavorites from './user_venue_favorite'

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: 'Email address already in use!'
      },
      validate: {
        max: 2,
        isEmail: {
          msg: 'The email you entered is invalid.'
        }
      }
    },
    password: Sequelize.STRING,
    zipcode: Sequelize.STRING
  },
  {
    tableName: 'users',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['zipcode']
      }
    ]
  }
)

User.afterCreate(userInstance => {
  // create profile config w/default header
  Image.randomHeaderImage().then(image => {
    UserProfileConfig.create({
      user_id: userInstance.id,
      config: { headerImageId: image.id }
    })
  })
})

// User.hasMany(UserFollower, {
//   foreignKey: 'follower_user_id',
//   as: 'Followee'
// })
//
// User.hasMany(UserFollower, {
//   foreignKey: 'followee_user_id',
//   as: 'Follower'
// })

// users current user is a following (so they are his followees)
User.belongsToMany(User, {
  through: UserFollower,
  as: 'UserFollowees',
  foreignKey: 'follower_user_id',
  otherKey: 'followee_user_id'
})

// users current user is followed by (so they are his followers)
User.belongsToMany(User, {
  through: UserFollower,
  as: 'UserFollowers',
  foreignKey: 'followee_user_id',
  otherKey: 'follower_user_id'
})

export default User
