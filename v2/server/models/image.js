import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

const Image = sequelize.define(
  'image',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: Sequelize.STRING,
    filename: Sequelize.TEXT
  },
  {
    tableName: 'images'
  }
)

Image.findUserProfileHeaders = function() {
  return this.findAll({ where: { type: 'user-profile-header' } })
}

Image.randomHeaderImage = function() {
  return this.findUserProfileHeaders().then(images => {
    return images[Math.floor(Math.random() * images.length)]
  })
}

export default Image
