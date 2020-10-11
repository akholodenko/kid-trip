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

export default Image
