import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'
import Image from './image'
import UserProfileConfig from './user_profile_config'
import UserFollower from './user_follower'
import Message from './message'
import UserFeedConfig from './user_feed_config'
import UsersVenuesFavorites from './user_venue_favorite'
import Review from './review'

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
  User.createProfileConfig(userInstance.id)
})

// create profile config w/default header
User.createProfileConfig = userId => {
  return Image.randomHeaderImage().then(image => {
    return UserProfileConfig.create({
      user_id: userId,
      config: { headerImageId: image.id }
    })
  })
}

User.hasOne(UserFeedConfig, {
  foreignKey: 'user_id'
})

UserFeedConfig.belongsTo(User, {
  foreignKey: 'user_id'
})

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

User.hasMany(Message, {
  as: 'MessagesSent',
  foreignKey: 'sender_user_id'
})

User.hasMany(Message, {
  as: 'MessagesReceived',
  foreignKey: 'recipient_user_id'
})

Message.belongsTo(User, {
  foreignKey: 'sender_user_id',
  sourceKey: 'sender_user_id',
  as: 'MessageSender'
})

Message.belongsTo(User, {
  foreignKey: 'recipient_user_id',
  sourceKey: 'recipient_user_id',
  as: 'MessageRecipient'
})

UsersVenuesFavorites.hasMany(User, {
  foreignKey: 'id',
  sourceKey: 'user_id'
})

User.hasMany(UsersVenuesFavorites, {
  foreignKey: 'user_id'
})

User.hasMany(Review, {
  foreignKey: 'user_id'
})

Review.belongsTo(User, {
  foreignKey: 'user_id'
})

export default User
