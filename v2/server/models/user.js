import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'
import Image from './image'
import UserProfileConfig from './user_profile_config'

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

export default User
